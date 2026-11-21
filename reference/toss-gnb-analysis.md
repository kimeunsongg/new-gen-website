# 토스 상단바(GNB) 분석

- 대상: https://toss.im/en-us/company
- 분석일: 2026-11-21
- 방법: 페이지 HTML·CSS 원본을 내려받아 클래스별 스타일을 추출. 스크롤·열림 동작처럼 JS로 처리되는 부분은 클래스 이름과 인라인 스타일로 추정했으며, 추정한 항목은 **(추정)**으로 표시함.

---

## 1. 전체 구조

데스크톱용과 모바일용 상단바를 **둘 다 HTML에 넣어 두고**, 미디어쿼리로 하나만 보여 줍니다.

| 구분 | 표시 조건 | 높이 |
|---|---|---|
| 데스크톱 GNB | 화면 폭 1025px 이상 | 64px |
| 모바일 GNB | 화면 폭 1024px 이하 | 56px |

```
[데스크톱]
┌───────────────────────────────────────────────────────────────────────────┐
│ [toss 로고]      Personal  Business  Company  Newsroom  Careers↗   ENG▾ [Download App] │
│  ← 좌측 25% →          ↑ 화면 정중앙에 절대배치                     ↑ 우측 정렬        │
└───────────────────────────────────────────────────────────────────────────┘

[모바일]
┌──────────────────────────────┐
│ [toss 로고]               ☰ │
└──────────────────────────────┘
```

## 2. 데스크톱 GNB

### 2-1. 컨테이너

| 속성 | 값 |
|---|---|
| 위치 | `position: fixed; top: 0; left: 0; right: 0; z-index: 100` |
| 내부 정렬 | `display: flex; align-items: center; gap: 24px` |
| 높이 | `64px` |
| 최대 폭 | `max-width: 1920px; margin: 0 auto` |
| 좌우 여백 | 기본 `160px` → ≤1600px `128px` → ≤1440px `108px` → ≤1024px `48px` |

### 2-2. 배경 (스크롤 상태에 따라 바뀜)

처음에는 배경이 투명하고, 스크롤하면 반투명 유리 배경이 붙습니다 **(추정: 스크롤 시 클래스 추가)**.

| 테마 | 배경 | 블러 |
|---|---|---|
| 라이트 | `rgba(255,255,255,0.749)` | `backdrop-filter: blur(20px)` |
| 다크 | `rgba(18,18,18,0.7)` | `backdrop-filter: blur(30px)` |

- 전환 효과: `transition: background-color .3s~.4s ease, backdrop-filter .3s~.4s ease`
- 루트 요소에 `style="transform:none"`이 있어, 스크롤을 내릴 때 상단바를 위로 숨기는 애니메이션이 있을 가능성이 있습니다 **(추정)**.

### 2-3. 로고

- 왼쪽 영역 폭 `25%`, 그 안에 로고를 세로 가운데 정렬
- 로고 크기 `72 × 22px`, `object-fit: contain`
- 이미지: `logo-toss-blue@2x.png` (2배 해상도 PNG)
- 링크: `/en-us` (홈)

### 2-4. 가운데 메뉴

| 메뉴 | 종류 | 동작 |
|---|---|---|
| Personal | `<button>` | 메가 메뉴 열기 |
| Business | `<button>` | 메가 메뉴 열기 |
| Company | `<a href="/en-us/company">` | 페이지 이동 |
| Newsroom | `<a href="/en-us/newsroom">` | 페이지 이동 |
| Careers | `<a target="_blank">` | 새 창 + ↗ 아이콘 |

**배치**
- 메뉴 묶음을 `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`로 **화면 정중앙**에 둡니다. 그래서 로고나 오른쪽 버튼 폭과 상관없이 항상 가운데에 있습니다.
- 메뉴 사이 간격 `gap: 32px`, 각 항목 높이 `100%`(64px 전체가 클릭 영역)

**글자**
- 폰트: `Toss Product Sans OTF`
- `font-size: 16px; line-height: 1.6; letter-spacing: -0.02em; font-weight: 500`
- 색: 라이트 `rgb(51,56,64)` / 다크 `rgb(218,223,233)`

**호버 효과 (핵심 디테일 3가지)**
1. **굵기 변화:** 호버하면 `font-weight: 600`
2. **글자가 밀리지 않게 하는 트릭:** 각 글자 `<span data-text="Personal">` 밑에 `::after { content: attr(data-text); font-weight: 600; height: 0; visibility: hidden }`을 둡니다. 굵은 글씨 폭을 미리 확보해 두기 때문에, 호버로 굵어져도 옆 메뉴가 움직이지 않습니다.
3. **나머지 흐리게:** `:has()` 선택자로, 메뉴 하나에 호버하면 **나머지 메뉴가 `opacity: .5`** 로 흐려집니다.
   ```css
   .menu:has(.item:hover) .item:not(:hover) { opacity: .5 }
   ```
   - 전환: `transition: opacity .2s ease`
- Careers의 ↗ 아이콘(12px)은 평소 `opacity: 0`이었다가 호버하면 `opacity: 1`로 나타납니다.

### 2-5. 오른쪽 영역

| 요소 | 스타일 |
|---|---|
| 묶음 | `display: flex; gap: 8px; align-items: center` |
| 언어 선택 `ENG ▾` | `padding: 10px 8px 10px 12px; gap: 4px`, 14px 삼각형 아이콘 |
| `Download App` 버튼 | `padding: 10px 12px; border-radius: 12px`, 배경 라이트 `rgba(7,25,76,0.051)` / 다크 `rgba(214,224,239,0.09)` |

**언어 드롭다운**
- 위치: 버튼 아래 `8px`, 가운데 정렬
- `padding: 12px; border-radius: 16px; backdrop-filter: blur(20px)`
- 라이트: 배경 `rgba(255,255,255,0.89)`, 테두리 `1px solid rgba(13,25,74,0.04)`, 그림자 `0 2px 12px rgba(2,32,71,.05), 0 12px 40px -4px rgba(0,27,55,.1)`
- 항목: `padding: 10px 12px`, 선택된 언어 `font-weight: 500`, 나머지 `400` + 회색 `rgb(114,119,128)` → 호버하면 진한 색

**Download App 글자 애니메이션**
- 글자를 **한 글자씩 `<span>`으로 쪼개서** 두 줄로 겹쳐 둡니다.
  - 1줄(보이는 글자): `opacity: 1; transform: none`
  - 2줄(대기 글자): `opacity: 0; transform: translateY(16px)`
- 호버하면 1줄이 위로 빠지고 2줄이 아래에서 올라오는 **글자별 롤링 효과**로 보입니다 **(추정: framer-motion으로 글자마다 시차를 줌)**. `filter: blur()` 값도 함께 바뀝니다.

## 3. 메가 메뉴 (Personal / Business)

### 3-1. 레이아웃
- 상단바 아래로 **전체 폭 패널**이 펼쳐집니다.
- 내부: `max-width: 1920px; padding: 104px 160px 48px; display: flex; gap: 24px`
  - 왼쪽 `25%`: 빈 칸(로고 열과 맞춤)
  - 오른쪽 `900px`: `grid-template-columns: repeat(4, 1fr); gap: 24px` → **4열 그룹**
- 그룹 제목: 회색 `rgb(114,119,128)`, 제목과 목록 간격 `28px`
- 항목 목록: `gap: 12px`, 색 `rgb(51,56,64)`, `opacity: .9`

### 3-2. 배경
- 별도 박스가 아니라 **흐릿한 흰색 타원 그라디언트**가 위에서 퍼지는 형태입니다.
  ```css
  background: radial-gradient(ellipse 50% 70% at 50% 50%, #fff 38%, transparent 100%);
  filter: blur(90px);
  width: 206vw; height: calc(76vh + 580px); top: -580px;
  ```
- 메뉴가 열리면 **페이지 본문 전체가 `filter: blur(20px)`** 로 흐려지고 클릭이 막힙니다(`pointer-events: none`).
  - 전환: `.4s cubic-bezier(.6, 0, 0, .6)`

### 3-3. 메뉴 구성

**Personal**

| Everyday banking | Invest & borrow | Public & utility services | Lifestyle |
|---|---|---|---|
| Money management | Stocks | Taxes | Shopping |
| Toss Pay | Bonds | Government services | Mini Apps |
| Send money | Loans | Transport | Rewards |
| Create an account | Cards | Phone bills | |
| Credit Score | Insurance | | |
| Teens | Compare accounts | | |

**Business**

| Get customers | Take payments | Get funding | Partner with Toss |
|---|---|---|---|
| Ads | Toss Pay | Business loans | Ads partnerships |
| Financial products | Payment hardware & POS | | Shopping partnerships |
| Shopping | Online payment (PG) | | Apps in Toss partnerships |
| Apps in Toss | | | Online payments (PG) |
| | | | Toss Pay · Payment terminals · Business loans · Other Partnerships |

## 4. 모바일 GNB (≤1024px)

| 속성 | 값 |
|---|---|
| 높이 | `56px` |
| 여백 | `padding: 7px 8px 7px 20px` |
| 로고 | `79 × 24px` (데스크톱보다 약간 큼) |
| 햄버거 버튼 | 26px 아이콘(가로줄 3개, 두께 2.2), `padding: 8px`, `aria-label="메뉴 열기"` |
| 스크롤 배경 | 데스크톱과 같은 반투명 유리 배경 |

**전체 화면 메뉴**
- `position: fixed; inset: 0; padding-top: 84px; overflow-y: auto`
- 배경 `rgba(255,255,255,0.89)` + `blur(30px)`
- 메뉴 항목: `padding: 11px 0`, 좌우 여백 `20px`
- Personal/Business는 **아코디언**으로 펼쳐지고, 하위 항목은 **2열 grid**(`padding: 7px 0`)로 나옵니다.
- 누르면 `:active { opacity: .6 }` 피드백
- 하단에 언어 선택과 앱 다운로드 영역이 있고(`padding: 64px 20px 28px`), 언어 드롭다운은 **위쪽으로** 열립니다.

## 5. 색상·토큰 요약

| 용도 | 라이트 | 다크 |
|---|---|---|
| 기본 글자 | `rgb(51,56,64)` | `rgb(218,223,233)` |
| 보조 글자 | `rgb(114,119,128)` | `rgb(136,141,151)` |
| 스크롤 배경 | `rgba(255,255,255,.75)` + blur 20 | `rgba(18,18,18,.7)` + blur 30 |
| 버튼 배경 | `rgba(7,25,76,.05)` | `rgba(214,224,239,.09)` |
| 드롭다운 배경 | `rgba(255,255,255,.89)` | `rgba(214,224,239,.09)` |
| 모서리 | 버튼 12px / 드롭다운 16px | 동일 |

## 6. 정리: 눈여겨볼 디자인 포인트

1. **메뉴 정중앙 절대배치:** 좌우 요소 폭과 상관없이 메뉴가 항상 화면 가운데에 있습니다.
2. **굵기가 바뀌어도 흔들리지 않는 호버:** `data-text` + `::after`로 굵은 글씨 폭을 미리 확보합니다.
3. **`:has()`로 나머지 흐리게:** JS 없이 CSS만으로 "지금 가리키는 메뉴"에 시선을 모읍니다.
4. **처음엔 투명, 스크롤하면 유리:** 첫 화면에서는 배경과 섞이고, 내리면 읽기 좋게 바뀝니다.
5. **메가 메뉴가 열리면 본문 블러:** 박스 대신 흰 그라디언트와 본문 블러로 층을 나눕니다.
6. **CTA 글자 롤링:** 글자 단위 애니메이션으로 버튼에 생동감을 줍니다.
