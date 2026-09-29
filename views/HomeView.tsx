import { MonthSchedule } from "@/components/Calendar";
import FaqAccordion from "@/components/FaqAccordion";
import HeroCarousel from "@/components/HeroCarousel";
import { SectionHead } from "@/components/ui";
import { getDict } from "@/data/dict";
import { localePath, type Locale } from "@/lib/i18n";

export default function HomeView({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const homeFaq = d.faq.categories.flatMap((c) => c.items).filter((i) => d.faq.homeKeys.includes(i.key));
  return (
    <>
      <HeroCarousel locale={locale} />

      <section className="container section" aria-labelledby="talent-title">
        <SectionHead
          id="talent-title"
          title={d.home.talentTitle}
          link={{ href: localePath(locale, "/about/"), label: d.home.talentLink }}
        />
        <ul className="grid-4 rule-top home-talents">
          {d.talents.map((t) => (
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
          eyebrow={d.home.umEyebrow}
          title={d.home.umTitle}
          link={{ href: localePath(locale, "/academics/#operation"), label: d.home.umLink }}
        />
        <ul className="um-rows">
          {d.fourUm.map((u) => (
            <li key={u.areaLabel}>
              <div className="um-rows__head">
                <strong>{u.areaLabel}</strong>
                <span>{u.type}</span>
              </div>
              <p>{u.activities.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section" aria-label={d.home.monthAria}>
        <MonthSchedule locale={locale} />
      </section>

      <section className="container section" aria-labelledby="faq-title">
        <SectionHead
          id="faq-title"
          title={d.home.faqTitle}
          link={{ href: localePath(locale, "/faq/"), label: d.common.viewAll }}
        />
        <div className="rule-top">
          <FaqAccordion items={homeFaq} />
        </div>
      </section>
    </>
  );
}
