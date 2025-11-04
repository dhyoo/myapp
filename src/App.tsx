import { DashboardLayout } from './shared/components/DashboardLayout'
import { ErrorBoundary } from './app/components/ErrorBoundary'
import { AppRoutes } from './app/routes'
import './App.css'

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
        <AppRoutes />
      </DashboardLayout>
    </ErrorBoundary>
  )
}

export default App
