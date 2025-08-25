import HomeIcon from './icons/HomeIcon.vue';
import ChartIcon from './icons/ChartIcon.vue';
import SettingsIcon from './icons/SettingsIcon.vue';
import UsersIcon from './icons/UsersIcon.vue';

export interface NavItem {
  path: string;
  label: string;
  icon: any; // Vue component type
  exact?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/dashboard", label: "Overview", icon: HomeIcon, exact: true },
  { path: "/dashboard/analytics", label: "Analytics", icon: ChartIcon, exact: true },
  { path: "/dashboard/users", label: "Users", icon: UsersIcon, exact: true },
  { path: "/dashboard/settings", label: "Settings", icon: SettingsIcon, exact: true },
];