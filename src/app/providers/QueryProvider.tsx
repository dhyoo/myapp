import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
      // React Query v5에서는 defaultOptions에서 onError를 지원하지 않음
      // 각 쿼리/뮤테이션에서 개별적으로 onError를 처리하거나
      // ErrorBoundary에서 전역 에러를 처리해야 함
    },
    mutations: {
      retry: 1,
    },
  },
});

// 개발 환경에서 전역 쿼리 에러 로깅 (선택적)
if (import.meta.env.DEV) {
  queryClient.getQueryCache().subscribe((event) => {
    if (event?.type === 'updated' && event.query.state.error) {
      const error = event.query.state.error;
      if (error instanceof Error) {
        console.group('⚠️ React Query Error (Global)');
        console.error('Query Key:', event.query.queryKey);
        console.error('Error:', error);
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);
        console.groupEnd();
      }
    }
  });

  queryClient.getMutationCache().subscribe((event) => {
    if (event?.type === 'updated' && event.mutation.state.error) {
      const error = event.mutation.state.error;
      if (error instanceof Error) {
        console.group('⚠️ React Query Mutation Error (Global)');
        console.error('Mutation:', event.mutation.options.mutationKey);
        console.error('Error:', error);
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);
        console.groupEnd();
      }
    }
  });
}

// TODO: Sentry 등 에러 로깅 서비스 연동
// if (window.Sentry) {
//   queryClient.getQueryCache().subscribe((event) => {
//     if (event?.type === 'updated' && event.query.state.error) {
//       window.Sentry.captureException(event.query.state.error, {
//         tags: { errorType: 'react-query' },
//       });
//     }
//   });
// }

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

