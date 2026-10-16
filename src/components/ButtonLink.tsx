"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolioData";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 border px-6 text-[0.9375rem] font-medium tracking-wide transition-colors";

const variants = {
  primary: "border-amber bg-amber text-ink hover:bg-paper hover:border-paper",
  ghost: "border-line text-paper hover:border-amber hover:text-amber",
};

/** Link com aparência de botão; microinteração discreta no toque/clique. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: ButtonLinkProps) {
  return (
    <m.a
      href={href}
      whileTap={{ scale: 0.98 }}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external ? (
        <>
          <ExternalLink aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          <span className="sr-only">{portfolioData.uiLabels.externalLinkHint}</span>
        </>
      ) : null}
    </m.a>
  );
}
