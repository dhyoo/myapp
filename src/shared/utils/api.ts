import type { ApiResponse } from '@/shared/types/common.types';

// 백엔드 서버는 http://localhost:8080에서 실행
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        // 네트워크 오류나 404 등의 경우에도 기본 응답 반환
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: `API 호출 실패: ${response.status} ${response.statusText}`,
          },
        };
      }

      // 응답 본문 확인
      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      
      // 응답 본문 읽기
      const text = await response.text();
      
      // 빈 응답 체크
      if (!text || text.trim().length === 0) {
        console.error('API response is empty', {
          url: `${API_BASE_URL}${endpoint}`,
          status: response.status,
          contentType,
        });
        return {
          success: false,
          error: {
            code: 'EMPTY_RESPONSE',
            message: '서버에서 빈 응답을 반환했습니다.',
          },
        };
      }

      // JSON 파싱 시도
      if (isJson) {
        try {
          const data = JSON.parse(text);
          return data;
        } catch (parseError) {
          console.error('Failed to parse JSON response:', {
            error: parseError,
            url: `${API_BASE_URL}${endpoint}`,
            status: response.status,
            contentType,
            responseText: text.substring(0, 200), // 처음 200자만 로그
          });
          return {
            success: false,
            error: {
              code: 'PARSE_ERROR',
              message: `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : '알 수 없는 오류'}`,
            },
          };
        }
      } else {
        // JSON이 아닌 응답 (HTML, 텍스트 등)
        console.error('API returned non-JSON response:', {
          url: `${API_BASE_URL}${endpoint}`,
          status: response.status,
          contentType,
          responseText: text.substring(0, 500), // 처음 500자만 로그
        });
        return {
          success: false,
          error: {
            code: 'INVALID_CONTENT_TYPE',
            message: `서버가 JSON이 아닌 응답을 반환했습니다. (Content-Type: ${contentType})`,
          },
        };
      }
    } catch (error) {
      console.error('API call failed:', error);
      // 네트워크 오류 시에도 기본 응답 반환
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        },
      };
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();

