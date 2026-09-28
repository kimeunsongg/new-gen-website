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
import { BASIC_DIRECTIONS } from "@/data/school";

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

const KLEADER_PHOTOS = [
  { src: "/images/kleader-1.jpg", alt: "학생이 마을 아이들에게 활동 자료를 보여 주는 모습" },
  { src: "/images/kleader-2.jpg", alt: "무대에서 공연하는 학생들" },
  { src: "/images/kleader-3.jpg", alt: "라디오 스튜디오에서 방송에 참여한 학생들" },
  { src: "/images/kleader-4.jpg", alt: "숲속 힐링 음악회에서 공연하는 학생들" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function AcademicsPage() {
  return (
    <>
      <PageHeader title="교육과정" desc="독서와 체험, 실천과 참여로 이어지는 뉴젠리더십학교의 배움을 소개합니다." />
      <SectionTabs items={TABS} />

      <section id="operation" className="container section acad-section" aria-labelledby="operation-title">
        <SectionHead id="operation-title" eyebrow="교육과정 운영" title="기본방향" />
        <div className="grid-2 bd">
          <BasicDirectionsDiagram />
          <ol className="num-list">
            {BASIC_DIRECTIONS.map((d, i) => (
              <li key={d.title}>
                <span className="num-list__num">{pad(i + 1)}</span>
                <div>
                  <p className="num-list__title">{d.title}</p>
                  <p className="num-list__desc">{d.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="subsection">
          <SectionHead eyebrow="중점활동" title="4-UM" as="h3" />
          <ScaleToFit width={900}>
            <FourUmBoard />
          </ScaleToFit>
        </div>
      </section>

      <section id="creative" className="container section acad-section" aria-labelledby="creative-title">
        <SectionHead id="creative-title" eyebrow="창의지성 교육과정" title="4-텍스트" />
        <ScaleToFit width={1040}>
          <FourTextPanel />
        </ScaleToFit>

        <div className="subsection">
          <SectionHead title="독서와 체험의 의미를 되살리는 새 교육과정" as="h3" />
          <ScaleToFit width={1040}>
            <ReadingFlowPanel />
          </ScaleToFit>
        </div>
      </section>

      <section id="kleader" className="container section acad-section" aria-labelledby="kleader-title">
        <SectionHead id="kleader-title" eyebrow="지역교육과정 개발" title="K-리더십" />
        <div className="grid-2 kleader">
          <div className="kleader__logo">
            <KLeaderLogo />
          </div>
          <ol className="kleader__list">
            <li>
              <span>01</span> 이순신 장군 프로젝트
            </li>
            <li>
              <span>02</span> 손양원 목사 프로젝트
            </li>
          </ol>
        </div>
        <div className="kleader__photos">
          {KLEADER_PHOTOS.map((p) => (
            <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
          ))}
        </div>
      </section>

      <section id="calendar" className="container section acad-section" aria-labelledby="calendar-title">
        <SectionHead id="calendar-title" eyebrow="학사일정" title="2026학년도 학사달력" />
        <AcademicCalendar />
      </section>
    </>
  );
}
