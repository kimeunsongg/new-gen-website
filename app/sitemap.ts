import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "about/", "academics/", "faq/", "privacy/", "terms/"].map((p) => ({
    url: `${SITE.url}/${p}`,
    changeFrequency: "monthly",
  }));
}
