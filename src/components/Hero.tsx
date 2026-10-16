import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { whatsappUrl } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

const { identity, hero } = portfolioData;

/** Abertura tipográfica. Sem imagem aprovada, usa composição editorial com textura discreta. */
export function Hero() {
  const secondaryHref = whatsappUrl ?? "#contato";
  const secondaryExternal = Boolean(whatsappUrl);

  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-14 pt-[calc(var(--header-h)+2rem)] sm:pb-16 lg:pb-14 lg:pt-[calc(var(--header-h)+2.5rem)]"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow">{identity.roles.join(" • ")}</p>

          <h1
            id="hero-title"
            className="mt-7 font-serif text-fluid-h1 tracking-[-0.01em] text-paper"
          >
            {identity.name}
          </h1>

          <p className="mt-8 max-w-[24ch] font-serif text-fluid-statement text-paper sm:max-w-[28ch]">
            {hero.headline}
          </p>

          <p className="mt-6 max-w-prose text-fluid-lead text-mute">{hero.subheadline}</p>

          <p className="mt-6 text-[0.9375rem] tracking-wide text-paper">{hero.reach}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
              <ArrowDown aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={secondaryHref} variant="ghost" external={secondaryExternal}>
              {hero.secondaryCtaLabel}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-y-2 border-t border-line pt-5 text-[0.9375rem] text-mute">
            {hero.technicalLine.map((item) => (
              <li
                key={item}
                className="after:mx-4 after:text-amber after:content-['•'] last:after:hidden"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={hero.image ? "lg:col-span-5" : "hidden lg:col-span-5 lg:flex lg:flex-col"}>
          {hero.image ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={hero.image.focalPoint ? { objectPosition: hero.image.focalPoint } : undefined}
              />
            </div>
          ) : (
            <HeroComposition />
          )}
        </div>
      </div>
    </section>
  );
}

/** Composição tipográfica decorativa: áreas de atuação, logotipo Aquarela Multimídia e régua de timecode. */
function HeroComposition() {
  const { disciplines, ruler } = hero;
  const { institutionalBrand } = portfolioData;

  return (
    <div className="grain relative flex flex-1 flex-col justify-between border border-line bg-surface p-6 sm:p-7 lg:px-8 lg:py-7 lg:pb-6">
      {/* Geometria cinematográfica de fundo */}
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        fill="none"
      >
        <line x1="82" x2="82" y1="0" y2="100" stroke="#27272A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="82" cy="18" r="26" stroke="#1d1d22" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* 1. Lista de Categorias */}
      <ul className="relative">
        {disciplines.map((item, index) => (
          <li
            key={item}
            className={
              "border-t border-line py-2 text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-[1.12] text-paper first:border-t-0 " +
              (index % 2 === 1 ? "pl-6 font-serif-italic italic sm:pl-10" : "font-serif")
            }
          >
            {item}
          </li>
        ))}
      </ul>

      {/* 2. Logotipo original Aquarela Multimídia - destaque generoso no centro da metade inferior */}
      <div className="relative my-auto flex w-full justify-center py-4">
        <div className="relative aspect-[705/330] w-full max-w-[360px] sm:max-w-[390px] lg:max-w-[410px]">
          <Image
            src={institutionalBrand.logo.src}
            alt={institutionalBrand.logo.alt}
            fill
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 3. Régua de Timecode e Período ancorada na base */}
      <div className="relative mt-auto pt-2">
        <div aria-hidden="true" className="ruler w-full opacity-80" />
        <div className="mt-2.5 flex items-start justify-between gap-6 text-[0.8125rem] text-mute">
          <p>
            <span className="block font-serif text-lg text-paper sm:text-xl">{ruler.start.year}</span>
            {ruler.start.caption}
          </p>
          <p className="text-right">
            <span className="block font-serif text-lg text-amber sm:text-xl">{ruler.end.year}</span>
            {ruler.end.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
