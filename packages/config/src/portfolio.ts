import { z } from 'zod';

/** Shapes of the portfolio data contract (docs/CONTRACTS.md "Portfolio data", P1-P7). Draft v1: nothing is applied yet. */

export const portfolioStatuses = ['draft', 'review', 'published'] as const;
export const bodyFormats = ['md', 'mdx'] as const;
export const postTypes = ['article', 'youtube', 'spotify', 'tweet'] as const;
export const ideaStatuses = ['idea', 'drafting', 'review', 'published'] as const;
export const priorities = ['low', 'medium', 'high'] as const;
export const commentStatuses = ['pending', 'approved', 'rejected'] as const;
export const commentEntityTypes = ['post', 'project', 'course', 'snippet'] as const;
export const chapterTypes = ['content', 'hld', 'lld', 'api-design', 'code'] as const;
export const demoTypes = ['image', 'link', 'output'] as const;
export const diagramTypes = ['hld', 'lld', 'dfd', 'sequence', 'erd', 'other'] as const;
export const footerGroups = ['work', 'writing', 'about', 'elsewhere'] as const;
export const commentModerationModes = ['pending', 'auto'] as const;
export const themeDefaults = ['system', 'light', 'dark'] as const;

const httpsUrl = z.string().regex(/^https:\/\/\S+$/, 'must be an https:// URL');
const optionalHttpsUrl = z.union([z.literal(''), httpsUrl]);

/** Lowercase words joined by single hyphens, e.g. `my-first-post`. */
export const slugSchema = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'lowercase letters, digits and single hyphens');

/** Per-page SEO overrides (`seo jsonb`). */
export const seoSchema = z.object({
  title: z.string().max(70).optional(),
  description: z.string().max(200).optional(),
  og_image: optionalHttpsUrl.optional(),
});

/** `portfolio_profile.socials`: only non-empty keys are stored. */
export const socialsSchema = z.object({
  github: httpsUrl,
  linkedin: httpsUrl,
  twitter: httpsUrl,
  youtube: httpsUrl,
  spotify: httpsUrl,
  website: httpsUrl,
  codechef: httpsUrl,
  leetcode: httpsUrl,
}).partial();

export const resourceLinkSchema = z.object({ label: z.string().min(1), url: httpsUrl, description: z.string().default('') });
export const architectureDiagramSchema = z.object({
  title: z.string().min(1),
  url: httpsUrl,
  description: z.string().default(''),
  type: z.enum(diagramTypes),
});
export const contributorSchema = z.object({
  name: z.string().min(1),
  role: z.string().default(''),
  avatar: httpsUrl.optional(),
  url: httpsUrl.optional(),
  hidden: z.boolean().optional(),
});
export const snippetTabSchema = z.object({ name: z.string().min(1), language: z.string().default(''), content: z.string() });

export const heroCtaSchema = z.object({
  label: z.string().min(1).max(40),
  href: z.string().regex(/^(\/|https:\/\/|mailto:)\S*$/, 'a path, an https:// URL or mailto:'),
  variant: z.enum(['primary', 'secondary']),
});

export const sectionsSchema = z.object({
  blog: z.boolean(),
  projects: z.boolean(),
  courses: z.boolean(),
  snippets: z.boolean(),
  comments: z.boolean(),
  contact: z.boolean(),
  chat: z.boolean(),
});

/** One value schema per `portfolio_settings.key`. Unknown keys are rejected by `parsePortfolioSetting`. */
export const portfolioSettingSchemas = {
  'site.title': z.string().min(1),
  'site.description': z.string(),
  'site.url': httpsUrl,
  'site.og_image': optionalHttpsUrl,
  'theme.default': z.enum(themeDefaults),
  'hero.greeting': z.string(),
  'hero.ctas': z.array(heroCtaSchema).max(4),
  'hero.open_to_work': z.boolean(),
  sections: sectionsSchema,
  'chat.greeting': z.string(),
  'music.enabled': z.boolean(),
  'comments.moderation': z.enum(commentModerationModes),
  'footer.text': z.string(),
  'footer.copyright_name': z.string(),
  'contact.notify_email': z.union([z.literal(''), z.email()]),
  'contact.phone': z.string(),
} as const;

export type PortfolioSettingKey = keyof typeof portfolioSettingSchemas;

/** Settings that must never be returned to the public site (`is_public = false` in the table). */
export const privatePortfolioSettingKeys = ['contact.notify_email', 'contact.phone'] as const satisfies readonly PortfolioSettingKey[];

export const isPortfolioSettingKey = (key: string): key is PortfolioSettingKey => Object.hasOwn(portfolioSettingSchemas, key);

/** Validates one settings value. Throws on an unknown key or an invalid value. */
export const parsePortfolioSetting = <K extends PortfolioSettingKey>(
  key: K,
  value: unknown,
): z.infer<(typeof portfolioSettingSchemas)[K]> => {
  if (!isPortfolioSettingKey(key)) throw new Error(`Unknown portfolio setting: ${String(key)}`);
  return portfolioSettingSchemas[key].parse(value) as z.infer<(typeof portfolioSettingSchemas)[K]>;
};

export const heroLineSchema = z.string().min(1).max(80);
export const chatStarterSchema = z.string().min(1).max(120);

export const statSchema = z.object({
  value: z.number(),
  prefix: z.string().default(''),
  suffix: z.string().default(''),
  label: z.string().min(1),
  icon: z.string().nullable().default(null),
  description: z.string().nullable().default(null),
});

export const footerLinkSchema = z.object({
  group_name: z.enum(footerGroups),
  label: z.string().min(1),
  href: z.string().regex(/^(\/|https:\/\/|mailto:)\S*$/, 'a path, an https:// URL or mailto:'),
  external: z.boolean().default(false),
});

export const trackSchema = z.object({
  title: z.string().min(1),
  artist: z.string().default(''),
  audio_url: httpsUrl,
  duration_seconds: z.number().int().positive().nullable().default(null),
});

export const skillSchema = z.object({
  name: z.string().min(1),
  icon_slug: z.string().regex(/^[a-z0-9]+$/).nullable().default(null),
  is_primary: z.boolean().default(false),
});

/** Comment text limits enforced by `portfolio_submit_comment` (P3); mirrored here for endpoint validation. */
export const commentInputSchema = z.object({
  entity_type: z.enum(commentEntityTypes),
  entity_id: z.uuid(),
  parent_id: z.uuid().nullable().default(null),
  name: z.string().trim().min(1).max(80),
  email: z.union([z.literal(''), z.email().max(160)]).default(''),
  body: z.string().trim().min(2).max(4000),
});

/** Contact form limits enforced by `portfolio_submit_message`. */
export const contactInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(160),
  subject: z.string().trim().max(200).default(''),
  body: z.string().trim().min(1).max(5000),
});

export type PortfolioSeo = z.infer<typeof seoSchema>;
export type PortfolioSocials = z.infer<typeof socialsSchema>;
export type PortfolioSections = z.infer<typeof sectionsSchema>;
export type PortfolioHeroCta = z.infer<typeof heroCtaSchema>;
export type PortfolioStat = z.infer<typeof statSchema>;
export type PortfolioFooterLink = z.infer<typeof footerLinkSchema>;
export type PortfolioTrack = z.infer<typeof trackSchema>;
export type PortfolioCommentInput = z.infer<typeof commentInputSchema>;
export type PortfolioContactInput = z.infer<typeof contactInputSchema>;
