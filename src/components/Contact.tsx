import { ExternalLink, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import {
  emailUrl,
  hasDirectContact,
  imdbUrl,
  linkedinUrl,
  whatsappUrl,
} from "@/lib/site";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";

const { contact, uiLabels, navigation } = portfolioData;

/** Contato. Só renderiza canais com destino válido; não há formulário nem envio simulado. */
export function Contact() {
  const eyebrow = navigation.items.find((item) => item.id === "contato")?.label ?? "";
  const externalLinkClass = "link-text inline-flex min-h-9 items-center gap-1.5";

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="section-pad border-t border-line bg-surface"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="contato-titulo"
            className="mt-6 font-serif text-fluid-h2 text-paper"
          >
            {contact.title}
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <p className="max-w-prose text-fluid-lead text-paper/90">{contact.text}</p>

          <div className="mt-8 flex flex-col items-start gap-4">
            {whatsappUrl ? (
              <ButtonLink href={whatsappUrl} variant="primary" external>
                {uiLabels.ctaWhatsapp}
              </ButtonLink>
            ) : null}

            {hasDirectContact ? null : (
              <p className="border-l border-amber pl-4 text-fluid-sm text-mute">
                {uiLabels.contact.pendingNotice}
              </p>
            )}

            {emailUrl || linkedinUrl || imdbUrl ? (
              <ul
                aria-label={uiLabels.contact.channelsLabel}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-[0.9375rem]"
              >
                {emailUrl ? (
                  <li>
                    <a href={emailUrl} className={externalLinkClass}>
                      <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                      {uiLabels.contact.emailLabel}
                    </a>
                  </li>
                ) : null}
                {linkedinUrl ? (
                  <li>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={externalLinkClass}
                    >
                      {uiLabels.contact.linkedinLabel}
                      <ExternalLink aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                      <span className="sr-only">{uiLabels.externalLinkHint}</span>
                    </a>
                  </li>
                ) : null}
                {imdbUrl ? (
                  <li>
                    <a
                      href={imdbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={externalLinkClass}
                    >
                      {uiLabels.contact.imdbLabel}
                      <ExternalLink aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                      <span className="sr-only">{uiLabels.externalLinkHint}</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
