import Image from "next/image";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

interface WorkArtworkProps {
  project: Project;
  /** "plate" = vitrine; "dialog" = topo da ficha. */
  variant?: "plate" | "dialog";
  /** Mostra o título real dentro do fallback tipográfico. */
  showTitle?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Hash determinístico e estável, só para variar a textura abstrata por obra. */
function seedFrom(value: string): () => number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  let state = hash >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/** Textura abstrata discreta: linhas finas, marcas de enquadramento e um arco. */
function AbstractTexture({ seedKey }: { seedKey: string }) {
  const rand = seedFrom(seedKey);
  const lines = Array.from({ length: 3 }, () => 12 + rand() * 66);
  const vertical = 18 + rand() * 64;
  const arcX = 20 + rand() * 120;
  const arcR = 26 + rand() * 24;
  const tickY = 10 + rand() * 70;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 160 90"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <circle cx={arcX} cy="45" r={arcR} stroke="#27272A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <circle cx={arcX} cy="45" r={arcR * 0.55} stroke="#1c1c21" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {lines.map((y) => (
        <line key={y} x1="0" x2="160" y1={y} y2={y} stroke="#27272A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      <line x1={vertical} x2={vertical} y1="0" y2="90" stroke="#27272A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1={vertical - 3} x2={vertical + 3} y1={tickY} y2={tickY} stroke="#F59E0B" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      {/* marcas de enquadramento */}
      <path d="M8 16V8h8M144 8h8v8M152 74v8h-8M16 82H8v-8" stroke="#52525B" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * Material visual da obra. Com imagem aprovada, exibe a imagem (frame em 16:9 com
 * recorte por ponto focal; pôster com proporção preservada). Sem imagem, exibe um
 * fallback editorial tipográfico com o título real — nunca uma imagem de terceiros.
 */
export function WorkArtwork({
  project,
  variant = "plate",
  showTitle = true,
  sizes,
  priority = false,
  className,
}: WorkArtworkProps) {
  const image = project.media.image;

  if (image) {
    const isPoster = image.kind === "poster";
    return (
      <div className={cn("grain relative aspect-video w-full overflow-hidden bg-surface", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={cn(
            "h-full w-full",
            isPoster ? "object-contain py-3" : "object-cover",
          )}
          style={!isPoster && image.focalPoint ? { objectPosition: image.focalPoint } : undefined}
        />
        {/* Overlay escuro cinematográfico: integra as cores do frame à direção de arte noturna */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent transition-opacity duration-500 group-hover:opacity-40"
        />
      </div>
    );
  }

  const title = project.shortTitle ?? project.title;
  return (
    <div
      className={cn(
        "grain relative aspect-video w-full overflow-hidden bg-surface",
        className,
      )}
      style={{ containerType: "inline-size" }}
    >
      <AbstractTexture seedKey={project.id} />
      {showTitle ? (
        <div className="absolute inset-x-0 bottom-0 p-[5cqw]">
          <span
            aria-hidden="true"
            className={cn(
              "block font-serif leading-[1.05] text-paper",
              variant === "plate" ? "max-w-[18ch]" : "max-w-[24ch]",
            )}
            style={{ fontSize: "clamp(1.25rem, 6.2cqw, 3rem)", textWrap: "balance" }}
          >
            {title}
          </span>
        </div>
      ) : null}
    </div>
  );
}
