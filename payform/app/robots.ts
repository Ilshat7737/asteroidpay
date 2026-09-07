import type { MetadataRoute } from "next";

// Every page this app serves is a private, single-use transaction page —
// unlike landing's robots.ts, there's nothing here worth crawling, so the
// whole domain is closed rather than listing individual paths. No sitemap
// either, for the same reason.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
