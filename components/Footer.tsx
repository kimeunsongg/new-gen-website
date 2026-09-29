import Link from "next/link";
import { getDict } from "@/data/dict";
import { SITE, SNS } from "@/data/site";
import { localePath, type Locale } from "@/lib/i18n";
import { BlogIcon, InstagramIcon, YoutubeIcon } from "./Icons";

const SNS_ICON = { instagram: InstagramIcon, youtube: YoutubeIcon, blog: BlogIcon };

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale).common;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <div className="site-footer__name">
              <img src="/images/logo-emblem.png" alt="" width={48} height={48} />
              <span>{t.schoolName}</span>
            </div>
            <p className="site-footer__address">{t.address}</p>
          </div>
          <div className="site-footer__contact">
            <p className="site-footer__label">{t.contact}</p>
            <a href={SITE.phoneHref}>
              {t.phone} {SITE.phone}
            </a>
            <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer">
              {t.kakao} {SITE.kakaoId}
            </a>
          </div>
          <ul className="site-footer__sns">
            {SNS.map((s) => {
              const Icon = SNS_ICON[s.key];
              return (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.sns[s.key]} (${t.newWindow})`}>
                    <Icon size={20} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="site-footer__bottom">
          <div className="site-footer__legal">
            <Link href={localePath(locale, "/privacy/")}>{t.privacy}</Link>
            <Link href={localePath(locale, "/terms/")}>{t.terms}</Link>
          </div>
          <p>© Newgen Leadership School</p>
        </div>
      </div>
    </footer>
  );
}
