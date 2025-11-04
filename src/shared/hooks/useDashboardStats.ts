import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/utils/api';
import type { DashboardStats } from '@/shared/types/common.types';
import { defaultDashboardStats } from '@/shared/data/defaultData';

const DASHBOARD_STATS_QUERY_KEY = ['dashboard-stats'];

/**
 * 대시보드 통계 조회 React Query Hook
 */
export function useDashboardStats() {
  const query = useQuery<{ data: DashboardStats; isDefault: boolean }>({
    queryKey: DASHBOARD_STATS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<DashboardStats>('/dashboard/stats');
      
      if (!response.success) {
        // 에러 발생 시 기본 데이터 반환
        console.warn('대시보드 통계 조회 실패, 기본 데이터 사용:', response.message || response.error?.message);
        return { data: defaultDashboardStats, isDefault: true };
      }
      
      return { data: response.data || defaultDashboardStats, isDefault: !response.data };
    },
    staleTime: 1 * 60 * 1000, // 1분간 fresh 상태 유지
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1,
    refetchInterval: 5 * 60 * 1000, // 5분마다 자동 갱신
  });

  const result = query.data || { data: defaultDashboardStats, isDefault: true };

  return {
    stats: result.data,
    isDefaultData: result.isDefault,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

