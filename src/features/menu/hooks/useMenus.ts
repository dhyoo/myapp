import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { apiClient } from '@/shared/utils/api';
import { useMenuStore, isMenuCacheValid } from '../store/menuStore';
import { processMenus } from '../utils/menuFilter';
import type { MenuItem } from '../types/menu.types';
import type { PermissionType } from '@/shared/types/common.types';

const MENU_QUERY_KEY = ['menus'];

/**
 * 기본 메뉴 데이터 (백엔드가 없을 때 사용)
 */
async function getDefaultMenus(): Promise<MenuItem[]> {
  try {
    // 먼저 public/mock-menus.json 파일을 시도
    const response = await fetch('/mock-menus.json');
    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        console.log('useMenus: Loaded menus from mock-menus.json');
        return data.data;
      }
    }
  } catch (error) {
    console.warn('useMenus: Failed to load mock-menus.json', error);
  }
  
  // 기본 메뉴 데이터 반환
  return [
    {
      menuId: 'MENU_001',
      title: '대시보드',
      path: '/dashboard',
      icon: '📊',
      permission: 'READ' as const,
      children: null,
    },
    {
      menuId: 'MENU_002',
      title: '사용자 관리',
      path: '/users',
      icon: '👥',
      permission: 'ADMIN' as const,
      children: [
        {
          menuId: 'MENU_003',
          title: '사용자 목록',
          path: '/users/list',
          icon: '📋',
          permission: 'READ' as const,
          children: null,
        },
        {
          menuId: 'MENU_004',
          title: '사용자 등록',
          path: '/users/create',
          icon: '➕',
          permission: 'WRITE' as const,
          children: null,
        },
      ],
    },
    {
      menuId: 'MENU_005',
      title: '권한 관리',
      path: '/roles',
      icon: '🔐',
      permission: 'ADMIN' as const,
      children: null,
    },
  ];
}

/**
 * 메뉴 조회 React Query Hook
 */
export function useMenus(userPermission: PermissionType = 'READ') {
  const {
    menus: cachedMenus,
    setMenus,
    setFilteredMenus,
    setLoading,
    setError,
  } = useMenuStore();

  // 캐시 유효성 검사
  const shouldUseCache = isMenuCacheValid() && cachedMenus.length > 0;

  const query = useQuery<MenuItem[]>({
    queryKey: MENU_QUERY_KEY,
    queryFn: async () => {
      console.log('useMenus: Starting to fetch menus');
      setLoading(true);
      try {
        const response = await apiClient.get<MenuItem[]>('/menus');
        console.log('useMenus: API response received', response);
        
        if (!response.success) {
          // 에러 발생 시 기본 메뉴 데이터 사용
          const errorMsg = response.message || response.error?.message || '메뉴 조회 실패';
          console.warn('useMenus: API returned error, using default menus', errorMsg);
          const defaultMenus = await getDefaultMenus();
          setMenus(defaultMenus);
          return defaultMenus;
        }
        
        const menus = response.data || [];
        if (menus.length === 0) {
          // 빈 데이터가 오면 기본 메뉴 사용
          console.warn('useMenus: Empty data received, using default menus');
          const defaultMenus = await getDefaultMenus();
          setMenus(defaultMenus);
          return defaultMenus;
        }
        console.log('useMenus: Setting menus', menus);
        setMenus(menus);
        return menus;
      } catch (error) {
        console.error('useMenus: Error caught, using default menus', error);
        const err = error instanceof Error ? error : new Error('Unknown error');
        setError(err);
        // 에러 발생 시에도 기본 메뉴 반환
        const defaultMenus = await getDefaultMenus();
        setMenus(defaultMenus);
        return defaultMenus;
      } finally {
        setLoading(false);
      }
    },
    enabled: !shouldUseCache, // 캐시가 있으면 API 호출하지 않음
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    retry: 0, // 에러 발생 시 재시도 안 함 (디버깅 용이)
    retryDelay: 1000,
  });

  // 권한별 필터링
  useEffect(() => {
    try {
      const menusToFilter = shouldUseCache ? cachedMenus : (query.data || []);
      
      if (menusToFilter && Array.isArray(menusToFilter) && menusToFilter.length > 0) {
        console.log('Filtering menus:', menusToFilter.length, 'items with permission:', userPermission);
        const filtered = processMenus(menusToFilter, userPermission);
        console.log('Filtered menus:', filtered.length, 'items');
        setFilteredMenus(filtered);
      } else {
        console.log('No menus to filter');
        setFilteredMenus([]);
      }
    } catch (error) {
      console.error('Menu filtering error:', error);
      const err = error instanceof Error ? error : new Error('Menu filtering failed');
      setError(err);
      setFilteredMenus([]);
    }
  }, [query.data, userPermission, cachedMenus, shouldUseCache, setFilteredMenus, setError]);

  type MenuStoreState = {
    filteredMenus: MenuItem[];
    isLoading: boolean;
    error: Error | null;
  };
  const filteredMenus = useMenuStore((state: MenuStoreState) => state.filteredMenus);
  const storeLoading = useMenuStore((state: MenuStoreState) => state.isLoading);
  const storeError = useMenuStore((state: MenuStoreState) => state.error);

  return {
    menus: filteredMenus || [],
    isLoading: query.isLoading || storeLoading,
    error: query.error || storeError,
    refetch: query.refetch,
    isCached: shouldUseCache,
  };
}

