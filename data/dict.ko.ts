// 한국어 사전 — 화면에 나오는 모든 문구. 영어는 dict.en.ts가 같은 모양을 따릅니다.
import { eventDateLabel, weekday, type CalEvent, type CalMonth } from "./calendar";
import { FAQ, HOME_FAQ_KEYS } from "./faq";
import {
  ADMISSION_STEPS,
  BASIC_DIRECTIONS,
  FOUR_UM,
  GREETING,
  HISTORY,
  MATTHEW,
  MISSION,
  PRINCIPAL,
  TALENTS,
  VISION,
} from "./school";
import { SITE } from "./site";

export const DICT_KO = {
  meta: {
    siteTitle: `${SITE.name} | 전남 여수 기독교 대안학교`,
    titleTemplate: `%s | ${SITE.name}`,
    siteName: SITE.name,
    description: SITE.description,
    ogLocale: "ko_KR",
    about: { title: "학교 소개", description: "뉴젠리더십학교의 연혁, 미션과 비전, 인재상, 교장 인사말을 소개합니다." },
    academics: {
      title: "교육과정",
      description:
        "교육과정 운영(기본방향, 중점활동 4-UM), 창의지성 교육과정, K-리더십 지역교육과정, 2026학년도 학사달력을 소개합니다.",
    },
    faq: {
      title: "FAQ",
      description: "입학 및 전형, 학력 인정과 진로·진학, 학교생활에 대한 질문과 답변입니다.",
    },
    privacy: { title: "개인정보처리방침" },
    terms: { title: "이용약관" },
  },

  common: {
    schoolName: SITE.name,
    homeAria: "뉴젠리더십학교 홈",
    navAria: "주 메뉴",
    skipLink: "본문 바로가기",
    langSwitch: { aria: "언어 선택" },
    address: SITE.address,
    contact: "CONTACT",
    phone: "Phone.",
    kakao: "카카오 상담.",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    newWindow: "새 창",
    sns: { instagram: "인스타그램", youtube: "유튜브", blog: "네이버 블로그" },
    kakaoFloat: "카카오톡 상담",
    consult: {
      title: "입학 상담은 카카오톡으로",
      desc: ["입학은 별도의 복잡한 시험 없이, 편안한 대면 상담을 통해 진행됩니다.", "먼저 편하게 상담을 신청해 주세요."],
      button: "상담 연결하기",
    },
    viewAll: "전체 보기",
    pending: "입력 필요",
  },

  hero: {
    aria: "학교 활동 사진",
    eyebrow: "전남 여수 · 기독교 대안학교",
    title: ["천권독서로 '꿈'과 '꿈너머꿈'을", "꾸는 교육 공동체"],
    desc: "'꿈'과 '꿈너머꿈'을 실현하여 소금과 빛이 되는 인재를 양성합니다.",
    ctaKakao: "입학 상담",
    ctaAcademics: "교육과정",
    slides: ["학생이 마을 아이들에게 활동 자료를 보여 주는 모습", "교실에서 수업 중인 학생들"],
    // 사진 왼쪽 아래 캡션 (사진 순서대로)
    captions: ["K-리더십 프로젝트", "배움중심수업"],
    goTo: (n: number) => `${n}번째 사진 보기`,
  },

  home: {
    talentTitle: "우리가 기르는 사람",
    talentLink: "학교 소개",
    umEyebrow: "중점활동 4-UM",
    umTitle: "배움 · 키움 · 채움 · 나눔",
    umLink: "교육과정 운영",
    monthAria: "이번 달 학사일정",
    faqTitle: "FAQ",
  },

  talents: TALENTS,
  fourUm: FOUR_UM.map((u) => ({
    areaLabel: `${u.area}영역`,
    type: u.type,
    cardType: `${u.type} 교육과정`,
    activities: u.activities,
  })),

  about: {
    title: "학교 소개",
    desc: "뉴젠리더십학교가 걸어온 길과 세우고자 하는 사람을 소개합니다.",
    history: "연혁",
    historyItems: HISTORY,
    missionLabel: "Mission",
    mission: MISSION,
    talentTitle: "인재상",
    visionLabel: "Vision",
    vision: VISION,
    matthew: MATTHEW,
    matthewCite: "마태복음 5장 13~16절",
    leadershipTitle: "교장 인사말",
    principalAlt: `${PRINCIPAL.name} ${PRINCIPAL.title}`,
    principalName: PRINCIPAL.name,
    principalTitle: PRINCIPAL.title,
    principalProfile: PRINCIPAL.profile,
    greetingTitle: ["새로운 시대, 새로운 세대를 세우는", "뉴젠리더십학교에 오신 것을 환영합니다."],
    greetingIntro: GREETING.intro,
    greetingVirtuesLead: GREETING.virtuesLead,
    greetingVirtues: GREETING.virtues.map((v) => ({
      before: `${v.order}는 “`,
      word: v.word,
      after: `”입니다. ${v.text}`,
    })),
    greetingOutro: GREETING.outro,
    greetingClosing: "축복합니다.",
  },

  academics: {
    title: "교육과정",
    desc: "독서와 체험, 실천과 참여로 이어지는 뉴젠리더십학교의 배움을 소개합니다.",
    tabsAria: "교육과정 섹션",
    tabs: {
      operation: "교육과정 운영",
      creative: "창의지성 교육과정",
      kleader: "지역교육과정 개발",
      calendar: "학사달력",
    },
    operation: { title: "교육과정 운영", basic: "기본방향", core: "중점활동" },
    creative: { title: "창의지성 교육과정", fourText: "4-텍스트", reading: "독서와 체험의 의미를 되살리는 새 교육과정" },
    kleader: {
      title: "지역교육과정 개발",
      sub: "K-리더십",
      projects: "이순신 장군 프로젝트 / 손양원 목사 프로젝트",
      photos: [
        "학생이 마을 아이들에게 활동 자료를 보여 주는 모습",
        "무대에서 공연하는 학생들",
        "라디오 스튜디오에서 방송에 참여한 학생들",
        "숲속 힐링 음악회에서 공연하는 학생들",
      ],
      logoTitle: "Korea The YEOSU K-Leadership 로고. 여수시, 손양원 목사, 이순신 장군의 초성으로 구성",
    },
    calendarEyebrow: "학사일정",
    calendarTitle: "2026학년도 학사달력",
  },

  // 교육과정 도식 속 문구
  diagrams: {
    bd: {
      title: `기본방향: ${BASIC_DIRECTIONS.map((d) => `${d.title}(${d.desc})`).join(", ")}이 창의지성 4-텍스트를 중심으로 순환합니다.`,
      // 좌상 · 우상 · 좌하 · 우하
      petals: [
        { lines: ["진로적성 맞춤형", "교육과정", "재구성"], small: true },
        { lines: ["수업", "(배움중심)"], small: false },
        { lines: ["기록", "(포트폴리오)"], small: false },
        { lines: ["평가", "(절대, 관찰)"], small: false },
      ],
      center: [
        { text: "창의지성", size: 26 },
        { text: "4-텍스트", size: 28 },
      ],
    },
    ring: ["중점활동", "4-UM"],
    fourText: {
      bar: "창의지성교육 : 창의성을 지성교육으로 달성하는 것",
      goalPill: "목표: 창의성",
      goals: [
        { goal: "과학적 통찰력", result: "직관, 상상력" },
        { goal: "독창적 문제발견과 해결", result: "기획, 생산, 창조" },
        { goal: "시민적 가치와 생활능력", result: "사회적 인성" },
      ],
      methodPill: "방법: 지성교육",
      methodNote: "(비판적 사고)",
      // 원본에 Presentation이 두 번 인쇄되어 있어 하나로 정리
      methods: ["Presentation", "Writing / Creating", "Discussion", "Thinking", "Text Reading"],
    },
    venn: {
      title:
        "4-텍스트: 1 인류의 지적 전통(인류역사 자산 1)을 중심으로 2 문학적 소양(인류역사 자산 2), 3 경험과 실험·제작(경험, 실험 지식), 4 사회적 실천(정체성과 책임)이 겹쳐 있습니다.",
      scale: 1,
      c4: { title: "사회적 실천", sub: "[정체성과 책임]" },
      c2: { lines: ["문학적", "소양"], sub: "[인류역사 자산 2]" },
      c3: { pre: "경험과", box: "실험 · 제작", x: 612, sub: "[경험, 실험 지식]" },
      c1: { pre: "인류의", box: "지적 전통", sub: "[인류역사 자산 1]" },
    },
    reading: {
      bar: "교과연계 주제별 명저 독서목록",
      title: "독서 인프라에서 대안교과서와 연관 아티클을 거쳐 새로운 수업으로 이어집니다.",
      source: { lines: ["독서", "인프라"], size: 22 },
      pills: { top: "대안교과서", bottom: "연관 아티클", size: 16, width: 120 },
      classTitle: "새로운 수업",
      classNote: "배움중심수업",
      classItems: ["내용확인", "질문과 아이디어", "사고와 표현", "토론과 재사고", "새로운 과제 설정"],
      changche: "창체 인프라",
      changcheItems: ["다양한 체험 프로그램", "다양한 사회적 실천 프로그램", "문화예술작품 감상 네트워크와 역량 강화"],
    },
  },

  calendar: {
    summary: ["1학기 수업일수", "여름계절학기", "2학기 수업일수", "겨울계절학기", "연간 총 수업일수"],
    days: (n: number) => `${n}일`,
    monthTitle: (_y: number, m: number) => `${m}월`,
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    caption: (y: number, m: number) => `${y}년 ${m}월 달력`,
    viewAria: "달력 보기 방식",
    viewMonth: "월간",
    viewYear: "연간",
    openMonth: "이 달 크게 보기",
    schoolDays: "수업일수",
    legendEvent: "학교 일정",
    monthEvents: (m: number) => `${m}월 일정`,
    prev: "이전 달",
    next: "다음 달",
    eventLabel: (label: string) => label,
    dateLabel: (c: CalMonth, e: CalEvent) => eventDateLabel(c, e),
    weekday,
    homeEyebrow: "이번 달 학사일정",
    homeTitle: (y: number, m: number) => `${y}년 ${m}월`,
    homeDays: (n: number) => `수업일수 ${n}일`,
    homeLink: "전체 학사달력 보기",
  },

  faq: {
    title: "FAQ",
    desc: "입학 절차부터 학교생활까지, 가장 많이 묻는 질문을 모았습니다.",
    admissionTitle: "입학 절차",
    admissionNote: "정기 모집 외에도 결원 시 수시 편입학을 진행합니다.",
    steps: ADMISSION_STEPS,
    navAria: "FAQ 카테고리",
    categories: FAQ,
    homeKeys: HOME_FAQ_KEYS,
    moreTitle: "찾는 답이 없으신가요?",
    moreButton: "카카오톡 문의",
  },
};

export type Dict = typeof DICT_KO;
