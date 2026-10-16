"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PROJECT_DIALOG_OPEN_EVENT } from "./ProjectDialogProvider";

const { identity, navigation, uiLabels } = portfolioData;

const cta = whatsappUrl
  ? { label: uiLabels.ctaWhatsapp, href: whatsappUrl, external: true }
  : { label: uiLabels.ctaContact, href: "#contato", external: false };

const FOCUSABLE = 'a[href], button:not([disabled])';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Destaque da seção atual (scroll spy discreto).
  useEffect(() => {
    const targets = navigation.items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // Menu e modal não podem ficar ativos ao mesmo tempo; menu fecha ao ampliar a tela.
  useEffect(() => {
    const onDialogOpen = () => setMenuOpen(false);
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setMenuOpen(false);
    };
    window.addEventListener(PROJECT_DIALOG_OPEN_EVENT, onDialogOpen);
    media.addEventListener("change", onChange);
    return () => {
      window.removeEventListener(PROJECT_DIALOG_OPEN_EVENT, onDialogOpen);
      media.removeEventListener("change", onChange);
    };
  }, []);

  // Com o menu aberto: fundo inerte, rolagem travada e foco no primeiro item.
  useEffect(() => {
    const background = ["conteudo", "rodape"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    background.forEach((el) => el.toggleAttribute("inert", menuOpen));
    document.documentElement.classList.toggle("dialog-open", menuOpen);
    if (menuOpen) {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }
    return () => {
      background.forEach((el) => el.removeAttribute("inert"));
      document.documentElement.classList.remove("dialog-open");
    };
  }, [menuOpen]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!menuOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key !== "Tab") return;
    // Contenção de foco entre o botão do menu e os itens do painel.
    const items = [
      menuButtonRef.current,
      ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
    ].filter((el): el is HTMLElement => el !== null);
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const desktopItems = navigation.items;

  return (
    <header
      onKeyDown={onKeyDown}
      className="fixed inset-x-0 top-0 z-40 h-header border-b border-line bg-ink/95"
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <a
          href="#topo"
          aria-label={uiLabels.headerHomeLabel}
          className="flex min-h-11 items-center leading-tight"
        >
          <span className="font-serif text-[1.375rem] tracking-wide text-paper">
            {identity.displayName}
          </span>
        </a>

        <nav aria-label={navigation.ariaLabel} className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {desktopItems.map((item) => {
              const current = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={current ? "location" : undefined}
                    className={cn(
                      "flex min-h-11 items-center border-b border-transparent px-3 text-[0.9375rem] transition-colors hover:text-paper",
                      current ? "border-amber text-paper" : "text-mute",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="ml-4 inline-flex min-h-11 items-center border border-amber px-5 text-[0.9375rem] font-medium text-amber transition-colors hover:bg-amber hover:text-ink"
          >
            {cta.label}
            {cta.external ? <span className="sr-only">{uiLabels.externalLinkHint}</span> : null}
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? uiLabels.closeMenu : uiLabels.openMenu}
          onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-paper transition-colors hover:border-amber lg:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" strokeWidth={1.5} className="h-6 w-6" />
          ) : (
            <Menu aria-hidden="true" strokeWidth={1.5} className="h-6 w-6" />
          )}
        </button>
      </div>

      {menuOpen ? (
        <>
          <div
            aria-hidden="true"
            onClick={() => closeMenu(false)}
            className="fixed inset-x-0 bottom-0 top-header bg-ink/70 lg:hidden"
          />
          <div
            id="menu-mobile"
            ref={panelRef}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] animate-fade-in overflow-y-auto border-b border-line bg-surface lg:hidden"
          >
            <nav aria-label={navigation.ariaLabel} className="shell py-3">
              <ul className="divide-y divide-line">
                {navigation.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(event) => {
                        // Fecha o menu (libera rolagem e fundo inerte) e só então rola até a seção.
                        event.preventDefault();
                        closeMenu(false);
                        const hash = item.href;
                        window.setTimeout(() => {
                          document.getElementById(hash.slice(1))?.scrollIntoView();
                          window.history.replaceState(null, "", hash);
                        }, 60);
                      }}
                      aria-current={activeId === item.id ? "location" : undefined}
                      className="flex min-h-14 items-center justify-between font-serif text-[1.75rem] text-paper"
                    >
                      {item.label}
                      {activeId === item.id ? (
                        <span aria-hidden="true" className="h-px w-8 bg-amber" />
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
              {cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => closeMenu(false)}
                  className="mt-4 flex min-h-12 items-center justify-center border border-amber bg-amber px-5 font-medium text-ink"
                >
                  {cta.label}
                  <span className="sr-only">{uiLabels.externalLinkHint}</span>
                </a>
              ) : null}
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
