// Cloudflare Pages Function: GET /api/blog/img?u=… — 네이버 사진을 대신 받아 전달
// 네이버는 외부 사이트에서 사진을 바로 띄우면 막음(403). pstatic.net 주소만 허용(열린 프록시 방지).
import { IMG_HOST } from "../../../lib/blog-feed.mjs";

const bad = (msg) => new Response(msg, { status: 400, headers: { "Content-Type": "text/plain" } });

export async function onRequestGet({ request }) {
  let target;
  try {
    target = new URL(new URL(request.url).searchParams.get("u") ?? "");
  } catch {
    return bad("bad url");
  }
  if (target.protocol !== "https:" || !IMG_HOST.test(target.hostname)) return bad("host not allowed");

  // Referer 없이 요청해야 네이버가 허용함 (서버 쪽 fetch는 Referer를 보내지 않음)
  const img = await fetch(target, { cf: { cacheTtl: 86400, cacheEverything: true } }).catch(() => null);
  const type = img?.headers.get("content-type") ?? "";
  if (!img?.ok || !type.startsWith("image/")) {
    return new Response("image unavailable", { status: 502, headers: { "Content-Type": "text/plain" } });
  }
  return new Response(img.body, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=86400" } });
}
