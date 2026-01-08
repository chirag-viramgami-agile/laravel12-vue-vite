import { PERMISSIONS } from '@/constants/permissions';

export const adminMenu = [
  {
    label: 'Dashboard',
    to: '/admin',
    permission: PERMISSIONS.VIEW_DASHBOARD,
  },
  {
    label: 'Users',
    to: '/admin/users',
    permission: PERMISSIONS.MANAGE_USERS,
  },
  {
    label: 'Roles',
    to: '/admin/roles',
    permission: PERMISSIONS.MANAGE_ROLES,
  },
];
