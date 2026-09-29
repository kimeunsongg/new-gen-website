"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict } from "@/data/dict";
import { NAV } from "@/data/site";
import { localePath, switchLocalePath, type Locale } from "@/lib/i18n";

function isActive(pathname: string, href: string) {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return href === "/" || href === "/en/" ? p === href : p.startsWith(href);
}

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const t = getDict(locale).common;
  const { target } = switchLocalePath(pathname);
  return (
    <header className="site-header">
      <div className="container site-header__inner">
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
          {/* 다른 루트 레이아웃으로 이동하므로 일반 <a> (전체 페이지 이동) */}
          <a
            href={target}
            className="lang-switch"
            hrefLang={locale === "ko" ? "en" : "ko"}
            lang={locale === "ko" ? "en" : "ko"}
            aria-label={t.langSwitch.aria}
          >
            {t.langSwitch.label}
          </a>
        </div>
      </div>
    </header>
  );
}
