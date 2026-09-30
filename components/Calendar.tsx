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

function EventList({ c, locale, schoolOnly = false }: { c: CalMonth; locale: Locale; schoolOnly?: boolean }) {
  const t = getDict(locale).calendar;
  // schoolOnly: 공휴일·휴업일은 빼고 학교 행사만
  const events = schoolOnly ? c.events.filter((e) => !e.holiday) : c.events;
  return (
    <ul className="cal-events">
      {events.map((e, i) => (
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

function Legend({ locale }: { locale: Locale }) {
  const t = getDict(locale).calendar;
  return (
    <p className="cal-legend">
      <span className="cal-legend__dot" /> {t.legendEvent}
    </p>
  );
}

/** 연간 보기: 12개월 작은 달력 + 달별 일정 (원본 종이 달력처럼) */
function YearView({ locale, onPick }: { locale: Locale; onPick: (i: number) => void }) {
  const t = getDict(locale).calendar;
  return (
    <>
      <div className="cal-year">
        {CAL.map((c, i) => (
          <section key={`${c.year}-${c.month}`} className="cal-mini" aria-label={t.homeTitle(c.year, c.month)}>
            <div className="cal-mini__head">
              <button type="button" className="cal-mini__title" onClick={() => onPick(i)} title={t.openMonth}>
                {t.monthTitle(c.year, c.month)}
              </button>
              <p>
                {t.schoolDays} <b>{t.days(c.schoolDays)}</b>
              </p>
            </div>
            <MonthGrid c={c} locale={locale} />
            <EventList c={c} locale={locale} schoolOnly />
          </section>
        ))}
      </div>
      <Legend locale={locale} />
    </>
  );
}

export function AcademicCalendar({ locale }: { locale: Locale }) {
  const t = getDict(locale).calendar;
  const [idx, setIdx] = useCurrentMonth();
  const [view, setView] = useState<"month" | "year">("month");
  const c = CAL[idx];

  return (
    <div className="cal">
      <div className="cal-top">
        <ul className="cal-summary">
          {CAL_SUMMARY.map((s, i) => (
            <li key={s.label} className={s.strong ? "is-strong" : undefined}>
              {t.summary[i]} <b>{t.days(s.days)}</b>
            </li>
          ))}
        </ul>
        <div className="cal-view" role="group" aria-label={t.viewAria}>
          {(["year", "month"] as const).map((v) => (
            <button
              key={v}
              type="button"
              className="cal-view__opt"
              aria-pressed={view === v}
              onClick={() => setView(v)}
            >
              {v === "month" ? t.viewMonth : t.viewYear}
            </button>
          ))}
        </div>
      </div>

      {view === "year" ? (
        <YearView
          locale={locale}
          onPick={(i) => {
            setIdx(i);
            setView("month");
          }}
        />
      ) : (
        <>
          <div className="cal-pager">
            <button type="button" className="cal-pager__arrow" onClick={() => setIdx(idx - 1)} disabled={idx === 0} aria-label={t.prev}>
              <ChevronIcon dir="left" />
            </button>
            <p className="cal-pager__current" aria-live="polite">
              {t.homeTitle(c.year, c.month)}
            </p>
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
              <Legend locale={locale} />
            </div>
            <div className="cal-side">
              <h4>{t.monthEvents(c.month)}</h4>
              <EventList c={c} locale={locale} />
            </div>
          </div>
        </>
      )}
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
