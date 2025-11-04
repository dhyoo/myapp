import { MenuItem } from './MenuItem';
import { useMenus } from '../hooks/useMenus';
import type { PermissionType } from '@/shared/types/common.types';
import type { MenuItem as MenuItemType } from '../types/menu.types';

interface SidebarProps {
  userPermission?: PermissionType;
}

export function Sidebar({ userPermission = 'READ' }: SidebarProps) {
  const { menus, isLoading, error } = useMenus(userPermission);

  if (isLoading) {
    return (
      <aside className="h-full w-64 bg-gray-50 border-r border-gray-200 p-5">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-3"></div>
            <p className="text-sm text-gray-600">메뉴 로딩 중...</p>
          </div>
        </div>
      </aside>
    );
  }

  if (error) {
    console.error('Menu loading error:', error);
    return (
      <aside className="h-full w-64 bg-red-50 border-r border-red-200 p-5">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-red-500 mb-3">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-red-700 mb-1">메뉴를 불러올 수 없습니다</p>
          <small className="text-xs text-red-600">{error.message}</small>
        </div>
      </aside>
    );
  }

  if (!menus || menus.length === 0) {
    return (
      <aside className="h-full w-64 bg-gray-50 border-r border-gray-200 p-5">
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500">메뉴가 없습니다.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-full w-64 bg-white border-r border-gray-300 shadow-sm overflow-y-auto">
      <div className="p-4 border-b border-gray-300 bg-primary-600 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <h2 className="text-base font-bold text-white">메뉴</h2>
        </div>
      </div>
      <nav className="p-3">
        <ul className="space-y-2">
          {menus.map((menu: MenuItemType) => (
            <MenuItem key={menu.menuId} menu={menu} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

