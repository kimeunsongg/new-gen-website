import Link from "next/link";
import { SITE, SNS } from "@/data/site";
import { BlogIcon, InstagramIcon, YoutubeIcon } from "./Icons";

const SNS_ICON = { instagram: InstagramIcon, youtube: YoutubeIcon, blog: BlogIcon };

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <div className="site-footer__name">
              <img src="/images/logo-emblem.png" alt="" width={48} height={48} />
              <span>{SITE.name}</span>
            </div>
            <p className="site-footer__address">{SITE.address}</p>
          </div>
          <div className="site-footer__contact">
            <p className="site-footer__label">CONTACT</p>
            <a href={SITE.phoneHref}>Phone. {SITE.phone}</a>
            <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer">
              카카오 상담. {SITE.kakaoId}
            </a>
          </div>
          <ul className="site-footer__sns">
            {SNS.map((s) => {
              const Icon = SNS_ICON[s.key];
              return (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (새 창)`}>
                    <Icon size={20} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="site-footer__bottom">
          <div className="site-footer__legal">
            <Link href="/privacy/">개인정보처리방침</Link>
            <Link href="/terms/">이용약관</Link>
          </div>
          <p>© Newgen Leadership School</p>
        </div>
      </div>
    </footer>
  );
}
