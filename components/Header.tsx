"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDict } from "@/data/dict";
import { NAV } from "@/data/site";
import { localePath, switchLocalePath, type Locale } from "@/lib/i18n";

/** 맨 위에서는 투명, 조금이라도 스크롤하면 유리 배경 */
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 0);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  return scrolled;
}

const HERO = ".hero-split";

/** Home 히어로(사진) 위에 있는 동안 true — 히어로 아래 끝이 헤더를 지나면 false */
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
  const scrolled = useScrolled();
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/en/";
  const overHero = useOverHero(isHome);
  const [open, setOpen] = useState(false);

  // 페이지를 옮기면 모바일 메뉴 닫기
  useEffect(() => setOpen(false), [pathname]);

  // 모바일 메뉴가 열려 있는 동안: 뒤 페이지 스크롤 잠금, Esc로 닫기
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = NAV.map((n) => {
    const href = localePath(locale, n.href);
    return { ...n, href, active: isActive(pathname, href) };
  });

  // KR | EN — 현재 언어는 굵게·짙게, 다른 쪽을 누르면 전환.
  // 다른 루트 레이아웃으로 이동하므로 일반 <a> (전체 페이지 이동)
  const langSwitch = (
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
  );

  return (
    <>
      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}${overHero ? " is-over-hero" : ""}${open ? " is-menu-open" : ""}`}
      >
        <div className="container site-header__inner">
          <Link href={localePath(locale, "/")} className="site-header__logo" aria-label={t.homeAria}>
            <img src="/images/logo-horizontal.png" alt="" width={1200} height={207} className="site-header__logo-full" />
            <img src="/images/logo-emblem.png" alt="" width={36} height={36} className="site-header__logo-emblem" />
          </Link>
          {/* 데스크톱: 화면 정중앙 메뉴 */}
          <nav className="site-nav" aria-label={t.navAria}>
            {links.map((n) => (
              <Link key={n.href} href={n.href} className="site-nav__link" aria-current={n.active ? "page" : undefined}>
                {/* data-text: 굵은 글씨 폭을 미리 잡아 두어 호버 때 옆 메뉴가 밀리지 않게 */}
                <span data-text={n.label}>{n.label}</span>
              </Link>
            ))}
          </nav>
          <div className="site-header__right">{langSwitch}</div>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {/* 모바일: 전체 화면 메뉴 (헤더 밖에 두어야 position: fixed가 화면 기준으로 잡힘) */}
      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label={t.navAria}>
          <ul className="mobile-menu__list">
            {links.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="mobile-menu__link" aria-current={n.active ? "page" : undefined} onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">{langSwitch}</div>
      </div>
    </>
  );
}
