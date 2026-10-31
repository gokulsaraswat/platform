import { z } from 'zod';
import { appIds } from './apps.js';

/** bundled: shipped inside the hub/native app; remote: same-domain path; external: another origin. */
export const tileModes = ['bundled', 'remote', 'external'] as const;

const tileSchema = z
  .object({
    id: z.enum(appIds),
    name: z.string().min(1),
    href: z.string().min(1),
    mode: z.enum(tileModes),
    enabled: z.boolean(),
  })
  .refine((t) => (t.mode === 'external' ? /^https:\/\//.test(t.href) : t.href.startsWith('/')), {
    message: 'external tiles need an https:// URL; bundled and remote tiles need a path starting with /',
    path: ['href'],
  });

/** Shape of the hub's config.json (published by admin to Supabase Storage). */
export const hubConfigSchema = z
  .object({
    version: z.literal(1),
    apps: z.array(tileSchema),
  })
  .refine((c) => new Set(c.apps.map((a) => a.id)).size === c.apps.length, {
    message: 'app ids must be unique',
    path: ['apps'],
  });

export type HubConfig = z.infer<typeof hubConfigSchema>;
export type HubTile = HubConfig['apps'][number];

/** Validates fetched or cached config.json. Throws a ZodError on invalid input. */
export const parseHubConfig = (input: unknown): HubConfig => hubConfigSchema.parse(input);
