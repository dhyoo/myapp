import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConverterDashboard } from '@/features/nexacro-converter';

// Lazy loading for pages
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const UsersPage = lazy(() => import('@/pages/Users/UsersPage'));
const RolesPage = lazy(() => import('@/pages/Roles/RolesPage'));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로딩 중...</p>
      </div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/nexacro-converter" element={<ConverterDashboard />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Suspense>
  );
}


