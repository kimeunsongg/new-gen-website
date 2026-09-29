"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/** 스크롤 위치에 따라 활성 항목을 갱신 */
function useActiveSection(ids: string[], offset: number) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset - 8 <= 0) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

export function SectionTabs({ items, label }: { items: Item[]; label: string }) {
  const active = useActiveSection(
    items.map((i) => i.id),
    130
  );
  return (
    <div className="section-tabs">
      <nav className="container section-tabs__inner" aria-label={label}>
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className="section-tabs__tab"
            aria-current={active === it.id ? "true" : undefined}
            onClick={() => scrollToId(it.id)}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function CategoryNav({ items, label }: { items: Item[]; label: string }) {
  const active = useActiveSection(
    items.map((i) => i.id),
    88
  );
  return (
    <nav className="faq-nav" aria-label={label}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className="faq-nav__btn"
          aria-current={active === it.id ? "true" : undefined}
          onClick={() => scrollToId(it.id)}
        >
          {it.label}
        </button>
      ))}
    </nav>
  );
}
