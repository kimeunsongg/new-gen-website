import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ConsultBand, KakaoFloat } from "@/components/Kakao";
import { getDict } from "@/data/dict";
import { SITE } from "@/data/site";
import { localePath, type Locale } from "@/lib/i18n";

/** 언어별 루트 레이아웃의 공통 metadata */
export function rootMetadata(locale: Locale): Metadata {
  const m = getDict(locale).meta;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: m.siteTitle, template: m.titleTemplate },
    description: m.description,
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      siteName: m.siteName,
      title: m.siteName,
      description: m.description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: m.siteName }],
    },
    // 구글 검색 파비콘은 48px 배수 정사각형이어야 함
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: "/apple-touch-icon.png",
    },
    // 네이버 서치어드바이저 소유확인
    verification: { other: { "naver-site-verification": "cbc45262909e1e98cf0b47a6116a6132aa425580" } },
  };
}

type PageKey = "home" | "about" | "academics" | "faq" | "privacy" | "terms";
const PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about/",
  academics: "/academics/",
  faq: "/faq/",
  privacy: "/privacy/",
  terms: "/terms/",
};

/** 페이지별 metadata + 한/영 대응 주소(hreflang) */
export function pageMetadata(locale: Locale, key: PageKey): Metadata {
  const m = getDict(locale).meta;
  const path = PATHS[key];
  const page: { title: string; description?: string } | undefined = key === "home" ? undefined : m[key];
  return {
    ...(page && { title: page.title }),
    ...(page?.description && { description: page.description }),
    alternates: {
      canonical: localePath(locale, path),
      languages: { ko: localePath("ko", path), en: localePath("en", path) },
    },
  };
}

export function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {getDict(locale).common.skipLink}
        </a>
        <Header locale={locale} />
        <main id="main">
          {children}
          <ConsultBand locale={locale} />
        </main>
        <Footer locale={locale} />
        <KakaoFloat locale={locale} />
      </body>
    </html>
  );
}
