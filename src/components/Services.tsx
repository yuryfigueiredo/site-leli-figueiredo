import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const { services, technicalStructure, navigation, institutionalBrand } = portfolioData;

/** Serviços em lista editorial e faixa de estrutura técnica logo abaixo. */
export function Services() {
  const eyebrow = navigation.items.find((item) => item.id === "servicos")?.label ?? "";

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-titulo"
      className="section-pad border-t border-line bg-surface"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading id="servicos-titulo" eyebrow={eyebrow} title={services.title} className="max-w-3xl" />
        </Reveal>

        <Reveal>
          <ol className="mt-14 grid border-b border-line lg:mt-20 lg:grid-cols-2 lg:gap-x-20">
            {services.items.map((service, index) => (
              <li
                key={service.id}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-7 sm:grid-cols-[4rem_1fr]"
              >
                <span aria-hidden="true" className="font-serif text-xl leading-8 text-amber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-fluid-h3 text-paper">{service.title}</h3>
                  <p className="mt-3 max-w-prose text-fluid-sm text-mute">{service.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <div className="mt-12 border border-line bg-ink">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-3.5">
              <h3 className="text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-mute">
                {technicalStructure.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="hidden text-[0.6875rem] uppercase tracking-[0.14em] text-mute sm:inline">
                  Ilha Própria
                </span>
                <div
                  className="relative h-6 w-20 shrink-0 opacity-80 transition-opacity duration-200 hover:opacity-100"
                  title={institutionalBrand.name}
                >
                  <Image
                    src={institutionalBrand.logo.src}
                    alt={institutionalBrand.logo.alt}
                    fill
                    sizes="80px"
                    className="object-contain object-right"
                  />
                </div>
              </div>
            </div>
            <dl className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {technicalStructure.items.map((item) => (
                <div
                  key={item.label}
                  className="p-6 sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:border-line lg:[&:nth-child(n+3)]:border-t-0"
                >
                  <dt className="font-serif text-xl text-amber">{item.label}</dt>
                  <dd className="mt-3 text-fluid-sm text-paper">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
