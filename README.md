# 🗺️ TripSketch

여행을 스케치하듯 자유롭게 계획하고 공유할 수 있는 플랫폼, **TripSketch**입니다.

---

## 📌 프로젝트 소개 (Overview)

> 사용자가 여행 일정을 직접 생성하고, 장소를 검색·저장·관리하며, 나만의 여행 앨범까지 구성할 수 있는 여행 플랫폼입니다.

- 일정표 기반 여행 계획 기능
- 장소 추천 및 검색 (Google Places API)
- 장소보관함, 숙소, 앨범 기능 제공
- 소셜 및 이메일 회원가입, 인증 기능

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- React
- Emotion
- React Router
- Axios
- React Query

### Backend
- Spring Boot
- Spring Security
- JWT, OAuth2 (Google, Kakao, Naver)
- MySQL (MariaDB)

### DevOps & Tools
- Git, GitHub
- Railway (배포)
- GitHub Pages (프론트 배포)
- Firebase (인증용 연동)

---

## 📁 프로젝트 구조 (Project Structure)

```

trip-sketch/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── src/main/java/com/sketchers/tripsketch_back/
│   ├── resources/
│   └── ...
│
└── README.md

````

> 각 디렉토리 및 주요 파일 설명은 추후 상세히 작성 예정

---

## ✨ 주요 기능 소개 (Features)

- ✅ 회원가입 및 로그인 (이메일, 소셜 로그인)
- ✅ 이메일 인증
- ✅ 비밀번호 검증 및 변경
- ✅ 여행 생성 및 일정표 기능
- ✅ 장소 검색 (Google Places API)
- ✅ 장소 보관함 및 숙소 선택
- ✅ 여행 앨범 생성 및 사진 업로드
- ✅ 마이페이지 기능

---

## 🚀 배포 (Deployment)

| 구분       | 도구                | 주소                                                                                                             |
| -------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Frontend | GitHub Pages      | [https://tripsketchers.github.io/tripsketch_front](https://tripsketchers.github.io/tripsketch_front)          |
| Backend  | Railway           | [https://tripsketchback-production-a057.up.railway.app](https://tripsketchback-production-a057.up.railway.app) |
| Database | Railway (MariaDB) | (관리 콘솔 링크)                                                                                                     |

---

## 🔌 API 명세 (API Docs)

> 주요 엔드포인트 목록 및 인증 흐름은 Postman / Swagger 문서로 제공 예정

* `GET /api/account/principal`
* `POST /api/trip/create`
* `POST /api/auth/email`
* ...

---

## 🖼 UI 미리보기 (Screenshots)

| 기능       | 미리보기                                           |
| -------- | ---------------------------------------------- |
| 여행 생성 화면 | ![TripCreate](./screenshots/trip-create.png)   |
| 장소 검색    | ![PlaceSearch](./screenshots/place-search.png) |
| 앨범 관리    | ![Album](./screenshots/album.png)              |

---

## 🤝 기여 방법 (Contributing)

1. `gh-pages` 브랜치 → 배포용, `local` 브랜치 → 개발용
2. 커밋 메시지 컨벤션

   * `feat: 기능 추가`
   * `fix: 버그 수정`
   * `style: 스타일 수정`
3. PR 작성 시 템플릿 활용

---

## 🛠 트러블슈팅 (Troubleshooting)

| 문제               | 원인         | 해결 방법                                     |
| ---------------- | ---------- | ----------------------------------------- |
| 403 오류           | CORS 설정 누락 | Spring Security의 `CorsConfiguration` 추가   |
| 구글 지도 사진 불러오기 안됨 | API 버전 변경  | `photo_reference` 경로 수정, Places API v1 적용 |


