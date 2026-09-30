"use client";

import { useEffect, useState } from "react";

/**
 * 페이지를 켰을 때 한 글자씩 타이핑되는 제목.
 * - 글자를 모두 미리 배치해 두고 하나씩 드러내므로, 줄바꿈이 최종 모습 그대로라 흔들리지 않음
 * - 전체 문장은 스크린리더·검색엔진용으로 따로 둠
 * - JS가 없거나 움직임 줄이기 설정이면 처음부터 전체 표시
 */
export default function Typewriter({
  lines,
  speed = 90,
  delay = 350,
}: {
  /** 줄마다 하나씩. 줄 사이는 <br>로 고정 줄바꿈 */
  lines: string[];
  /** 글자 사이 간격(ms) */
  speed?: number;
  /** 시작 전 대기(ms) */
  delay?: number;
}) {
  const text = lines.join(" ");
  const lineChars = lines.map((l) => Array.from(l));
  const chars = lineChars.flat();
  // null = 아직 시작 전(서버 렌더 포함): CSS로 숨겨 두었다가 마운트 후 타이핑
  const [shown, setShown] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(chars.length);
      setDone(true);
      return;
    }
    setShown(0);
    let i = 0;
    let timer = window.setTimeout(function tick() {
      i += 1;
      setShown(i);
      if (i < chars.length) timer = window.setTimeout(tick, speed);
      else setDone(true);
    }, delay);
    return () => window.clearTimeout(timer);
    // 문구가 바뀔 때만 다시 시작
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const count = shown ?? 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span
        className={`typewriter${shown === null ? " is-pending" : ""}${done ? " is-done" : ""}`}
        aria-hidden="true"
      >
        {/* 커서는 글자 사이에 요소를 끼우지 않고 마지막 글자의 장식(::after)으로 그림 —
            끼우면 그 자리에서 줄이 바뀔 수 있어 최종 줄바꿈과 달라짐 */}
        {lineChars.map((line, li) => {
          const offset = lineChars.slice(0, li).reduce((n, l) => n + l.length, 0);
          return (
            <span key={li}>
              {li > 0 && <br />}
              {line.map((c, ci) => {
                const i = offset + ci;
                const cls = [
                  i < count ? "" : "typewriter__hidden",
                  i === count - 1 ? "is-caret" : "",
                  count === 0 && i === 0 ? "is-caret-before" : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <span key={ci} className={cls || undefined}>
                    {c}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
      <noscript>
        <style>{`.typewriter.is-pending .typewriter__hidden{visibility:visible}.typewriter .is-caret-before::before{display:none}`}</style>
      </noscript>
    </>
  );
}
