// ⚠ 질문·답변 원문은 프로토타입(design/Newgen Site.dc.html)의 FAQ 배열에 있습니다.
// 원문을 받기 전까지 카테고리 제목을 질문으로 두고, 답변은 "입력 필요"로 표시합니다.
// answer가 null이면 화면에 "답변 입력 필요" 표시가 나갑니다.

export type FaqItem = { key: string; q: string; a: string[] | null };
export type FaqCategory = { id: string; title: string; items: FaqItem[] };

export const FAQ: FaqCategory[] = [
  {
    id: "admission",
    title: "입학 및 전형",
    items: [
      {
        key: "1-1",
        q: "입학 절차는 어떻게 되나요?",
        a: [
          "입학은 별도의 복잡한 시험 없이, 편안한 대면 상담을 통해 진행됩니다.",
          "입학 상담 신청 → 원서 및 서류 제출 → 학생 · 학부모 면접 → 입학 결정 및 등록 순서로 진행되며, 정기 모집 외에도 결원 시 수시 편입학을 진행합니다.",
        ],
      },
    ],
  },
  { id: "accreditation", title: "학력 인정", items: [{ key: "2-1", q: "학력이 인정되는 대안교육기관인가요?", a: null }] },
  { id: "career", title: "진학 · 진로", items: [{ key: "3-1", q: "졸업 후 대학 진학 · 진로는 어떻게 되나요?", a: null }] },
  {
    id: "compare",
    title: "일반 학교 비교",
    items: [{ key: "4-1", q: "일반 학교 교육과정과 비교했을 때 수준 차이가 있나요?", a: null }],
  },
  { id: "life", title: "학교생활 · 학적", items: [{ key: "5-1", q: "학교생활 및 학적 지도는 어떻게 하나요?", a: null }] },
  {
    id: "device",
    title: "전자기기 규정",
    items: [{ key: "6-1", q: "스마트폰 및 전자기기 사용 규정은 어떻게 되나요?", a: null }],
  },
  { id: "meal", title: "급식 · 통학", items: [{ key: "7-1", q: "급식 및 통학은 어떻게 운영되나요?", a: null }] },
];

export const HOME_FAQ_KEYS = ["1-1", "2-1", "3-1"];
