import { portfolioData } from "@/data/portfolioData";

const { contact, publicationChecklist, seo } = portfolioData;

/** Domínio oficial, somente quando informado via variável de ambiente. */
export const siteUrl: string | null = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
})();

/** Há pendência bloqueante? Então o site é uma prévia: noindex e identificação visível. */
export const isPreview: boolean =
  publicationChecklist.some((item) => item.blocking && item.status === "pending") ||
  siteUrl === null;

/** Número válido = 10 a 15 dígitos (com código do país). */
function validWhatsappNumber(): string | null {
  const digits = (contact.whatsapp.number ?? "").replace(/\D/g, "");
  return /^\d{10,15}$/.test(digits) ? digits : null;
}

export const whatsappUrl: string | null = (() => {
  const number = validWhatsappNumber();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(contact.whatsapp.message)}`;
})();

export const emailUrl: string | null = (() => {
  const email = contact.email?.trim();
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : null;
})();

export const linkedinUrl: string | null = (() => {
  const url = contact.linkedin.url?.trim();
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
})();

export const imdbUrl: string | null = contact.imdb.id
  ? `https://www.imdb.com/name/${encodeURIComponent(contact.imdb.id)}/`
  : null;

/** Há ao menos um canal de contato direto configurado? */
export const hasDirectContact: boolean = Boolean(
  whatsappUrl || emailUrl || linkedinUrl,
);

/** Perfis aprovados para JSON-LD `sameAs`. */
export const approvedSameAs: string[] = [
  ...seo.jsonLd.sameAs,
  ...(imdbUrl && contact.imdb.approved ? [imdbUrl] : []),
  ...(linkedinUrl ? [linkedinUrl] : []),
];
