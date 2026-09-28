"use client";

import { useState } from "react";
import type { FaqBlock, FaqItem } from "@/data/faq";
import { ChevronIcon } from "./Icons";

/** "**굵게**" 표기를 <strong>으로 */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

function Block({ block }: { block: FaqBlock }) {
  if (typeof block === "string") {
    return (
      <p>
        <Rich text={block} />
      </p>
    );
  }
  return (
    <ul className="accordion__list">
      {block.list.map((li, i) => (
        <li key={i}>
          {li.label && <strong>{li.label}: </strong>}
          <Rich text={li.text} />
        </li>
      ))}
    </ul>
  );
}

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
              {it.a.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
