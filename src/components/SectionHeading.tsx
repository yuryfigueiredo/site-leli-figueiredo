import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, children, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="font-serif text-fluid-h2 text-paper">
        {title}
      </h2>
      {children}
    </div>
  );
}
