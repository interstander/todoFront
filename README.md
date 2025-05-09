# Todo List (Vite + React + TypeScript + Redux + Axios)

이 프로젝트는 Vite, React, TypeScript, Redux Toolkit, Axios, Bootstrap을 활용한 할 일(투두) 관리 웹앱입니다. 할 일 정보는 REST API 백엔드와 연동하여 관리합니다.

## 주요 기능

- 할 일 목록 조회 (GET /todos)
- 할 일 등록 (POST /todos)
- 할 일 완료/미완료 토글 (POST /todos/{id}/toggle)
- 할 일 생성일, 완료일 표시
- Bootstrap 기반 반응형 UI

## 기술 스택

- React + TypeScript
- Redux Toolkit
- Axios
- Bootstrap
- Vite

## 설치 및 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 추가하세요:

```
VITE_API_BASE_URL=http://localhost:8080
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 백엔드 서버 실행

- 백엔드 서버가 반드시 `VITE_API_BASE_URL`에 지정한 주소에서 실행 중이어야 합니다.
- 예시: `http://localhost:8080`

## REST API 명세 (예시)

- **할 일 목록 조회**
  - `GET /todos`
  - 응답 예시:
    ```json
    [
      {
        "id": 1,
        "title": "공부하기",
        "completed": false,
        "created_at": "2024-05-10T12:00:00Z",
        "completed_at": null
      }
    ]
    ```
- **할 일 등록**
  - `POST /todos`
  - 요청 예시: `{ "title": "새 할일" }`
  - 응답: 생성된 할일 객체
- **할 일 완료/미완료 토글**
  - `POST /todos/{id}/toggle`
  - 응답: 변경된 할일 객체

## 폴더 구조

```
src/
  api/axiosInstance.ts   # Axios 인스턴스
  store/
    store.ts             # Redux 스토어
    todoSlice.ts         # 할일 슬라이스
  hooks.ts               # useAppDispatch 커스텀 훅
  App.tsx                # 메인 컴포넌트
  App.css                # 스타일
```

## 기타

- `.env` 파일은 git에 올라가지 않도록 `.gitignore`에 포함되어 있습니다.
- CORS 등 네트워크 문제 발생 시 백엔드 서버의 CORS 설정을 확인하세요.

---

문의 및 개선 사항은 이슈로 남겨주세요!
