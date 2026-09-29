"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CAL, CAL_SUMMARY, currentMonthIndex, eventDays, type CalMonth } from "@/data/calendar";
import { getDict } from "@/data/dict";
import { localePath, type Locale } from "@/lib/i18n";
import { ChevronIcon } from "./Icons";

/** 정적 빌드 시점이 아니라 방문 시점의 "이번 달"을 쓰기 위해 마운트 후에 계산 */
function useCurrentMonth() {
  const [idx, setIdx] = useState(0);
  useEffect(() => setIdx(currentMonthIndex()), []);
  return [idx, setIdx] as const;
}

function EventList({ c, locale }: { c: CalMonth; locale: Locale }) {
  const t = getDict(locale).calendar;
  return (
    <ul className="cal-events">
      {c.events.map((e, i) => (
        <li key={i}>
          <span className={`cal-events__date${e.holiday ? " is-holiday" : ""}`}>{t.dateLabel(c, e)}</span>
          <span>{t.eventLabel(e.label)}</span>
        </li>
      ))}
    </ul>
  );
}

function MonthGrid({ c, locale }: { c: CalMonth; locale: Locale }) {
  const t = getDict(locale).calendar;
  const firstDow = new Date(c.year, c.month - 1, 1).getDay();
  const last = new Date(c.year, c.month, 0).getDate();
  const evs = eventDays(c);
  const cells: (number | null)[] = [...Array(firstDow).fill(null), ...Array.from({ length: last }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);

  return (
    <table className="cal-grid">
      <caption className="sr-only">{t.caption(c.year, c.month)}</caption>
      <thead>
        <tr>
          {t.weekdays.map((w, i) => (
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

export function AcademicCalendar({ locale }: { locale: Locale }) {
  const t = getDict(locale).calendar;
  const [idx, setIdx] = useCurrentMonth();
  const c = CAL[idx];

  return (
    <div className="cal">
      <ul className="cal-summary">
        {CAL_SUMMARY.map((s, i) => (
          <li key={s.label} className={s.strong ? "is-strong" : undefined}>
            {t.summary[i]} <b>{t.days(s.days)}</b>
          </li>
        ))}
      </ul>

      <div className="cal-pager">
        <button type="button" className="cal-pager__arrow" onClick={() => setIdx(idx - 1)} disabled={idx === 0} aria-label={t.prev}>
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
              {t.monthShort(m.month)}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="cal-pager__arrow"
          onClick={() => setIdx(idx + 1)}
          disabled={idx === CAL.length - 1}
          aria-label={t.next}
        >
          <ChevronIcon />
        </button>
      </div>

      <div className="cal-body">
        <div className="cal-month">
          <div className="cal-month__head">
            <h3>
              {t.monthTitle(c.year, c.month)} <span className="sr-only">{c.year}</span>
            </h3>
            <p>
              {t.schoolDays} <b>{t.days(c.schoolDays)}</b>
            </p>
          </div>
          <MonthGrid c={c} locale={locale} />
          <p className="cal-legend">
            <span className="cal-legend__dot" /> {t.legendEvent} <span className="cal-legend__red">15</span>{" "}
            {t.legendHoliday}
          </p>
        </div>
        <div className="cal-side">
          <h4>{t.monthEvents(c.month)}</h4>
          <EventList c={c} locale={locale} />
        </div>
      </div>
    </div>
  );
}

/** Home: 이번 달 학사일정 */
export function MonthSchedule({ locale }: { locale: Locale }) {
  const t = getDict(locale).calendar;
  const [idx] = useCurrentMonth();
  const c = CAL[idx];
  return (
    <div className="month-schedule">
      <div className="month-schedule__head">
        <p className="eyebrow">{t.homeEyebrow}</p>
        <h2 className="section-title">{t.homeTitle(c.year, c.month)}</h2>
        <p className="month-schedule__days">{t.homeDays(c.schoolDays)}</p>
        <Link href={localePath(locale, "/academics/#calendar")} className="btn btn--outline">
          {t.homeLink}
        </Link>
      </div>
      <EventList c={c} locale={locale} />
    </div>
  );
}
