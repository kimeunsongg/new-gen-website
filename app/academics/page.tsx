import type { Metadata } from "next";
import { AcademicCalendar } from "@/components/Calendar";
import FourUm from "@/components/FourUm";
import { SectionTabs } from "@/components/ScrollNav";
import { ImageSlot, PageHeader, SectionHead } from "@/components/ui";
import { BASIC_DIRECTIONS } from "@/data/school";

export const metadata: Metadata = {
  title: "교육과정",
  description: "창의지성 교육과정, 중점활동 4-UM, K-리더십 프로젝트, 2026학년도 학사달력을 소개합니다.",
};

const TABS = [
  { id: "creative", label: "창의지성 교육과정" },
  { id: "operation", label: "교육과정 운영" },
  { id: "kleader", label: "K-리더십" },
  { id: "calendar", label: "학사달력" },
];

const FOUR_TEXT_TAGS = ["Text Reading", "Thinking", "Discussion", "Writing / Creating", "Presentation"];
const pad = (n: number) => String(n).padStart(2, "0");

export default function AcademicsPage() {
  return (
    <>
      <PageHeader title="교육과정" desc="독서와 체험, 실천과 참여로 이어지는 뉴젠리더십학교의 배움을 소개합니다." />
      <SectionTabs items={TABS} />

      <section id="creative" className="container section acad-section" aria-labelledby="creative-title">
        <SectionHead id="creative-title" eyebrow="창의지성 교육과정" title="4-텍스트" />
        <div className="grid-2">
          <div>
            <ImageSlot label="4-텍스트 다이어그램" />
            <ul className="tags">
              {FOUR_TEXT_TAGS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <ImageSlot label="워크시트 구조도" />
            <p className="creative__title">독서와 체험의 의미를 되새기는 새 교육과정</p>
            <p className="muted">고전 관련 주제별 정보 탐색 워크시트</p>
          </div>
        </div>
      </section>

      <section id="operation" className="container section acad-section" aria-labelledby="operation-title">
        <SectionHead id="operation-title" eyebrow="교육과정 운영" title="기본방향" />
        <ol className="grid-2 num-list">
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

        <div className="four-um-wrap">
          <SectionHead eyebrow="중점활동" title="4-UM" as="h3" />
          <p className="muted section-lead">영역을 선택하면 세부 활동을 볼 수 있습니다.</p>
          <FourUm />
        </div>
      </section>

      <section id="kleader" className="container section acad-section" aria-labelledby="kleader-title">
        <SectionHead id="kleader-title" eyebrow="지역교육과정 개발" title="K-리더십" />
        <div className="grid-2 kleader">
          <div className="kleader__logo">
            <ImageSlot label="Korea YEOSU K-Leadership 로고" ratio="1 / 1" className="kleader__logo-slot" />
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
        <div className="grid-4 kleader__photos">
          {[1, 2, 3, 4].map((n) => (
            <ImageSlot key={n} label={`활동 사진 ${n}`} />
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
