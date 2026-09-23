import type { Metadata } from "next";
import TalentDiagram from "@/components/TalentDiagram";
import { PageHeader } from "@/components/ui";
import { GREETING, HISTORY, MATTHEW, MISSION, PRINCIPAL, VISION } from "@/data/school";

export const metadata: Metadata = {
  title: "학교 소개",
  description: "뉴젠리더십학교의 연혁, 미션과 비전, 인재상, 교장 인사말을 소개합니다.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="학교 소개" desc="뉴젠리더십학교가 걸어온 길과 세우고자 하는 사람을 소개합니다." />

      <section id="history" className="container section--sm" aria-labelledby="history-title">
        <h2 id="history-title" className="section-title section-title--sm">
          연혁
        </h2>
        <div className="scroll-x">
          <ol className="timeline">
            {HISTORY.map((h) => (
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
      </section>

      <section className="band band--primary" aria-labelledby="mission-title">
        <div className="container">
          <p id="mission-title" className="band__eyebrow">
            Mission
          </p>
          <p className="band__statement">{MISSION}</p>
        </div>
      </section>

      <section className="container section" aria-labelledby="talent-title">
        <h2 id="talent-title" className="section-title section-title--sm">
          인재상
        </h2>
        <TalentDiagram />
      </section>

      <section className="band band--gray" aria-labelledby="vision-title">
        <div className="container vision">
          <div>
            <p id="vision-title" className="eyebrow">
              Vision
            </p>
            <p className="vision__statement">{VISION}</p>
          </div>
          <blockquote className="vision__quote">
            {MATTHEW.map((v, i) => (
              <p key={i}>
                <sup>{13 + i}</sup> {v}
              </p>
            ))}
            <cite>마태복음 5장 13~16절</cite>
          </blockquote>
        </div>
      </section>

      <section id="leadership" className="container leadership" aria-labelledby="leadership-title">
        <h2 id="leadership-title" className="sr-only">
          교장 인사말
        </h2>
        <div className="leadership__profile">
          <img src="/images/principal.jpg" alt="정재천 교장" width={960} height={1200} className="leadership__photo" />
          <p className="leadership__name">
            <strong>{PRINCIPAL.name}</strong>
            <span>{PRINCIPAL.title}</span>
          </p>
          <ul className="leadership__cv">
            {PRINCIPAL.profile.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="leadership__message">
          <h3>
            <span className="ib">새로운 시대, 새로운 세대를 세우는</span>{" "}
            <span className="ib">뉴젠리더십학교에 오신 것을 환영합니다.</span>
          </h3>
          {GREETING.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="leadership__virtues">
            <p>{GREETING.virtuesLead}</p>
            {GREETING.virtues.map((v) => (
              <p key={v.word}>
                {v.order}는 “<strong>{v.word}</strong>”입니다. {v.text}
              </p>
            ))}
          </div>
          <p>{GREETING.outro}</p>
          <p className="leadership__closing">축복합니다.</p>
        </div>
      </section>
    </>
  );
}
