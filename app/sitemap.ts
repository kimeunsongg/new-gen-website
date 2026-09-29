import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { localePath, PAGE_PATHS } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_PATHS.flatMap((p) => {
    const languages = { ko: `${SITE.url}${localePath("ko", p)}`, en: `${SITE.url}${localePath("en", p)}` };
    return (["ko", "en"] as const).map((loc) => ({
      url: languages[loc],
      changeFrequency: "monthly" as const,
      alternates: { languages },
    }));
  });
}
