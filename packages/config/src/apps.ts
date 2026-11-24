/** Every app on the platform. Used as `user_roles.app`, `access_requests.app` and hub tile ids. */
export const appIds = ['hub', 'admin', 'portfolio', 'gspace', 'studio', 'gym', 'converter'] as const;

export type AppId = (typeof appIds)[number];
