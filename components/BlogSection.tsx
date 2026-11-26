import { BLOG_POSTS } from "@/data/blog";
import { getDict } from "@/data/dict";
import { SNS } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { BlogIcon } from "./Icons";
import { SectionHead } from "./ui";

const BLOG_URL = SNS.find((s) => s.key === "blog")!.href;

/** 바깥 링크 표시 ↗ */
function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 4 3 21" />
      <path d="M4 4h16v16" />
    </svg>
  );
}

/** Home: 블로그 글 카드 + 블로그 방문 배너 (토스 리소스센터 배너 방식 — reference/toss-resource-center-analysis.md) */
export default function BlogSection({ locale }: { locale: Locale }) {
  const t = getDict(locale).home.blog;
  return (
    <section className="container section" aria-labelledby="blog-title">
      <SectionHead id="blog-title" eyebrow={t.eyebrow} title={t.title} />
      <ul className="grid-4 blog-posts">
        {BLOG_POSTS.map((p) => (
          <li key={p.href}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="blog-post">
              <span className="blog-post__media">
                <img src={p.image} alt="" loading="lazy" />
              </span>
              <span className="blog-post__cat">{p.category[locale]}</span>
              <strong className="blog-post__title">{p.title[locale]}</strong>
            </a>
          </li>
        ))}
      </ul>

      {/* 카드 전체가 하나의 링크. 글자는 왼쪽 아래, 유리 원형 ↗는 오른쪽 위 */}
      <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="blog-banner">
        <span className="blog-banner__bg" aria-hidden="true">
          <img src="/images/hero-1.jpg" alt="" loading="lazy" />
        </span>
        <span className="blog-banner__top">
          <span className="blog-banner__arrow">
            <ArrowUpRight />
          </span>
        </span>
        <span className="blog-banner__text">
          <span className="blog-banner__label">
            <BlogIcon size={20} />
            {t.bannerLabel}
          </span>
          <strong className="blog-banner__title">{t.bannerTitle}</strong>
        </span>
        <span className="sr-only">{t.newWindow}</span>
      </a>
    </section>
  );
}
