/**
 * Tipos da configuração central do portfólio.
 * Todo conteúdo editável vive em `portfolioData.ts`; os componentes só consomem estes tipos.
 */

export type CategoryId =
  | "tv-streaming"
  | "cinema"
  | "documentarios"
  | "shows"
  | "raizes";

export interface CategoryDefinition {
  id: CategoryId;
  /** Rótulo curto exibido na legenda de cada crédito. */
  label: string;
  /** Rótulo do botão de filtro da filmografia. */
  filterLabel: string;
}

export interface ProjectImage {
  /** Caminho em /public (ex.: "/images/projetos/marietta.jpg") ou URL em domínio liberado em next.config. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "frame" = 16:9 recortado por cover; "poster" = proporção preservada (contain). */
  kind: "frame" | "poster";
  /** Ponto focal para recorte, em CSS object-position (ex.: "50% 30%"). */
  focalPoint?: string;
}

export interface ProjectVideo {
  provider: "youtube";
  id: string;
  /**
   * "available": disponibilidade validada (ver `checkedOn`).
   * "unverified" / "unavailable": a ação cai para a ficha interna da obra.
   */
  status: "available" | "unverified" | "unavailable";
  checkedOn?: string;
}

export interface ProjectExternalLink {
  url: string;
  label: string;
}

export interface ProjectMedia {
  image: ProjectImage | null;
  video: ProjectVideo | null;
  externalLink: ProjectExternalLink | null;
}

export interface WithheldClaim {
  /** Texto fornecido, NÃO exibido publicamente. */
  text: string;
  reason: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  /** "experience" = experiência profissional (não é obra audiovisual). */
  kind: "work" | "experience";
  categories: CategoryId[];
  /** Rótulo de categoria usado na vitrine (texto livre fornecido no briefing). */
  presentationCategory: string | null;
  /** Período exatamente como informado. Nunca substituir por data de lançamento. */
  periodLabel: string | null;
  role: string | null;
  /** Nome associado ao título quando informado (ex.: "Deborah Colker"). */
  associatedCredit: string | null;
  description: string | null;
  /** Apenas organizações atribuíveis a esta obra. */
  organizations: string[];
  media: ProjectMedia;
  /** Posição na seleção (1–8); null = fora da vitrine. */
  featuredOrder: number | null;
  /** Rótulo da ação na vitrine quando não há vídeo disponível. */
  actionLabel: string | null;
  /** "public" aparece no site; "on-hold" fica na base, mas não é publicado. */
  publicationStatus: "public" | "on-hold";
  pendingChecks: string[];
  withheldClaims: WithheldClaim[];
  sourceNotes: string[];
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface TechnicalStructureItem {
  label: string;
  value: string;
}

export interface FilterOption {
  id: "all" | CategoryId;
  label: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  /** Bloqueante = impede declarar o site pronto para lançamento. */
  blocking: boolean;
  status: "pending" | "done";
}

export interface InstitutionalBrand {
  name: string;
  role: string;
  location: string;
  logo: {
    src: string;
    monoSrc: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface PortfolioData {
  identity: {
    name: string;
    displayName: string;
    roles: string[];
    organization: string;
    location: string;
  };
  institutionalBrand: InstitutionalBrand;
  navigation: {
    ariaLabel: string;
    items: NavigationItem[];
  };
  hero: {
    headline: string;
    subheadline: string;
    reach: string;
    technicalLine: string[];
    disciplines: string[];
    primaryCta: { label: string; href: string };
    secondaryCtaLabel: string;
    ruler: { start: { year: string; caption: string }; end: { year: string; caption: string } };
    image: ProjectImage | null;
  };
  featured: {
    title: string;
    support: string;
    initialCount: number;
  };
  brands: {
    title: string;
    items: { name: string; logo: ProjectImage | null }[];
  };
  biography: {
    title: string;
    paragraphs: string[];
    pullQuote: string;
    portrait: ProjectImage | null;
  };
  services: {
    title: string;
    items: ServiceItem[];
  };
  technicalStructure: {
    title: string;
    items: TechnicalStructureItem[];
  };
  filmography: {
    title: string;
    initialCount: number;
    filters: FilterOption[];
    categories: CategoryDefinition[];
  };
  projects: Project[];
  contact: {
    title: string;
    text: string;
    whatsapp: { number: string | null; message: string };
    email: string | null;
    linkedin: { url: string | null };
    imdb: { id: string | null; approved: boolean };
  };
  seo: {
    title: string;
    description: string;
    locale: string;
    lang: string;
    ogImageAlt: string;
    jsonLd: {
      jobTitle: string;
      /** Só inclui worksFor depois de confirmar a natureza do vínculo. */
      worksFor: { name: string; confirmed: boolean };
      /** Apenas perfis aprovados e preenchidos. */
      sameAs: string[];
    };
  };
  uiLabels: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    mobileMenuTitle: string;
    headerHomeLabel: string;
    ctaWhatsapp: string;
    ctaContact: string;
    actions: {
      watchTrailer: string;
      viewProject: string;
      viewCredits: string;
      moreFeatured: string;
      lessFeatured: string;
      moreCredits: string;
      close: string;
      watchOnYoutube: string;
      openFicha: string;
      clearSearchAndFilters: string;
      clearSearch: string;
    };
    dialog: {
      closeLabel: string;
      period: string;
      category: string;
      role: string;
      production: string;
      credit: string;
      description: string;
      link: string;
      videoTitlePrefix: string;
      videoLoading: string;
      videoError: string;
    };
    catalog: {
      searchLabel: string;
      searchPlaceholder: string;
      filterGroupLabel: string;
      emptyTitle: string;
      emptyText: string;
      resultsSummary: string; // {shown} {total}
      experienceTag: string;
      listLabel: string;
    };
    contact: {
      pendingNotice: string;
      imdbLabel: string;
      linkedinLabel: string;
      emailLabel: string;
      channelsLabel: string;
    };
    footerLine: string;
    previewNotice: string;
    backToTop: string;
    externalLinkHint: string;
  };
  publicationChecklist: ChecklistItem[];
}
