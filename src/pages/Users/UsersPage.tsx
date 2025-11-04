import { useUsers } from '@/shared/hooks/useUsers';
import { DataTable } from '@/shared/components/DataTable';

export default function UsersPage() {
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
  );
}


