# Handoff: 뉴젠리더십학교 웹사이트

## Overview
전남 여수의 기독교 대안학교 **뉴젠리더십학교**의 공식 웹사이트입니다. 목적은 세 가지입니다(PRD 기준).
1. 홍보: 학교에 대한 신뢰 쌓기
2. 정보 게시: 학사일정, 입학, 생활 규정을 언제든 볼 수 있게
3. 상담 연결: 모든 페이지에서 카카오톡 상담 한 곳으로 모으기

메뉴는 Home / About / Academics / FAQ 4개이고, 푸터에서 개인정보처리방침과 이용약관으로 연결됩니다.
별도의 Admissions 페이지는 없습니다. 입학 정보는 FAQ 1번 카테고리에 들어 있습니다.

자세한 요구사항은 `docs/newgen_prd.pdf`(PRD · 기능정의서 · 정책정의서 v1.1)를 참고하세요.

## ⚠ 최신 변경사항 (아래 본문보다 우선)
본문 스펙 작성 이후 바뀐 내용입니다. **`design/Newgen Site.dc.html`이 최종 기준**이며, 본문과 다르면 이 파일을 따르세요.

- **브랜드 남색 #04215F** (로고에서 추출)
  - 헤더 네비 활성 상태: 글자 #04215F, 배경 rgba(4,33,95,0.08)
  - "입학 상담은 카카오톡으로" 띠 배경: #04215F
  - 설명 문구 2줄(문장마다 `<br>`, 좌측 정렬): "입학은 별도의 복잡한 시험 없이, 편안한 대면 상담을 통해 진행됩니다." / "먼저 편하게 상담을 신청해 주세요." (16px/1.7, rgba(255,255,255,0.78))
- **About 인재상:** 카드가 아니라 **4개 원이 이어진 도식**으로 바꿨습니다. 참고 원본은 `docs/talent-reference.png`입니다.
  - SVG, `viewBox="-35 -10 1070 320"`
  - 원 중심 x = 125 / 375 / 625 / 875, cy = 150, r = 135, stroke-width 50
  - 색: #F7931E(영성), #5BAA3C(품성), #2E9B72(지혜), #2A6DB3(지성)
  - 원은 완전히 닫지 않습니다. 인접 원 쪽에 호가 끊기고, 끝을 `stroke-linecap: round`로 둥글게 마감합니다. 끊기는 각도는 `acos(125/135)` 기준입니다.
  - 겹친 부분은 `mix-blend-mode: multiply`로 진하게 보입니다.
  - 원 안 아이콘: `assets/talent-1~4.png`(원본에서 잘라내 배경 제거). 폭 11.6%, 원 중심에 절대배치. ⚠ 벡터 원본이 오면 교체
  - 아래 텍스트: 4열 grid, 좌우 padding 3.27%(원 중심과 맞춤), 이름 clamp(18px, 2.6vw, 28px)/700, 설명 clamp(13px, 1.7vw, 18px), 가운데 정렬
- **About 연혁:** 실제 데이터를 넣었습니다. 연도 5칸 타임라인 구조는 같습니다. 각 연도 아래 날짜(MM.DD, 13px 회색)와 내용(15px)을 목록으로 둡니다.
  - 2018: 01.15 여수꿈의학교 설립 / 02.01 정풍기 1대 교장 취임
  - 2021: 05.01 정재천 2대 교장 취임
  - 2022: 03.02 뉴젠리더십학교로 명칭 변경 / 07.18 전라남도교육청 대안교육기관 등록
  - 2025: 02.01 정재천 3대 교장 연임
  - 2026: 07.01 전남광주통합특별시교육청 소관으로 변경
- **학사달력:** 이미지가 아니라 **HTML 달력**입니다. 원본은 `docs/calendar-2026.png`, 데이터는 스크립트의 `CAL` 배열에 있습니다.
  - 상단 요약: 1학기 99일, 여름계절학기 10일, 2학기 80일, 겨울계절학기 24일, 연간 213일(마지막 칸만 강조)
  - 월 페이지네이션: 3월~2월 버튼(선택 시 #3366FF 배경, 흰 글자)과 이전/다음 버튼. 기본값은 오늘이 속한 달입니다.
  - 달력 칸: 7열, 칸 높이 44px
    - 일요일·공휴일·휴업일: 빨강(--status-negative)
    - 토요일: 파랑
    - 일정 있는 날: 파란 점 + 옅은 파란 배경
  - 달력 옆 일정 목록: 날짜 120px + 내용. 공휴일 날짜는 빨강. 목록 위아래 모두 1px 선
  - ⚠ 원본 확인 필요: 6월 "29(금) 개교기념일"(29일은 월요일), 5/4 재량휴업일 표시 색
- **Home 학사일정 블록:** 배너 대신 "이번 달 학사일정" 블록입니다.
  - 좌측: 월 제목, 수업일수, [전체 학사달력 보기] → /academics#calendar
  - 우측: 이번 달 일정 목록. 오늘 날짜 기준으로 자동 선택되고, 달력과 같은 데이터를 씁니다.
- **Academics 탭:** 디자인 시스템 Chip 부품 대신 직접 만든 버튼입니다(글자 넘침 문제 해결). 높이 36px, radius 10px, nowrap
  - 활성: #EAF2FE 배경, #9EC5FF 선, #3366FF 글자
- **SNS 링크**(새 창, `rel="noopener noreferrer"`)
  - 인스타그램: http://instagram.com/newgenschool_official?igsh=dHY1ZGt1ZXM5eTkw
  - 유튜브: https://youtube.com/channel/UCnk9oSUMU0W9-8BO0l-OQVQ?si=0UBazp44MWKknC8B
  - 블로그: https://blog.naver.com/newgenleadership
- **카카오 채널:** http://pf.kakao.com/_xjWxhrX (모든 카카오 버튼, 새 창). 플로팅 버튼은 원형
- **히어로:** fullbleed 슬라이드(hero-1, hero-2). ⚠ 저해상도라 원본 필요

## About the Design Files
`design/` 안의 파일은 **HTML로 만든 디자인 레퍼런스**입니다. 의도한 모양과 동작을 보여주는 프로토타입이며, 그대로 배포할 코드가 아닙니다.
작업은 이 디자인을 **실제 프로젝트 환경에서 새로 구현**하는 것입니다.
- 기존 코드베이스가 있으면 그 프레임워크와 패턴을 따릅니다.
- 없으면 적합한 스택을 고릅니다. 권장: 정적 사이트(Next.js SSG / Astro 등)와 반응형 CSS. CMS는 이번 범위가 아닙니다.

`design/Newgen Site.dc.html`을 브라우저로 열면 동작하는 프로토타입을 볼 수 있습니다. 로컬 서버가 필요합니다(`npx serve design` 등).
- 이 파일은 사내 디자인 도구 형식(`<x-dc>`, `sc-if`, `sc-for`, `{{ }}` 바인딩)으로 되어 있습니다.
- 마크업의 인라인 스타일에 정확한 수치가 있고, 하단 `<script data-dc-script>`에 데이터와 상태 로직이 있습니다.

## Fidelity
**High-fidelity.** 색상, 타이포, 간격, 인터랙션이 확정된 시안입니다. 아래 수치대로 픽셀 단위로 재현하세요.
디자인 시스템은 **Wanted Design System**(Pretendard 폰트, 토큰 기반)을 사용했습니다. 토큰 값은 아래 Design Tokens에 풀어 두었습니다.

---

## 전역 레이아웃
- 콘텐츠 최대 폭 **1120px**, 가운데 정렬, 좌우 패딩 **24px**
- 본문 폰트: `"Pretendard JP", Pretendard, -apple-system, sans-serif`
- 전역: `word-break: keep-all; overflow-wrap: break-word` (한글 단어 중간에서 줄바꿈 금지)
- `button:focus-visible, a:focus-visible` → `outline: 2px solid #3366FF; outline-offset: 3px; border-radius: 6px`
- `prefers-reduced-motion: reduce`이면 모든 transition, 부드러운 스크롤, 슬라이드 자동재생을 끕니다.
- 클릭 가능한 요소는 전부 `<button type="button">` 또는 `<a>`로 만듭니다.

### Header (sticky, 모든 페이지)
- `position: sticky; top: 0; z-index: 20`, 배경 #fff, 하단 1px 선 `rgba(112,115,124,0.16)`
- 높이 64px, `justify-content: space-between`
- 좌측 로고: `assets/logo-horizontal.png`
  - 원본 1795×422, 아래쪽에 여백이 있습니다.
  - 높이 48px로 렌더링하고 `margin-top: -4px`, 컨테이너 높이 36px + `overflow: hidden`으로 잘라 씁니다. 실제 구현 시 여백을 잘라낸 파일로 대체해도 됩니다.
  - 클릭하면 Home으로 이동, `aria-label="뉴젠리더십학교 홈"`
- 우측 네비: Home / About / Academics / FAQ
  - 기본: 15px/600, padding 8px 12px, radius 8px, 글자색 `rgba(46,47,51,0.88)`
  - 활성: 글자색 #3366FF, 배경 #EAF2FE, `aria-current="page"`
  - hover: 배경 `rgba(112,115,124,0.08)`
  - 좁은 화면에서는 `overflow-x: auto`로 가로 스크롤

### 입학 상담 띠 (모든 페이지의 main 맨 아래)
- 화면 폭 전체, 배경 #1B1C1E, `margin-top: 96px`, 안쪽 padding 56px 24px
- 좌측 텍스트
  - "입학 상담은 카카오톡으로" 26px/700, #fff
  - "학교 방문 일정과 입학 절차를 안내해 드립니다. 전화 061-686-3707" 16px, `rgba(255,255,255,0.78)`
- 우측 카카오 버튼: 높이 52px, padding 0 24px, radius 12px, 배경 #FEE500, 글자색 #191919, 16px/700, 카카오 로고 아이콘 20px + "상담 연결하기"

### Footer
- 배경 #F7F7F8, padding 96px 24px 72px, 윗단과 아랫단 사이 간격 72px
- 윗단(`flex-wrap`, gap 64px) 3열
  1. 엠블럼 `assets/logo-emblem.png` 48×48(투명 배경) + "뉴젠리더십학교" 17px/700, 그 아래(gap 20px) 주소 "전남 여수시 망마로 30 5F" 14px, `rgba(55,56,60,0.61)`
  2. "CONTACT" 13px/700, letter-spacing 0.04em, 항목 간격 12px
     - "Phone. 061-686-3707" (`tel:0616863707` 링크)
     - "카카오 상담. @newgenleader"
  3. SNS 아이콘 버튼 3개(인스타그램, 유튜브, 네이버 블로그): 40×40, radius 8px, 배경 #fff, 1px 안쪽 선, 아이콘 20px. **링크 URL 입력 필요**
- 아랫단: 위쪽 1px 구분선 + padding-top 40px, 13px
  - 좌측: "개인정보처리방침" · "이용약관" 버튼(간격 16px)
    - 기본 400, `rgba(46,47,51,0.88)`
    - hover 시 700 + #171717
  - 우측: "© Newgen Leadership School"

### 카카오톡 플로팅 버튼 (모든 페이지)
- `position: fixed; right: 20px; bottom: 20px; z-index: 30`
- 확정 스타일은 **원형**입니다: 60×60, 배경 #FEE500, 카카오 로고 28px, `box-shadow: 0 4px 16px rgba(0,0,0,0.12)`, `aria-label="카카오톡 상담"`
- 대안(프로토타입에 남아 있음): 알약형. 높이 56px, radius 999px, 로고 24px + "카카오톡 상담" 15px/700
- **모든 카카오 버튼은 `http://pf.kakao.com/_xjWxhrX`를 새 창(`noopener`)으로 엽니다.**

---

## Screens / Views

### 1. Home

**히어로.** 확정 스타일은 "fullbleed"입니다. 대안인 "split"도 프로토타입에 있습니다.

Fullbleed
- section 높이 `min(640px, 82vh)`, `min-height: 480px`, 배경 #292A2D
- 배경 슬라이드
  - `assets/hero-1.png`, `assets/hero-2.png`
  - 가로로 이어 붙인 뒤 `translateX(-N*100%)`로 넘기고, transition 0.6s ease
  - 5초마다 자동 넘김. 이전/다음 버튼을 누르면 자동재생이 멈추고, reduced-motion이면 자동재생하지 않습니다.
  - `role="region" aria-roledescription="carousel" aria-label="학교 활동 사진"`
  - 각 슬라이드는 `role="img"` + aria-label(대체텍스트)
  - ⚠ 현재 이미지는 258px / 312px 저해상도입니다. **원본(가로 1920px 이상)으로 교체 필요**
- 스크림: `linear-gradient(90deg, rgba(23,23,25,0.7), rgba(23,23,25,0.15) 70%)`
- 텍스트(세로 가운데, gap 22px)
  - 상단 "전남 여수 · 기독교 대안학교" 15px/600, `rgba(255,255,255,0.86)`
  - H1 "천권독서로 '꿈'과 '꿈너머꿈'을 꾸는 교육 공동체"
    - `font-size: clamp(22px, 6vw, 44px)`, line-height 1.3, 700, letter-spacing -0.03em, #fff
    - **줄바꿈 규칙:** 넓으면 한 줄. 좁아지면 반드시 `천권독서로 '꿈'과 '꿈너머꿈'을` / `꾸는 교육 공동체`에서만 끊습니다. 두 덩어리를 각각 `white-space: nowrap` span으로 감쌉니다.
  - 설명 "'꿈'과 '꿈너머꿈'을 실현하여 소금과 빛이 되는 인재를 양성합니다." 18px/1.65, `rgba(255,255,255,0.9)`, max-width 560px
  - 버튼 2개(gap 12px)
    - [카카오톡 입학 상담]: #FEE500, 높이 48px, padding 0 22px, radius 12px, 16px/600, 카카오 아이콘 20px
    - [교육과정 보기]: #fff 배경, 동일 크기 → Academics로 이동
- 슬라이드 컨트롤: 하단 28px, 콘텐츠 폭 좌측 정렬
  - 이전/다음 원형 버튼 40×40, 배경 `rgba(23,23,25,0.52)`, chevron 20px, #fff
  - 가운데 "1 / 2" 14px/600 #fff, `aria-live="polite"`

Split (대안)
- 배경 #F7F7F8, padding 72px 24px 80px, 2열 grid(`minmax(min(100%,360px),1fr)`, gap 48px)
- 좌측: 텍스트. H1 크기 `clamp(22px, 6vw, 40px)`
- 우측: 사진 콜라주. grid `3fr 2fr`, gap 12px
  - 큰 사진(3:4, 2행 차지) "천권독서 토론로그"
  - 작은 정사각 2개 "K-리더십 · 이순신 장군 프로젝트", "온마을활동"
  - 사진 radius 16px, 캡션 13px/600 회색

**우리가 기르는 사람 (인재상).** padding-top 88px
- 제목 "우리가 기르는 사람" 28px/700, line-height 1.4, letter-spacing -0.024em
- 우측 텍스트 링크 "학교 소개 >" 15px/600 회색 → About
- 윗선 2px #171717 아래 4열 grid
  - 각 칸 padding 24px 0 8px
  - 이름 30px/700 + 설명 16px/1.6
  - 영성 – 경건의 능력을 발휘하는 사람
  - 품성 – 예수님의 마음을 품은 사람
  - 지혜 – 하나님을 경외하는 사람
  - 지성 – 성경적인 가치관을 가진 사람
- **아이콘, 카드 없음**(의도한 결정)

**중점활동 4-UM.** padding-top 88px
- 소제목 "중점활동 4-UM" 15px/600 #3366FF, 제목 "배움 · 키움 · 채움 · 나눔" 28px/700
- 우측 "교육과정 운영 >" → Academics #operation
- 4행 목록. 각 행: 윗선 1px, padding 22px 0
  - 좌측(200px 고정): "배움영역" 20px/700 + "탐구중심" 14px 회색
  - 우측: 활동을 " · "로 이어 16px/1.7로 표시

**학사달력 배너.** padding-top 56px
- 배경 #F7F7F8, radius 12px, padding 24px 28px
- 좌측 "2026학년도 학사달력" 18px/700 + "월별 학사 일정을 확인할 수 있습니다." 15px
- 우측 [학사달력 보기] outlined 버튼(md) → Academics #calendar

**자주 묻는 질문 (3개).** padding-top 88px
- 제목 28px/700 + 우측 "전체 보기 >" → FAQ
- 윗선 2px, 아코디언 3개(FAQ 1-1, 2-1, 3-1). 스펙은 FAQ 페이지와 동일

### 2. About
- 페이지 헤더
  - H1 "학교 소개" `clamp(30px,4vw,40px)`/700
  - 설명 18px 회색 "뉴젠리더십스쿨이 걸어온 길과 세우고자 하는 사람을 소개합니다."
- **연혁** `#history`
  - H2 24px/700
  - 5열 grid(`repeat(5, minmax(0,1fr))`, `min-width: 720px`, 좁으면 가로 스크롤)
  - 윗선 2px #171717, 각 연도 위에 12px 파란 점(#3366FF, 흰 4px 링)
  - 2015 / 2018 / 2019 / 2020 / 2021 (26px/700)
  - 설명 15px. ⚠ 현재 "연혁 내용 입력 예정", **실제 연혁 필요**
- **Mission 띠**
  - 전체 폭, 배경 #3366FF, margin-top 88px, padding 64px 24px
  - "Mission" 15px/600 #fff
  - "천권독서로 '꿈'과 '꿈너머꿈'을 꾸는 교육 공동체" `clamp(26px,3.4vw,34px)`/700 #fff
- **인재상**
  - 2열 grid(`minmax(min(100%,420px),1fr)`, gap 12px)
  - 칸: radius 12px, 1px 안쪽 선, padding 28px
  - 이름 32px/700 #3366FF + 설명 17px (가로 배치, baseline 정렬)
- **Vision 띠**
  - 전체 폭, 배경 #F7F7F8, padding 72px 24px, 2열
  - 좌측: "Vision" + "'꿈'과 '꿈너머꿈'을 실현하여 소금과 빛이 되는 인재 양성" 28px/700
  - 우측: `<blockquote>` 좌측 2px 선, 마태복음 5:13~16 전문 16px/1.9, `<cite>` "마태복음 5장 13~16절" 14px/600
- **교장 인사말** `#leadership`
  - padding-top 112px. H2 "교장 인사말"은 **화면에서 숨기고 스크린리더에만 노출**(sr-only)
  - 2열 grid(`minmax(min(100%,320px),1fr)`, gap 48px)
  - 좌측 열(세로 gap 40px)
    - 사진 `assets/principal.jpg`: 4:5, max-width 400px, `object-fit: cover; object-position: 52% 20%`, radius 16px
    - 이름 줄: "정재천" 33px/700, letter-spacing -0.02em + (gap 20px) "교장" 21px/600 회색, baseline 정렬
    - 프로필 목록 `<ul>`: max-width 400px, 윗선 1px, `margin-top: -8px; padding-top: 26px`, 항목 간격 12px, 15px/1.6
      - 미국 버지니아워싱턴대학교 겸임교수
      - 전) 광주여자대학교 상담심리학과 겸임교수
      - 전) 경기대학교 예술대학원 독서지도 전공 강사
      - 재단법인 여수교육재단 상임이사
      - 사단법인 한국대안교육기관연합회 이사
  - 우측 열(gap 20px)
    - 제목 "새로운 시대, 새로운 세대를 세우는 / 뉴젠리더십학교에 오신 것을 환영합니다." 24px/700
      - 두 덩어리를 각각 `display: inline-block`으로 감싸, 이 위치에서만 줄바꿈되게 합니다.
    - 본문 16px/1.85: 인사말 전문. 접기 없이 전체 노출. 원문은 프로토타입 참고
      - 성결 · 성실 · 성품 세 문단은 간격 8px로 묶고, 단어만 `<strong>`
    - 맺음 "축복합니다." 600

### 3. Academics
- 페이지 헤더
  - H1 "교육과정"
  - 설명 "독서와 체험, 실천과 참여로 이어지는 뉴젠리더십스쿨의 배움을 소개합니다."
- **섹션 탭 바**
  - `position: sticky; top: 64px; z-index: 10`, 배경 #fff, 위아래 1px 선
  - 탭: 창의지성 교육과정 / 교육과정 운영 / K-리더십 / 학사달력
  - 탭 스펙: 높이 36px, padding 0 14px, radius 10px, 15px/600, `white-space: nowrap`, 가로 스크롤
    - 기본: 흰 배경, 1px 선 `rgba(112,115,124,0.22)`, 회색 글자
    - 활성: 배경 #EAF2FE, 선 #9EC5FF, 글자 #3366FF
  - 클릭하면 해당 섹션으로 스크롤합니다(오프셋 130px, smooth).
- **창의지성 교육과정 `#creative`**
  - 소제목 + H2 "4-텍스트" 28px
  - 2열
    - 좌: 4-텍스트 다이어그램 이미지(4:3, radius 12, contain) + 태그 5개(Text Reading, Thinking, Discussion, Writing / Creating, Presentation). 태그: 14px, radius 6, 배경 `rgba(112,115,124,0.08)`
    - 우: 워크시트 구조도 이미지 + "독서와 체험의 의미를 되새기는 새 교육과정" 18px/700 + "고전 관련 주제별 정보 탐색 워크시트"
  - ⚠ 이미지 2장 필요
- **교육과정 운영 `#operation`**
  - 기본방향: 번호 목록 2열. 각 행: 윗선 1px, 번호 15px/700 파랑(폭 28px) + 제목 18px/700 + 설명 15px
    - 01 진로적성 맞춤형 교육과정 재구성
    - 02 수업(배움중심수업)
    - 03 평가(질적 · 과정 중심 평가)
    - 04 기록(포트폴리오)
  - 중점활동 4-UM 인터랙티브(margin-top 88px)
    - 좌측: 2×2 버튼 grid(정사각, max 440px, gap 8px)
      - 각 타일은 가운데 쪽 모서리만 radius 12px, 바깥 모서리는 96px(원형 다이어그램 형태). 순서: 좌상 `96 12 12 12`, 우상 `12 96 12 12`, 좌하 `12 12 12 96`, 우하 `12 12 96 12`
      - 기본: 배경 #F7F7F8, 글자 #171717
      - 선택: 배경 #3366FF, 글자 #fff, `aria-pressed`
      - 타일 텍스트: 영역명 24px/700 + 유형 13px/600
      - 가운데에 104px 흰 원 "중점활동 / 4-UM"(장식, `aria-hidden`)
    - 우측(`aria-live="polite"`): 선택 영역 유형 15px 파랑 + 영역명 28px/700 + 활동 4개 목록(각 17px/500, 위아래 1px 선, padding 15px 0)
    - 기본 선택: 배움영역
- **K-리더십 `#kleader`**
  - 2열: 좌 로고 패널(#F7F7F8, radius 12, 200×200 로고 이미지), 우 번호 목록 "01 이순신 장군 프로젝트", "02 손양원 목사 프로젝트" 22px/700
  - 아래 활동사진 4장(4:3, radius 12). 4열 → 2열 → 1열
  - ⚠ 로고, 사진 필요
- **학사달력 `#calendar`**
  - radius 12 테두리 박스 안에 달력 이미지(3:4, max-width 760px, contain)
  - ⚠ 이미지 필요

### 4. FAQ
- 페이지 헤더
  - H1 "자주 묻는 질문"
  - 설명 "입학 절차부터 학교생활까지, 가장 많이 묻는 질문을 모았습니다."
- **입학 절차 패널**
  - 배경 #F7F7F8, radius 12, padding 28px
  - H2 "입학 절차" 20px + 우측 "정기 모집 외에도 결원 시 수시 편입학을 진행합니다." 14px
  - 4단계 `<ol>`(4열 → 2열 → 1열). 각 단계: 윗선 2px #3366FF, 번호 14px/700 파랑 + 제목 17px/700
    - 01 입학 상담 신청
    - 02 원서 및 서류 제출
    - 03 학생 · 학부모 면접
    - 04 입학 결정 및 등록
- **본문**
  - 좌측 카테고리 네비: sticky top 88px, 폭 200~240px
    - 버튼 15px/600, padding 9px 12px, radius 8
    - 활성: #3366FF + #EAF2FE 배경. 클릭하면 해당 카테고리로 스크롤
  - 우측: 7개 카테고리 섹션(gap 48px)
    - 섹션 제목 "N. 제목" 20px/700 + 하단 2px 선
  - 아코디언 항목
    - 질문 버튼: 17px/600, padding 18px 0, 우측 chevron 20px(열림: 위, 닫힘: 아래), `aria-expanded`
    - 답변: 16px/1.75, padding 0 40px 22px 0
    - 항목 사이 1px 선
    - 기본으로 1-1만 열림
  - 마지막: "찾는 답이 없으신가요?" 박스(radius 12, 1px 선) + [카카오톡 문의] 버튼(높이 44px)
- 카테고리
  1. 입학 및 전형
  2. 학력 인정
  3. 진학 · 진로
  4. 일반 학교 비교
  5. 학교생활 · 학적
  6. 전자기기 규정
  7. 급식 · 통학
- 질문과 답변 원문은 프로토타입 스크립트의 `FAQ` 배열에 있습니다. ⚠ **답변은 캡쳐 기반 초안이라 학교 원문과 대조 필요**

### 5. 개인정보처리방침 / 6. 이용약관
- `<article>` max-width 760px, padding-top 64px, 섹션 간격 36px
- H1 32px/700, 섹션 H2 19px/700, 본문 16px/1.8
- "입력 필요" 표시: 배경 `rgba(112,115,124,0.16)`, padding 1px 6px, radius 4px, 600
- 개인정보처리방침 내용(정책정의서 기준)
  - 홈페이지 자체 수집 없음
  - 상담은 카카오톡 채널
  - 자동수집 정보는 호스팅 결정 후
  - 학생 사진은 보호자 동의
  - 보호책임자
- 이용약관 내용
  - 목적
  - 저작권
  - 게시 정보 변경
  - 외부 서비스
  - 운영자 정보
- 실제 구현 시 `/privacy`, `/terms` 경로로 만듭니다.

---

## Interactions & Behavior
- **라우팅:** 프로토타입은 상태로 페이지를 바꾸고 localStorage(`ng-page`)에 기억합니다. 실제 구현은 URL 라우팅을 씁니다.
  - `/` `/about` `/academics` `/faq` `/privacy` `/terms`
  - 섹션 앵커: `/academics#operation`, `/academics#calendar`
  - 페이지를 바꾸면 스크롤을 맨 위로 올립니다.
- **앵커 스크롤:** 대상 위치에서 130px 위로 스크롤합니다(sticky 헤더 64px + 탭 바 고려). smooth, reduced-motion이면 즉시 이동.
  - `scroll-margin-top`: Academics 섹션 130px, FAQ 카테고리 88px
- **슬라이드:** 위 히어로 스펙 참고. 슬라이드가 2장이 넘어도 같은 로직입니다.
- **4-UM 선택:** 단일 선택, 기본 0번(배움). 배경 전환 0.15s.
- **아코디언:** 항목마다 따로 토글합니다(여러 개 동시에 열림 가능).
- **hover:**
  - 네비·카테고리·탭 버튼: 배경 `rgba(112,115,124,0.05~0.08)`
  - 푸터 법적 링크: 굵게 + 진하게
- **반응형:** 모든 grid는 `auto-fit` + `minmax(min(100%, Xpx), 1fr)` 패턴입니다. 4개짜리 목록은 **4 → 2 → 1열**로만 나뉘고 3+1은 금지입니다.
  - 기준: 폭 688px 이하면 2열, 420px 이하면 1열
  - 프로토타입 식: `repeat(auto-fit, minmax(max(calc(25% - 12px), min(calc(50% - 8px), calc((688px - 100%) * 999)), min(100%, calc((420px - 100%) * 999))), 1fr))`
  - 미디어쿼리로 구현해도 됩니다.

## State
- `page`: home | about | academics | faq | privacy | terms (실제는 라우터)
- `slide`: 현재 슬라이드 인덱스, 자동재생 타이머
- `um`: 선택된 4-UM 인덱스(0~3)
- `open`: 열린 FAQ 항목 key 집합
- `faqCat`, `acadTab`: 활성 카테고리/탭(스크롤 위치에 따라 갱신하면 더 좋음, 현재는 클릭 시만 갱신)
- 데이터 fetching 없음. 모두 정적 콘텐츠입니다.

## Design Tokens (Wanted Design System에서 사용한 값)
| 용도 | 토큰 | 값 |
|---|---|---|
| Primary | --primary-normal | #3366FF (rgb 51,102,255) |
| Primary strong (링크 hover) | --primary-strong | #005EEB |
| Primary 연한 배경 | --blue-95 | #EAF2FE |
| Primary 선 | --blue-80 | #9EC5FF |
| 텍스트 기본 | --label-normal | #171717 |
| 텍스트 보조 | --label-neutral | rgba(46,47,51,0.88) |
| 텍스트 회색 | --label-alternative | rgba(55,56,60,0.61) |
| 선 | --line-normal-normal | rgba(112,115,124,0.22) |
| 선 연한 | --line-normal-neutral | rgba(112,115,124,0.16) |
| Fill | --fill-normal / -alternative / -strong | rgba(112,115,124,0.08 / 0.05 / 0.16) |
| 회색 배경 | --cool-neutral-99 | #F7F7F8 |
| 어두운 배경 | --cool-neutral-15 | #1B1C1E |
| 히어로 배경 | --cool-neutral-20 | #292A2D |
| 카카오 | (브랜드) | #FEE500 / 글자 #191919 |

- **Radius:** 버튼·패널 12px / 사진 16px / 작은 버튼 8~10px / 태그 6px / 입력 필요 태그 4px / 목록·띠는 0
- **그림자:** 플로팅 카카오 버튼에만 `0 4px 16px rgba(0,0,0,0.12)`. 나머지는 1px 안쪽 선(`inset 0 0 0 1px`)만 씁니다.
- **섹션 간격:** 페이지 헤더 64px, 섹션 사이 88~96px, 제목 아래 24~32px
- **타이포:**
  - H1 페이지: 30~40px/700, -0.028em
  - H2 섹션: 28px/700, -0.024em (About 섹션은 24px)
  - 본문: 16px/1.75~1.85
  - 보조: 15px
  - 캡션: 13~14px

## Assets
| 파일 | 용도 | 비고 |
|---|---|---|
| assets/logo-horizontal.png | 헤더 로고 | 클라이언트 제공, 투명 배경, 하단 여백 있음 |
| assets/logo-emblem.png | 푸터 엠블럼 | 클라이언트 제공, 흰 바탕 제거·크롭 |
| assets/principal.jpg | 교장 사진 | 클라이언트 제공, 고해상도 |
| assets/hero-1.png, hero-2.png | 히어로 슬라이드 | ⚠ 저해상도, 원본 교체 필요 |
| 아이콘 | 카카오, 인스타, 유튜브, 네이버블로그, chevron | Wanted DS 아이콘 세트(`design/_ds/...`). 실제 구현은 동일 모양의 SVG로 대체 |

비어 있는 이미지 자리(프로토타입의 회색 플레이스홀더):
- 히어로 split 콜라주 3장
- 4-텍스트 다이어그램, 워크시트 구조도
- K-리더십 로고와 활동사진 4장
- 2026 학사달력

## 확인/입력 필요 (클라이언트)
- **학교명 표기:** 로고는 "뉴젠리더십학교"인데, 일부 본문과 법적 페이지는 PRD를 따라 "뉴젠리더십스쿨"로 되어 있습니다. 통일이 필요합니다.
- **FAQ 답변:** 원문과 대조
- **4-UM 활동명 오타 확인:** "검체자아 예이기교육", "담산나비 대해서교육"
- **법적 페이지 "입력 필요" 항목:** 시행일, 보호책임자 성명·이메일, 상담 기록 보관 기간, 방문 통계 도구 사용 여부, 대표자, 고유번호
- **Pretendard JP 폰트:** 없으면 Pretendard(OFL)로 대체 가능
- **SEO(PRD 비기능 요구사항):** 메타 타이틀·설명, OG 태그(카카오톡 공유 미리보기 필수), sitemap.xml

## Files
- `design/Newgen Site.dc.html`: 최종 hi-fi 프로토타입(모든 페이지)
- `design/assets/`: 이미지
- 디자인 시스템 번들(`_ds/`)은 용량 때문에 패키지에서 뺐습니다. 필요한 값은 이 문서의 Design Tokens에 모두 적어 두었습니다.
- `design/support.js`, `design/image-slot.js`: 프로토타입 런타임(구현에는 불필요)
- `docs/newgen_prd.pdf`: PRD · 기능정의서 · 정책정의서 v1.1
- `docs/wireframe-sketch.png`: 클라이언트 최초 스케치
- `docs/talent-reference.png`: 인재상 도식 원본
- `docs/calendar-2026.png`: 2026학년도 학사달력 원본
