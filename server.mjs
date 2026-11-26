// 운영 서버: out/ 정적 파일(이전 `serve out`과 같은 동작) + 네이버 블로그 RSS API
//   GET /api/blog          블로그 최신 글 목록(JSON, 10분 캐시)
//   GET /api/blog/img?u=…  네이버 사진 대신 받아 전달(외부 사이트 표시가 막혀 있어서)
import http from "node:http";
import { promisify } from "node:util";
import compression from "compression";
import handler from "serve-handler";
import { shortTitle } from "./lib/blog-title.mjs";

const PORT = Number(process.env.PORT) || 3000;
const RSS_URL = "https://rss.blog.naver.com/newgenleadership.xml";
const FEED_TTL = 10 * 60 * 1000;
const IMG_HOST = /(^|\.)pstatic\.net$/;

const compress = promisify(compression());

let feed = { at: 0, posts: [] };

const text = (item, tag) => {
  const m = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? m[1].trim() : "";
};

/** RSS → 글 목록. 본문 요약은 쓰지 않음(연락처·반복 문구가 섞여 있음) */
function parseRss(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => {
      const img = text(item, "description").match(/<img[^>]+src="([^"]+)"/);
      return {
        title: shortTitle(text(item, "title").replace(/\s+/g, " ")),
        href: text(item, "link").split("?")[0],
        date: new Date(text(item, "pubDate")).toISOString(),
        category: text(item, "category"),
        image: img ? img[1].replace(/&amp;/g, "&") : "",
      };
    })
    .filter((p) => p.image && !p.category.startsWith("[블챌]"));
}

async function getPosts() {
  if (Date.now() - feed.at < FEED_TTL) return feed.posts;
  try {
    const res = await fetch(RSS_URL, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`RSS ${res.status}`);
    feed = { at: Date.now(), posts: parseRss(await res.text()) };
  } catch (e) {
    // 네이버가 응답하지 않으면 직전 목록을 계속 쓰고, 1분 뒤 다시 시도
    console.error("[blog]", e.message);
    feed.at = Date.now() - FEED_TTL + 60 * 1000;
  }
  return feed.posts;
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

async function blogImage(url, res) {
  let target;
  try {
    target = new URL(url.searchParams.get("u") ?? "");
  } catch {
    return send(res, 400, { "Content-Type": "text/plain" }, "bad url");
  }
  if (target.protocol !== "https:" || !IMG_HOST.test(target.hostname)) {
    return send(res, 400, { "Content-Type": "text/plain" }, "host not allowed");
  }
  try {
    // Referer 없이 요청해야 네이버가 허용함
    const img = await fetch(target, { signal: AbortSignal.timeout(8000) });
    const type = img.headers.get("content-type") ?? "";
    if (!img.ok || !type.startsWith("image/")) throw new Error(`img ${img.status}`);
    send(res, 200, { "Content-Type": type, "Cache-Control": "public, max-age=86400" }, Buffer.from(await img.arrayBuffer()));
  } catch (e) {
    console.error("[blog img]", e.message);
    send(res, 502, { "Content-Type": "text/plain" }, "image unavailable");
  }
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/api/blog") {
      const posts = await getPosts();
      return send(res, 200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=600" }, JSON.stringify(posts));
    }
    if (url.pathname === "/api/blog/img") return blogImage(url, res);

    await compress(req, res);
    await handler(req, res, { public: "out", etag: true, directoryListing: false });
  })
  .listen(PORT, "0.0.0.0", () => console.log(`Serving out/ on http://0.0.0.0:${PORT}`));
