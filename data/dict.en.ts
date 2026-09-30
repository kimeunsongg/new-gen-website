// English dictionary — draft translation. ⚠ School review needed (names, titles, FAQ wording).
import { CAL, weekday as weekdayKo, type CalEvent, type CalMonth } from "./calendar";
import type { Dict } from "./dict.ko";
import type { FaqCategory } from "./faq";
import { HISTORY, TALENTS } from "./school";

const SCHOOL = "Newgen Leadership School";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WD_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WD_KO = ["일", "월", "화", "수", "목", "금", "토"];

const wdEn = (y: number, m: number, d: number) => WD_EN[WD_KO.indexOf(weekdayKo(y, m, d))];

// 학사일정 이름
const EVENT_LABELS: Record<string, string> = {
  삼일절: "Independence Movement Day",
  대체공휴일: "Substitute Holiday",
  개학식: "Opening Ceremony",
  "1차 검정고시": "1st Qualification Exam",
  봄소풍: "Spring Picnic",
  아하콘텐츠페어: "AHA Content Fair",
  노동절: "Labor Day",
  재량휴업일: "School Holiday",
  어린이날: "Children's Day",
  민주시민생활캠프: "Democratic Citizenship Camp",
  부처님오신날: "Buddha's Birthday",
  "2026 지방선거": "2026 Local Elections",
  현충일: "Memorial Day",
  "독서의 날": "Reading Day",
  북토크: "Book Talk",
  개교기념일: "School Anniversary",
  봉사활동: "Volunteer Service",
  항공우주캠프: "Aerospace Camp",
  방학식: "Closing Ceremony",
  계절학기: "Seasonal Session",
  "2차 검정고시": "2nd Qualification Exam",
  추석연휴: "Chuseok Holidays",
  캠프: "Camp",
  개천절: "National Foundation Day",
  한글날: "Hangeul Day",
  "섬박람회 체험학습": "Island Expo Field Trip",
  입학상담주간: "Admissions Counseling Week",
  입학설명회: "Admissions Info Session",
  겨울방학식: "Winter Break Ceremony",
  성탄절: "Christmas Day",
  신정: "New Year's Day",
  "무빙클래스 준비": "Moving Class Prep",
  무빙클래스: "Moving Class",
  설연휴: "Lunar New Year Holidays",
  전교임원선거: "Student Council Election",
};
const END_LABELS: Record<string, string> = { "12.2(수)": "Dec 2 (Wed)" };

const HISTORY_EN: Record<string, string> = {
  "여수꿈의학교 설립": "Founded as Yeosu Dream School",
  "정풍기 1대 교장 취임": "Jeong Pung-gi inaugurated as 1st principal",
  "정재천 2대 교장 취임": "Jeong Jae-cheon inaugurated as 2nd principal",
  "뉴젠리더십학교로 명칭 변경": "Renamed Newgen Leadership School",
  "전라남도교육청 대안교육기관 등록": "Registered as an alternative education institution with the Jeollanam-do Office of Education",
  "정재천 3대 교장 연임": "Jeong Jae-cheon reappointed as 3rd principal",
  "전남광주통합특별시교육청 소관으로 변경": "Placed under the Jeonnam-Gwangju Integrated Special City Office of Education",
};

const TALENTS_EN: Record<string, { name: string; desc: string }> = {
  영성: { name: "Spirituality", desc: "Living out the power of godliness" },
  품성: { name: "Character", desc: "Bearing the heart of Jesus" },
  지혜: { name: "Wisdom", desc: "Fearing God" },
  지성: { name: "Intellect", desc: "Holding a biblical worldview" },
};

const FAQ_EN: FaqCategory[] = [
  {
    id: "admission",
    title: "Admissions",
    items: [
      {
        key: "1-1",
        q: "Can we apply if the parents or the student are not Christian?",
        a: [
          "Yes, you may apply. Students from families without a Christian faith are welcome. However, you must agree to respect the school's educational direction and to take part in the Christian values education held during the school day (biblical worldview classes, chapel, morning devotions, etc.).",
        ],
      },
      {
        key: "1-2",
        q: "Which denomination is the school affiliated with? Is it only for members of a particular church?",
        a: [
          "The school is not only for members of a particular church. We are an interdenominational Christian alternative school founded on an evangelical confession of faith, open both to families from sound, orthodox Christian denominations and to all other families.",
        ],
      },
      {
        key: "1-3",
        q: "Can students transfer in during the semester?",
        a: [
          "Yes. In addition to regular admissions, we hold transfer admissions throughout the year depending on available openings. If you would like to transfer, please contact the school first and we will arrange a consultation.",
        ],
      },
      {
        key: "1-4",
        q: "What is the admission process?",
        a: [
          {
            list: [
              { label: "Request a consultation", text: "Request an initial one-on-one consultation via KakaoTalk or by phone." },
              {
                label: "Visit & submit documents",
                text: "Visit the school to talk about our educational philosophy, and submit the application and related documents.",
              },
              { label: "Admission & enrollment", text: "After final enrollment guidance, the admission process is complete." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "career",
    title: "Accreditation & Career Paths",
    items: [
      {
        key: "2-1",
        q: "Is the school's academic credential officially recognized?",
        a: [
          "Our school is an **alternative education institution** officially registered with the Jeollanam-do Office of Education. Under the Elementary and Secondary Education Act, regular academic credentials are not automatically recognized, so students take the national qualification exams to advance to the next level of schooling. Within our curriculum, we systematically support students to prepare for and pass these exams at the right time.",
        ],
      },
      {
        key: "2-2",
        q: "How do students prepare for university and careers after graduation?",
        a: [
          "Based on their qualification exam results, we provide one-on-one guidance tailored to each student's gifts and career path — including early admissions (school record and essay tracks), regular admissions (CSAT), study abroad, and portfolio-based admissions. We also help students design their own careers using personal portfolios built through reading and inquiry projects.",
        ],
      },
      {
        key: "2-3",
        q: "How does the academic level compare with regular schools?",
        a: [
          "Moving away from rote memorization, our program centers on **self-directed learning** and **in-depth reading education**. Rather than simply memorizing facts, students explore subject concepts on their own and develop critical and logical thinking, building both solid basic skills and the ability to study independently.",
        ],
      },
    ],
  },
  {
    id: "life",
    title: "School Life & Student Guidance",
    items: [
      {
        key: "3-1",
        q: "What do the daily and weekly schedules look like?",
        a: [
          {
            list: [
              { text: "Students **arrive by 8:50** to begin the day." },
              {
                label: "Morning",
                text: "After quieting their hearts with morning QT (devotion), students take part in **in-depth reading education** that deepens their thinking.",
              },
              { label: "Afternoon", text: "**Subject inquiry and project classes** follow, where students broaden their knowledge on their own." },
              { text: "Once a week, the whole school gathers for **chapel** to praise God and share the Word." },
            ],
          },
        ],
      },
      {
        key: "3-2",
        q: "What are the rules for smartphones and electronic devices?",
        a: [
          "To support deep focus and community fellowship, smartphones are collected right after arrival and returned at dismissal. Digital learning devices such as tablets and laptops, however, are actively used as proper learning tools under teacher guidance — for research, writing inquiry reports, and recording learning activities.",
        ],
      },
      {
        key: "3-3",
        q: "How are lunch and commuting (shuttle bus / public transit) handled?",
        a: [
          "For balanced meals and safe food, we partner (MOU) with a trusted designated restaurant near the school. At lunchtime, students walk there together with their teachers and return after a warm, wholesome meal.",
          "We do not operate a dormitory; all students commute.",
        ],
      },
    ],
  },
];

export const DICT_EN: Dict = {
  meta: {
    siteTitle: `${SCHOOL} | Christian Alternative School in Yeosu, Korea`,
    titleTemplate: `%s | ${SCHOOL}`,
    siteName: SCHOOL,
    description:
      "Newgen Leadership School is a Christian alternative school in Yeosu, Korea — an educational community that dreams 'the Dream' and 'the Dream Beyond' through reading a thousand books.",
    ogLocale: "en_US",
    about: {
      title: "About Us",
      description: "The history, mission, vision, ideal graduate profile and principal's message of Newgen Leadership School.",
    },
    academics: {
      title: "Curriculum",
      description:
        "Curriculum operation (basic direction, 4-UM core activities), the Creative Intellect curriculum, the K-Leadership regional curriculum and the 2026 academic calendar.",
    },
    faq: {
      title: "FAQ",
      description: "Questions and answers about admissions, accreditation and career paths, and school life.",
    },
    privacy: { title: "Privacy Policy" },
    terms: { title: "Terms of Use" },
  },

  common: {
    schoolName: SCHOOL,
    homeAria: `${SCHOOL} home`,
    navAria: "Main menu",
    skipLink: "Skip to content",
    langSwitch: { aria: "Language" },
    address: "5F, 30 Mangma-ro, Yeosu-si, Jeollanam-do, Korea",
    contact: "CONTACT",
    phone: "Phone.",
    kakao: "KakaoTalk.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    newWindow: "opens in a new window",
    sns: { instagram: "Instagram", youtube: "YouTube", blog: "Naver Blog" },
    kakaoFloat: "Chat on KakaoTalk",
    consult: {
      title: "Admissions Consultations on KakaoTalk",
      desc: [
        "Admission is decided through a relaxed, in-person consultation — no complicated entrance exams.",
        "Feel free to request a consultation first.",
      ],
      button: "Start a Chat",
    },
    viewAll: "View all",
    pending: "To be provided",
  },

  hero: {
    aria: "School activity photos",
    eyebrow: "Yeosu, Korea · Christian Alternative School",
    title: ["An educational community dreaming 'the Dream'", "and 'the Dream Beyond' through a thousand books"],
    desc: "We raise people who realize 'the Dream' and 'the Dream Beyond' to become the salt and light of the world.",
    ctaKakao: "Admissions",
    ctaAcademics: "Curriculum",
    slides: ["A student showing activity materials to village children", "Students in class"],
    captions: ["K-Leadership Project", "Learning-Centered Classes"],
    goTo: (n: number) => `Show photo ${n}`,
  },

  home: {
    talentTitle: "The People We Raise",
    talentLink: "About Us",
    umEyebrow: "Core Activities 4-UM",
    umTitle: "Learn · Grow · Fill · Share",
    umLink: "Curriculum Operation",
    monthAria: "This month's schedule",
    faqTitle: "FAQ",
  },

  talents: TALENTS.map((t) => ({ ...t, ...TALENTS_EN[t.name] })),
  fourUm: [
    {
      areaLabel: "Learning Area",
      type: "Inquiry-Centered",
      cardType: "Inquiry-Centered Curriculum",
      activities: [
        "Thousand-Book Reading & Discussion",
        "Self-Directed Learning for Real Achievement",
        "K-Leadership Project Classes",
        "Global Education",
      ],
    },
    {
      areaLabel: "Growing Area",
      type: "Experience-Centered",
      cardType: "Experience-Centered Curriculum",
      activities: ["One Art per Student: Culture & Arts", "Village-Based Learning", "Donated-Talent Experience Programs", "Lifetime Sports"],
    },
    {
      areaLabel: "Filling Area",
      type: "Practice-Centered",
      cardType: "Practice-Centered Curriculum",
      activities: [
        "Find-My-Dream Career Education",
        "Environmental & Eco-Farming Education",
        "Economy & Resource Maker Education",
        "365 Safety-First Education",
      ],
    },
    {
      areaLabel: "Sharing Area",
      type: "Participation-Centered",
      cardType: "Participation-Centered Curriculum",
      activities: ["Civic Education", "Democratic Student Council", "ESG & Eco-Plogging", "Beyond-the-Fence Community Education"],
    },
  ],

  about: {
    title: "About Us",
    desc: "The journey of Newgen Leadership School and the people we seek to raise.",
    history: "History",
    historyItems: HISTORY.map((h) => ({
      year: h.year,
      items: h.items.map((it) => ({ date: it.date, text: HISTORY_EN[it.text] ?? it.text })),
    })),
    missionLabel: "Mission",
    mission: "An educational community that dreams 'the Dream' and 'the Dream Beyond' through reading a thousand books",
    talentTitle: "The People We Raise",
    visionLabel: "Vision",
    vision: "Raising people who realize 'the Dream' and 'the Dream Beyond' to become the salt and light of the world",
    // World English Bible (public domain)
    matthew: [
      "You are the salt of the earth, but if the salt has lost its flavor, with what will it be salted? It is then good for nothing, but to be cast out and trodden under the feet of men.",
      "You are the light of the world. A city located on a hill can't be hidden.",
      "Neither do you light a lamp and put it under a measuring basket, but on a stand; and it shines to all who are in the house.",
      "Even so, let your light shine before men, that they may see your good works, and glorify your Father who is in heaven.",
    ],
    matthewCite: "Matthew 5:13–16 (WEB)",
    leadershipTitle: "Principal's Message",
    principalAlt: "Principal Jeong Jae-cheon",
    principalName: "Jeong Jae-cheon",
    principalTitle: "Principal",
    principalProfile: [
      "Adjunct Professor, Virginia Washington University (USA)",
      "Former Adjunct Professor, Dept. of Counseling Psychology, Kwangju Women's University",
      "Former Lecturer in Reading Instruction, Graduate School of Arts, Kyonggi University",
      "Executive Director, Yeosu Education Foundation",
      "Board Member, Korea Alternative Education Institutions Association",
    ],
    greetingTitle: ["Welcome to Newgen Leadership School,", "raising a new generation for a new era."],
    greetingIntro: [
      "In the age of generative AI, education is going through a great transformation. As we welcome a new generation — the 'New Generation' born after 2000 — our education, too, must forge a new path. Beyond the eras of mass education and education for excellence, a time has come that calls for 'Leadership' education in its truest sense.",
      "Newgen Leadership School walks the path of true alternative education together with students who have willingly chosen an uncommon road, and with their families. Under the vision of 'Glocalization' — embracing a global mindset while taking root in the local community — we raise creative, integrative people with specialized intellect who practice love for God and love for their neighbors.",
    ],
    greetingVirtuesLead: "We earnestly teach our students so that three essential values become part of who they are.",
    greetingVirtues: [
      {
        before: "First is “",
        word: "Holiness",
        after: ".” For one's message to carry weight, it must be proven through a holy life, not merely through words.",
      },
      {
        before: "Second is “",
        word: "Diligence",
        after: ".” It is the foundation for setting the right priorities, governing one's time, and bearing the fruit of solid ability.",
      },
      {
        before: "Third is “",
        word: "Character",
        after: ".” It is a warm heart that stays humble even with outstanding ability, and treasures people and life.",
      },
    ],
    greetingOutro:
      "We hope our students will go beyond maturing their inner selves, past the boundaries of 'family,' to dream freely for 'their nation and people,' and further still for 'the world and humanity.' Growing as Christians and as citizens of Korea, as students and as independent democratic citizens — in a wholesome balance of faith, learning and daily life — we will renew ourselves and devote ourselves every day so that our students may live purpose-driven lives.",
    greetingClosing: "God bless you.",
  },

  academics: {
    title: "Curriculum",
    desc: "Learning at Newgen Leadership School — connecting reading and experience, practice and participation.",
    tabsAria: "Curriculum sections",
    tabs: {
      operation: "Curriculum Operation",
      creative: "Creative Intellect",
      kleader: "Regional Curriculum",
      calendar: "Academic Calendar",
    },
    operation: { title: "Curriculum Operation", basic: "Basic Direction", core: "Core Activities" },
    creative: {
      title: "Creative Intellect Curriculum",
      fourText: "4-Text",
      reading: "A New Curriculum Reviving the Meaning of Reading and Experience",
    },
    kleader: {
      title: "Regional Curriculum Development",
      sub: "K-Leadership",
      projects: "Admiral Yi Sun-sin Project / Pastor Son Yang-won Project",
      photos: [
        "A student showing activity materials to village children",
        "Students performing on stage",
        "Students taking part in a broadcast at a radio studio",
        "Students performing at a forest healing concert",
      ],
      logoTitle:
        "Korea The YEOSU K-Leadership logo, built from the Korean initials of Yeosu City, Pastor Son Yang-won and Admiral Yi Sun-sin",
    },
    calendarEyebrow: "Academic Schedule",
    calendarTitle: "2026 Academic Calendar",
  },

  diagrams: {
    bd: {
      title:
        "Basic direction: aptitude-based curriculum redesign, classes (learning-centered), assessment (absolute, observation) and records (portfolio) cycle around the Creative Intellect 4-Text.",
      petals: [
        { lines: ["Career &", "Aptitude-Based", "Curriculum"], small: true },
        { lines: ["Classes", "(Learning-", "Centered)"], small: true },
        { lines: ["Records", "(Portfolio)"], small: false },
        { lines: ["Assessment", "(Absolute &", "Observation)"], small: true },
      ],
      center: [
        { text: "Creative", size: 21 },
        { text: "Intellect", size: 21 },
        { text: "4-Text", size: 25 },
      ],
    },
    ring: ["Core Activities", "4-UM"],
    fourText: {
      bar: "Creative Intellect Education: achieving creativity through intellectual education",
      goalPill: "Goal: Creativity",
      goals: [
        { goal: "Scientific insight", result: "Intuition, imagination" },
        { goal: "Original problem finding & solving", result: "Planning, production, creation" },
        { goal: "Civic values & life skills", result: "Social character" },
      ],
      methodPill: "Method: Intellectual Education",
      methodNote: "(Critical Thinking)",
      methods: ["Presentation", "Writing / Creating", "Discussion", "Thinking", "Text Reading"],
    },
    venn: {
      title:
        "4-Text: centered on 1 the intellectual tradition of humanity (human heritage 1), overlapping 2 literary cultivation (human heritage 2), 3 experience, experiment and making (experiential knowledge), and 4 social practice (identity and responsibility).",
      scale: 0.66,
      c4: { title: "Social Practice", sub: "[Identity & Responsibility]" },
      c2: { lines: ["Literary", "Cultivation"], sub: "[Human Heritage 2]" },
      c3: { pre: "Experience,", box: "Experiment & Making", x: 598, sub: "[Experiential Knowledge]" },
      c1: { pre: "Humanity's", box: "Intellectual Tradition", sub: "[Human Heritage 1]" },
    },
    reading: {
      bar: "Subject-linked reading list of great books by theme",
      title: "Reading resources lead to new classes through alternative textbooks and related articles.",
      source: { lines: ["Reading", "Resources"], size: 17 },
      pills: { top: "Alt. Textbooks", bottom: "Related Articles", size: 14, width: 128 },
      classTitle: "New Classes",
      classNote: "Learning-Centered",
      classItems: ["Checking content", "Questions & ideas", "Thinking & expression", "Discussion & rethinking", "Setting new tasks"],
      changche: "Creative Activities",
      changcheItems: [
        "Diverse experiential programs",
        "Diverse social-practice programs",
        "Culture & arts appreciation network and capacity building",
      ],
    },
  },

  calendar: {
    summary: ["1st Semester", "Summer Session", "2nd Semester", "Winter Session", "Total School Days"],
    days: (n: number) => `${n} days`,
    monthTitle: (_y: number, m: number) => MONTHS[m - 1],
    weekdays: WD_EN,
    caption: (y: number, m: number) => `${MONTHS[m - 1]} ${y} calendar`,
    viewAria: "Calendar view",
    viewMonth: "Monthly",
    viewYear: "Full Year",
    openMonth: "Open this month",
    schoolDays: "School days",
    legendEvent: "School events",
    monthEvents: (m: number) => `${MONTHS[m - 1]} Events`,
    prev: "Previous month",
    next: "Next month",
    eventLabel: (label: string) => EVENT_LABELS[label] ?? label,
    dateLabel: (c: CalMonth, e: CalEvent) => {
      const s = `${e.start} (${wdEn(c.year, c.month, e.start)})`;
      if (e.endLabel) return `${s} – ${END_LABELS[e.endLabel] ?? e.endLabel}`;
      if (e.end) return `${s} – ${e.end} (${wdEn(c.year, c.month, e.end)})`;
      return s;
    },
    weekday: wdEn,
    homeEyebrow: "This Month's Schedule",
    homeTitle: (y: number, m: number) => `${MONTHS[m - 1]} ${y}`,
    homeDays: (n: number) => `${n} school days`,
    homeLink: "View Full Calendar",
  },

  faq: {
    title: "FAQ",
    desc: "From admissions to school life — the questions we hear most often.",
    admissionTitle: "Admission Process",
    admissionNote: "Besides regular admissions, transfer admissions are held whenever openings arise.",
    steps: ["Request a Consultation", "Visit & Submit Documents", "Admission & Enrollment"],
    navAria: "FAQ categories",
    categories: FAQ_EN,
    homeKeys: ["1-1", "2-1", "2-2"],
    moreTitle: "Can't find your answer?",
    moreButton: "Ask on KakaoTalk",
  },
};

// 모든 학사일정 이름이 번역되어 있는지 개발 중 확인
if (process.env.NODE_ENV !== "production") {
  const missing = CAL.flatMap((c) => c.events.map((e) => e.label)).filter((l) => !(l in EVENT_LABELS));
  if (missing.length) console.warn("[i18n] 영문 학사일정 이름 누락:", [...new Set(missing)]);
}
