import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const { biography, navigation } = portfolioData;

/** Biografia e trajetória em um único bloco editorial com alinhamento perfeito de topo e base. */
export function About() {
  const eyebrow = navigation.items.find((item) => item.id === "sobre")?.label ?? "";
  const portrait = biography.portrait;

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="section-pad border-t border-line"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
        <Reveal className="lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
          <SectionHeading id="sobre-titulo" eyebrow={eyebrow} title={biography.title} />
          {portrait ? (
            <figure className="mt-8 flex flex-1 flex-col justify-between sm:mt-10">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface sm:aspect-[1/1] lg:aspect-auto lg:flex-1">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 100vw"
                  className="object-cover"
                  style={portrait.focalPoint ? { objectPosition: portrait.focalPoint } : undefined}
                  priority
                />
              </div>
              <figcaption className="mt-3 text-[0.8125rem] text-mute">
                Leli Figueiredo na ilha de edição • Aquarela Multimídia
              </figcaption>
            </figure>
          ) : (
            <figure className="mt-10 border-l border-amber pl-6">
              <blockquote className="font-serif-italic text-fluid-statement italic text-paper">
                “{biography.pullQuote}”
              </blockquote>
            </figure>
          )}
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="max-w-prose space-y-8 text-fluid-base text-paper/90">
            {biography.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className={
                  index === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:text-amber"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
