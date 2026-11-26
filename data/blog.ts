// Home "학교 이야기" — 네이버 블로그에서 고른 글 (2026.11 수동 선정)
// 블로그가 2025.03 이후 새 글이 없어 최신 글 자동 연동 대신, 날짜가 드러나지 않는 사진 글을 고정으로 노출.
// 썸네일은 네이버가 외부 사이트에서의 직접 표시를 막아(403) public/images/blog/에 저장해 둠.
// 나중에 RSS(https://rss.blog.naver.com/newgenleadership.xml) 자동 연동으로 바꿀 자리.

export type BlogPost = {
  href: string;
  image: string;
  title: { ko: string; en: string };
  category: { ko: string; en: string };
};

const POST = (id: string) => `https://blog.naver.com/newgenleadership/${id}`;

export const BLOG_POSTS: BlogPost[] = [
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
