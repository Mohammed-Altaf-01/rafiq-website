import type { MetadataRoute } from "next";

import { canonicalUrl, type PublicPath } from "@/lib/metadata";

export const dynamic = "force-static";

const routes: Array<{
  path: PublicPath;
  changeFrequency: "weekly" | "yearly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/delete-account", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, ...metadata }) => ({
    url: canonicalUrl(path),
    ...metadata,
  }));
}
