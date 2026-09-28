// 교육과정 도식 — 원본 브로셔(reference/edu/*.jpg)를 SVG/HTML로 재구성
import { FOUR_UM } from "@/data/school";

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
const BD_PETALS = [
  { x: -125, y: -112, color: EDU.blue, lines: ["진로적성 맞춤형", "교육과정", "재구성"], small: true },
  { x: 125, y: -112, color: EDU.lime, lines: ["수업", "(배움중심)"] },
  { x: -125, y: 112, color: EDU.navy, lines: ["기록", "(포트폴리오)"] },
  { x: 125, y: 112, color: EDU.green, lines: ["평가", "(절대, 관찰)"] },
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

export function BasicDirectionsDiagram() {
  return (
    <svg viewBox="-50 -50 620 620" className="bd-diagram" role="img" aria-labelledby="bd-title">
      <title id="bd-title">
        기본방향: 진로적성 맞춤형 교육과정 재구성, 수업(배움중심), 평가(절대, 관찰), 기록(포트폴리오)이 창의지성
        4-텍스트를 중심으로 순환합니다.
      </title>
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
      {BD_PETALS.map((p) => {
        const cx = BD_CX + p.x;
        const cy = BD_CY + p.y;
        // 글자는 가운데 흰 원을 피해 바깥쪽으로 조금 이동
        const tx = cx + Math.sign(p.x) * 14;
        const ty = cy + Math.sign(p.y) * 10;
        const lh = p.small ? 28 : 34;
        const startY = ty - ((p.lines.length - 1) * lh) / 2;
        return (
          <g key={p.lines[0]}>
            <circle cx={cx} cy={cy} r={118} fill={p.color} />
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
        <tspan x={BD_CX} y={BD_CY - 16} dominantBaseline="middle" fontSize="26">
          창의지성
        </tspan>
        <tspan x={BD_CX} y={BD_CY + 18} dominantBaseline="middle" fontSize="28">
          4-텍스트
        </tspan>
      </text>
    </svg>
  );
}

/* ───────── 중점활동 4-UM: 카드 4장 + 가운데 링 ───────── */

const UM_COLORS = [EDU.green, EDU.lime, EDU.navy, EDU.blue];

export function FourUmBoard() {
  return (
    <div className="um-board">
      {FOUR_UM.map((u, i) => (
        <article key={u.area} className={`um-card um-card--${i}`} style={{ "--um": UM_COLORS[i] } as React.CSSProperties}>
          <p className="um-card__area">{u.area}영역</p>
          <h4 className="um-card__type">{u.type} 교육과정</h4>
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
          중점활동
          <strong>4-UM</strong>
        </span>
      </div>
    </div>
  );
}

/* ───────── 4-텍스트: 목표 · 벤다이어그램 · 방법 ───────── */

const GOALS = [
  { goal: "과학적 통찰력", result: "직관, 상상력" },
  { goal: "독창적 문제발견과 해결", result: "기획, 생산, 창조" },
  { goal: "시민적 가치와 생활능력", result: "사회적 인성" },
];
// 아래에서 위로 올라가는 단계 (원본에 Presentation이 두 번 인쇄되어 있어 하나로 정리)
const METHODS = ["Presentation", "Writing / Creating", "Discussion", "Thinking", "Text Reading"];

function FourTextVenn() {
  return (
    <svg viewBox="470 500 690 590" className="venn" role="img" aria-labelledby="venn-title">
      <title id="venn-title">
        4-텍스트: 1 인류의 지적 전통(인류역사 자산 1)을 중심으로 2 문학적 소양(인류역사 자산 2), 3 경험과 실험·제작(경험,
        실험 지식), 4 사회적 실천(정체성과 책임)이 겹쳐 있습니다.
      </title>
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
        <text x="815" y="637" fontSize="32">사회적 실천</text>
        <text x="815" y="675" fontSize="21" opacity="0.9">[정체성과 책임]</text>

        <text x="1018" y="840" fontSize="34">2</text>
        <text x="1018" y="900" fontSize="30">문학적</text>
        <text x="1018" y="942" fontSize="30">소양</text>
        <text x="1018" y="990" fontSize="20" opacity="0.9">[인류역사 자산 2]</text>

        <text x="612" y="835" fontSize="34">3</text>
        <text x="612" y="897" fontSize="28">경험과</text>
        <rect x="528" y="918" width="168" height="46" fill="#E57A12" />
        <text x="612" y="952" fontSize="30">실험 · 제작</text>
        <text x="612" y="998" fontSize="20" opacity="0.9">[경험, 실험 지식]</text>
      </g>
      <g textAnchor="middle" fill="#171717">
        <text x="815" y="760" fontSize="32" fontWeight={700}>1</text>
        <text x="815" y="812" fontSize="28" fontWeight={600}>인류의</text>
        <rect x="725" y="828" width="180" height="46" fill="#EDEEF2" />
        <text x="815" y="862" fontSize="32" fontWeight={800}>지적 전통</text>
        <text x="815" y="905" fontSize="20">[인류역사 자산 1]</text>
      </g>
    </svg>
  );
}

export function FourTextPanel() {
  return (
    <div className="edu-panel">
      <p className="edu-panel__bar">창의지성교육 : 창의성을 지성교육으로 달성하는 것</p>
      <div className="four-text">
        <div className="four-text__goal">
          <p className="edu-pill" style={{ background: EDU.blue }}>
            목표: 창의성
          </p>
          <ul>
            {GOALS.map((g) => (
              <li key={g.goal}>
                {g.goal}
                <span>▶ {g.result}</span>
              </li>
            ))}
          </ul>
        </div>
        <FourTextVenn />
        <div className="four-text__method">
          <p className="edu-pill" style={{ background: EDU.green }}>
            방법: 지성교육 <small>(비판적 사고)</small>
          </p>
          <ol reversed>
            {METHODS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ───────── 독서와 체험: 독서 인프라 → 새로운 수업 ↔ 창체 인프라 ───────── */

const NEW_CLASS = ["내용확인", "질문과 아이디어", "사고와 표현", "토론과 재사고", "새로운 과제 설정"];
const CHANGCHE = ["다양한 체험 프로그램", "다양한 사회적 실천 프로그램", "문화예술작품 감상 네트워크와 역량 강화"];

function ReadingSources() {
  const line = { fill: "none", stroke: "#2F5B3F", strokeWidth: 2, markerEnd: "url(#rf-arrow)" };
  return (
    <svg viewBox="0 0 330 260" className="rf-sources" role="img" aria-labelledby="rf-src-title">
      <title id="rf-src-title">독서 인프라에서 대안교과서와 연관 아티클을 거쳐 새로운 수업으로 이어집니다.</title>
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
      <text textAnchor="middle" fill="#fff" fontWeight={700} fontSize="22">
        <tspan x="68" y="122">독서</tspan>
        <tspan x="68" y="150">인프라</tspan>
      </text>

      <path d="M 96 72 V 32 H 152" {...line} />
      <rect x="156" y="14" width="120" height="36" rx="18" fill="#C9D3F5" />
      <text x="216" y="38" textAnchor="middle" fontSize="16" fill="#26307A" fontWeight={600}>
        대안교과서
      </text>
      <path d="M 212 50 V 78 H 328" {...line} />

      <path d="M 140 130 H 328" {...line} />

      <rect x="156" y="210" width="120" height="36" rx="18" fill="#C9D3F5" />
      <text x="216" y="234" textAnchor="middle" fontSize="16" fill="#26307A" fontWeight={600}>
        연관 아티클
      </text>
      <path d="M 212 210 V 184 H 328" {...line} />
    </svg>
  );
}

export function ReadingFlowPanel() {
  return (
    <div className="edu-panel">
      <p className="edu-panel__bar">교과연계 주제별 명저 독서목록</p>
      <div className="reading-flow">
        <ReadingSources />
        <div className="rf-class">
          <p className="rf-class__head">
            <strong>새로운 수업</strong>
            <span className="rf-class__dash" aria-hidden="true" />
            <span>배움중심수업</span>
          </p>
          <ul>
            {NEW_CLASS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <span className="rf-link" aria-hidden="true" />
        <div className="rf-changche">
          <p className="edu-pill rf-changche__pill">창체 인프라</p>
          <ul>
            {CHANGCHE.map((c) => (
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

export function KLeaderLogo() {
  const cols = [120, 260, 400];
  const rows = [172, 268, 364];
  return (
    <svg viewBox="0 0 520 450" className="kl-logo" role="img" aria-labelledby="kl-title">
      <title id="kl-title">Korea The YEOSU K-Leadership 로고. 여수시, 손양원 목사, 이순신 장군의 초성으로 구성</title>
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
