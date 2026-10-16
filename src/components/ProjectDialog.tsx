"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import type { Project } from "@/data/types";
import {
  categoryLabels,
  hasPlayableVideo,
  youtubeEmbedUrl,
  youtubeWatchUrl,
} from "@/lib/projects";
import { WorkArtwork } from "./WorkArtwork";

const { uiLabels } = portfolioData;
const VIDEO_TIMEOUT_MS = 15000;

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Ficha/modal único. Usa o elemento <dialog> nativo com showModal(), que já
 * oferece: foco inicial, contenção de Tab, fundo inerte, Escape e retorno de foco.
 * O conteúdo (inclusive o iframe de vídeo) só existe enquanto a ficha está aberta,
 * então fechar encerra a reprodução.
 */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add("dialog-open");
    return () => {
      document.documentElement.classList.remove("dialog-open");
      if (dialog.open) dialog.close();
    };
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onClose={onClose}
      onKeyDown={(event) => {
        // Contém o Tab dentro da ficha (o modal nativo deixa o foco escapar para o navegador).
        if (event.key !== "Tab") return;
        const items = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={(event) => {
        // Clique no fundo (fora do painel) fecha a ficha.
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      {project ? (
        <DialogContent
          key={project.id}
          project={project}
          onRequestClose={() => dialogRef.current?.close()}
        />
      ) : null}
    </dialog>
  );
}

function DialogContent({
  project,
  onRequestClose,
}: {
  project: Project;
  onRequestClose: () => void;
}) {
  const video = hasPlayableVideo(project) ? project.media.video : null;
  const caption = [project.presentationCategory ?? categoryLabels(project).join(" • "), project.periodLabel]
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

  return (
    <div>
      <div className="sticky top-0 z-10 flex justify-end border-b border-line bg-surface px-3 py-2 sm:px-4">
        <button
          type="button"
          autoFocus
          onClick={onRequestClose}
          aria-label={uiLabels.dialog.closeLabel}
          className="inline-flex min-h-11 items-center gap-2 border border-line bg-ink px-4 text-sm font-medium text-paper transition-colors hover:border-amber hover:text-amber"
        >
          <X aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
          <span>{uiLabels.actions.close}</span>
        </button>
      </div>

      {video ? (
        <VideoPlayer
          id={video.id}
          title={`${uiLabels.dialog.videoTitlePrefix} ${project.title}`}
        />
      ) : (
        <WorkArtwork
          project={project}
          variant="dialog"
          showTitle={false}
          sizes="(min-width: 640px) 56rem, 100vw"
        />
      )}

      <div className="px-5 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
        {caption ? (
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-mute">
            {caption}
          </p>
        ) : null}
        <h2
          id="dialog-title"
          className="mt-3 font-serif text-fluid-h3 leading-[1.1] text-paper"
        >
          {project.title}
        </h2>

        {details.length > 0 ? (
          <dl className="mt-7 divide-y divide-line border-y border-line">
            {details.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
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
            className="link-text mt-6 inline-flex min-h-11 items-center gap-2"
          >
            {project.media.externalLink.label}
            <ExternalLink aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            <span className="sr-only">{uiLabels.externalLinkHint}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

function VideoPlayer({ id, title }: { id: string; title: string }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("error"), VIDEO_TIMEOUT_MS);
    const onOffline = () => setStatus("error");
    window.addEventListener("offline", onOffline);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("offline", onOffline);
    };
  }, [status]);

  return (
    <div>
      <div className="relative aspect-video w-full bg-ink">
        {status !== "error" ? (
          <iframe
            src={youtubeEmbedUrl(id)}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setStatus("ready")}
          />
        ) : null}
        {status === "loading" ? (
          <p
            role="status"
            className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-mute"
          >
            {uiLabels.dialog.videoLoading}
          </p>
        ) : null}
        {status === "error" ? (
          <div
            role="alert"
            className="absolute inset-0 grid place-content-center gap-4 p-6 text-center"
          >
            <p className="mx-auto max-w-md text-fluid-sm text-paper">
              {uiLabels.dialog.videoError}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex justify-end border-b border-line px-5 py-1 sm:px-10">
        <a
          href={youtubeWatchUrl(id)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-text inline-flex min-h-11 items-center gap-2 text-sm"
        >
          {uiLabels.actions.watchOnYoutube}
          <ExternalLink aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          <span className="sr-only">{uiLabels.externalLinkHint}</span>
        </a>
      </div>
    </div>
  );
}
