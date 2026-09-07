import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/invoice/", "/wallet/"],
    },
    sitemap: "https://asteroidpay.io/sitemap.xml",
  };
}
