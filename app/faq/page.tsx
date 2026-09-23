import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { KakaoButton } from "@/components/Kakao";
import { CategoryNav } from "@/components/ScrollNav";
import { PageHeader } from "@/components/ui";
import { FAQ } from "@/data/faq";
import { ADMISSION_STEPS } from "@/data/school";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "입학 절차, 학력 인정, 진학, 학교생활, 전자기기 규정, 급식과 통학에 대한 질문과 답변입니다.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader title="자주 묻는 질문" desc="입학 절차부터 학교생활까지, 가장 많이 묻는 질문을 모았습니다." />

      <div className="container">
        <section className="admission-panel" aria-labelledby="admission-title">
          <div className="admission-panel__head">
            <h2 id="admission-title">입학 절차</h2>
            <p>정기 모집 외에도 결원 시 수시 편입학을 진행합니다.</p>
          </div>
          <ol className="grid-4 admission-steps">
            {ADMISSION_STEPS.map((s, i) => (
              <li key={s}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{s}</strong>
              </li>
            ))}
          </ol>
        </section>

        <div className="faq-body">
          <CategoryNav items={FAQ.map((c, i) => ({ id: c.id, label: `${i + 1}. ${c.title}` }))} />
          <div className="faq-sections">
            {FAQ.map((c, i) => (
              <section key={c.id} id={c.id} className="faq-section" aria-labelledby={`${c.id}-title`}>
                <h2 id={`${c.id}-title`} className="faq-section__title">
                  {i + 1}. {c.title}
                </h2>
                <FaqAccordion items={c.items} defaultOpen={i === 0 ? [c.items[0].key] : []} />
              </section>
            ))}
            <div className="faq-more">
              <p>찾는 답이 없으신가요?</p>
              <KakaoButton className="btn btn--kakao btn--sm">카카오톡 문의</KakaoButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
