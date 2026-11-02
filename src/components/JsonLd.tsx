import { portfolioData } from "@/data/portfolioData";
import { approvedSameAs, siteUrl } from "@/lib/site";

const { identity, seo, biography } = portfolioData;

/** JSON-LD ProfilePage + Person. Só inclui campos quando aprovados/preenchidos. */
export function JsonLd() {
  const person: Record<string, unknown> = {
    "@type": "Person",
    name: identity.name,
    jobTitle: seo.jsonLd.jobTitle,
    description: biography.paragraphs[0],
    knowsAbout: [
      "Montagem cinematográfica",
      "Edição de vídeo",
      "Finalização",
      "Avid Media Composer",
      "Adobe Premiere",
      "Documentários",
      "Cinema brasileiro",
      "TV Globo",
      "Streaming",
    ],
  };
  if (siteUrl) person.url = siteUrl;
  if (biography.portrait) {
    const base = siteUrl ?? "http://localhost:3000";
    person.image = `${base}${biography.portrait.src}`;
  }
  if (identity.location) {
    person.address = {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    };
  }
  if (approvedSameAs.length > 0) person.sameAs = approvedSameAs;
  if (seo.jsonLd.worksFor.confirmed) {
    person.worksFor = { "@type": "Organization", name: seo.jsonLd.worksFor.name };
  }

  const profilePage: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: person,
  };
  if (siteUrl) profilePage.url = siteUrl;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
      }}
    />
  );
}
