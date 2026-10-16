"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import type { Project } from "@/data/types";
import {
  categoryLabels,
  featuredActionLabel,
  featuredProjects,
  hasPlayableVideo,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useProjectDialog } from "./ProjectDialogProvider";
import { WorkArtwork } from "./WorkArtwork";

const { featured, navigation, uiLabels } = portfolioData;

/**
 * Composição editorial assimétrica: cada posição tem sua largura em telas largas.
 * (a ordem segue `featuredOrder`; no celular tudo vira uma coluna.)
 */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

const SIZES = [
  "(min-width: 1320px) 700px, (min-width: 1024px) 58vw, 100vw",
  "(min-width: 1320px) 500px, (min-width: 1024px) 41vw, 100vw",
  "(min-width: 1320px) 500px, (min-width: 1024px) 41vw, 100vw",
  "(min-width: 1320px) 700px, (min-width: 1024px) 58vw, 100vw",
  "(min-width: 1320px) 700px, (min-width: 1024px) 58vw, 100vw",
  "(min-width: 1320px) 500px, (min-width: 1024px) 41vw, 100vw",
  "(min-width: 1320px) 500px, (min-width: 1024px) 41vw, 100vw",
  "(min-width: 1320px) 700px, (min-width: 1024px) 58vw, 100vw",
];

export function FeaturedWorks() {
  const [expanded, setExpanded] = useState(false);
  const eyebrow = navigation.items.find((item) => item.id === "obras")?.label ?? "";
  const extras = featuredProjects.slice(featured.initialCount);
  const extraIds = extras.map((project) => `destaque-${project.slug}`).join(" ");

  return (
    <section
      id="obras"
      aria-labelledby="obras-titulo"
      className="border-t border-line pb-20 pt-12 sm:pb-24 lg:pb-32 lg:pt-14"
    >
      <div className="shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading id="obras-titulo" eyebrow={eyebrow} title={featured.title} />
            <p className="max-w-sm text-fluid-lead text-mute">{featured.support}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 lg:mt-20 lg:grid-cols-12 lg:gap-y-20">
          {featuredProjects.map((project, index) => {
            const isExtra = index >= featured.initialCount;
            return (
              <FeaturedCard
                key={project.id}
                project={project}
                index={index}
                hidden={isExtra && !expanded}
                animateIn={isExtra && expanded}
              />
            );
          })}
        </div>

        {extras.length > 0 ? (
          <div className="mt-14 flex justify-center border-t border-line pt-10">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={extraIds}
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex min-h-12 items-center gap-3 border border-line px-6 text-[0.9375rem] font-medium text-paper transition-colors hover:border-amber hover:text-amber"
            >
              {expanded ? uiLabels.actions.lessFeatured : uiLabels.actions.moreFeatured}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

interface FeaturedCardProps {
  project: Project;
  index: number;
  hidden: boolean;
  animateIn: boolean;
}

function FeaturedCard({ project, index, hidden, animateIn }: FeaturedCardProps) {
  const { openProject } = useProjectDialog();
  const isLead = index === 0;
  const hasImage = Boolean(project.media.image);
  const playable = hasPlayableVideo(project);
  const caption = [project.presentationCategory ?? categoryLabels(project).join(" • "), project.periodLabel]
    .filter(Boolean)
    .join(" • ");
  const order = String(project.featuredOrder ?? index + 1).padStart(2, "0");

  return (
    <article
      id={`destaque-${project.slug}`}
      hidden={hidden}
      className={cn(
        "group relative min-w-0",
        SPANS[index] ?? "lg:col-span-6",
        animateIn && "animate-fade-up",
      )}
    >
      <div className="relative overflow-hidden border border-line">
        <div className="transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.02]">
          <WorkArtwork
            project={project}
            sizes={SIZES[index] ?? "(min-width: 1024px) 50vw, 100vw"}
            priority={false}
          />
        </div>
        {playable ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center border border-paper/60 bg-ink/70 text-paper"
          >
            <Play strokeWidth={1.5} className="h-5 w-5" />
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-5">
        <span aria-hidden="true" className="font-serif text-lg leading-8 text-amber">
          {order}
        </span>
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-mute">
            {caption}
          </p>
          <h3
            className={cn(
              "mt-2 font-serif text-paper",
              isLead ? "text-fluid-h2" : "text-fluid-h3",
              !hasImage && "sr-only",
            )}
          >
            {project.title}
          </h3>
          {project.role ? (
            <p className={cn("text-fluid-sm text-paper", hasImage ? "mt-3" : "mt-2")}>
              {project.role}
            </p>
          ) : null}
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => openProject(project.slug)}
            className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-amber pb-0.5 text-[0.9375rem] font-medium text-paper transition-colors after:absolute after:inset-0 after:content-[''] hover:text-amber focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-amber"
          >
            {featuredActionLabel(project)}
            {playable ? (
              <Play aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            ) : (
              <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
