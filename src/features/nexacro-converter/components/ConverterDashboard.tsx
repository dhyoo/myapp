/**
 * 넥스크로 → React 변환기 대시보드
 */
import React, { useState } from 'react';
import { convertNexacroToReact } from '../utils/converter';
import { parseNexacroProject } from '../utils/parser';
import type { ConversionResult } from '../types/nexacro.types';

export const ConverterDashboard: React.FC = () => {
  const [xadlFiles, setXadlFiles] = useState<Record<string, string>>({});
  const [jsFiles, setJsFiles] = useState<Record<string, string>>({});
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleXADLFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: Record<string, string> = {};
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        newFiles[file.name] = content;
        setXadlFiles((prev) => ({ ...prev, ...newFiles }));
      };
      reader.readAsText(file);
    });
  };

  const handleJSFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: Record<string, string> = {};
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        newFiles[file.name] = content;
        setJsFiles((prev) => ({ ...prev, ...newFiles }));
      };
      reader.readAsText(file);
    });
  };

  const handleConvert = () => {
    setIsConverting(true);
    try {
      const project = parseNexacroProject(xadlFiles, jsFiles);
      const result = convertNexacroToReact(project);
      setConversionResult(result);
    } catch (error) {
      console.error('변환 오류:', error);
      setConversionResult({
        success: false,
        reactComponents: [],
        errors: [
          {
            message: error instanceof Error ? error.message : String(error),
          },
        ],
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = (component: { name: string; code: string }) => {
    const blob = new Blob([component.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${component.name}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          넥스크로 → React 변환기
        </h1>

        {/* 파일 업로드 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">프로젝트 파일 업로드</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                XADL 파일 (.xadl)
              </label>
              <input
                type="file"
                accept=".xadl,.xml"
                multiple
                onChange={handleXADLFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {Object.keys(xadlFiles).length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  업로드된 파일: {Object.keys(xadlFiles).join(', ')}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JavaScript 파일 (.js)
              </label>
              <input
                type="file"
                accept=".js"
                multiple
                onChange={handleJSFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {Object.keys(jsFiles).length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  업로드된 파일: {Object.keys(jsFiles).join(', ')}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={isConverting || (Object.keys(xadlFiles).length === 0 && Object.keys(jsFiles).length === 0)}
            className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isConverting ? '변환 중...' : '변환 시작'}
          </button>
        </div>

        {/* 변환 결과 섹션 */}
        {conversionResult && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">변환 결과</h2>

            {conversionResult.success ? (
              <div>
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    ✅ 변환이 성공적으로 완료되었습니다!
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    {conversionResult.reactComponents.length}개의 React 컴포넌트가 생성되었습니다.
                  </p>
                </div>

                <div className="space-y-4">
                  {conversionResult.reactComponents.map((component, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{component.name}</h3>
                          <p className="text-sm text-gray-500">{component.filePath}</p>
                        </div>
                        <button
                          onClick={() => handleDownload(component)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                        >
                          다운로드
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
                        <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                          {component.code}
                        </pre>
                      </div>

                      {component.dependencies.length > 0 && (
                        <div className="mt-3 text-sm text-gray-600">
                          <span className="font-medium">필요한 패키지:</span>{' '}
                          {component.dependencies.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium mb-2">❌ 변환 중 오류가 발생했습니다.</p>
                {conversionResult.errors && (
                  <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                    {conversionResult.errors.map((error, index) => (
                      <li key={index}>
                        {error.componentId && `[${error.componentId}] `}
                        {error.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {conversionResult.warnings && conversionResult.warnings.length > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium mb-2">⚠️ 경고</p>
                <ul className="list-disc list-inside text-yellow-600 text-sm space-y-1">
                  {conversionResult.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 사용 가이드 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">사용 가이드</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li>넥스크로 프로젝트의 XADL 파일과 JavaScript 파일을 업로드합니다.</li>
            <li>'변환 시작' 버튼을 클릭하여 변환을 시작합니다.</li>
            <li>변환된 React 컴포넌트 코드를 확인하고 다운로드합니다.</li>
            <li>다운로드한 파일을 React 프로젝트에 추가하고 필요한 패키지를 설치합니다.</li>
            <li>변환된 코드를 수정하여 프로젝트에 맞게 조정합니다.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

