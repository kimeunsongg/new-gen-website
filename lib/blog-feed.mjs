// 네이버 블로그 RSS 읽기 (functions/api/blog/에서 사용)
import { shortTitle } from "./blog-title.mjs";

export const RSS_URL = "https://rss.blog.naver.com/newgenleadership.xml";
export const IMG_HOST = /(^|\.)pstatic\.net$/;

const text = (item, tag) => {
  const m = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? m[1].trim() : "";
};

/** RSS → 글 목록. 본문 요약은 쓰지 않음(연락처·반복 문구가 섞여 있음) */
export function parseRss(xml) {
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
