"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDict } from "@/data/dict";
import { NAV } from "@/data/site";
import { localePath, switchLocalePath, type Locale } from "@/lib/i18n";
import LiquidGlass from "./LiquidGlass";

const HERO = ".hero-split";

/** Home 히어로 위에 있는 동안 true — 히어로 아래 끝이 헤더를 지나면 원래 흰 헤더로 */
function useOverHero(enabled: boolean) {
  const [over, setOver] = useState(enabled);
  useEffect(() => {
    if (!enabled) {
      setOver(false);
      return;
    }
    const check = () => {
      const hero = document.querySelector(HERO);
      setOver(!!hero && hero.getBoundingClientRect().bottom > 64);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [enabled]);
  return over;
}

function isActive(pathname: string, href: string) {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return href === "/" || href === "/en/" ? p === href : p.startsWith(href);
}

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const t = getDict(locale).common;
  const { target } = switchLocalePath(pathname);
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/en/";
  const glass = useOverHero(isHome);
  return (
    <header className={`site-header${glass ? " site-header--glass" : ""}`}>
      <div className="container site-header__inner">
        {isHome && <LiquidGlass source={HERO} active={glass} />}
        <Link href={localePath(locale, "/")} className="site-header__logo" aria-label={t.homeAria}>
          <img src="/images/logo-horizontal.png" alt="" width={1200} height={207} className="site-header__logo-full" />
          <img src="/images/logo-emblem.png" alt="" width={36} height={36} className="site-header__logo-emblem" />
        </Link>
        <div className="site-header__right">
          <nav className="site-nav" aria-label={t.navAria}>
            {NAV.map((n) => {
              const href = localePath(locale, n.href);
              const active = isActive(pathname, href);
              return (
                <Link key={n.href} href={href} className="site-nav__link" aria-current={active ? "page" : undefined}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          {/* KR | EN — 현재 언어는 굵게·짙게, 다른 쪽을 누르면 전환.
              다른 루트 레이아웃으로 이동하므로 일반 <a> (전체 페이지 이동) */}
          <div className="lang-switch" role="group" aria-label={t.langSwitch.aria}>
            {(["ko", "en"] as const).map((l) =>
              l === locale ? (
                <span key={l} className="lang-switch__opt is-active" aria-current="true" lang={l}>
                  {l === "ko" ? "KR" : "EN"}
                </span>
              ) : (
                <a key={l} href={target} className="lang-switch__opt" hrefLang={l} lang={l}>
                  {l === "ko" ? "KR" : "EN"}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
