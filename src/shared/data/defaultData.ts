import type { Activity, User, Role, DashboardStats } from '../types/common.types';

/**
 * 기본 활동 로그 데이터
 */
export const defaultActivities: Activity[] = [
  { id: 1, user: '홍길동', action: '새 사용자 등록', target: '김철수', time: '2분 전', type: 'create' },
  { id: 2, user: '이영희', action: '권한 수정', target: '일반 사용자', time: '15분 전', type: 'update' },
  { id: 3, user: '박민수', action: '사용자 삭제', target: '임시계정', time: '1시간 전', type: 'delete' },
  { id: 4, user: '정수진', action: '역할 생성', target: '에디터', time: '2시간 전', type: 'create' },
  { id: 5, user: '최동현', action: '권한 수정', target: '관리자', time: '3시간 전', type: 'update' },
  { id: 6, user: '강미영', action: '사용자 등록', target: '신규사용자', time: '5시간 전', type: 'create' },
  { id: 7, user: '윤태호', action: '권한 삭제', target: '게스트', time: '1일 전', type: 'delete' },
  { id: 8, user: '임소연', action: '사용자 수정', target: '기존사용자', time: '1일 전', type: 'update' },
];

/**
 * 기본 사용자 데이터
 */
export const defaultUsers: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: 'ADMIN', status: '활성', createdAt: '2024-01-15', lastLogin: '2024-11-03' },
  { id: 2, name: '김철수', email: 'kim@example.com', role: 'USER', status: '활성', createdAt: '2024-02-20', lastLogin: '2024-11-02' },
  { id: 3, name: '이영희', email: 'lee@example.com', role: 'USER', status: '활성', createdAt: '2024-03-10', lastLogin: '2024-11-01' },
  { id: 4, name: '박민수', email: 'park@example.com', role: 'MANAGER', status: '비활성', createdAt: '2024-04-05', lastLogin: '2024-10-28' },
  { id: 5, name: '정수진', email: 'jung@example.com', role: 'USER', status: '활성', createdAt: '2024-05-12', lastLogin: '2024-11-03' },
  { id: 6, name: '최동현', email: 'choi@example.com', role: 'ADMIN', status: '활성', createdAt: '2024-06-18', lastLogin: '2024-11-03' },
  { id: 7, name: '강미영', email: 'kang@example.com', role: 'USER', status: '활성', createdAt: '2024-07-22', lastLogin: '2024-11-02' },
  { id: 8, name: '윤태호', email: 'yoon@example.com', role: 'MANAGER', status: '활성', createdAt: '2024-08-30', lastLogin: '2024-11-01' },
  { id: 9, name: '임소연', email: 'lim@example.com', role: 'USER', status: '비활성', createdAt: '2024-09-15', lastLogin: '2024-10-25' },
  { id: 10, name: '한지훈', email: 'han@example.com', role: 'USER', status: '활성', createdAt: '2024-10-01', lastLogin: '2024-11-03' },
  { id: 11, name: '조현우', email: 'jo@example.com', role: 'ADMIN', status: '활성', createdAt: '2024-10-10', lastLogin: '2024-11-02' },
  { id: 12, name: '송지은', email: 'song@example.com', role: 'USER', status: '활성', createdAt: '2024-10-20', lastLogin: '2024-11-03' },
];

/**
 * 기본 역할 데이터
 */
export const defaultRoles: Role[] = [
  { id: 1, name: '시스템 관리자', code: 'ADMIN', description: '모든 권한을 가진 최고 관리자', userCount: 3, permissions: ['READ', 'WRITE', 'DELETE', 'ADMIN'], createdAt: '2024-01-01' },
  { id: 2, name: '일반 관리자', code: 'MANAGER', description: '일반 관리 권한을 가진 사용자', userCount: 5, permissions: ['READ', 'WRITE'], createdAt: '2024-01-05' },
  { id: 3, name: '일반 사용자', code: 'USER', description: '기본 읽기 권한만 가진 사용자', userCount: 24, permissions: ['READ'], createdAt: '2024-01-10' },
  { id: 4, name: '게스트', code: 'GUEST', description: '제한된 읽기 권한', userCount: 12, permissions: ['READ'], createdAt: '2024-02-01' },
  { id: 5, name: '에디터', code: 'EDITOR', description: '콘텐츠 편집 권한', userCount: 8, permissions: ['READ', 'WRITE'], createdAt: '2024-02-15' },
  { id: 6, name: '모더레이터', code: 'MODERATOR', description: '콘텐츠 관리 권한', userCount: 6, permissions: ['READ', 'WRITE', 'DELETE'], createdAt: '2024-03-01' },
];

/**
 * 기본 대시보드 통계 데이터
 */
export const defaultDashboardStats: DashboardStats = {
  totalUsers: 1234,
  activeSessions: 567,
  todayVisits: 89,
  totalUsersChange: '+12% from last month',
  activeSessionsChange: '+8% from last month',
  todayVisitsChange: '-3% from yesterday',
};

