import FaqAccordion from "@/components/FaqAccordion";
import HeroCarousel from "@/components/HeroCarousel";
import { MonthSchedule } from "@/components/Calendar";
import { SectionHead } from "@/components/ui";
import { FAQ, HOME_FAQ_KEYS } from "@/data/faq";
import { FOUR_UM, TALENTS } from "@/data/school";

const homeFaq = FAQ.flatMap((c) => c.items).filter((i) => HOME_FAQ_KEYS.includes(i.key));

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className="container section" aria-labelledby="talent-title">
        <SectionHead id="talent-title" title="우리가 기르는 사람" link={{ href: "/about/", label: "학교 소개" }} />
        <ul className="grid-4 rule-top home-talents">
          {TALENTS.map((t) => (
            <li key={t.name}>
              <strong>{t.name}</strong>
              <p>{t.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section" aria-labelledby="um-title">
        <SectionHead
          id="um-title"
          eyebrow="중점활동 4-UM"
          title="배움 · 키움 · 채움 · 나눔"
          link={{ href: "/academics/#operation", label: "교육과정 운영" }}
        />
        <ul className="um-rows">
          {FOUR_UM.map((u) => (
            <li key={u.area}>
              <div className="um-rows__head">
                <strong>{u.area}영역</strong>
                <span>{u.type}</span>
              </div>
              <p>{u.activities.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section" aria-label="이번 달 학사일정">
        <MonthSchedule />
      </section>

      <section className="container section" aria-labelledby="faq-title">
        <SectionHead id="faq-title" title="자주 묻는 질문" link={{ href: "/faq/", label: "전체 보기" }} />
        <div className="rule-top">
          <FaqAccordion items={homeFaq} />
        </div>
      </section>
    </>
  );
}
