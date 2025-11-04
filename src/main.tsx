import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { QueryProvider } from './app/providers/QueryProvider.tsx'
import { ErrorBoundary } from './app/components/ErrorBoundary.tsx'

// 디버깅: 콘솔에 로그 출력
console.log('[DEBUG] main.tsx loaded', new Date().toISOString());

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

console.log('[DEBUG] Starting render...');
try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <QueryProvider>
            <App />
          </QueryProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  );
  console.log('[DEBUG] Render completed successfully');
} catch (error) {
  console.error('[ERROR] Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; background: white; min-height: 100vh;">
      <h1 style="color: red; font-size: 24px; margin-bottom: 16px;">렌더링 오류</h1>
      <p style="color: #333; margin-bottom: 8px;"><strong>에러 메시지:</strong> ${error instanceof Error ? error.message : '알 수 없는 오류'}</p>
      <pre style="background: #f0f0f0; padding: 10px; overflow: auto; border: 1px solid #ccc; border-radius: 4px;">${error instanceof Error ? error.stack : String(error)}</pre>
      <button onclick="window.location.reload()" style="margin-top: 16px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">새로고침</button>
    </div>
  `;
}
