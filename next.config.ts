import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // next dev가 AGENTS.md / CLAUDE.md를 자동 생성하지 않도록
  agentRules: false,
  // 한/영 루트 레이아웃이 따로라 전역 404(app/global-not-found.tsx) 사용
  experimental: { globalNotFound: true },
};

export default nextConfig;
