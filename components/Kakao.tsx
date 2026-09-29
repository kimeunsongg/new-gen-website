import { getDict } from "@/data/dict";
import { SITE } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { KakaoIcon } from "./Icons";

type Props = { children: React.ReactNode; className?: string; iconSize?: number };

export function KakaoButton({ children, className = "btn btn--kakao", iconSize = 20 }: Props) {
  return (
    <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className={className}>
      <KakaoIcon size={iconSize} />
      {children}
    </a>
  );
}

export function KakaoFloat({ locale }: { locale: Locale }) {
  return (
    <a
      href={SITE.kakaoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="kakao-float"
      aria-label={getDict(locale).common.kakaoFloat}
    >
      <KakaoIcon size={28} />
    </a>
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
