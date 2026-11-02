import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import {
  categoryLabels,
  getProjectBySlug,
  hasPlayableVideo,
  publicProjects,
  youtubeEmbedUrl,
  youtubeWatchUrl,
} from "@/lib/projects";
import { siteUrl } from "@/lib/site";
import { WorkArtwork } from "@/components/WorkArtwork";

const { identity, uiLabels } = portfolioData;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publicProjects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const base = siteUrl ?? "http://localhost:3000";
  const url = `${base}/obras/${slug}`;
  const previousImages = ((await parent).openGraph?.images as { url: string }[]) || [];

  return {
    title: project.title,
    description: project.description ?? `${project.title} — ${project.role ?? identity.roles[0]}`,
    alternates: { canonical: url },
    openGraph: {
      type: "video.other",
      locale: "pt_BR",
      siteName: identity.name,
      title: project.title,
      description: project.description ?? `${project.title} — ${project.role ?? identity.roles[0]}`,
      url,
      images: [
        {
          url: `${base}/obras/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description ?? `${project.title} — ${project.role ?? identity.roles[0]}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const base = siteUrl ?? "http://localhost:3000";
  const currentIndex = publicProjects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? publicProjects[currentIndex - 1] : null;
  const next = currentIndex < publicProjects.length - 1 ? publicProjects[currentIndex + 1] : null;

  const caption = [
    project.presentationCategory ?? categoryLabels(project).join(" • "),
    project.periodLabel,
  ]
    .filter(Boolean)
    .join(" • ");

  const details: { label: string; value: string }[] = [];
  if (project.role) details.push({ label: uiLabels.dialog.role, value: project.role });
  if (project.associatedCredit)
    details.push({ label: uiLabels.dialog.credit, value: project.associatedCredit });
  if (project.organizations.length > 0)
    details.push({
      label: uiLabels.dialog.production,
      value: project.organizations.join(" • "),
    });
  if (project.description)
    details.push({ label: uiLabels.dialog.description, value: project.description });

  const video = hasPlayableVideo(project) ? project.media.video : null;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Obras", item: `${base}/#obras` },
        { "@type": "ListItem", position: 2, name: project.title, item: `${base}/obras/${slug}` },
      ],
    },
  ];

  if (video) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: project.title,
      description: project.description,
      thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
      contentUrl: youtubeWatchUrl(video.id),
      embedUrl: youtubeEmbedUrl(video.id),
    });
  }

  return (
    <>
      <section className="border-b border-line pb-16 pt-[calc(var(--header-h)+2rem)] sm:pb-20 lg:pt-[calc(var(--header-h)+3rem)]">
        <div className="shell">
          <Link
            href="/#obras"
            className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-mute transition-colors hover:text-amber"
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            Voltar para obras
          </Link>

          {caption ? (
            <p className="mt-8 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-mute">
              {caption}
            </p>
          ) : null}

          <h1 className="mt-4 font-serif text-fluid-h1 leading-[1.05] text-paper">
            {project.title}
          </h1>

          {project.role ? (
            <p className="mt-6 text-fluid-lead text-paper/90">{project.role}</p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {video ? (
              <div className="relative aspect-video w-full overflow-hidden border border-line bg-ink">
                <iframe
                  src={youtubeEmbedUrl(video.id)}
                  title={`${uiLabels.dialog.videoTitlePrefix} ${project.title}`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <WorkArtwork
                project={project}
                variant="dialog"
                showTitle={false}
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            )}
          </div>

          <div className="lg:col-span-5">
            {details.length > 0 ? (
              <dl className="divide-y divide-line border-y border-line">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-mute">
                      {item.label}
                    </dt>
                    <dd className="text-fluid-sm text-paper">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {project.media.externalLink ? (
              <a
                href={project.media.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text mt-8 inline-flex min-h-11 items-center gap-2"
              >
                {project.media.externalLink.label}
                <ExternalLink aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                <span className="sr-only">{uiLabels.externalLinkHint}</span>
              </a>
            ) : null}

            {video ? (
              <a
                href={youtubeWatchUrl(video.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text mt-6 inline-flex min-h-11 items-center gap-2"
              >
                {uiLabels.actions.watchOnYoutube}
                <ExternalLink aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                <span className="sr-only">{uiLabels.externalLinkHint}</span>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {(prev || next) ? (
        <section className="py-12 sm:py-16">
          <div className="shell flex justify-between gap-4">
            {prev ? (
              <a
                href={`/obras/${prev.slug}`}
                className="inline-flex min-h-11 items-center gap-2 border border-line px-5 text-[0.9375rem] text-paper transition-colors hover:border-amber hover:text-amber"
              >
                <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                {prev.title}
              </a>
            ) : <div />}
            {next ? (
              <a
                href={`/obras/${next.slug}`}
                className="inline-flex min-h-11 items-center gap-2 border border-line px-5 text-[0.9375rem] text-paper transition-colors hover:border-amber hover:text-amber"
              >
                {next.title}
                <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 rotate-180" />
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
