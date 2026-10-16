import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Só publica entradas com o domínio real e fora do modo prévia.
  if (!siteUrl || isPreview) return [];
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
