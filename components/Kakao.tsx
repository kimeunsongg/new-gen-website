import { getDict } from "@/data/dict";
import { SITE } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { ChevronIcon, KakaoIcon } from "./Icons";

type Props = { children: React.ReactNode; className?: string; iconSize?: number };

export function KakaoButton({ children, className = "btn btn--kakao", iconSize = 20 }: Props) {
  return (
    <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className={className}>
      <KakaoIcon size={iconSize} />
      {children}
    </a>
  );
}

/** 오른쪽 아래 카카오 상담 버튼 — 마우스를 올리거나 포커스하면 말풍선 */
export function KakaoFloat({ locale }: { locale: Locale }) {
  const t = getDict(locale).common;
  return (
    <div className="kakao-cta">
      <a
        href={SITE.kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="kakao-float"
        aria-label={t.kakaoFloat}
        aria-describedby="kakao-bubble"
      >
        <KakaoIcon size={28} />
      </a>
      {/* 버튼 위에 있을 때만 보이는 말풍선 — 버튼 전체가 링크라 말풍선 안은 표시용 */}
      <div className="kakao-cta__bubble" id="kakao-bubble" role="tooltip">
        <p>
          <strong>{t.kakaoBubble.greeting}</strong>
          <br />
          {t.kakaoBubble.question}
        </p>
        <span className="kakao-cta__link">
          {t.kakaoBubble.cta}
          <ChevronIcon size={16} />
        </span>
      </div>
    </div>
  );
}

export function ConsultBand({ locale }: { locale: Locale }) {
  const t = getDict(locale).common.consult;
  return (
    <section className="consult-band" aria-labelledby="consult-title">
      <div className="container consult-band__inner">
        <div>
          <h2 id="consult-title" className="consult-band__title">
            {t.title}
          </h2>
          <p className="consult-band__desc">
            {t.desc[0]}
            <br />
            {t.desc[1]}
          </p>
        </div>
        <KakaoButton className="btn btn--kakao btn--lg">{t.button}</KakaoButton>
      </div>
    </section>
  );
}
