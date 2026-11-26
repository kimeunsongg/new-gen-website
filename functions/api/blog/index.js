// Cloudflare Pages Function: GET /api/blog — 네이버 블로그 최신 글 목록(JSON)
// RSS는 Cloudflare 캐시에 하루 동안 두어, 네이버에는 하루 한 번만 요청함.
import { RSS_URL, parseRss } from "../../../lib/blog-feed.mjs";

const json = (body, maxAge) =>
  new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": `public, max-age=${maxAge}` },
  });

export async function onRequestGet() {
  try {
    const res = await fetch(RSS_URL, { cf: { cacheTtl: 86400, cacheEverything: true } });
    if (!res.ok) throw new Error(`RSS ${res.status}`);
    return json(parseRss(await res.text()), 3600);
  } catch (e) {
    // 네이버가 응답하지 않으면 빈 목록 → 화면은 직접 고른 글을 보여 줌. 잠깐만 캐시해 곧 다시 시도
    console.error("[blog]", e.message);
    return json([], 60);
  }
}
