// Home "학교 이야기" — 네이버 블로그 글
// 최신 글은 Cloudflare Pages Function /api/blog(functions/api/blog/, 블로그 RSS)에서 받아 오고, 최근 BLOG_RECENT_MONTHS개월 안의 글만 보여 줌.
// 모자라면 아래 FALLBACK_POSTS(2026.11 직접 고른 글)로 채움. 영문 페이지는 FALLBACK_POSTS만 사용.
// FALLBACK 썸네일은 네이버가 외부 사이트에서의 직접 표시를 막아(403) public/images/blog/에 저장해 둠.

export type BlogPost = {
  href: string;
  image: string;
  title: { ko: string; en: string };
  category: { ko: string; en: string };
};

const POST = (id: string) => `https://blog.naver.com/newgenleadership/${id}`;

export const BLOG_RECENT_MONTHS = 6;
export const BLOG_COUNT = 4;

export const FALLBACK_POSTS: BlogPost[] = [
  {
    href: POST("223419679057"),
    image: "/images/blog/spring-picnic.jpg",
    title: { ko: "벚꽃나들이", en: "Cherry Blossom Outing" },
    category: { ko: "학교 생활", en: "School Life" },
  },
  {
    href: POST("223419232809"),
    image: "/images/blog/campus-tour.jpg",
    title: { ko: "서울 대학탐방", en: "University Tour in Seoul" },
    category: { ko: "창의체험활동", en: "Field Experience" },
  },
  {
    href: POST("223728837899"),
    image: "/images/blog/english-teacher.jpg",
    title: { ko: "미국에서 오신 선생님과 함께한 3주", en: "Three Weeks with a Teacher from the U.S." },
    category: { ko: "학교 생활", en: "School Life" },
  },
  {
    href: POST("223077893511"),
    image: "/images/blog/plogging.jpg",
    title: { ko: "에코 플로깅 봉사활동", en: "Eco Plogging Volunteer Work" },
    category: { ko: "봉사활동", en: "Volunteering" },
  },
];

/** /api/blog 응답 한 건 (functions/api/blog/index.js) */
export type FeedPost = { title: string; href: string; date: string; category: string; image: string };
