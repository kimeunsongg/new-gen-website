"use client";

import { useEffect, useState } from "react";
import { BLOG_COUNT, BLOG_RECENT_MONTHS, FALLBACK_POSTS, type FeedPost } from "@/data/blog";
import type { Locale } from "@/lib/i18n";

type Card = { href: string; image: string; title: string; category: string };

const fallback = (locale: Locale): Card[] =>
  FALLBACK_POSTS.map((p) => ({ href: p.href, image: p.image, title: p.title[locale], category: p.category[locale] }));

/** 최근 글을 앞에서부터 채우고, 모자라면 직접 고른 글로 채움 */
function merge(feed: FeedPost[], locale: Locale): Card[] {
  const since = new Date();
  since.setMonth(since.getMonth() - BLOG_RECENT_MONTHS);
  const recent: Card[] = feed
    .filter((p) => new Date(p.date) >= since)
    .map((p) => ({ href: p.href, image: `/api/blog/img?u=${encodeURIComponent(p.image)}`, title: p.title, category: p.category }));
  const rest = fallback(locale).filter((f) => !recent.some((r) => r.href === f.href));
  return [...recent, ...rest].slice(0, BLOG_COUNT);
}

/** 처음엔 고른 글로 그리고, 방문 시점에 /api/blog(server.mjs)의 최신 글로 바꿔 끼움.
    영문 페이지는 RSS 제목이 한국어라 고른 글만 사용. next dev에는 /api가 없어 항상 고른 글. */
export default function BlogPosts({ locale }: { locale: Locale }) {
  const [cards, setCards] = useState(() => fallback(locale));

  useEffect(() => {
    if (locale !== "ko") return;
    let alive = true;
    fetch("/api/blog")
      .then((r) => (r.ok ? r.json() : []))
      .then((feed: FeedPost[]) => alive && setCards(merge(feed, locale)))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [locale]);

  return (
    <ul className="grid-4 blog-posts">
      {cards.map((p) => (
        <li key={p.href}>
          <a href={p.href} target="_blank" rel="noopener noreferrer" className="blog-post">
            <span className="blog-post__media">
              <img src={p.image} alt="" loading="lazy" />
            </span>
            <span className="blog-post__cat">{p.category}</span>
            <strong className="blog-post__title">{p.title}</strong>
          </a>
        </li>
      ))}
    </ul>
  );
}
