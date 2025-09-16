# 🗺️ 트립스케치(TripSketch)

여행을 스케치하듯 자유롭게 계획하고 공유할 수 있는 플랫폼, **트립스케치**(**TripSketch**)입니다.

---

## 📌 프로젝트 소개 (Overview)

> 사용자가 여행 일정을 생성하고, 장소를 검색·저장·관리하며, 나만의 여행 앨범까지 구성할 수 있는 통합 여행 플랫폼입니다.  
> 팀원 2명이서 기획부터 개발, 배포까지 모두 진행한 프로젝트 입니다.

#### 🌐 바로가기 : https://tripsketchers.github.io/tripsketch_front

#### 🗓️ 개발 기간 : 2025년 3월 12일 ~ 2025년 7월 15일

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
- AWS (백엔드, DB 배포)
- GitHub Pages (프론트 배포)
- Firebase (인증용 연동)

---

## ✨ 주요 기능 소개 (Features)

- 회원가입 및 로그인 (이메일, 소셜 로그인)
- 이메일 인증
- 여행 생성 기능 (여행 정보, 장소, 숙소 CRUD)
- 장소 검색 (Google Places API)
- 여행 계획표 장소 CRUD 기능
- 여행 앨범 사진 CRUD
- 여행 공유 기능
  

### 🖼 미리보기 (Preview)

| 회원가입 및 로그인 | 이메일 인증 |
|--------------------|-------------|
| ![signin](./assets/gif/signin.gif) | ![email-auth](./assets/gif/email-auth.gif) |

| 여행 생성 (여행 정보·장소·숙소 CRUD) | 장소 검색 (Google Places API) |
|-------------------------------------|-------------------------------|
| ![trip-create](./assets/gif/trip-create.gif) | ![place-search](./assets/gif/place-search.gif) |

| 여행 계획표 장소 CRUD | 여행 앨범 사진 CRUD |
|------------------------|---------------------|
| ![schedule](./assets/gif/schedule.gif) | ![album](./assets/gif/album.gif) |

| 여행 공유 기능 |  |
|----------------|--|
| ![share](./assets/gif/share.gif) |  |


---

## 👤 담당 역할 및 기여

### [공통]
- 주제 선정 및 기획 (타겟 사용자 정의, 주요 기능 도출)
- ERD, 메뉴 구조도, 프로토타입 설계 (erdcloud, Figma 활용)
- GitHub 협업 (이슈 관리, PR 리뷰, 커밋 컨벤션 합의)
- 주요 기능 테스트 및 버그 수정


### [가영]

- **회원 인증 및 보안 구현**  
  - 일반 로그인, 소셜 로그인(OAuth2), 이메일 인증 및 JWT 기반 인증 시스템 개발  
  - Spring Security 설정 및 `PrincipalUser` 커스터마이징

- **여행 생성 및 계획 기능 개발**  
  - 커스텀 Date Picker 제작 및 Google Places API 연동  
  - `TripContext` 기반 여행 상태 관리 구조 설계  
  - 06:00 ~ 다음날 6:00 시간대 기반 스케줄 정렬 및 겹침 방지 알고리즘 구현  
  - 드래그 기반 시간 조정 및 마커-스케줄 연동 기능 구현

- **프론트엔드 기능 및 UI 개발**  
  - 마이페이지, 프로필 수정, 여행 생성/계획 등 주요 페이지 UI 및 로직 구현  
  - Axios 기반 API 연동 및 사용자 인터랙션 기능 개발  
  - Emotion 기반 반응형 스타일 적용 및 전체 UI 통일

- **백엔드 및 API 구현**  
  - 여행 생성, 일정 저장, 마이페이지 데이터 조회 등 REST API 설계 및 개발  
  - JWT 인증 기반 요청 처리 및 DB 연동

- **배포 및 QA**  
  - 백엔드, DB: Railway를 통한 Spring Boot 애플리케이션 배포  
  - 프론트엔드: GitHub Pages를 통한 정적 웹사이트 배포  
  - 환경변수 및 CORS 설정, 배포 후 기능 테스트 및 UI 피드백 반영


### [정민]

- **데이터 처리 및 DB 연동**  
  - 여행지 정보 크롤링 및 MySQL DB 저장  
  - 메인 페이지 및 앨범 페이지 DB 연동

- **프론트엔드 기능 개발**  
  - 메인 페이지, 앨범 업로드 UI 구현  
  - 헤더 드롭다운 및 이미지 전환 효과 적용  
  - Firebase Storage 연동 이미지 업로드 기능 구현

- **백엔드 기능 및 인증 처리**  
  - 앨범 업로드 API 및 사용자별 Firebase 토큰 인증 처리  
  - 일정 생성 여부 확인 후 업로드 차단 로직 적용

- **여행 공유 기능 개발**  
  - URL 기반 여행 공유 기능 구현 및 접근 제어 처리

