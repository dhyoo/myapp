# 패키지 설치 가이드

## 필수 의존성

```bash
npm install @tanstack/react-query zustand react-router-dom
```

## 개발 의존성 (테스트)

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## 선택적 의존성

### Zustand Persist (로컬 스토리지 영구 저장)

```bash
npm install zustand
```

zustand 패키지에 persist 미들웨어가 포함되어 있습니다. `menuStore.ts`에서 persist 사용 시 주석을 해제하세요.

## package.json 예시

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.4.0",
    "react-router-dom": "^6.20.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "jsdom": "^23.0.0"
  }
}
```

