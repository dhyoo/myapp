import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
      onError: (error) => {
        // API 에러 통합 관리
        console.error('React Query Error:', error);
        
        // TODO: Sentry 등 에러 로깅 서비스 연동
        // if (window.Sentry) {
        //   window.Sentry.captureException(error, {
        //     tags: {
        //       errorType: 'react-query',
        //     },
        //   });
        // }
        
        // 개발 환경에서 상세 로깅
        if (import.meta.env.DEV) {
          console.group('⚠️ React Query Error');
          console.error('Error:', error);
          if (error instanceof Error) {
            console.error('Message:', error.message);
            console.error('Stack:', error.stack);
          }
          console.groupEnd();
        }
      },
    },
    mutations: {
      onError: (error) => {
        console.error('React Query Mutation Error:', error);
        
        // TODO: Sentry 등 에러 로깅 서비스 연동
        // 개발 환경에서 상세 로깅
        if (import.meta.env.DEV) {
          console.group('⚠️ React Query Mutation Error');
          console.error('Error:', error);
          if (error instanceof Error) {
            console.error('Message:', error.message);
            console.error('Stack:', error.stack);
          }
          console.groupEnd();
        }
      },
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

