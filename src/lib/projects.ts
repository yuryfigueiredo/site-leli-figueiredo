import { portfolioData } from "@/data/portfolioData";
import type { CategoryId, Project } from "@/data/types";
import { normalizeText } from "./utils";

const { projects, filmography, uiLabels } = portfolioData;

const categoryLabelById = new Map<CategoryId, string>(
  filmography.categories.map((category) => [category.id, category.label]),
);

/** Somente registros liberados para exibição pública, na ordem editorial da configuração. */
export const publicProjects: Project[] = projects.filter(
  (project) => project.publicationStatus === "public",
);

/** Destaques ordenados por `featuredOrder` (mesmos registros do catálogo). */
export const featuredProjects: Project[] = publicProjects
  .filter((project) => project.featuredOrder !== null)
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));

export function getProjectBySlug(slug: string): Project | undefined {
  return publicProjects.find((project) => project.slug === slug);
}

export function categoryLabels(project: Project): string[] {
  return project.categories.map((id) => categoryLabelById.get(id) ?? id);
}

/** True se o vídeo existir e tiver disponibilidade validada. */
export function hasPlayableVideo(project: Project): boolean {
  return project.media.video?.status === "available";
}

/** Rótulo da ação da vitrine: nunca promete vídeo quando a ficha é o resultado. */
export function featuredActionLabel(project: Project): string {
  if (hasPlayableVideo(project)) return uiLabels.actions.watchTrailer;
  return project.actionLabel ?? uiLabels.actions.viewProject;
}

/** Um registro só tem ficha se houver informação além do que a linha do catálogo já exibe. */
export function hasDossier(project: Project): boolean {
  return (
    project.featuredOrder !== null ||
    Boolean(project.description) ||
    hasPlayableVideo(project) ||
    Boolean(project.media.externalLink)
  );
}

export function matchesFilter(
  project: Project,
  filter: "all" | CategoryId,
): boolean {
  return filter === "all" || project.categories.includes(filter);
}

export function matchesQuery(project: Project, query: string): boolean {
  const needle = normalizeText(query);
  if (!needle) return true;
  const haystack = normalizeText(
    [project.title, project.shortTitle].filter(Boolean).join(" "),
  );
  return haystack.includes(needle);
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1`;
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
}
