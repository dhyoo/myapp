// 공통 타입 정의
export type PermissionType = 'READ' | 'WRITE' | 'DELETE' | 'ADMIN';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string; // 백엔드에서 사용하는 메시지 필드
  timestamp?: string;
  // 에러 처리용 (백엔드가 에러를 반환할 때)
  error?: {
    code: string;
    message: string;
  };
}

// Activity 타입
export interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'create' | 'update' | 'delete';
}

// User 타입
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
  status: '활성' | '비활성';
  createdAt: string;
  lastLogin: string;
}

// Role 타입
export interface Role {
  id: number;
  name: string;
  code: string;
  description: string;
  userCount: number;
  permissions: PermissionType[];
  createdAt: string;
}

// Dashboard Stats 타입 (백엔드 DTO에 맞춤)
export interface DashboardStats {
  totalUsers: number;
  activeSessions: number;
  todayVisits: number;
  totalUsersChange: string; // 백엔드에서 String으로 반환 (예: "+12% from last month")
  activeSessionsChange: string;
  todayVisitsChange: string;
}

