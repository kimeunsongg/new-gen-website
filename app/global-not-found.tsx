import type { Metadata } from "next";
import "./globals.css";

// 루트 레이아웃이 한/영 두 개라 404는 여기서 따로 렌더링
export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | Page Not Found",
};

export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <main className="container not-found">
          <img src="/images/logo-emblem.png" alt="" width={72} height={72} />
          <h1>페이지를 찾을 수 없습니다</h1>
          <p lang="en">Page not found</p>
          <div className="not-found__links">
            <a href="/" className="btn btn--outline">
              홈으로
            </a>
            <a href="/en/" className="btn btn--outline" lang="en">
              English home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
