import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/utils/api';
import type { Activity } from '@/shared/types/common.types';
import { defaultActivities } from '@/shared/data/defaultData';

const ACTIVITIES_QUERY_KEY = ['activities'];

/**
 * 활동 로그 조회 React Query Hook
 */
export function useActivities() {
  const query = useQuery<{ data: Activity[]; isDefault: boolean }>({
    queryKey: ACTIVITIES_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<Activity[]>('/activities');
      
      if (!response.success) {
        // 에러 발생 시 기본 데이터 반환
        console.warn('활동 로그 조회 실패, 기본 데이터 사용:', response.message || response.error?.message);
        return { data: defaultActivities, isDefault: true };
      }
      
      return { data: response.data || defaultActivities, isDefault: !response.data || response.data.length === 0 };
    },
    staleTime: 1 * 60 * 1000, // 1분간 fresh 상태 유지
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1,
  });

  const result = query.data || { data: defaultActivities, isDefault: true };

  return {
    activities: result.data,
    isDefaultData: result.isDefault,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

