"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/data/site";

function isActive(pathname: string, href: string) {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return href === "/" ? p === "/" : p.startsWith(href);
}

export default function Header() {
  const pathname = usePathname() ?? "/";
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="뉴젠리더십학교 홈">
          <img src="/images/logo-horizontal.png" alt="" width={1200} height={207} className="site-header__logo-full" />
          <img src="/images/logo-emblem.png" alt="" width={36} height={36} className="site-header__logo-emblem" />
        </Link>
        <nav className="site-nav" aria-label="주 메뉴">
          {NAV.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link key={n.href} href={n.href} className="site-nav__link" aria-current={active ? "page" : undefined}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
