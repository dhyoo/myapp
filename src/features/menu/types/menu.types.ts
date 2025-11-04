import type { PermissionType } from '@/shared/types/common.types';

export interface MenuItem {
  menuId: string;
  title: string;
  path: string;
  icon: string;
  permission: PermissionType;
  children: MenuItem[] | null;
}

export interface MenuResponse {
  success: boolean;
  data: MenuItem[];
  timestamp: string;
}

export interface UserPermissions {
  userId: string;
  roleId: string;
  orgId?: string;
  teamId?: string;
}

