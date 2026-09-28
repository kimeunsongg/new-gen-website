import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // next dev가 AGENTS.md / CLAUDE.md를 자동 생성하지 않도록
  agentRules: false,
};

export default nextConfig;
