export type Locale = "ko" | "en";

/** 한국어는 기존 주소 그대로, 영어는 /en 아래 */
export function localePath(locale: Locale, path: string) {
  if (locale === "ko") return path;
  return path === "/" ? "/en/" : `/en${path}`;
}

/** 현재 주소에서 다른 언어 버전 주소 */
export function switchLocalePath(pathname: string): { locale: Locale; target: string } {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (p === "/en/" || p.startsWith("/en/")) {
    return { locale: "en", target: p.slice(3) || "/" };
  }
  return { locale: "ko", target: p === "/" ? "/en/" : `/en${p}` };
}

export const PAGE_PATHS = ["/", "/about/", "/academics/", "/faq/", "/privacy/", "/terms/"] as const;
