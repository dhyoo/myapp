import type { MenuItem } from '../types/menu.types';
import type { PermissionType } from '@/shared/types/common.types';

/**
 * 메뉴를 트리 구조로 변환
 */
export function buildMenuTree(flatMenus: MenuItem[]): MenuItem[] {
  const menuMap = new Map<string, MenuItem>();
  const rootMenus: MenuItem[] = [];

  // 모든 메뉴를 맵에 저장
  flatMenus.forEach((menu) => {
    menuMap.set(menu.menuId, { ...menu, children: [] });
  });

  // 부모-자식 관계 설정
  flatMenus.forEach((menu) => {
    const menuWithChildren = menuMap.get(menu.menuId);
    if (!menuWithChildren) return;

    // 부모 메뉴 찾기 (현재는 부모 정보가 없으므로 path 기반으로 추론)
    // 실제로는 DB에서 PARENT_MENU_ID를 가져와야 함
    const parentPath = menu.path.split('/').slice(0, -1).join('/') || '/';
    const parentMenu = Array.from(menuMap.values()).find(
      (m) => m.path === parentPath && m.path !== menu.path
    );

    if (parentMenu) {
      if (!parentMenu.children) {
        parentMenu.children = [];
      }
      parentMenu.children.push(menuWithChildren);
    } else {
      rootMenus.push(menuWithChildren);
    }
  });

  return rootMenus;
}

/**
 * 권한 기반 메뉴 필터링
 */
export function filterMenusByPermission(
  menus: MenuItem[],
  requiredPermission: PermissionType
): MenuItem[] {
  const permissionHierarchy: Record<PermissionType, number> = {
    READ: 1,
    WRITE: 2,
    DELETE: 3,
    ADMIN: 4,
  };

  const requiredLevel = permissionHierarchy[requiredPermission];

  return menus
    .map((menu) => {
      const menuPermissionLevel = permissionHierarchy[menu.permission];

      // 필터링된 자식 메뉴
      const filteredChildren = menu.children
        ? filterMenusByPermission(menu.children, requiredPermission)
        : null;

      // 현재 메뉴의 권한이 충분한지 확인
      if (menuPermissionLevel >= requiredLevel) {
        return {
          ...menu,
          children: filteredChildren && filteredChildren.length > 0 ? filteredChildren : null,
        };
      }

      // 권한이 부족하지만 자식 메뉴가 있는 경우
      if (filteredChildren && filteredChildren.length > 0) {
        return {
          ...menu,
          children: filteredChildren,
        };
      }

      return null;
    })
    .filter((menu): menu is MenuItem => menu !== null);
}

/**
 * 권한별로 메뉴 필터링 및 정렬
 */
export function processMenus(
  menus: MenuItem[],
  userPermission: PermissionType = 'READ'
): MenuItem[] {
  const filtered = filterMenusByPermission(menus, userPermission);
  return sortMenus(filtered);
}

/**
 * 메뉴 정렬 (order 속성 기준, 실제로는 DB에서 정렬된 데이터를 받아옴)
 */
function sortMenus(menus: MenuItem[]): MenuItem[] {
  return menus.sort((a, b) => {
    // children이 있는 메뉴를 먼저 표시
    if (a.children && !b.children) return -1;
    if (!a.children && b.children) return 1;
    return a.title.localeCompare(b.title);
  });
}

