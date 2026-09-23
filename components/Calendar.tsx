"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CAL, CAL_SUMMARY, currentMonthIndex, eventDateLabel, eventDays, type CalMonth } from "@/data/calendar";
import { ChevronIcon } from "./Icons";

const WD = ["일", "월", "화", "수", "목", "금", "토"];

/** 정적 빌드 시점이 아니라 방문 시점의 "이번 달"을 쓰기 위해 마운트 후에 계산 */
function useCurrentMonth() {
  const [idx, setIdx] = useState(0);
  useEffect(() => setIdx(currentMonthIndex()), []);
  return [idx, setIdx] as const;
}

function EventList({ c }: { c: CalMonth }) {
  return (
    <ul className="cal-events">
      {c.events.map((e, i) => (
        <li key={i}>
          <span className={`cal-events__date${e.holiday ? " is-holiday" : ""}`}>{eventDateLabel(c, e)}</span>
          <span>{e.label}</span>
        </li>
      ))}
    </ul>
  );
}

function MonthGrid({ c }: { c: CalMonth }) {
  const firstDow = new Date(c.year, c.month - 1, 1).getDay();
  const last = new Date(c.year, c.month, 0).getDate();
  const evs = eventDays(c);
  const cells: (number | null)[] = [...Array(firstDow).fill(null), ...Array.from({ length: last }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);

  return (
    <table className="cal-grid">
      <caption className="sr-only">
        {c.year}년 {c.month}월 달력
      </caption>
      <thead>
        <tr>
          {WD.map((w, i) => (
            <th key={w} scope="col" className={i === 0 ? "is-red" : i === 6 ? "is-blue" : undefined}>
              {w}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: cells.length / 7 }, (_, r) => (
          <tr key={r}>
            {cells.slice(r * 7, r * 7 + 7).map((d, i) => {
              if (d === null) return <td key={i} />;
              const red = i === 0 || c.holidays.includes(d);
              const cls = [red ? "is-red" : i === 6 ? "is-blue" : "", evs.has(d) ? "has-event" : ""].join(" ").trim();
              return (
                <td key={i} className={cls || undefined}>
                  <span>{d}</span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function AcademicCalendar() {
  const [idx, setIdx] = useCurrentMonth();
  const c = CAL[idx];

  return (
    <div className="cal">
      <ul className="cal-summary">
        {CAL_SUMMARY.map((s) => (
          <li key={s.label} className={s.strong ? "is-strong" : undefined}>
            {s.label} <b>{s.days}일</b>
          </li>
        ))}
      </ul>

      <div className="cal-pager">
        <button type="button" className="cal-pager__arrow" onClick={() => setIdx(idx - 1)} disabled={idx === 0} aria-label="이전 달">
          <ChevronIcon dir="left" />
        </button>
        <div className="cal-pager__months">
          {CAL.map((m, i) => (
            <button
              key={m.month}
              type="button"
              className="cal-pager__month"
              aria-pressed={i === idx}
              onClick={() => setIdx(i)}
            >
              {m.month}월
            </button>
          ))}
        </div>
        <button
          type="button"
          className="cal-pager__arrow"
          onClick={() => setIdx(idx + 1)}
          disabled={idx === CAL.length - 1}
          aria-label="다음 달"
        >
          <ChevronIcon />
        </button>
      </div>

      <div className="cal-body">
        <div className="cal-month">
          <div className="cal-month__head">
            <h3>
              {c.month}월 <span className="sr-only">{c.year}년</span>
            </h3>
            <p>
              수업일수 <b>{c.schoolDays}일</b>
            </p>
          </div>
          <MonthGrid c={c} />
          <p className="cal-legend">
            <span className="cal-legend__dot" /> 학교 일정 <span className="cal-legend__red">15</span> 공휴일 · 휴업일
          </p>
        </div>
        <div className="cal-side">
          <h4>{c.month}월 일정</h4>
          <EventList c={c} />
        </div>
      </div>
    </div>
  );
}

/** Home: 이번 달 학사일정 */
export function MonthSchedule() {
  const [idx] = useCurrentMonth();
  const c = CAL[idx];
  return (
    <div className="month-schedule">
      <div className="month-schedule__head">
        <p className="eyebrow">이번 달 학사일정</p>
        <h2 className="section-title">
          {c.year}년 {c.month}월
        </h2>
        <p className="month-schedule__days">수업일수 {c.schoolDays}일</p>
        <Link href="/academics/#calendar" className="btn btn--outline">
          전체 학사달력 보기
        </Link>
      </div>
      <EventList c={c} />
    </div>
  );
}
