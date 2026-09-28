import type { Metadata } from "next";
import { AcademicCalendar } from "@/components/Calendar";
import {
  BasicDirectionsDiagram,
  FourTextPanel,
  FourUmBoard,
  KLeaderLogo,
  ReadingFlowPanel,
} from "@/components/Curriculum";
import ScaleToFit from "@/components/ScaleToFit";
import { SectionTabs } from "@/components/ScrollNav";
import { PageHeader, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "교육과정",
  description: "교육과정 운영(기본방향, 중점활동 4-UM), 창의지성 교육과정, K-리더십 지역교육과정, 2026학년도 학사달력을 소개합니다.",
};

const TABS = [
  { id: "operation", label: "교육과정 운영" },
  { id: "creative", label: "창의지성 교육과정" },
  { id: "kleader", label: "지역교육과정 개발" },
  { id: "calendar", label: "학사달력" },
];

// 브로셔 배치대로: 1·2는 한 줄, 3·4는 각각 한 줄. w/h는 원본 픽셀 크기(자르지 않고 비율 유지)
const KLEADER_PHOTO_ROWS = [
  [
    { src: "/images/kleader-1.jpg", w: 359, h: 290, alt: "학생이 마을 아이들에게 활동 자료를 보여 주는 모습" },
    { src: "/images/kleader-2.jpg", w: 547, h: 292, alt: "무대에서 공연하는 학생들" },
  ],
  [{ src: "/images/kleader-3.jpg", w: 969, h: 302, alt: "라디오 스튜디오에서 방송에 참여한 학생들" }],
  [{ src: "/images/kleader-4.jpg", w: 978, h: 310, alt: "숲속 힐링 음악회에서 공연하는 학생들" }],
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

export default function AcademicsPage() {
  return (
    <>
      <PageHeader title="교육과정" desc="독서와 체험, 실천과 참여로 이어지는 뉴젠리더십학교의 배움을 소개합니다." />
      <SectionTabs items={TABS} />

      <EduSheet id="operation" title="교육과정 운영" tone="green">
        <EduSub>기본방향</EduSub>
        <BasicDirectionsDiagram />
        <EduSub>중점활동</EduSub>
        <ScaleToFit width={900}>
          <FourUmBoard />
        </ScaleToFit>
      </EduSheet>

      <EduSheet id="creative" title="창의지성 교육과정" tone="navy">
        <EduSub>4-텍스트</EduSub>
        <ScaleToFit width={960}>
          <FourTextPanel />
        </ScaleToFit>
        <EduSub>독서와 체험의 의미를 되살리는 새 교육과정</EduSub>
        <ScaleToFit width={960}>
          <ReadingFlowPanel />
        </ScaleToFit>
      </EduSheet>

      <EduSheet id="kleader" title="지역교육과정 개발" tone="teal">
        <EduSub>K-리더십</EduSub>
        <p className="kleader__projects">이순신 장군 프로젝트 / 손양원 목사 프로젝트</p>
        <div className="kleader__logo">
          <KLeaderLogo />
        </div>
        <div className="kleader__photos">
          {KLEADER_PHOTO_ROWS.map((row, i) => (
            <div key={i} className="kleader__row">
              {row.map((p) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
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
        <SectionHead id="calendar-title" eyebrow="학사일정" title="2026학년도 학사달력" />
        <AcademicCalendar />
      </section>
    </>
  );
}
