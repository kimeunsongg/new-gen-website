"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faq";
import { ChevronIcon } from "./Icons";
import { Pending } from "./ui";

export default function FaqAccordion({ items, defaultOpen = [] }: { items: FaqItem[]; defaultOpen?: string[] }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));

  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <ul className="accordion">
      {items.map((it) => {
        const isOpen = open.has(it.key);
        const panelId = `faq-${it.key}`;
        return (
          <li key={it.key} className="accordion__item">
            <button
              type="button"
              className="accordion__q"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(it.key)}
            >
              <span>{it.q}</span>
              <ChevronIcon dir={isOpen ? "up" : "down"} />
            </button>
            <div id={panelId} className="accordion__a" hidden={!isOpen}>
              {it.a ? it.a.map((p, i) => <p key={i}>{p}</p>) : <p><Pending>답변 원문 입력 필요</Pending></p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
