/** Every app on the platform. Used as `user_roles.app` and hub tile ids. */
export const appIds = ['hub', 'admin', 'portfolio', 'gspace', 'studio', 'gym'] as const;

export type AppId = (typeof appIds)[number];
