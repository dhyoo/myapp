export function BottomFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-gray-800 border-t border-gray-700 z-40">
      <div className="h-full flex items-center justify-between px-6">
        <div className="text-xs text-gray-300">
          © 2024 <span className="text-primary-400">관리자 메뉴 시스템</span>. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          <div className="text-xs text-gray-300">
            Version <span className="text-primary-400">1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

