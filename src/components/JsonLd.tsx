import { portfolioData } from "@/data/portfolioData";
import { approvedSameAs, siteUrl } from "@/lib/site";

const { identity, seo } = portfolioData;

/** JSON-LD Person. Só inclui sameAs/worksFor/url quando aprovados/preenchidos. */
export function JsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: seo.jsonLd.jobTitle,
  };
  if (siteUrl) data.url = siteUrl;
  if (approvedSameAs.length > 0) data.sameAs = approvedSameAs;
  if (seo.jsonLd.worksFor.confirmed) {
    data.worksFor = { "@type": "Organization", name: seo.jsonLd.worksFor.name };
  }

  return (
    <script
      type="application/ld+json"
      // Escapa "<" para impedir fechamento prematuro do bloco de script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
