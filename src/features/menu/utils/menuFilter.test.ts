import { describe, it, expect } from 'vitest';
import { filterMenusByPermission, processMenus } from './menuFilter';
import type { MenuItem } from '../types/menu.types';

describe('menuFilter', () => {
  const mockMenus: MenuItem[] = [
    {
      menuId: 'MENU_001',
      title: '대시보드',
      path: '/dashboard',
      icon: 'DashboardIcon',
      permission: 'READ',
      children: null,
    },
    {
      menuId: 'MENU_002',
      title: '사용자 관리',
      path: '/users',
      icon: 'UserIcon',
      permission: 'ADMIN',
      children: [
        {
          menuId: 'MENU_003',
          title: '사용자 목록',
          path: '/users/list',
          icon: 'UserListIcon',
          permission: 'READ',
          children: null,
        },
        {
          menuId: 'MENU_004',
          title: '사용자 등록',
          path: '/users/create',
          icon: 'UserAddIcon',
          permission: 'WRITE',
          children: null,
        },
      ],
    },
  ];

  describe('filterMenusByPermission', () => {
    it('READ 권한으로 필터링 시 READ 이상 권한 메뉴만 표시', () => {
      const filtered = filterMenusByPermission(mockMenus, 'READ');
      
      expect(filtered).toHaveLength(2);
      expect(filtered[0].menuId).toBe('MENU_001');
      expect(filtered[1].menuId).toBe('MENU_002');
      expect(filtered[1].children).toHaveLength(2);
    });

    it('WRITE 권한으로 필터링 시 WRITE 이상 권한 메뉴만 표시', () => {
      const filtered = filterMenusByPermission(mockMenus, 'WRITE');
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].menuId).toBe('MENU_002');
      expect(filtered[0].children).toHaveLength(1);
      expect(filtered[0].children![0].menuId).toBe('MENU_004');
    });

    it('ADMIN 권한으로 필터링 시 ADMIN 권한 메뉴만 표시', () => {
      const filtered = filterMenusByPermission(mockMenus, 'ADMIN');
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].menuId).toBe('MENU_002');
      expect(filtered[0].children).toBeNull();
    });
  });

  describe('processMenus', () => {
    it('메뉴를 필터링하고 정렬한다', () => {
      const processed = processMenus(mockMenus, 'READ');
      
      expect(processed).toHaveLength(2);
      expect(processed[0].menuId).toBe('MENU_001');
    });
  });
});

