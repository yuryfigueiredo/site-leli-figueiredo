"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectDialog } from "./ProjectDialog";

interface ProjectDialogContextValue {
  openProject: (slug: string) => void;
}

const ProjectDialogContext = createContext<ProjectDialogContextValue | null>(null);

export const PROJECT_DIALOG_OPEN_EVENT = "project-dialog-open";

export function useProjectDialog(): ProjectDialogContextValue {
  const context = useContext(ProjectDialogContext);
  if (!context) {
    throw new Error("useProjectDialog deve ser usado dentro de ProjectDialogProvider.");
  }
  return context;
}

/**
 * Um único sistema de modal para todas as obras. Também aplica a preferência de
 * movimento reduzido do sistema a todas as animações do Framer Motion.
 */
export function ProjectDialogProvider({ children }: { children: ReactNode }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openProject = useCallback((slug: string) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // Menu e modal não podem ficar ativos ao mesmo tempo.
    window.dispatchEvent(new Event(PROJECT_DIALOG_OPEN_EVENT));
    setActiveSlug(slug);
  }, []);

  const handleClose = useCallback(() => {
    setActiveSlug(null);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger && trigger.isConnected) trigger.focus();
  }, []);

  const value = useMemo(() => ({ openProject }), [openProject]);
  const project = activeSlug ? (getProjectBySlug(activeSlug) ?? null) : null;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <ProjectDialogContext.Provider value={value}>
        {children}
        <ProjectDialog project={project} onClose={handleClose} />
      </ProjectDialogContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}
