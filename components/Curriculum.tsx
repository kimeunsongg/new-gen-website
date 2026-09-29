// 교육과정 도식 — 원본 브로셔(reference/edu/*.jpg)를 SVG/HTML로 재구성. 문구는 사전(data/dict.*)에서.
import { getDict } from "@/data/dict";
import type { Locale } from "@/lib/i18n";

export const EDU = {
  blue: "#4A63D8",
  lime: "#6AA83A",
  green: "#2F7A4E",
  navy: "#232C6E",
  orange: "#F39A2B",
};

/* ───────── 기본방향: 4개 원 + 순환 화살표 ───────── */

const BD_CX = 260;
const BD_CY = 260;
// 좌상 · 우상 · 좌하 · 우하
const BD_PETALS = [
  { x: -125, y: -112, color: EDU.blue },
  { x: 125, y: -112, color: EDU.lime },
  { x: -125, y: 112, color: EDU.navy },
  { x: 125, y: 112, color: EDU.green },
];

/** 위에서 시계방향 각도(deg) → 좌표 */
function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [BD_CX + r * Math.sin(a), BD_CY - r * Math.cos(a)];
}

function cycleArc(gapDeg: number) {
  // 원(중심거리 168 + 반지름 118 = 286) 바깥을 도는 순환 화살표
  const R = 300;
  const [x0, y0] = polar(R, gapDeg - 22);
  const [x1, y1] = polar(R, gapDeg + 22);
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}

export function BasicDirectionsDiagram({ locale }: { locale: Locale }) {
  const t = getDict(locale).diagrams.bd;
  const centerLh = 32;
  const centerTop = BD_CY - ((t.center.length - 1) * centerLh) / 2;
  return (
    <svg viewBox="-50 -50 620 620" className="bd-diagram" role="img" aria-labelledby="bd-title">
      <title id="bd-title">{t.title}</title>
      <defs>
        <marker id="bd-arrow" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 10 5 0 10z" fill="#3E4A6B" />
        </marker>
      </defs>
      {[0, 90, 180, 270].map((g) => (
        <path
          key={g}
          d={cycleArc(g)}
          fill="none"
          stroke="#3E4A6B"
          strokeWidth="2"
          pathLength={100}
          strokeDasharray="3 2"
          strokeDashoffset={3}
          markerEnd="url(#bd-arrow)"
        />
      ))}
      {BD_PETALS.map((geo, pi) => {
        const p = t.petals[pi];
        const cx = BD_CX + geo.x;
        const cy = BD_CY + geo.y;
        // 글자는 가운데 흰 원을 피해 바깥쪽으로 조금 이동
        const tx = cx + Math.sign(geo.x) * 14;
        const ty = cy + Math.sign(geo.y) * 10;
        const lh = p.small ? 28 : 34;
        const startY = ty - ((p.lines.length - 1) * lh) / 2;
        return (
          <g key={pi}>
            <circle cx={cx} cy={cy} r={118} fill={geo.color} />
            <text textAnchor="middle" fill="#fff" fontWeight={700}>
              {p.lines.map((l, i) => (
                <tspan
                  key={l}
                  x={tx}
                  y={startY + i * lh}
                  dominantBaseline="middle"
                  fontSize={p.small ? 22 : i === 0 ? 30 : 21}
                >
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
      <circle cx={BD_CX} cy={BD_CY} r={82} fill="#fff" />
      <text textAnchor="middle" fontWeight={800} fill="#171717">
        {t.center.map((c, i) => (
          <tspan key={c.text} x={BD_CX} y={centerTop + i * centerLh} dominantBaseline="middle" fontSize={c.size}>
            {c.text}
          </tspan>
        ))}
      </text>
    </svg>
  );
}

/* ───────── 중점활동 4-UM: 카드 4장 + 가운데 링 ───────── */

const UM_COLORS = [EDU.green, EDU.lime, EDU.navy, EDU.blue];

export function FourUmBoard({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <div className="um-board">
      {d.fourUm.map((u, i) => (
        <article key={u.areaLabel} className={`um-card um-card--${i}`} style={{ "--um": UM_COLORS[i] } as React.CSSProperties}>
          <p className="um-card__area">{u.areaLabel}</p>
          <h4 className="um-card__type">{u.cardType}</h4>
          <ul>
            {u.activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </article>
      ))}
      <div className="um-ring" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          {UM_COLORS.map((c, i) => {
            // 카드 위치(좌상·우상·좌하·우하)에 맞는 사분면. 각도는 +x축에서 시계방향
            const start = [180, 270, 90, 0][i];
            const r = 52;
            const p = (deg: number) => {
              const a = (deg * Math.PI) / 180;
              return `${(60 + r * Math.cos(a)).toFixed(2)} ${(60 + r * Math.sin(a)).toFixed(2)}`;
            };
            return (
              <path key={i} d={`M ${p(start + 3)} A ${r} ${r} 0 0 1 ${p(start + 87)}`} stroke={c} strokeWidth="12" fill="none" />
            );
          })}
        </svg>
        <span>
          {d.diagrams.ring[0]}
          <strong>{d.diagrams.ring[1]}</strong>
        </span>
      </div>
    </div>
  );
}

/* ───────── 4-텍스트: 목표 · 벤다이어그램 · 방법 ───────── */

function FourTextVenn({ locale }: { locale: Locale }) {
  const v = getDict(locale).diagrams.venn;
  // 제목류 글자는 언어별 배율로 줄임(영문이 더 김)
  const fs = (n: number) => Math.round(n * v.scale);
  // 대괄호 설명은 너무 작아지지 않게 최소 16
  const sub = (n: number) => Math.max(fs(n), 16);
  return (
    <svg viewBox="470 500 690 590" className="venn" role="img" aria-labelledby="venn-title">
      <title id="venn-title">{v.title}</title>
      <g style={{ mixBlendMode: "multiply" }}>
        <circle cx="815" cy="680" r="165" fill={EDU.lime} />
      </g>
      <g style={{ mixBlendMode: "multiply" }}>
        <circle cx="650" cy="905" r="165" fill={EDU.orange} />
      </g>
      <g style={{ mixBlendMode: "multiply" }}>
        <circle cx="980" cy="905" r="165" fill={EDU.navy} />
      </g>
      <circle cx="815" cy="830" r="122" fill="#fff" />
      <circle cx="815" cy="830" r="130" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="10 8" />

      <g textAnchor="middle" fill="#fff" fontWeight={700}>
        <text x="815" y="585" fontSize="34">4</text>
        <text x="815" y="637" fontSize={fs(32)}>{v.c4.title}</text>
        <text x="815" y="675" fontSize={sub(21)} opacity="0.9">{v.c4.sub}</text>

        <text x="1018" y="840" fontSize="34">2</text>
        <text x="1018" y="900" fontSize={fs(30)}>{v.c2.lines[0]}</text>
        <text x="1018" y="942" fontSize={fs(30)}>{v.c2.lines[1]}</text>
        <text x="1018" y="990" fontSize={sub(20)} opacity="0.9">{v.c2.sub}</text>

        <text x={v.c3.x} y="835" fontSize="34">3</text>
        <text x={v.c3.x} y="897" fontSize={fs(28)}>{v.c3.pre}</text>
        <rect x={v.c3.x - v.c3.boxW / 2} y="918" width={v.c3.boxW} height="46" fill="#E57A12" />
        <text x={v.c3.x} y="952" fontSize={fs(30)}>{v.c3.box}</text>
        <text x={v.c3.x} y="998" fontSize={sub(20)} opacity="0.9">{v.c3.sub}</text>
      </g>
      <g textAnchor="middle" fill="#171717">
        <text x="815" y="760" fontSize="32" fontWeight={700}>1</text>
        <text x="815" y="812" fontSize={fs(28)} fontWeight={600}>{v.c1.pre}</text>
        <rect x={815 - v.c1.boxW / 2} y="828" width={v.c1.boxW} height="46" fill="#EDEEF2" />
        <text x="815" y="862" fontSize={fs(32)} fontWeight={800}>{v.c1.box}</text>
        <text x="815" y="905" fontSize={sub(20)}>{v.c1.sub}</text>
      </g>
    </svg>
  );
}

export function FourTextPanel({ locale }: { locale: Locale }) {
  const t = getDict(locale).diagrams.fourText;
  return (
    <div className="edu-panel">
      <p className="edu-panel__bar">{t.bar}</p>
      <div className="four-text">
        <div className="four-text__goal">
          <p className="edu-pill" style={{ background: EDU.blue }}>
            {t.goalPill}
          </p>
          <ul>
            {t.goals.map((g) => (
              <li key={g.goal}>
                {g.goal}
                <span>▶ {g.result}</span>
              </li>
            ))}
          </ul>
        </div>
        <FourTextVenn locale={locale} />
        <div className="four-text__method">
          <p className="edu-pill" style={{ background: EDU.green }}>
            {t.methodPill} <small>{t.methodNote}</small>
          </p>
          <ol reversed>
            {t.methods.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ───────── 독서와 체험: 독서 인프라 → 새로운 수업 ↔ 창체 인프라 ───────── */

function ReadingSources({ locale }: { locale: Locale }) {
  const t = getDict(locale).diagrams.reading;
  const line = { fill: "none", stroke: "#2F5B3F", strokeWidth: 2, markerEnd: "url(#rf-arrow)" };
  const pw = t.pills.width;
  const px = 216 - pw / 2;
  return (
    <svg viewBox="0 0 330 260" className="rf-sources" role="img" aria-labelledby="rf-src-title">
      <title id="rf-src-title">{t.title}</title>
      <defs>
        <marker id="rf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 10 5 0 10" fill="none" stroke="#2F5B3F" strokeWidth="2" />
        </marker>
        <linearGradient id="rf-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={EDU.navy} />
          <stop offset="1" stopColor={EDU.green} />
        </linearGradient>
      </defs>
      <circle cx="68" cy="130" r="64" fill="none" stroke="#3E4A6B" strokeWidth="2" strokeDasharray="2 4" />
      <circle cx="68" cy="130" r="56" fill="url(#rf-grad)" />
      <text textAnchor="middle" fill="#fff" fontWeight={700} fontSize={t.source.size}>
        <tspan x="68" y="122">{t.source.lines[0]}</tspan>
        <tspan x="68" y="122" dy={t.source.size + 6}>
          {t.source.lines[1]}
        </tspan>
      </text>

      <path d={`M 96 72 V 32 H ${px - 4}`} {...line} />
      <rect x={px} y="14" width={pw} height="36" rx="18" fill="#C9D3F5" />
      <text x="216" y="38" textAnchor="middle" fontSize={t.pills.size} fill="#26307A" fontWeight={600}>
        {t.pills.top}
      </text>
      <path d="M 212 50 V 78 H 328" {...line} />

      <path d="M 140 130 H 328" {...line} />

      <rect x={px} y="210" width={pw} height="36" rx="18" fill="#C9D3F5" />
      <text x="216" y="234" textAnchor="middle" fontSize={t.pills.size} fill="#26307A" fontWeight={600}>
        {t.pills.bottom}
      </text>
      <path d="M 212 210 V 184 H 328" {...line} />
    </svg>
  );
}

export function ReadingFlowPanel({ locale }: { locale: Locale }) {
  const t = getDict(locale).diagrams.reading;
  return (
    <div className="edu-panel">
      <p className="edu-panel__bar">{t.bar}</p>
      <div className="reading-flow">
        <ReadingSources locale={locale} />
        <div className="rf-class">
          <p className="rf-class__head">
            <strong>{t.classTitle}</strong>
            <span className="rf-class__dash" aria-hidden="true" />
            <span>{t.classNote}</span>
          </p>
          <ul>
            {t.classItems.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <span className="rf-link" aria-hidden="true" />
        <div className="rf-changche">
          <p className="edu-pill rf-changche__pill">{t.changche}</p>
          <ul>
            {t.changcheItems.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────── K-리더십 로고 (Korea The YEOSU K-Leadership) ───────── */

// 세로로 읽으면 ㅇㅅㅅ(여수시) · ㅅㅇㅇ(손양원) · ㅇㅅㅅ(이순신)
const KL_GRID = [
  ["o", "s", "o"],
  ["s", "o", "s"],
  ["s", "o", "s"],
];

export function KLeaderLogo({ locale }: { locale: Locale }) {
  const cols = [120, 260, 400];
  const rows = [172, 268, 364];
  return (
    <svg viewBox="0 0 520 450" className="kl-logo" role="img" aria-labelledby="kl-title">
      <title id="kl-title">{getDict(locale).academics.kleader.logoTitle}</title>
      <rect width="520" height="450" rx="10" fill="#243C8F" />
      <g transform="translate(22 0)">
        <text x="40" y="84" fill="#fff" fontSize="40" fontWeight={800}>
          Korea
        </text>
        <circle cx="222" cy="72" r="38" fill="#fff" />
        <circle cx="222" cy="72" r="32" fill="#2F58C8" />
        <text x="222" y="62" textAnchor="middle" fill="#fff" fontSize="12" fontStyle="italic" fontWeight={700}>
          The
        </text>
        <text x="222" y="82" textAnchor="middle" fill="#fff" fontSize="16" fontWeight={800}>
          YEOSU
        </text>
        <text x="274" y="84" fill="#fff" fontSize="26" fontWeight={600}>
          K-Leadership
        </text>
      </g>
      <g stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {KL_GRID.map((row, r) =>
          row.map((g, c) =>
            g === "o" ? (
              <circle key={`${r}${c}`} cx={cols[c]} cy={rows[r]} r={30} strokeWidth={20} />
            ) : (
              <path
                key={`${r}${c}`}
                d={`M ${cols[c] - 58} ${rows[r] + 30} L ${cols[c]} ${rows[r] - 30} L ${cols[c] + 58} ${rows[r] + 30}`}
                strokeWidth={22}
              />
            )
          )
        )}
      </g>
      <g fill="#fff" fontSize="13" textAnchor="middle" opacity="0.85">
        <text x={cols[0]} y="428">YEOSU CITY</text>
        <text x={cols[1]} y="428">Pastor. Son Yang-Won</text>
        <text x={cols[2]} y="428">Admiral. Yi Sun-sin</text>
      </g>
    </svg>
  );
}
