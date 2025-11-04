import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { apiClient } from '@/shared/utils/api';
import { useMenuStore, isMenuCacheValid } from '../store/menuStore';
import { processMenus } from '../utils/menuFilter';
import type { MenuItem } from '../types/menu.types';
import type { PermissionType } from '@/shared/types/common.types';

const MENU_QUERY_KEY = ['menus'];

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
          const errorMsg = response.error?.message || '메뉴 조회 실패';
          console.error('useMenus: API returned error', errorMsg);
          throw new Error(errorMsg);
        }
        
        if (!response.data) {
          console.error('useMenus: No data in response');
          throw new Error('메뉴 데이터가 없습니다');
        }
        
        console.log('useMenus: Setting menus', response.data);
        setMenus(response.data);
        return response.data;
      } catch (error) {
        console.error('useMenus: Error caught', error);
        const err = error instanceof Error ? error : new Error('Unknown error');
        setError(err);
        throw err;
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

  const filteredMenus = useMenuStore((state) => state.filteredMenus);
  const storeLoading = useMenuStore((state) => state.isLoading);
  const storeError = useMenuStore((state) => state.error);

  return {
    menus: filteredMenus || [],
    isLoading: query.isLoading || storeLoading,
    error: query.error || storeError,
    refetch: query.refetch,
    isCached: shouldUseCache,
  };
}

