import FaqAccordion from "@/components/FaqAccordion";
import { KakaoButton } from "@/components/Kakao";
import { CategoryNav } from "@/components/ScrollNav";
import { PageHeader } from "@/components/ui";
import { getDict } from "@/data/dict";
import type { Locale } from "@/lib/i18n";

export default function FaqView({ locale }: { locale: Locale }) {
  const f = getDict(locale).faq;
  return (
    <>
      <PageHeader title={f.title} desc={f.desc} />

      <div className="container">
        <section className="admission-panel" aria-labelledby="admission-title">
          <div className="admission-panel__head">
            <h2 id="admission-title">{f.admissionTitle}</h2>
            <p>{f.admissionNote}</p>
          </div>
          <ol className="grid-4 admission-steps">
            {f.steps.map((s, i) => (
              <li key={s}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{s}</strong>
              </li>
            ))}
          </ol>
        </section>

        <div className="faq-body">
          <CategoryNav label={f.navAria} items={f.categories.map((c, i) => ({ id: c.id, label: `${i + 1}. ${c.title}` }))} />
          <div className="faq-sections">
            {f.categories.map((c, i) => (
              <section key={c.id} id={c.id} className="faq-section" aria-labelledby={`${c.id}-title`}>
                <h2 id={`${c.id}-title`} className="faq-section__title">
                  {i + 1}. {c.title}
                </h2>
                <FaqAccordion items={c.items} defaultOpen={i === 0 ? [c.items[0].key] : []} />
              </section>
            ))}
            <div className="faq-more">
              <p>{f.moreTitle}</p>
              <KakaoButton className="btn btn--kakao btn--sm">{f.moreButton}</KakaoButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
