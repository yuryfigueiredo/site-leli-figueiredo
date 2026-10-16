"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Search, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import type { CategoryId, Project } from "@/data/types";
import {
  categoryLabels,
  hasDossier,
  matchesFilter,
  matchesQuery,
  publicProjects,
} from "@/lib/projects";
import { cn, fillTemplate } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useProjectDialog } from "./ProjectDialogProvider";

const { filmography, navigation, uiLabels } = portfolioData;

type Filter = "all" | CategoryId;

export function Filmography() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(filmography.initialCount);
  const eyebrow = navigation.items.find((item) => item.id === "filmografia")?.label ?? "";

  const results = useMemo(
    () =>
      publicProjects.filter(
        (project) => matchesFilter(project, filter) && matchesQuery(project, query),
      ),
    [filter, query],
  );
  const shown = results.slice(0, visible);
  const hasActiveControls = filter !== "all" || query.trim() !== "";

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setVisible(filmography.initialCount);
  };
  const changeQuery = (next: string) => {
    setQuery(next);
    setVisible(filmography.initialCount);
  };
  const reset = () => {
    setFilter("all");
    setQuery("");
    setVisible(filmography.initialCount);
  };

  return (
    <section
      id="filmografia"
      aria-labelledby="filmografia-titulo"
      className="section-pad border-t border-line"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="filmografia-titulo"
            eyebrow={eyebrow}
            title={filmography.title}
            className="max-w-4xl"
          />
        </Reveal>

        {/* Controles estáveis: ficam acima da lista e não mudam de posição ao filtrar */}
        <div className="mt-12 grid gap-6 lg:mt-16">
          <div className="relative max-w-xl">
            <label htmlFor="busca-filmografia" className="sr-only">
              {uiLabels.catalog.searchLabel}
            </label>
            <Search
              aria-hidden="true"
              strokeWidth={1.5}
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mute"
            />
            <input
              id="busca-filmografia"
              type="search"
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              placeholder={uiLabels.catalog.searchPlaceholder}
              autoComplete="off"
              className="min-h-12 w-full border border-line bg-ink pl-12 pr-12 text-base text-paper placeholder:text-mute focus:border-amber [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => changeQuery("")}
                aria-label={uiLabels.actions.clearSearch}
                className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-mute hover:text-amber"
              >
                <X aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
              </button>
            ) : null}
          </div>

          <div className="min-w-0">
            <div
              role="group"
              aria-label={uiLabels.catalog.filterGroupLabel}
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
            >
              {filmography.filters.map((option) => {
                const active = filter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => changeFilter(option.id)}
                    className={cn(
                      "inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-[0.9375rem] transition-colors",
                      active
                        ? "border-amber bg-surface font-medium text-paper"
                        : "border-line text-mute hover:border-mute hover:text-paper",
                    )}
                  >
                    {active ? (
                      <Check aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-amber" />
                    ) : null}
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p
            role="status"
            aria-live="polite"
            className="text-[0.9375rem] text-mute"
          >
            {fillTemplate(uiLabels.catalog.resultsSummary, {
              shown: shown.length,
              total: results.length,
            })}
          </p>
        </div>

        {results.length > 0 ? (
          <ul aria-label={uiLabels.catalog.listLabel} className="mt-4 border-b border-line">
            {shown.map((project) => (
              <CreditRow key={project.id} project={project} />
            ))}
          </ul>
        ) : (
          <div className="mt-4 border-y border-line py-14 text-center">
            <p className="font-serif text-fluid-h3 text-paper">{uiLabels.catalog.emptyTitle}</p>
            <p className="mt-3 text-fluid-sm text-mute">{uiLabels.catalog.emptyText}</p>
            {hasActiveControls ? (
              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex min-h-11 items-center border border-amber px-5 text-[0.9375rem] font-medium text-amber transition-colors hover:bg-amber hover:text-ink"
              >
                {uiLabels.actions.clearSearchAndFilters}
              </button>
            ) : null}
          </div>
        )}

        {results.length > visible ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((count) => count + filmography.initialCount)}
              className="inline-flex min-h-12 items-center border border-line px-6 text-[0.9375rem] font-medium text-paper transition-colors hover:border-amber hover:text-amber"
            >
              {uiLabels.actions.moreCredits}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CreditRow({ project }: { project: Project }) {
  const { openProject } = useProjectDialog();
  const dossier = hasDossier(project);

  const credits = [
    project.role,
    project.associatedCredit,
    project.organizations.join(" • ") || null,
  ].filter(Boolean);
  const tags = categoryLabels(project);

  return (
    <li
      className={cn(
        "relative grid gap-x-8 gap-y-2 border-t border-line py-5 transition-colors sm:grid-cols-[9.5rem_1fr_auto] sm:items-baseline",
        dossier && "hover:bg-surface",
      )}
    >
      <p className="text-[0.9375rem] tabular-nums text-mute">
        {project.periodLabel ?? "\u00A0"}
      </p>

      <div className="min-w-0">
        {dossier ? (
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => openProject(project.slug)}
            className="inline-flex min-h-11 items-center text-left font-serif text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] leading-tight text-paper after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-amber"
          >
            {project.title}
          </button>
        ) : (
          <p className="font-serif text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] leading-tight text-paper">
            {project.title}
          </p>
        )}
        {credits.length > 0 ? (
          <p className="mt-1 text-fluid-sm text-mute">{credits.join(" · ")}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.875rem] text-mute sm:flex-col sm:items-end sm:gap-1 sm:text-right">
        <p>
          {project.kind === "experience" ? `${uiLabels.catalog.experienceTag} · ` : null}
          {tags.join(" · ")}
        </p>
        {dossier ? (
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 border-b border-amber text-paper"
          >
            {uiLabels.actions.openFicha}
            <ArrowUpRight strokeWidth={1.5} className="h-4 w-4" />
          </span>
        ) : null}
      </div>
    </li>
  );
}
