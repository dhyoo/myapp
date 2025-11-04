// 공통 타입 정의
export type PermissionType = 'READ' | 'WRITE' | 'DELETE' | 'ADMIN';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp?: string;
}

