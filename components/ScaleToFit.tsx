"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * 도식을 이미지처럼 다룸: 컨테이너가 `width`보다 좁아지면 배치를 바꾸지 않고 통째로 축소.
 * 넓을 때는 컨테이너 폭을 그대로 채움.
 */
export default function ScaleToFit({ width, children }: { width: number; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const update = () => {
      const s = Math.min(1, o.clientWidth / width);
      setScale(s);
      setHeight(i.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className="fit" style={{ height }}>
      <div
        ref={inner}
        className="fit__inner"
        style={scale < 1 ? { width, transform: `scale(${scale})` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
