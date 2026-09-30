"use client";

import { useEffect } from "react";

/**
 * 주소의 #앵커로 들어왔을 때, 위쪽 도식(ScaleToFit)이 축소되며 높이가 바뀌어
 * 목표 위치를 지나쳐 버리는 문제를 보정. 레이아웃이 안정될 때까지 다시 맞추고,
 * 사용자가 직접 스크롤하면 즉시 멈춤.
 */
export default function HashScrollFix() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (!target) return;

    let stopped = false;
    const stop = () => {
      stopped = true;
    };
    const align = () => {
      if (!stopped) target.scrollIntoView({ behavior: "instant", block: "start" });
    };

    const ro = new ResizeObserver(align);
    ro.observe(document.body);
    requestAnimationFrame(() => requestAnimationFrame(align));
    document.fonts?.ready.then(align);

    const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }));
    // 레이아웃이 자리 잡을 만한 시간이 지나면 보정 종료
    const timer = window.setTimeout(() => {
      stop();
      ro.disconnect();
    }, 2000);

    return () => {
      stop();
      ro.disconnect();
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, []);

  return null;
}
