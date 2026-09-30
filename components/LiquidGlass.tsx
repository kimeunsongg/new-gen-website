"use client";

/*
 * 리퀴드 글라스 배경 — liquid-glass-js (https://github.com/dashersw/liquid-glass-js)의
 * WebGL 굴절 셰이더를 React용으로 옮김. MIT License, Copyright (c) 2025 Armagan Amcalar.
 *
 * 원본과 다른 점
 * - 페이지 전체가 아니라 `source` 요소(Home 히어로)만 html2canvas로 찍음
 * - 히어로 사진이 바뀌면("hero:slide" 이벤트) 그 사진 상태를 찍어 굴절 배경을 교체(사진별로 캐시)
 * - 모양은 둥근 사각형만 사용
 */

import { useEffect, useRef, useState } from "react";

const VS = `
attribute vec2 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0, 1);
  v_texcoord = a_texcoord;
}`;

const FS = `
precision mediump float;
uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform vec2 u_textureSize;
uniform float u_scrollY;
uniform float u_blurRadius;
uniform float u_borderRadius;
uniform vec2 u_containerPosition;
uniform float u_edgeIntensity;
uniform float u_rimIntensity;
uniform float u_edgeDistance;
uniform float u_rimDistance;
uniform float u_cornerBoost;
uniform float u_rippleEffect;
uniform float u_tintOpacity;
varying vec2 v_texcoord;

float roundedRectDistance(vec2 coord, vec2 size, float radius) {
  vec2 center = size * 0.5;
  vec2 pixelCoord = coord * size;
  vec2 toCorner = abs(pixelCoord - center) - (center - radius);
  float outsideCorner = length(max(toCorner, 0.0));
  float insideCorner = min(max(toCorner.x, toCorner.y), 0.0);
  return (outsideCorner + insideCorner - radius);
}

void main() {
  vec2 coord = v_texcoord;
  vec2 containerSize = u_resolution;
  vec2 containerCenter = u_containerPosition + vec2(0.0, u_scrollY);
  vec2 pagePixel = containerCenter + (coord - 0.5) * containerSize;
  vec2 textureCoord = pagePixel / u_textureSize;

  float distFromEdgeShape = max(-roundedRectDistance(coord, u_resolution, u_borderRadius), 0.0);
  vec2 shapeNormal = normalize(coord - vec2(0.5));
  float normalizedDistance = distFromEdgeShape;
  float edgeIntensity = exp(-normalizedDistance * u_edgeDistance);
  float rimIntensity = exp(-normalizedDistance * u_rimDistance);
  float totalIntensity = edgeIntensity * u_edgeIntensity + rimIntensity * u_rimIntensity;
  vec2 baseRefraction = shapeNormal * totalIntensity;

  float cornerDistance = max(min(coord.x, 1.0 - coord.x), min(coord.y, 1.0 - coord.y));
  float cornerBoost = exp(-cornerDistance * min(u_resolution.x, u_resolution.y) * 0.3) * u_cornerBoost;
  vec2 perpendicular = vec2(-shapeNormal.y, shapeNormal.x);
  float distFromEdge = distFromEdgeShape / min(u_resolution.x, u_resolution.y);
  float ripple = sin(distFromEdge * 25.0) * u_rippleEffect * rimIntensity;
  textureCoord += baseRefraction + shapeNormal * cornerBoost + perpendicular * ripple;

  // gaussian blur
  vec4 color = vec4(0.0);
  vec2 texelSize = 1.0 / u_textureSize;
  float sigma = u_blurRadius / 2.0;
  vec2 blurStep = texelSize * sigma;
  float totalWeight = 0.0;
  for (float i = -6.0; i <= 6.0; i += 1.0) {
    for (float j = -6.0; j <= 6.0; j += 1.0) {
      float d = length(vec2(i, j));
      if (d > 6.0) continue;
      float w = exp(-(d * d) / (2.0 * sigma * sigma));
      color += texture2D(u_image, textureCoord + vec2(i, j) * blurStep) * w;
      totalWeight += w;
    }
  }
  color /= totalWeight;

  // 위는 밝게, 아래는 조금 어둡게 비치는 유리 틴트
  vec3 tint = mix(vec3(1.0), vec3(0.82), coord.y);
  color.rgb = mix(color.rgb, tint, u_tintOpacity);

  float mask = 1.0 - smoothstep(-1.0, 1.0, roundedRectDistance(coord, u_resolution, u_borderRadius));
  gl_FragColor = vec4(color.rgb, mask);
}`;

type GL = {
  gl: WebGLRenderingContext;
  texture: WebGLTexture;
  loc: Record<string, WebGLUniformLocation | null>;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

function setup(canvas: HTMLCanvasElement, borderRadius: number, tintOpacity: number): GL | null {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
  if (!gl) return null;
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VS));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const quad = (data: number[], name: string) => {
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    const l = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(l);
    gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
  };
  quad([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1], "a_position");
  quad([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0], "a_texcoord");

  const names = [
    "u_image", "u_resolution", "u_textureSize", "u_scrollY", "u_blurRadius", "u_borderRadius",
    "u_containerPosition", "u_edgeIntensity", "u_rimIntensity", "u_edgeDistance", "u_rimDistance",
    "u_cornerBoost", "u_rippleEffect", "u_tintOpacity",
  ];
  const loc = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(program, n)]));

  const texture = gl.createTexture()!;
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(loc.u_image, 0);

  // liquid-glass-js 기본값
  gl.uniform1f(loc.u_blurRadius, 5.0);
  gl.uniform1f(loc.u_borderRadius, borderRadius);
  gl.uniform1f(loc.u_edgeIntensity, 0.01);
  gl.uniform1f(loc.u_rimIntensity, 0.05);
  gl.uniform1f(loc.u_edgeDistance, 0.15);
  gl.uniform1f(loc.u_rimDistance, 0.8);
  gl.uniform1f(loc.u_cornerBoost, 0.02);
  gl.uniform1f(loc.u_rippleEffect, 0.1);
  gl.uniform1f(loc.u_tintOpacity, tintOpacity);
  gl.clearColor(0, 0, 0, 0);
  return { gl, texture, loc };
}

export default function LiquidGlass({
  source,
  active,
  borderRadius = 20,
  tintOpacity = 0.35,
}: {
  /** 굴절시킬 배경 요소의 선택자 */
  source: string;
  active: boolean;
  borderRadius?: number;
  tintOpacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<GL | null>(null);
  const renderRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const src = document.querySelector<HTMLElement>(source);
    if (!canvas || !src) return;
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

    let ctx: GL | null = null;
    try {
      ctx = setup(canvas, borderRadius, tintOpacity);
    } catch {
      ctx = null;
    }
    if (!ctx) return; // WebGL이 안 되면 CSS 유리(backdrop-filter)만 보임
    glRef.current = ctx;
    const { gl, texture, loc } = ctx;

    let alive = true;
    let hasTexture = false;
    const cache = new Map<number, HTMLCanvasElement>();
    let current = 0;

    const render = () => {
      if (!alive || !hasTexture) return;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(loc.u_resolution, w, h);
      // 배경 요소 기준 좌표(요소가 페이지 맨 위에 있으므로 scroll만 더하면 됨)
      const srcTop = src.getBoundingClientRect().top + window.scrollY;
      gl.uniform2f(loc.u_containerPosition, rect.left + w / 2, rect.top + h / 2 - srcTop);
      gl.uniform1f(loc.u_scrollY, window.scrollY);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    renderRef.current = render;

    const upload = (snap: HTMLCanvasElement) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, snap);
      gl.uniform2f(loc.u_textureSize, snap.width, snap.height);
      hasTexture = true;
      setReady(true);
      render();
    };

    let capturing = false;
    const capture = async (slide: number) => {
      const cached = cache.get(slide);
      if (cached) return upload(cached);
      if (capturing) return;
      capturing = true;
      try {
        const html2canvas = (await import("html2canvas")).default;
        const snap = await html2canvas(src, { scale: 1, useCORS: true, backgroundColor: null, logging: false });
        if (!alive) return;
        cache.set(slide, snap);
        if (slide === current) upload(snap);
      } catch {
        // 실패하면 CSS 유리만 보임
      } finally {
        capturing = false;
      }
    };

    const onSlide = (e: Event) => {
      current = (e as CustomEvent<number>).detail ?? 0;
      capture(current);
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        cache.clear();
        capture(current);
      }, 250);
    };

    window.addEventListener("hero:slide", onSlide);
    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", onResize);
    // 폰트·사진이 자리 잡은 뒤 첫 캡처
    (document.fonts?.ready ?? Promise.resolve()).then(() => capture(0));

    return () => {
      alive = false;
      window.removeEventListener("hero:slide", onSlide);
      window.removeEventListener("scroll", render);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      glRef.current = null;
    };
  }, [source, borderRadius, tintOpacity]);

  // 켜질 때(유리 모드 진입) 한 번 다시 그림
  useEffect(() => {
    if (active) renderRef.current();
  }, [active]);

  return (
    <span className="glass-layer" aria-hidden="true">
      <canvas ref={canvasRef} className={ready ? "is-ready" : undefined} />
    </span>
  );
}
