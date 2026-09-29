import ScaleToFit from "@/components/ScaleToFit";
import TalentDiagram from "@/components/TalentDiagram";
import { PageHeader } from "@/components/ui";
import { getDict } from "@/data/dict";
import type { Locale } from "@/lib/i18n";

export default function AboutView({ locale }: { locale: Locale }) {
  const a = getDict(locale).about;
  return (
    <>
      <PageHeader title={a.title} desc={a.desc} />

      <section id="history" className="container section--sm" aria-labelledby="history-title">
        <h2 id="history-title" className="section-title section-title--sm">
          {a.history}
        </h2>
        <ScaleToFit width={760}>
          <div className="timeline-wrap">
            <ol className="timeline">
              {a.historyItems.map((h) => (
                <li key={h.year}>
                  <span className="timeline__dot" aria-hidden="true" />
                  <strong className="timeline__year">{h.year}</strong>
                  <ul>
                    {h.items.map((it) => (
                      <li key={it.date}>
                        <span className="timeline__date">{it.date}</span>
                        {it.text}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </ScaleToFit>
      </section>

      <section className="band band--primary" aria-labelledby="mission-title">
        <div className="container">
          <p id="mission-title" className="band__eyebrow">
            {a.missionLabel}
          </p>
          <p className="band__statement">{a.mission}</p>
        </div>
      </section>

      <section className="container section" aria-labelledby="talent-title">
        <h2 id="talent-title" className="section-title section-title--sm">
          {a.talentTitle}
        </h2>
        <TalentDiagram locale={locale} />
      </section>

      <section className="band band--gray" aria-labelledby="vision-title">
        <div className="container vision">
          <div>
            <p id="vision-title" className="eyebrow">
              {a.visionLabel}
            </p>
            <p className="vision__statement">{a.vision}</p>
          </div>
          <blockquote className="vision__quote">
            {a.matthew.map((v, i) => (
              <p key={i}>
                <sup>{13 + i}</sup> {v}
              </p>
            ))}
            <cite>{a.matthewCite}</cite>
          </blockquote>
        </div>
      </section>

      <section id="leadership" className="container leadership" aria-labelledby="leadership-title">
        <h2 id="leadership-title" className="sr-only">
          {a.leadershipTitle}
        </h2>
        <div className="leadership__profile">
          <img src="/images/principal.jpg" alt={a.principalAlt} width={960} height={1200} className="leadership__photo" />
          <p className="leadership__name">
            <strong>{a.principalName}</strong>
            <span>{a.principalTitle}</span>
          </p>
          <ul className="leadership__cv">
            {a.principalProfile.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="leadership__message">
          <h3>
            <span className="ib">{a.greetingTitle[0]}</span> <span className="ib">{a.greetingTitle[1]}</span>
          </h3>
          {a.greetingIntro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="leadership__virtues">
            <p>{a.greetingVirtuesLead}</p>
            {a.greetingVirtues.map((v) => (
              <p key={v.word}>
                {v.before}
                <strong>{v.word}</strong>
                {v.after}
              </p>
            ))}
          </div>
          <p>{a.greetingOutro}</p>
          <p className="leadership__closing">{a.greetingClosing}</p>
        </div>
      </section>
    </>
  );
}
