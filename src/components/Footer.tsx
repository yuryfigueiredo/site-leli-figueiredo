import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { isPreview } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";

const { uiLabels, institutionalBrand, identity } = portfolioData;

export function Footer() {
  return (
    <footer id="rodape" className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
        <div className="flex flex-col gap-3 text-fluid-sm text-mute sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
          <p>© <CurrentYear /> {identity.displayName}</p>
          <span className="hidden text-line sm:inline" aria-hidden="true">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[0.75rem] uppercase tracking-[0.12em] text-mute/80">
              Estrutura técnica:
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
                className="object-contain"
              />
            </div>
          </div>
          <span className="hidden text-line sm:inline" aria-hidden="true">•</span>
          <p>{identity.location}</p>
          {isPreview ? (
            <p className="text-[0.75rem] uppercase tracking-[0.14em] text-mute sm:ml-2">
              {uiLabels.previewNotice}
            </p>
          ) : null}
        </div>
        <a
          href="#topo"
          className="link-text inline-flex min-h-11 items-center gap-2 self-start text-[0.9375rem] sm:self-auto"
        >
          <ArrowUp aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          {uiLabels.backToTop}
        </a>
      </div>
    </footer>
  );
}
