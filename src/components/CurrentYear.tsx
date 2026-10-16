"use client";

/** Ano corrente calculado no navegador (o HTML estático não fica preso ao ano do build). */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
