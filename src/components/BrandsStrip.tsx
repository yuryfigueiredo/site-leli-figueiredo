import { portfolioData } from "@/data/portfolioData";

const { brands } = portfolioData;

/** Faixa única e compacta, em texto monocromático (sem logos recriados). */
export function BrandsStrip() {
  return (
    <section
      id="canais"
      aria-labelledby="canais-titulo"
      className="border-y border-line bg-surface"
    >
      <div className="shell grid gap-6 py-12 lg:grid-cols-12 lg:gap-10 lg:py-14">
        <h2
          id="canais-titulo"
          className="text-[0.8125rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-mute lg:col-span-3"
        >
          {brands.title}
        </h2>
        <ul className="flex flex-wrap gap-y-3 lg:col-span-9">
          {brands.items.map((brand) => (
            <li
              key={brand.name}
              className="font-serif text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-tight text-paper after:mx-4 after:font-sans after:text-sm after:text-amber after:content-['•'] last:after:hidden"
            >
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
