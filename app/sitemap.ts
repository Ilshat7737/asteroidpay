import type { MetadataRoute } from "next";

const BASE_URL = "https://hqclouds.com";

// Content-modification dates, not build/deploy timestamps. The three legal
// pages show this same date as "Last updated" in their visible copy — keep
// both in sync when that text changes. The homepage date is the last time
// its content was substantively revised.
const HOME_LAST_MODIFIED = new Date("2026-09-01");
const LEGAL_LAST_MODIFIED = new Date("2026-08-31");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: HOME_LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE_URL}/terms`,
      lastModified: LEGAL_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: LEGAL_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/aml`,
      lastModified: LEGAL_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
