import { getDict } from "@/data/dict";
import type { Locale } from "@/lib/i18n";

const R = 135;
const CY = 150;
const CX = [125, 375, 625, 875];
// 인접 원과 만나는 지점의 각도: acos(125/135)
const GAP = Math.acos(125 / R);

function pt(cx: number, a: number) {
  // 수학 좌표계 각도(반시계) → SVG 좌표
  return `${(cx + R * Math.cos(a)).toFixed(2)} ${(CY - R * Math.sin(a)).toFixed(2)}`;
}

/** 각도 a0에서 a1까지 반시계 방향으로 그리는 호 */
function arc(cx: number, a0: number, a1: number) {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${pt(cx, a0)} A ${R} ${R} 0 ${large} 0 ${pt(cx, a1)}`;
}

function paths(i: number) {
  const cx = CX[i];
  const hasLeft = i > 0;
  const hasRight = i < CX.length - 1;
  if (hasLeft && hasRight) {
    return [arc(cx, GAP, Math.PI - GAP), arc(cx, Math.PI + GAP, 2 * Math.PI - GAP)];
  }
  if (hasRight) return [arc(cx, GAP, 2 * Math.PI - GAP)]; // 오른쪽만 끊김
  return [arc(cx, -(Math.PI - GAP), Math.PI - GAP)]; // 왼쪽만 끊김
}

export default function TalentDiagram({ locale }: { locale: Locale }) {
  const TALENTS = getDict(locale).talents;
  return (
    <div className="talent">
      <div className="talent__figure">
        <svg viewBox="-35 -10 1070 320" aria-hidden="true">
          {TALENTS.map((t, i) => (
            <g key={t.name} style={{ mixBlendMode: "multiply" }}>
              {paths(i).map((d, j) => (
                <path key={j} d={d} fill="none" stroke={t.color} strokeWidth={50} strokeLinecap="round" />
              ))}
            </g>
          ))}
        </svg>
        {TALENTS.map((t, i) => (
          <img
            key={t.name}
            src={`/images/talent-${i + 1}.png`}
            alt=""
            className="talent__icon"
            style={{ left: `${((CX[i] + 35) / 1070) * 100}%` }}
          />
        ))}
      </div>
      <ul className="talent__text">
        {TALENTS.map((t) => (
          <li key={t.name}>
            <strong>{t.name}</strong>
            <span>{t.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
