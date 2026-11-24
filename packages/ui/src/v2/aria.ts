/** Props for the panel controlled by a Tabs tab; safe to call in server components. */
export const tabPanelProps = (idPrefix: string, id: string, active: string) => ({
  role: 'tabpanel' as const,
  id: `${idPrefix}-panel-${id}`,
  'aria-labelledby': `${idPrefix}-tab-${id}`,
  hidden: id !== active,
  tabIndex: 0,
});
