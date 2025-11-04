import { useMemo } from 'react';
import { useMenuStore } from '../store/menuStore';
import { filterMenusByPermission } from '../utils/menuFilter';
import type { PermissionType } from '@/shared/types/common.types';

/**
 * 권한별 메뉴 필터링 Hook
 */
export function useMenuFilter(requiredPermission: PermissionType = 'READ') {
  const menus = useMenuStore((state) => state.menus);

  const filteredMenus = useMemo(() => {
    if (menus.length === 0) return [];
    return filterMenusByPermission(menus, requiredPermission);
  }, [menus, requiredPermission]);

  return filteredMenus;
}

/**
 * 특정 경로의 메뉴 권한 확인 Hook
 */
export function useMenuPermission(path: string): PermissionType | null {
  const menus = useMenuStore((state) => state.menus);

  const findMenuByPath = (menuList: typeof menus, targetPath: string): typeof menus[0] | null => {
    for (const menu of menuList) {
      if (menu.path === targetPath) {
        return menu;
      }
      if (menu.children) {
        const found = findMenuByPath(menu.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  const menu = useMemo(() => {
    return findMenuByPath(menus, path);
  }, [menus, path]);

  return menu?.permission || null;
}

