import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from './shared/components/DashboardLayout'
import { ErrorBoundary } from './app/components/ErrorBoundary'
import { DataTable } from './shared/components/DataTable'
import { ConverterDashboard } from './features/nexacro-converter'
import { useActivities } from './shared/hooks/useActivities'
import { useDashboardStats } from './shared/hooks/useDashboardStats'
import { useUsers } from './shared/hooks/useUsers'
import { useRoles } from './shared/hooks/useRoles'
import './App.css'

// 디버깅: App.tsx 로드 확인
console.log('[DEBUG] App.tsx loaded');

function Dashboard() {
  const { activities, isDefaultData: isActivitiesDefault, isLoading: activitiesLoading, error: activitiesError } = useActivities();
  const { stats, isDefaultData: isStatsDefault, isLoading: statsLoading, error: statsError } = useDashboardStats();

  const formatChange = (change: string | undefined) => {
    if (!change) return null;
    // 백엔드에서 이미 포맷된 문자열을 반환 (예: "+12% from last month")
    const isPositive = change.includes('+') || (!change.includes('-') && parseFloat(change) >= 0);
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    return <span className={`text-xs ${color}`}>{change}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        {(isStatsDefault || isActivitiesDefault) && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-md">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xs font-medium text-yellow-800">기본 데이터 표시 중</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative">
          {isStatsDefault && !statsLoading && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">기본 데이터</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">총 사용자</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
          </div>
          {statsLoading ? (
            <p className="text-3xl font-bold text-gray-900 mb-1">...</p>
          ) : statsError || !stats ? (
            <p className="text-sm text-red-600">오류 발생</p>
          ) : (
            <>
              <p className="text-3xl font-bold text-gray-900 mb-1">{(stats.totalUsers || 0).toLocaleString()}</p>
              {formatChange(stats.totalUsersChange)}
            </>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative">
          {isStatsDefault && !statsLoading && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">기본 데이터</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">활성 세션</h3>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-xl">🟢</span>
            </div>
          </div>
          {statsLoading ? (
            <p className="text-3xl font-bold text-gray-900 mb-1">...</p>
          ) : statsError || !stats ? (
            <p className="text-sm text-red-600">오류 발생</p>
          ) : (
            <>
              <p className="text-3xl font-bold text-gray-900 mb-1">{(stats.activeSessions || 0).toLocaleString()}</p>
              {formatChange(stats.activeSessionsChange)}
            </>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative">
          {isStatsDefault && !statsLoading && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">기본 데이터</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">오늘 방문</h3>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
          </div>
          {statsLoading ? (
            <p className="text-3xl font-bold text-gray-900 mb-1">...</p>
          ) : statsError || !stats ? (
            <p className="text-sm text-red-600">오류 발생</p>
          ) : (
            <>
              <p className="text-3xl font-bold text-gray-900 mb-1">{(stats.todayVisits || 0).toLocaleString()}</p>
              {formatChange(stats.todayVisitsChange)}
            </>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        {isActivitiesDefault && !activitiesLoading && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-yellow-800 text-sm">현재 기본 데이터가 표시되고 있습니다. API 연결 후 실제 데이터로 업데이트됩니다.</p>
          </div>
        )}
        {activitiesError && !isActivitiesDefault && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">활동 로그를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        )}
        {activitiesLoading ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : (
          <DataTable
            title="최근 활동 로그"
            searchPlaceholder="사용자, 작업으로 검색..."
            data={activities}
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
        )}
      </div>
    </div>
  )
}

function Users() {
  const { users, isDefaultData, isLoading, error } = useUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
        {isDefaultData && !isLoading && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-md">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xs font-medium text-yellow-800">기본 데이터</span>
          </div>
        )}
      </div>
      {isDefaultData && !isLoading && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-yellow-800 text-sm">현재 기본 데이터가 표시되고 있습니다. API 연결 후 실제 데이터로 업데이트됩니다.</p>
        </div>
      )}
      {error && !isDefaultData && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">사용자 목록을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      )}
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      ) : (
        <DataTable
          title="사용자 목록"
          searchPlaceholder="이름, 이메일로 검색..."
          data={users}
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
      )}
    </div>
  )
}

function Roles() {
  const { roles, isDefaultData, isLoading, error } = useRoles();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">권한 관리</h1>
        {isDefaultData && !isLoading && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-md">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xs font-medium text-yellow-800">기본 데이터</span>
          </div>
        )}
      </div>
      {isDefaultData && !isLoading && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-yellow-800 text-sm">현재 기본 데이터가 표시되고 있습니다. API 연결 후 실제 데이터로 업데이트됩니다.</p>
        </div>
      )}
      {error && !isDefaultData && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">역할 목록을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      )}
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      ) : (
        <DataTable
          title="역할 목록"
          searchPlaceholder="역할명, 코드로 검색..."
          data={roles}
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
      )}
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
          <Route path="/nexacro-converter" element={<ConverterDashboard />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </DashboardLayout>
    </ErrorBoundary>
  )
}

export default App
