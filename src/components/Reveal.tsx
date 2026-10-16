"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Entrada suave de seção. O conteúdo é renderizado visível no servidor e só é
 * ocultado no cliente se estiver abaixo da dobra; um temporizador de segurança
 * garante que nada fique invisível caso a animação falhe. Sem movimento quando
 * o usuário prefere movimento reduzido.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;
    if (typeof IntersectionObserver === "undefined") return;

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return; // já visível: não esconder

    element.style.opacity = "0";
    element.style.transform = "translateY(14px)";

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      observer.disconnect();
      window.clearTimeout(safety);
      const animation = element.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0px)" },
        ],
        { duration: 450, easing: "ease-out", fill: "forwards" },
      );
      const cleanup = () => {
        element.style.opacity = "";
        element.style.transform = "";
        animation.cancel();
      };
      animation.finished.then(cleanup, cleanup);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    const safety = window.setTimeout(reveal, 6000);

    return () => {
      done = true;
      observer.disconnect();
      window.clearTimeout(safety);
      element.style.opacity = "";
      element.style.transform = "";
    };
  }, [reduceMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
