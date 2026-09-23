// 2026학년도 학사달력 — 원본: reference/Graphic/학사달력.jpeg
// holidays: 공휴일·휴업일(빨강). 일요일은 자동으로 빨강 처리.
// events: start~end(같은 달 기준, 다음 달로 넘어가면 endLabel로 표기)
// ⚠ 원본 확인 필요: 6/29 "개교기념일"(원본은 금요일로 표기, 실제 29일은 월요일), 5/4 재량휴업일 색

export type CalEvent = {
  start: number;
  end?: number;
  endLabel?: string;
  label: string;
  holiday?: boolean;
};

export type CalMonth = {
  year: number;
  month: number; // 1~12
  schoolDays: number;
  holidays: number[];
  events: CalEvent[];
};

export const CAL_SUMMARY = [
  { label: "1학기 수업일수", days: 99 },
  { label: "여름계절학기", days: 10 },
  { label: "2학기 수업일수", days: 80 },
  { label: "겨울계절학기", days: 24 },
  { label: "연간 총 수업일수", days: 213, strong: true },
];

export const CAL: CalMonth[] = [
  {
    year: 2026, month: 3, schoolDays: 21, holidays: [1, 2],
    events: [
      { start: 1, label: "삼일절", holiday: true },
      { start: 2, label: "대체공휴일", holiday: true },
      { start: 3, label: "개학식" },
    ],
  },
  {
    year: 2026, month: 4, schoolDays: 22, holidays: [],
    events: [
      { start: 4, label: "1차 검정고시" },
      { start: 7, label: "봄소풍" },
      { start: 24, label: "아하콘텐츠페어" },
    ],
  },
  {
    year: 2026, month: 5, schoolDays: 17, holidays: [1, 4, 5, 25],
    events: [
      { start: 1, label: "노동절", holiday: true },
      { start: 4, label: "재량휴업일", holiday: true },
      { start: 5, label: "어린이날", holiday: true },
      { start: 14, end: 15, label: "민주시민생활캠프" },
      { start: 24, label: "부처님오신날", holiday: true },
      { start: 25, label: "대체공휴일", holiday: true },
      { start: 29, label: "아하콘텐츠페어" },
    ],
  },
  {
    year: 2026, month: 6, schoolDays: 21, holidays: [3, 6],
    events: [
      { start: 3, label: "2026 지방선거", holiday: true },
      { start: 6, label: "현충일", holiday: true },
      { start: 12, label: "독서의 날" },
      { start: 17, label: "북토크" },
      { start: 19, label: "아하콘텐츠페어" },
      { start: 29, label: "개교기념일" },
    ],
  },
  {
    year: 2026, month: 7, schoolDays: 18, holidays: [],
    events: [
      { start: 3, label: "봉사활동" },
      { start: 22, label: "아하콘텐츠페어" },
      { start: 23, end: 24, label: "항공우주캠프" },
      { start: 24, label: "방학식" },
    ],
  },
  {
    year: 2026, month: 8, schoolDays: 10, holidays: [15, 17],
    events: [
      { start: 3, end: 14, label: "계절학기" },
      { start: 11, label: "2차 검정고시" },
      { start: 31, label: "개학식" },
    ],
  },
  {
    year: 2026, month: 9, schoolDays: 21, holidays: [24, 25, 26],
    events: [
      { start: 4, label: "봉사활동" },
      { start: 18, label: "아하콘텐츠페어" },
      { start: 24, end: 26, label: "추석연휴", holiday: true },
    ],
  },
  {
    year: 2026, month: 10, schoolDays: 20, holidays: [3, 5, 9],
    events: [
      { start: 1, end: 2, label: "캠프" },
      { start: 3, label: "개천절", holiday: true },
      { start: 5, label: "대체공휴일", holiday: true },
      { start: 9, label: "한글날", holiday: true },
      { start: 23, label: "봉사활동" },
      { start: 30, label: "아하콘텐츠페어" },
    ],
  },
  {
    year: 2026, month: 11, schoolDays: 21, holidays: [],
    events: [
      { start: 2, label: "섬박람회 체험학습" },
      { start: 6, label: "봉사활동" },
      { start: 27, label: "아하콘텐츠페어" },
      { start: 30, endLabel: "12.2(수)", label: "캠프" },
    ],
  },
  {
    year: 2026, month: 12, schoolDays: 18, holidays: [25],
    events: [
      { start: 4, label: "봉사활동" },
      { start: 18, label: "아하콘텐츠페어" },
      { start: 20, end: 24, label: "입학상담주간" },
      { start: 20, end: 21, label: "입학설명회" },
      { start: 24, label: "겨울방학식" },
      { start: 25, label: "성탄절", holiday: true },
    ],
  },
  {
    year: 2027, month: 1, schoolDays: 15, holidays: [1],
    events: [
      { start: 1, label: "신정", holiday: true },
      { start: 11, end: 15, label: "무빙클래스 준비" },
      { start: 18, end: 29, label: "무빙클래스" },
    ],
  },
  {
    year: 2027, month: 2, schoolDays: 7, holidays: [6, 8, 9],
    events: [
      { start: 6, end: 8, label: "설연휴", holiday: true },
      { start: 9, label: "대체공휴일", holiday: true },
      { start: 10, end: 19, label: "계절학기" },
      { start: 17, label: "전교임원선거" },
    ],
  },
];

const WD = ["일", "월", "화", "수", "목", "금", "토"];

export function weekday(y: number, m: number, d: number) {
  return WD[new Date(y, m - 1, d).getDay()];
}

export function eventDateLabel(c: CalMonth, e: CalEvent) {
  const s = `${e.start}(${weekday(c.year, c.month, e.start)})`;
  if (e.endLabel) return `${s}-${e.endLabel}`;
  if (e.end) return `${s}-${e.end}(${weekday(c.year, c.month, e.end)})`;
  return s;
}

/** 이벤트가 있는 날짜 집합 (휴일 이벤트 제외) */
export function eventDays(c: CalMonth) {
  const set = new Set<number>();
  for (const e of c.events) {
    if (e.holiday) continue;
    const last = e.end ?? (e.endLabel ? new Date(c.year, c.month, 0).getDate() : e.start);
    for (let d = e.start; d <= last; d++) set.add(d);
  }
  return set;
}

/** 오늘이 속한 달의 인덱스. 학년도 밖이면 가장 가까운 끝 달. */
export function currentMonthIndex(now = new Date()) {
  const key = now.getFullYear() * 12 + now.getMonth();
  const first = CAL[0].year * 12 + CAL[0].month - 1;
  return Math.min(CAL.length - 1, Math.max(0, key - first));
}
