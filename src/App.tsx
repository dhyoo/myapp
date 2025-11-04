import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from './shared/components/DashboardLayout'
import { ErrorBoundary } from './app/components/ErrorBoundary'
import { DataTable } from './shared/components/DataTable'
import './App.css'

function Dashboard() {
  const mockActivities = [
    { id: 1, user: '홍길동', action: '새 사용자 등록', target: '김철수', time: '2분 전', type: 'create' },
    { id: 2, user: '이영희', action: '권한 수정', target: '일반 사용자', time: '15분 전', type: 'update' },
    { id: 3, user: '박민수', action: '사용자 삭제', target: '임시계정', time: '1시간 전', type: 'delete' },
    { id: 4, user: '정수진', action: '역할 생성', target: '에디터', time: '2시간 전', type: 'create' },
    { id: 5, user: '최동현', action: '권한 수정', target: '관리자', time: '3시간 전', type: 'update' },
    { id: 6, user: '강미영', action: '사용자 등록', target: '신규사용자', time: '5시간 전', type: 'create' },
    { id: 7, user: '윤태호', action: '권한 삭제', target: '게스트', time: '1일 전', type: 'delete' },
    { id: 8, user: '임소연', action: '사용자 수정', target: '기존사용자', time: '1일 전', type: 'update' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">총 사용자</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">1,234</p>
          <p className="text-xs text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">활성 세션</h3>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-xl">🟢</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">567</p>
          <p className="text-xs text-green-600">+8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">오늘 방문</h3>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">89</p>
          <p className="text-xs text-red-600">-3% from yesterday</p>
        </div>
      </div>
      
      <div className="mb-6">
        <DataTable
          title="최근 활동 로그"
          searchPlaceholder="사용자, 작업으로 검색..."
          data={mockActivities}
          columns={[
            {
              key: 'id',
              label: 'ID',
              sortable: true,
            },
            {
              key: 'user',
              label: '사용자',
              sortable: true,
              render: (activity) => (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-semibold">
                    {activity.user.charAt(0)}
                  </div>
                  <span className="font-medium">{activity.user}</span>
                </div>
              ),
            },
            {
              key: 'action',
              label: '작업',
              sortable: true,
              render: (activity) => {
                const colors: Record<string, string> = {
                  create: 'text-green-600',
                  update: 'text-blue-600',
                  delete: 'text-red-600',
                };
                return (
                  <span className={`font-medium ${colors[activity.type] || 'text-gray-600'}`}>
                    {activity.action}
                  </span>
                );
              },
            },
            {
              key: 'target',
              label: '대상',
              sortable: true,
            },
            {
              key: 'time',
              label: '시간',
              sortable: true,
            },
          ]}
        />
      </div>
    </div>
  )
}

function Users() {
  const mockUsers = [
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">사용자 관리</h1>
      <DataTable
        title="사용자 목록"
        searchPlaceholder="이름, 이메일로 검색..."
        data={mockUsers}
        columns={[
          {
            key: 'id',
            label: 'ID',
            sortable: true,
          },
          {
            key: 'name',
            label: '이름',
            sortable: true,
            render: (user) => (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-semibold">
                  {user.name.charAt(0)}
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
            ),
          },
          {
            key: 'email',
            label: '이메일',
            sortable: true,
          },
          {
            key: 'role',
            label: '역할',
            sortable: true,
            render: (user) => {
              const colors: Record<string, string> = {
                ADMIN: 'bg-red-100 text-red-800',
                MANAGER: 'bg-blue-100 text-blue-800',
                USER: 'bg-gray-100 text-gray-800',
              };
              return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[user.role] || colors.USER}`}>
                  {user.role}
                </span>
              );
            },
          },
          {
            key: 'status',
            label: '상태',
            sortable: true,
            render: (user) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.status === '활성' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {user.status}
              </span>
            ),
          },
          {
            key: 'createdAt',
            label: '가입일',
            sortable: true,
          },
          {
            key: 'lastLogin',
            label: '최근 로그인',
            sortable: true,
          },
          {
            key: 'actions',
            label: '작업',
            render: () => (
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 text-xs text-primary-600 hover:text-primary-700 font-medium">
                  수정
                </button>
                <button className="px-2 py-1 text-xs text-red-600 hover:text-red-700 font-medium">
                  삭제
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

function Roles() {
  const mockRoles = [
    { id: 1, name: '시스템 관리자', code: 'ADMIN', description: '모든 권한을 가진 최고 관리자', userCount: 3, permissions: ['READ', 'WRITE', 'DELETE', 'ADMIN'], createdAt: '2024-01-01' },
    { id: 2, name: '일반 관리자', code: 'MANAGER', description: '일반 관리 권한을 가진 사용자', userCount: 5, permissions: ['READ', 'WRITE'], createdAt: '2024-01-05' },
    { id: 3, name: '일반 사용자', code: 'USER', description: '기본 읽기 권한만 가진 사용자', userCount: 24, permissions: ['READ'], createdAt: '2024-01-10' },
    { id: 4, name: '게스트', code: 'GUEST', description: '제한된 읽기 권한', userCount: 12, permissions: ['READ'], createdAt: '2024-02-01' },
    { id: 5, name: '에디터', code: 'EDITOR', description: '콘텐츠 편집 권한', userCount: 8, permissions: ['READ', 'WRITE'], createdAt: '2024-02-15' },
    { id: 6, name: '모더레이터', code: 'MODERATOR', description: '콘텐츠 관리 권한', userCount: 6, permissions: ['READ', 'WRITE', 'DELETE'], createdAt: '2024-03-01' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">권한 관리</h1>
      <DataTable
        title="역할 목록"
        searchPlaceholder="역할명, 코드로 검색..."
        data={mockRoles}
        columns={[
          {
            key: 'id',
            label: 'ID',
            sortable: true,
          },
          {
            key: 'name',
            label: '역할명',
            sortable: true,
            render: (role) => (
              <div>
                <div className="font-semibold text-gray-900">{role.name}</div>
                <div className="text-xs text-gray-500">{role.code}</div>
              </div>
            ),
          },
          {
            key: 'description',
            label: '설명',
            render: (role) => (
              <span className="text-sm text-gray-600">{role.description}</span>
            ),
          },
          {
            key: 'userCount',
            label: '사용자 수',
            sortable: true,
            render: (role) => (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {role.userCount}명
              </span>
            ),
          },
          {
            key: 'permissions',
            label: '권한',
            render: (role) => (
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((perm: string) => (
                  <span
                    key={perm}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            ),
          },
          {
            key: 'createdAt',
            label: '생성일',
            sortable: true,
          },
          {
            key: 'actions',
            label: '작업',
            render: () => (
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 text-xs text-primary-600 hover:text-primary-700 font-medium">
                  수정
                </button>
                <button className="px-2 py-1 text-xs text-red-600 hover:text-red-700 font-medium">
                  삭제
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold text-red-700 mb-2">애플리케이션 오류</h2>
          <p className="text-red-600">브라우저 콘솔(F12)을 확인하세요.</p>
        </div>
      </div>
    }>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </DashboardLayout>
    </ErrorBoundary>
  )
}

export default App
