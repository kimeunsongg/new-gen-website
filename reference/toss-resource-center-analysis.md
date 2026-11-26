# 토스 "리소스센터 방문" 배너 버튼 분석

- 대상: https://toss.im/en-us/newsroom 맨 아래, 푸터 바로 위 "Visit the Brand Resource Center" 배너
  - 회사 소개 페이지(`/en-us/company`)에는 이 배너가 없고, 푸터 링크 "Brand Resource Center"만 있습니다.
- 분석일: 2026-11-21
- 방법: 페이지 HTML·CSS 원본에서 클래스별 스타일을 추출하고, 실제 브라우저로 렌더링해서 크기를 재고 화면을 캡처했습니다.
- 캡처: [데스크톱](toss-resource-center/desktop.png) · [모바일](toss-resource-center/mobile.png)
- 목적: 뉴젠 홈페이지에 네이버 블로그로 연결하는 배너를 만들 때 참고

---

## 1. 생김새

```
                                          (섹션 위 여백 160px)
┌──────────────────────────────────────────────────────────────────────┐
│ ░░ 어두운 우주 사진 배경 (전체 덮기, 모서리 32px) ░░░░░░░░░░░░    (↗) │ ← 48px 원형 유리 버튼
│                                                                      │
│  [toss brand resources 로고]                                          │
│  Visit the Brand Resource Center                                     │ ← 흰색 20px 굵게
└──────────────────────────────────────────────────────────────────────┘
                                     For media inquiries  core-comms@toss.im   ← 오른쪽 정렬 보조 정보
```

- **카드 전체가 링크 하나**입니다. 어디를 눌러도 `brand.toss.im`이 **새 창**으로 열립니다(`target="_blank" rel="noopener noreferrer"`).
- 텍스트는 **왼쪽 아래**, 화살표 버튼은 **오른쪽 위**에 있습니다.
- 카드 아래 오른쪽에 문의처 한 줄이 붙어 있습니다.

## 2. HTML 구조

```html
<section class="rc">                       <!-- 섹션: 세로 flex, 오른쪽 정렬 -->
  <div class="rc__row">
    <a class="rc__card" href="https://brand.toss.im/" target="_blank" rel="noopener noreferrer">
      <div class="rc__bg"><img src="…banner.png" alt="Visit the Brand Resource Center"></div>  <!-- 배경 사진 -->
      <div class="rc__top"><span class="icon-btn">↗ svg</span></div>                         <!-- 오른쪽 위 화살표 -->
      <div class="rc__text">
        <img src="…logo.svg">                                <!-- 브랜드 로고 (202×20) -->
        <p class="rc__title">Visit the Brand Resource Center</p>
      </div>
    </a>
  </div>
  <div class="rc__meta"><p>For media inquiries</p><p>core-comms@toss.im</p></div>
</section>
```

- 배경 사진은 Next.js `<Image fill>`로 넣었습니다. 사진이 뜨기 전에는 흐린 미리보기(blur placeholder)를 보여 줍니다.
- 이미지 파일: `newsroom-banner-brandResourceCenter.png`(배경), `newsroom-logo-brandResourceCenter.svg`(로고)

## 3. 스타일 (데스크톱)

| 요소 | 스타일 |
|---|---|
| 섹션 | `display: flex; flex-direction: column; align-items: flex-end; gap: 24px; padding: 160px 160px 0` |
| 카드(링크) | `position: relative; display: flex; flex-direction: column; gap: 40px; padding: 32px; width: 100%; cursor: pointer` |
| 배경 영역 | `position: absolute; inset: 0; overflow: hidden; border-radius: 40px`, 사진은 `object-fit: cover` |
| 화살표 줄 | `display: flex; justify-content: flex-end` (오른쪽 끝) |
| 화살표 버튼 | `48×48px; padding: 8px; border-radius: 100px`, 배경 `rgba(255,255,255,.11)`, 테두리 `.66px solid rgba(255,255,255,.11)`, `backdrop-filter: blur(10px)` → **반투명 유리 원** |
| 화살표 아이콘 | 16px, 흰색 선 2.5px (↗ 대각선 + ㄱ자) |
| 텍스트 묶음 | `display: flex; flex-direction: column; gap: 16px; padding: 3px 8px` |
| 로고 | `202 × 20px` |
| 제목 | `20px / 700`, 줄 간격 1.48, 자간 `-0.02em`, 흰색 |
| 보조 정보 | `display: flex; gap: 12px; padding-right: 8px`, `16px / 500`. 라벨 `rgb(143,149,158)`, 값 `rgb(78,83,92)` |

실제 렌더링 크기(1440px 화면): 카드 `1224 × 224px`. 높이는 따로 정하지 않고 **안쪽 여백과 내용으로 정해집니다**(32 + 48 + 40 + 72 + 32).

## 4. 반응형

| 화면 폭 | 섹션 여백 | 배경 모서리 | 그 밖의 변화 |
|---|---|---|---|
| 기본(>1600) | `160px 160px 0` | 40px | |
| ≤1600 | `160px 128px 0` | 40px | |
| ≤1440 | `160px 108px 0` | **32px** | |
| ≤1024 | `160px 48px 0` | **24px** | |
| ≤768 | `100px 20px 24px`, gap 12 | **20px** | 카드 `padding: 24px; gap: 12px`, 화살표 **40px**, 텍스트 gap 8, 제목 **18px**, 로고 88×16 비율로 축소, 보조 정보 gap 8 |
| ≤375 | | **16px** | |

- 좌우 여백은 상단바(GNB)와 같은 값이라 **카드 좌우 끝이 상단바의 로고·버튼 위치와 맞습니다**.
- 모바일 캡처에서 카드 크기는 `350 × 155px`입니다.

## 5. 인터랙션

- **호버 효과가 없습니다.** 마우스를 올리기 전과 후를 캡처해 픽셀 단위로 비교했는데 차이가 없었고, CSS에도 `:hover` 규칙이 없습니다.
- 대신 오른쪽 위의 **↗ 아이콘**이 "외부 사이트로 이동한다"는 신호 역할을 합니다. 상단바의 Careers 링크와 같은 아이콘입니다.
- 마우스 커서는 카드 전체에서 `pointer`입니다.

## 6. 눈여겨볼 디자인 포인트

1. **카드 전체를 하나의 링크로:** 누를 수 있는 영역이 넓어서 모바일에서도 누르기 쉽습니다.
2. **어두운 사진 + 흰 글씨:** 흰 페이지 끝에서 시선을 확실히 끌고, 푸터 직전의 마무리 역할을 합니다.
3. **텍스트는 왼쪽 아래, 화살표는 오른쪽 위:** 대각선 배치라 넓은 배너도 비어 보이지 않습니다.
4. **유리 원형 화살표 버튼:** 사진 위에서도 튀지 않으면서 "바깥 링크"임을 알려 줍니다.
5. **문의처 한 줄:** 배너 아래 오른쪽에 작게 붙여서, 배너를 누르지 않을 사람에게도 연락 경로를 남깁니다.

## 7. 뉴젠 네이버 블로그 배너에 옮길 때

| 토스 | 뉴젠 적용안 |
|---|---|
| 우주 사진 배경 | 학교 활동 사진 + 어두운 남색(`#04215F`) 그라디언트를 덮어 흰 글씨가 읽히게 |
| toss brand resources 로고 | 네이버 블로그 아이콘 + "뉴젠리더십학교 블로그" |
| Visit the Brand Resource Center | "블로그에서 학교 소식 보기" / EN "Visit our blog" |
| `brand.toss.im` 새 창 | `https://blog.naver.com/newgenleadership` 새 창 (`data/site.ts`의 SNS 값 재사용) |
| For media inquiries · 이메일 | "입학 문의 · 061-686-3707" 또는 카카오톡 상담 |
| 좌우 여백 = GNB 여백 | 사이트 `.container`(1120px) 폭에 맞춤 |

- 블로그 **최신 글 목록까지 보여 주려면** 네이버 블로그 RSS를 쓸 수 있습니다. `https://rss.blog.naver.com/newgenleadership.xml`가 정상 응답하는 것을 확인했습니다(2026-11-21 기준 글 50개, 제목·링크·카테고리 포함). 이 사이트는 정적 빌드라서 RSS를 빌드할 때 읽어 오게 되고, 새 글은 다음 배포 때 반영됩니다.
