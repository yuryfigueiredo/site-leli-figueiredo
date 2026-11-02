import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/site";
import { publicProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  // Só publica entradas com o domínio real e fora do modo prévia.
  if (!siteUrl || isPreview) return [];

  const obras = publicProjects.map((project) => ({
    url: `${siteUrl}/obras/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...obras,
  ];
}
