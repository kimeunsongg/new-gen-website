import { AcademicCalendar } from "@/components/Calendar";
import {
  BasicDirectionsDiagram,
  FourTextPanel,
  FourUmBoard,
  KLeaderLogo,
  ReadingFlowPanel,
} from "@/components/Curriculum";
import HashScrollFix from "@/components/HashScrollFix";
import ScaleToFit from "@/components/ScaleToFit";
import { SectionTabs } from "@/components/ScrollNav";
import { PageHeader, SectionHead } from "@/components/ui";
import { getDict } from "@/data/dict";
import type { Locale } from "@/lib/i18n";

// 브로셔 배치대로: 1·2는 한 줄, 3·4는 각각 한 줄. w/h는 원본 픽셀 크기(자르지 않고 비율 유지)
const KLEADER_PHOTO_ROWS = [
  [
    { src: "/images/kleader-1.jpg", w: 359, h: 290 },
    { src: "/images/kleader-2.jpg", w: 547, h: 292 },
  ],
  [{ src: "/images/kleader-3.jpg", w: 969, h: 302 }],
  [{ src: "/images/kleader-4.jpg", w: 978, h: 310 }],
];

/** 브로셔 한 면: 옅은 색 배경 + 큰 제목 + 흰 카드 + 책갈피 리본 */
function EduSheet({
  id,
  title,
  tone,
  children,
}: {
  id: string;
  title: string;
  tone: "green" | "navy" | "teal";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="container section acad-section" aria-labelledby={`${id}-title`}>
      <div className={`edu-sheet edu-sheet--${tone}`}>
        <span className="edu-sheet__ribbon" aria-hidden="true" />
        <h2 id={`${id}-title`} className="edu-sheet__title">
          {title}
        </h2>
        <div className="edu-sheet__card">{children}</div>
      </div>
    </section>
  );
}

function EduSub({ children }: { children: React.ReactNode }) {
  return <h3 className="edu-sub">{children}</h3>;
}

export default function AcademicsView({ locale }: { locale: Locale }) {
  const a = getDict(locale).academics;
  let photo = 0;
  return (
    <>
      <HashScrollFix />
      <PageHeader title={a.title} desc={a.desc} />
      <SectionTabs
        label={a.tabsAria}
        items={[
          { id: "operation", label: a.tabs.operation },
          { id: "creative", label: a.tabs.creative },
          { id: "kleader", label: a.tabs.kleader },
          { id: "calendar", label: a.tabs.calendar },
        ]}
      />

      <EduSheet id="operation" title={a.operation.title} tone="green">
        <EduSub>{a.operation.basic}</EduSub>
        <BasicDirectionsDiagram locale={locale} />
        <EduSub>{a.operation.core}</EduSub>
        <ScaleToFit width={900}>
          <FourUmBoard locale={locale} />
        </ScaleToFit>
        <p className="edu-note">{a.notes.fourUm}</p>
      </EduSheet>

      <EduSheet id="creative" title={a.creative.title} tone="navy">
        <EduSub>{a.creative.fourText}</EduSub>
        <ScaleToFit width={960}>
          <FourTextPanel locale={locale} />
        </ScaleToFit>
        <p className="edu-note">{a.notes.fourText}</p>
        <EduSub>{a.creative.reading}</EduSub>
        <ScaleToFit width={960}>
          <ReadingFlowPanel locale={locale} />
        </ScaleToFit>
      </EduSheet>

      <EduSheet id="kleader" title={a.kleader.title} tone="teal">
        <EduSub>{a.kleader.sub}</EduSub>
        <p className="kleader__projects">{a.kleader.projects}</p>
        <div className="kleader__logo">
          <KLeaderLogo locale={locale} />
        </div>
        <div className="kleader__photos">
          {KLEADER_PHOTO_ROWS.map((row, i) => (
            <div key={i} className="kleader__row">
              {row.map((p) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt={a.kleader.photos[photo++]}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  style={{ "--ratio": p.w / p.h } as React.CSSProperties}
                />
              ))}
            </div>
          ))}
        </div>
      </EduSheet>

      <section id="calendar" className="container section acad-section" aria-labelledby="calendar-title">
        <SectionHead id="calendar-title" eyebrow={a.calendarEyebrow} title={a.calendarTitle} />
        <AcademicCalendar locale={locale} />
      </section>
    </>
  );
}
