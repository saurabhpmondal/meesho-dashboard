/**
 * Strict structural configuration for application tabs.
 * To add new tabs moving forward, add a new configuration block here.
 */
export const TABS_CONFIG = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    reportClass: 'DashboardReport',
    icon: 'fa-th-large'
  },
  {
    id: 'topStyles',
    label: 'Top Styles',
    reportClass: 'TopStylesReport',
    icon: 'fa-tags'
  }
];

export const DEFAULT_TAB_ID = 'dashboard';
