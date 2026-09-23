"use client";

import { useState } from "react";
import { FOUR_UM } from "@/data/school";

const RADII = ["96px 12px 12px 12px", "12px 96px 12px 12px", "12px 12px 12px 96px", "12px 12px 96px 12px"];

export default function FourUm() {
  const [sel, setSel] = useState(0);
  const cur = FOUR_UM[sel];
  return (
    <div className="four-um">
      <div className="four-um__grid">
        {FOUR_UM.map((u, i) => (
          <button
            key={u.area}
            type="button"
            className="four-um__tile"
            style={{ borderRadius: RADII[i] }}
            aria-pressed={sel === i}
            onClick={() => setSel(i)}
          >
            <strong>{u.area}</strong>
            <span>{u.type}</span>
          </button>
        ))}
        <div className="four-um__center" aria-hidden="true">
          <span>중점활동</span>
          <strong>4-UM</strong>
        </div>
      </div>
      <div className="four-um__detail" aria-live="polite">
        <p className="four-um__type">{cur.type} 교육과정</p>
        <h4 className="four-um__area">{cur.area}영역</h4>
        <ul className="four-um__list">
          {cur.activities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
