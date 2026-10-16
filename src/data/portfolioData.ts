import type {
  PortfolioData,
  Project,
  ProjectMedia,
} from "./types";

/**
 * ============================================================================
 *  CONFIGURAÇÃO CENTRAL DO PORTFÓLIO — LELI FIGUEIREDO
 * ============================================================================
 *  Todo texto, crédito, marca, imagem, contato e rótulo de interface do site
 *  vive neste arquivo. Os componentes apenas consomem estes dados.
 *
 *  Fonte de verdade: conteúdos fornecidos pelo contratante (não verificados por
 *  pesquisa independente). Campos ausentes ficam como `null`/lista vazia e as
 *  pendências estão registradas em `publicationChecklist` e em `pendingChecks`
 *  de cada obra. Consulte também o README.md.
 * ============================================================================
 */

const noMedia: ProjectMedia = { image: null, video: null, externalLink: null };

/** Cria um registro de obra com valores neutros por padrão (nada é inventado). */
function project(
  data: Partial<Project> &
    Pick<Project, "id" | "slug" | "title" | "categories" | "periodLabel">,
): Project {
  return {
    kind: "work",
    presentationCategory: null,
    role: null,
    associatedCredit: null,
    description: null,
    organizations: [],
    media: noMedia,
    featuredOrder: null,
    actionLabel: null,
    publicationStatus: "public",
    pendingChecks: [],
    withheldClaims: [],
    sourceNotes: [],
    ...data,
  };
}

const ROLE_ROOTS = "Assistência a João Paulo de Carvalho";
const ROOTS_NOTE =
  "Função derivada do título do grupo “Raízes — Assistência a João Paulo de Carvalho” do briefing.";
const GROUPED_SERIES_NOTE =
  "Origem do agrupamento 7 Chances Para... / Sem Bloqueio: “Edição completa de temporadas infantojuvenis e dramáticas para canais pagos e plataformas globais”. Não atribuir cada formato a uma obra específica sem confirmação.";
const SPLIT_NOTE =
  "Título desmembrado de um agrupamento original; o período é o do agrupamento, sem dedução de datas individuais.";

/**
 * ORDEM EDITORIAL (explícita e determinística): a ordem desta lista é a ordem do
 * catálogo na visão “Todos” e nos filtros. Segue o ano final do período informado
 * (do mais recente ao mais antigo); registros sem ano (Big Brother Brasil e o
 * reality inédito) têm posição editorial fixa. Nenhuma data foi inventada.
 */
const projects: Project[] = [
  project({
    id: "reality-show-inedito",
    slug: "reality-show-inedito",
    title: "Reality Show Inédito",
    categories: ["tv-streaming"],
    periodLabel: "Projeto Recente",
    publicationStatus: "on-hold",
    pendingChecks: [
      "Confirmar a forma de crédito do projeto.",
      "Obter autorização para divulgar o projeto.",
    ],
    sourceNotes: [
      "Título, cliente e data não foram informados e não devem ser inventados.",
    ],
  }),

  project({
    id: "marietta-baderna",
    slug: "marietta-baderna-dos-palcos-ao-dicionario",
    title: "Marietta Baderna: Dos Palcos ao Dicionário",
    shortTitle: "Marietta Baderna",
    categories: ["cinema", "documentarios"],
    presentationCategory: "Cinema • Longa documental",
    periodLabel: "2025",
    role: "Montadora Principal",
    description: "Dirigido por Mariana Alvim, com Ana Botafogo.",
    media: {
      image: {
        src: "/images/projetos/marietta-baderna.jpg",
        alt: "Frame oficial de Marietta Baderna: Dos Palcos ao Dicionário, dirigido por Mariana Alvim",
        width: 1280,
        height: 720,
        kind: "frame",
        focalPoint: "50% 50%",
      },
      video: {
        provider: "youtube",
        id: "i5uQ5QtVSGo",
        status: "available",
        checkedOn: "2026-10-13",
      },
      externalLink: null,
    },
    featuredOrder: 1,
    actionLabel: "Ver projeto",
    withheldClaims: [
      {
        text: "Selecionado ao Prêmio Grande Otelo",
        reason:
          "Informação fornecida; confirmar antes da exibição pública. Não transformar seleção em indicação, prêmio ou vitória.",
      },
    ],
    pendingChecks: [
      "Confirmar o reconhecimento relacionado ao Grande Otelo antes de exibir.",
      "Confirmar que o vídeo i5uQ5QtVSGo é o trailer pretendido e que o uso é autorizado.",
    ],
    sourceNotes: [
      "Registro único para Cinema & Longas e Documentários.",
      "Vídeo respondeu ao oEmbed do YouTube em 2026-10-13 (publicado em canal de terceiros: Cinesystem).",
    ],
  }),

  project({
    id: "turne-caetano-bethania",
    slug: "turne-caetano-bethania",
    title: "Turnê Caetano & Bethânia",
    categories: ["shows"],
    presentationCategory: "Música & Grandes Eventos",
    periodLabel: "2024",
    role: "Edição de Vídeos / Cenas de Telão",
    description: "Edição das projeções visuais da turnê.",
    media: {
      image: {
        src: "/images/projetos/turne-caetano-bethania.jpg",
        alt: "Registro visual da Turnê Caetano & Bethânia, com projeções de palco e telão",
        width: 1280,
        height: 720,
        kind: "frame",
        focalPoint: "50% 50%",
      },
      video: {
        provider: "youtube",
        id: "tjRsRKqBi7A",
        status: "available",
        checkedOn: "2026-10-16",
      },
      externalLink: null,
    },
    featuredOrder: 4,
    actionLabel: "Ver projeto",
    sourceNotes: [
      "A conexão com Prenda Minha é desenvolvida na biografia, sem repetir a narrativa aqui.",
    ],
  }),

  project({
    id: "big-brother-brasil",
    slug: "big-brother-brasil",
    title: "Big Brother Brasil",
    categories: ["tv-streaming"],
    presentationCategory: "Reality Shows",
    periodLabel: "Edições 1, 3, 4, 5 e 13",
    role: "Editora Sênior de Imagens",
    description: "Participação nas edições 1, 3, 4, 5 e 13 do Big Brother Brasil.",
    media: {
      image: {
        src: "/images/projetos/big-brother-brasil.jpg",
        alt: "Registro do Big Brother Brasil pela TV Globo",
        width: 1280,
        height: 720,
        kind: "frame",
        focalPoint: "50% 50%",
      },
      video: {
        provider: "youtube",
        id: "k-af__uQ6CM",
        status: "available",
        checkedOn: "2026-10-16",
      },
      externalLink: null,
    },
    featuredOrder: 3,
    actionLabel: "Ver créditos",
    sourceNotes: [
      "Não informar intervalo de anos: apenas as edições foram fornecidas.",
      "Posição no catálogo: ordem editorial fixa, por não haver ano informado.",
    ],
  }),

  project({
    id: "sem-bloqueio",
    slug: "sem-bloqueio",
    title: "Sem Bloqueio",
    categories: ["tv-streaming"],
    presentationCategory: "Séries de TV & Streaming",
    periodLabel: "1ª a 3ª temporada • 2022/2024",
    role: "Editora",
    featuredOrder: 8,
    actionLabel: "Ver projeto",
    pendingChecks: [
      "Confirmar a plataforma/canal individual (o destaque original reunia duas obras e duas plataformas: HBO Max / Discovery).",
    ],
    sourceNotes: [GROUPED_SERIES_NOTE],
  }),

  project({
    id: "no-ano-que-vem",
    slug: "no-ano-que-vem",
    title: "No Ano que Vem",
    categories: ["tv-streaming"],
    presentationCategory: "Séries",
    periodLabel: "2023",
    role: "Editora de Imagens",
    organizations: ["Fina Flor Filmes", "Canal Brasil"],
    featuredOrder: 5,
    actionLabel: "Ver projeto",
  }),

  project({
    id: "abre-coxia",
    slug: "abre-coxia",
    title: "Abre Coxia",
    categories: ["documentarios"],
    periodLabel: "2023",
  }),

  project({
    id: "podcast-o-caso-ultimos-passos",
    slug: "podcast-o-caso-ultimos-passos",
    title: "Podcast O Caso: Últimos Passos",
    categories: ["shows"],
    periodLabel: "2023",
  }),

  project({
    id: "caravana-das-drags",
    slug: "caravana-das-drags",
    title: "Caravana das Drags",
    categories: ["tv-streaming"],
    presentationCategory: "Streaming & Reality Shows",
    periodLabel: "2022",
    role: "Editora de Imagens",
    organizations: ["Amazon Prime Video"],
    media: {
      image: {
        src: "/images/projetos/caravana-das-drags.jpg",
        alt: "Frame oficial do reality show Caravana das Drags no Amazon Prime Video",
        width: 1280,
        height: 720,
        kind: "frame",
        focalPoint: "50% 50%",
      },
      video: {
        provider: "youtube",
        id: "p6gZkT7PI5U",
        status: "available",
        checkedOn: "2026-10-16",
      },
      externalLink: null,
    },
    featuredOrder: 2,
    actionLabel: "Ver projeto",
  }),

  project({
    id: "7-chances-para",
    slug: "7-chances-para",
    title: "7 Chances Para...",
    categories: ["tv-streaming"],
    presentationCategory: "Séries de TV & Streaming",
    periodLabel: "2021/2022",
    role: "Editora",
    organizations: ["HBO Max"],
    featuredOrder: 7,
    actionLabel: "Ver projeto",
    sourceNotes: [
      "Associação a HBO Max vem da biografia (individual). O bloco original associava a obra e Sem Bloqueio a HBO Max / Discovery em conjunto.",
      GROUPED_SERIES_NOTE,
    ],
  }),

  project({
    id: "do-esperar",
    slug: "do-esperar",
    title: "Do Esperar",
    categories: ["shows"],
    periodLabel: "2021",
    associatedCredit: "Numa Ciro",
  }),

  project({
    id: "the-voice-kids",
    slug: "the-voice-kids",
    title: "The Voice Kids",
    categories: ["tv-streaming"],
    periodLabel: "2020",
  }),

  project({
    id: "jogo-de-panelas",
    slug: "jogo-de-panelas",
    title: "Jogo de Panelas",
    categories: ["tv-streaming"],
    periodLabel: "2013–2020",
  }),

  project({
    id: "caldeirao-do-huck",
    slug: "caldeirao-do-huck",
    title: "Caldeirão do Huck",
    categories: ["tv-streaming"],
    periodLabel: "2007–2019",
  }),

  project({
    id: "encontro",
    slug: "encontro",
    title: "Encontro",
    categories: ["tv-streaming"],
    periodLabel: "2015/2016",
    sourceNotes: ["Original: “Encontro e É de Casa”. " + SPLIT_NOTE],
  }),

  project({
    id: "e-de-casa",
    slug: "e-de-casa",
    title: "É de Casa",
    categories: ["tv-streaming"],
    periodLabel: "2015/2016",
    sourceNotes: ["Original: “Encontro e É de Casa”. " + SPLIT_NOTE],
  }),

  project({
    id: "mercados",
    slug: "mercados",
    title: "Mercados",
    categories: ["tv-streaming"],
    periodLabel: "2015",
  }),

  project({
    id: "a-forca-da-floresta",
    slug: "a-forca-da-floresta-povo-yawanawa",
    title: "A Força da Floresta — Povo Yawanawá",
    shortTitle: "A Força da Floresta",
    categories: ["documentarios"],
    presentationCategory: "Documentário",
    periodLabel: "2013",
    role: "Editora Principal",
    description:
      "Direção de Sergio Raposo, com Marcelo Rosenbaum, no projeto A Gente Transforma. Exibição na Semana de Design de Milão.",
    organizations: ["+Globosat", "A Gente Transforma"],
    media: {
      image: null,
      video: null,
      externalLink: {
        url: "https://agentetransforma.org.br/projetos/yawanawa/documentario-a-forca-da-floresta/",
        label: "Ver no A Gente Transforma",
      },
    },
    featuredOrder: 6,
    actionLabel: "Ver projeto",
    sourceNotes: [
      "A exibição na Semana de Design de Milão consta “conforme o briefing”.",
    ],
  }),

  project({
    id: "bonitinha-mas-ordinaria",
    slug: "bonitinha-mas-ordinaria",
    title: "Bonitinha, Mas Ordinária",
    categories: ["cinema"],
    periodLabel: "2008/2013",
  }),

  project({
    id: "mulheres-de-aco",
    slug: "mulheres-de-aco",
    title: "Mulheres de Aço",
    categories: ["documentarios"],
    periodLabel: "2012",
  }),

  project({
    id: "vida-de-mallandro",
    slug: "vida-de-mallandro",
    title: "Vida de Mallandro",
    categories: ["tv-streaming"],
    periodLabel: "2012",
    sourceNotes: [
      "Original: “Vida de Mallandro e Pequenos Notáveis”. " + SPLIT_NOTE,
      "Grafia “Mallandro” preservada como fornecida; confirmar.",
    ],
  }),

  project({
    id: "pequenos-notaveis",
    slug: "pequenos-notaveis",
    title: "Pequenos Notáveis",
    categories: ["tv-streaming"],
    periodLabel: "2012",
    sourceNotes: [
      "Original: “Vida de Mallandro e Pequenos Notáveis”. " + SPLIT_NOTE,
    ],
  }),

  project({
    id: "institucionais-lado-b",
    slug: "institucionais-lado-b",
    title: "Institucionais Lado B",
    categories: ["shows"],
    periodLabel: "2009–2011",
  }),

  project({
    id: "arte-in-natura",
    slug: "arte-in-natura",
    title: "Arte In Natura",
    categories: ["documentarios"],
    periodLabel: "2009",
  }),

  project({
    id: "fantastico",
    slug: "fantastico",
    title: "Fantástico",
    categories: ["tv-streaming"],
    periodLabel: "2008",
    sourceNotes: [
      "Original: “Fantástico e Campanha Fernando Gabeira”. " + SPLIT_NOTE,
    ],
  }),

  project({
    id: "campanha-fernando-gabeira",
    slug: "campanha-fernando-gabeira",
    title: "Campanha Fernando Gabeira",
    categories: ["tv-streaming"],
    periodLabel: "2008",
    sourceNotes: [
      "Original: “Fantástico e Campanha Fernando Gabeira”. " + SPLIT_NOTE,
    ],
  }),

  project({
    id: "banda-infierno",
    slug: "banda-infierno",
    title: "Banda Infierno",
    categories: ["shows"],
    periodLabel: "2006",
  }),

  project({
    id: "avassaladoras-a-serie",
    slug: "avassaladoras-a-serie",
    title: "Avassaladoras – A Série",
    categories: ["tv-streaming"],
    periodLabel: "2006",
  }),

  project({
    id: "didi-o-cacador-de-tesouros",
    slug: "didi-o-cacador-de-tesouros",
    title: "Didi, o Caçador de Tesouros",
    categories: ["cinema"],
    periodLabel: "2006",
  }),

  project({
    id: "no-deborah-colker",
    slug: "no-deborah-colker",
    title: "Nó",
    categories: ["raizes"],
    periodLabel: "2005",
    role: ROLE_ROOTS,
    associatedCredit: "Deborah Colker",
    sourceNotes: [ROOTS_NOTE],
  }),

  project({
    id: "faixa-de-areia",
    slug: "faixa-de-areia",
    title: "Faixa de Areia",
    categories: ["documentarios"],
    periodLabel: "2004",
  }),

  project({
    id: "xuxa-e-o-tesouro-da-cidade-perdida",
    slug: "xuxa-e-o-tesouro-da-cidade-perdida",
    title: "Xuxa e o Tesouro da Cidade Perdida",
    categories: ["cinema"],
    periodLabel: "2004",
  }),

  project({
    id: "irmaos-de-fe",
    slug: "irmaos-de-fe",
    title: "Irmãos de Fé",
    categories: ["cinema"],
    periodLabel: "2004",
  }),

  project({
    id: "didi-quer-ser-crianca",
    slug: "didi-quer-ser-crianca",
    title: "Didi Quer Ser Criança",
    categories: ["cinema"],
    periodLabel: "2004",
  }),

  project({
    id: "forum-social-mundial",
    slug: "forum-social-mundial",
    title: "Fórum Social Mundial",
    categories: ["documentarios"],
    periodLabel: "2001–2003",
  }),

  project({
    id: "escritorio-globo-ny",
    slug: "escritorio-globo-ny",
    title: "Escritório Globo NY",
    kind: "experience",
    categories: ["tv-streaming"],
    periodLabel: "2003",
    sourceNotes: [
      "Experiência profissional (escritório da Globo Internacional em Nova York), não uma obra audiovisual.",
    ],
  }),

  project({
    id: "fama",
    slug: "fama",
    title: "Fama 1 e 2",
    categories: ["tv-streaming"],
    periodLabel: "2002",
    sourceNotes: ["Agrupamento de temporadas de uma mesma produção, preservado."],
  }),

  project({
    id: "documentario-niemeyer",
    slug: "documentario-niemeyer",
    title: "Documentário Niemeyer",
    categories: ["raizes"],
    periodLabel: "2001",
    role: ROLE_ROOTS,
    organizations: ["Vídeo Filmes"],
    sourceNotes: [ROOTS_NOTE],
  }),

  project({
    id: "pantaneiros",
    slug: "pantaneiros",
    title: "Pantaneiros",
    categories: ["documentarios"],
    periodLabel: "2001",
    description: "Direção de José Padilha.",
  }),

  project({
    id: "gnt-fashion",
    slug: "gnt-fashion",
    title: "GNT Fashion",
    categories: ["tv-streaming"],
    periodLabel: "2000",
  }),

  project({
    id: "trailers-orfeu-bossa-nova-oriundi-outras-historias",
    slug: "trailers-orfeu-bossa-nova-oriundi-outras-historias",
    title: "Trailers de Orfeu, Bossa Nova, Oriundi e Outras Histórias",
    categories: ["raizes"],
    periodLabel: "1999",
    role: ROLE_ROOTS,
    sourceNotes: [
      ROOTS_NOTE,
      "Assistência em trailers; não confundir com a montagem dos longas-metragens correspondentes.",
      "Mantido como um único registro, conforme fornecido. Confirmar se deve ser desmembrado em quatro trailers.",
    ],
  }),

  project({
    id: "clipe-ivete-sangalo",
    slug: "clipe-ivete-sangalo",
    title: "Clipe Ivete Sangalo",
    categories: ["raizes"],
    periodLabel: "1999",
    role: ROLE_ROOTS,
    sourceNotes: [ROOTS_NOTE],
  }),

  project({
    id: "especial-prenda-minha",
    slug: "especial-prenda-minha",
    title: "Especial Prenda Minha",
    categories: ["raizes"],
    periodLabel: "1998",
    role: ROLE_ROOTS,
    associatedCredit: "Caetano Veloso",
    sourceNotes: [ROOTS_NOTE],
  }),
];

export const portfolioData: PortfolioData = {
  identity: {
    name: "Leli Figueiredo",
    displayName: "Leli Figueiredo",
    roles: ["Montadora", "Editora Sênior", "Finalizadora"],
    organization: "Aquarela Multimídia",
    location: "Rio de Janeiro, Brasil",
  },

  institutionalBrand: {
    name: "Aquarela Multimídia",
    role: "Estrutura profissional e ilha de edição",
    location: "Jardim Botânico • Rio de Janeiro",
    logo: {
      src: "/images/aquarela-multimidia-logo.png",
      monoSrc: "/images/aquarela-multimidia-mono.png",
      alt: "Aquarela Multimídia — Estrutura Técnica de Pós-Produção",
      width: 702,
      height: 323,
    },
  },

  navigation: {
    ariaLabel: "Navegação principal",
    items: [
      { id: "obras", label: "Obras", href: "#obras" },
      { id: "sobre", label: "Sobre", href: "#sobre" },
      { id: "servicos", label: "Serviços", href: "#servicos" },
      { id: "filmografia", label: "Filmografia", href: "#filmografia" },
      { id: "contato", label: "Contato", href: "#contato" },
    ],
  },

  hero: {
    headline: "Mais de 25 anos entre o cinema, a TV e o streaming.",
    subheadline:
      "Uma trajetória em produções para TV Globo, Globo Filmes, Amazon Prime Video e cinema brasileiro.",
    reach: "Projetos no Brasil e no exterior • Presencial, híbrido ou remoto",
    technicalLine: [
      "Avid Media Composer",
      "Adobe Premiere",
      "Ilha própria no RJ",
      "Graduada em Cinema",
    ],
    disciplines: [
      "Cinema",
      "Televisão",
      "Streaming",
      "Documentários",
      "Grandes eventos",
    ],
    primaryCta: { label: "Explorar obras e créditos", href: "#obras" },
    secondaryCtaLabel: "Conversar sobre um projeto",
    ruler: {
      start: { year: "1998", caption: "Primeira assistência" },
      end: { year: "Presente", caption: "Novas histórias em construção" },
    },
    // Sem imagem aprovada: o hero usa composição tipográfica com textura abstrata.
    image: null,
  },

  featured: {
    title: "Obras selecionadas",
    support: "Cinema, televisão, streaming e projetos de palco.",
    initialCount: 4,
  },

  brands: {
    title: "Canais, produtoras e plataformas presentes na trajetória",
    // Nomes em texto monocromático. `logo` só deve ser preenchido com arquivo fornecido/aprovado.
    items: [
      "TV Globo",
      "Globo Filmes",
      "Amazon Prime Video",
      "HBO Max",
      "Discovery+",
      "Multishow",
      "GNT",
      "Canal Brasil",
      "SporTV",
      "TV Brasil",
      "Fina Flor Filmes",
      "Vídeo Filmes",
      "Diler & Associados",
      "A Gente Transforma",
      "Canal Azul",
      "MultiRio",
    ].map((name) => ({ name, logo: null })),
  },

  biography: {
    title: "Uma trajetória construída na ilha de edição",
    paragraphs: [
      "Trabalho com edição desde 1998, quando fiz minha primeira assistência ao lado do mestre João Paulo de Carvalho — nosso eterno “Fofinho” — no especial Prenda Minha, de Caetano Veloso. Foi com ele, trabalhando em projetos como os trailers de Orfeu e Bossa Nova e o documentário Niemeyer (Vídeo Filmes), que aprendi a delícia da nossa profissão: o entendimento de que o carinho, o respeito e o amor pelo material andam juntos na criação da história que vamos contar.",
      "Mais de duas décadas depois, em 2024, tive a alegria de reencontrar essa parceria editando os vídeos dos telões da histórica turnê Caetano & Bethânia. Ao longo dessa trajetória, consolidei uma carreira versátil como Editora Sênior na TV Globo (passando pelo Big Brother Brasil, Fantástico, The Voice Kids, Caldeirão, Encontro e pelo escritório da Globo Internacional em Nova York), montadora de longas-metragens para cinema (Marietta Baderna, Bonitinha, Mas Ordinária, Xuxa, Didi e Irmãos de Fé) e editora de séries e realities para plataformas como Amazon Prime Video (Caravana das Drags) e HBO Max (7 Chances Para...).",
      "Graduada em Cinema e operando em Avid Media Composer e Adobe Premiere, atuo hoje em projetos presenciais, híbridos ou remotos para produções em todo o Brasil e no exterior, contando também com estrutura de ilha de edição própria no Jardim Botânico (RJ) através da Aquarela Multimídia.",
    ],
    // Trecho retirado literalmente do primeiro parágrafo.
    pullQuote:
      "o carinho, o respeito e o amor pelo material andam juntos na criação da história que vamos contar.",
    portrait: {
      src: "/images/foto-leli-2.jpg",
      alt: "Leli Figueiredo na ilha de edição",
      width: 1792,
      height: 2400,
      kind: "poster",
      focalPoint: "50% 38%",
    },
  },

  services: {
    title: "Da construção narrativa à entrega",
    items: [
      {
        id: "cinema-documentarios",
        title: "Montagem para Cinema & Documentários",
        description:
          "Construção narrativa para longas, documentários e projetos autorais.",
      },
      {
        id: "tv",
        title: "TV & Grandes Audiências",
        description:
          "Experiência em entretenimento, variedades e formatos televisivos.",
      },
      {
        id: "reality",
        title: "Reality Shows",
        description:
          "Organização de grande volume de material, construção de personagens e edição orientada por emoção.",
      },
      {
        id: "streaming",
        title: "Streaming & Séries",
        description:
          "Projetos para plataformas digitais e produções sob demanda.",
      },
      {
        id: "finalizacao",
        title: "Finalização & Pós-Produção",
        description:
          "Controle de qualidade, acabamento técnico e entregas profissionais.",
      },
      {
        id: "palco",
        title: "Shows & Conteúdo de Palco",
        description:
          "Vídeos para apresentações ao vivo, eventos e grandes turnês.",
      },
    ],
  },

  technicalStructure: {
    title: "Estrutura técnica",
    items: [
      { label: "Ferramentas", value: "Avid Media Composer e Adobe Premiere." },
      {
        label: "Atuação",
        value: "Montagem, edição sênior e finalização.",
      },
      {
        label: "Estrutura",
        value:
          "Ilha própria através da Aquarela Multimídia, no Jardim Botânico, Rio de Janeiro.",
      },
      {
        label: "Modalidades",
        value: "Presencial, híbrida e remota, para projetos no Brasil e no exterior.",
      },
    ],
  },

  filmography: {
    title: "Filmografia e créditos selecionados",
    initialCount: 12,
    filters: [
      { id: "all", label: "Todos" },
      { id: "tv-streaming", label: "TV & Streaming" },
      { id: "cinema", label: "Cinema & Longas" },
      { id: "documentarios", label: "Documentários" },
      { id: "shows", label: "Shows, Clipes & Podcasts" },
      { id: "raizes", label: "Raízes — João Paulo de Carvalho" },
    ],
    categories: [
      { id: "tv-streaming", label: "TV & Streaming", filterLabel: "TV & Streaming" },
      { id: "cinema", label: "Cinema & Longas", filterLabel: "Cinema & Longas" },
      { id: "documentarios", label: "Documentários", filterLabel: "Documentários" },
      {
        id: "shows",
        label: "Shows, Clipes & Podcasts",
        filterLabel: "Shows, Clipes & Podcasts",
      },
      {
        id: "raizes",
        label: "Raízes",
        filterLabel: "Raízes — João Paulo de Carvalho",
      },
    ],
  },

  projects,

  contact: {
    title: "Vamos conversar sobre o seu próximo projeto?",
    text: "Montagem, edição e finalização para longas, séries, realities, documentários e projetos audiovisuais no Brasil, no exterior ou remotamente.",
    whatsapp: {
      // Apenas dígitos com código do país, ex.: "5521999999999".
      number: "5521968297772",
      message:
        "Olá, Leli! Gostaria de conversar sobre um projeto de edição e pós-produção.",
    },
    email: null,
    linkedin: {
      url: "https://www.linkedin.com/in/leli-figueiredo-28839397/",
    },
    // Identificador fornecido; destino e identidade ainda a confirmar (ver publicationChecklist).
    imdb: { id: "nm1676461", approved: false },
  },

  seo: {
    title: "Leli Figueiredo | Montadora, Editora Sênior e Finalizadora",
    description:
      "Montadora, Editora Sênior e Finalizadora com mais de 25 anos de carreira e experiência em TV Globo, Globo Filmes, Amazon Prime Video, HBO Max, documentários, realities e cinema brasileiro.",
    locale: "pt_BR",
    lang: "pt-BR",
    ogImageAlt: "Leli Figueiredo — Montadora, Editora Sênior e Finalizadora",
    jsonLd: {
      jobTitle: "Film and Video Editor",
      worksFor: { name: "Aquarela Multimídia", confirmed: true },
      sameAs: [],
    },
  },

  uiLabels: {
    skipToContent: "Pular para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    mobileMenuTitle: "Menu",
    headerHomeLabel: "Leli Figueiredo — início da página",
    ctaWhatsapp: "Falar sobre um projeto",
    ctaContact: "Contato",
    actions: {
      watchTrailer: "Assistir trailer",
      viewProject: "Ver projeto",
      viewCredits: "Ver créditos",
      moreFeatured: "Ver mais obras selecionadas",
      lessFeatured: "Mostrar menos obras",
      moreCredits: "Ver mais créditos",
      close: "Fechar",
      watchOnYoutube: "Abrir no YouTube",
      openFicha: "Ver ficha",
      clearSearchAndFilters: "Limpar busca e filtros",
      clearSearch: "Limpar busca",
    },
    dialog: {
      closeLabel: "Fechar ficha da obra",
      period: "Período",
      category: "Categoria",
      role: "Função",
      production: "Produção e canais",
      credit: "Crédito associado",
      description: "Sobre a obra",
      link: "Link externo",
      videoTitlePrefix: "Vídeo:",
      videoLoading: "Carregando vídeo…",
      videoError:
        "Não foi possível carregar o vídeo agora. Verifique sua conexão ou abra diretamente no YouTube.",
    },
    catalog: {
      searchLabel: "Buscar por título",
      searchPlaceholder: "Buscar por título",
      filterGroupLabel: "Filtrar por categoria",
      emptyTitle: "Nenhum crédito encontrado.",
      emptyText: "Ajuste a busca ou escolha outra categoria.",
      resultsSummary: "Exibindo {shown} de {total} créditos",
      experienceTag: "Experiência profissional",
      listLabel: "Créditos",
    },
    contact: {
      pendingNotice: "Informações de contato em atualização",
      imdbLabel: "Perfil no IMDb",
      linkedinLabel: "LinkedIn",
      emailLabel: "E-mail",
      channelsLabel: "Canais de contato",
    },
    footerLine: "Leli Figueiredo • Aquarela Multimídia • Rio de Janeiro, Brasil.",
    previewNotice: "Versão de prévia",
    backToTop: "Voltar ao topo",
    externalLinkHint: "(abre em nova aba)",
  },

  publicationChecklist: [
    {
      id: "contact-channel",
      label:
        "Fornecer WhatsApp ou outro canal real de contato (publicação final exige ao menos um).",
      blocking: true,
      status: "done",
    },
    {
      id: "domain",
      label:
        "Informar o domínio oficial (NEXT_PUBLIC_SITE_URL) para canonical, sitemap e Open Graph na publicação final.",
      blocking: false,
      status: "pending",
    },
    {
      id: "portrait-images",
      label:
        "Retrato oficial de Leli Figueiredo na ilha de edição recebido e configurado na biografia.",
      blocking: false,
      status: "done",
    },
    {
      id: "linkedin",
      label: "Fornecer a URL do LinkedIn (hoje nula e não renderizada).",
      blocking: false,
      status: "done",
    },
    {
      id: "forca-da-floresta-url",
      label: "Obter a URL de A Força da Floresta em A Gente Transforma.",
      blocking: false,
      status: "done",
    },
    {
      id: "grande-otelo",
      label:
        "Confirmar o reconhecimento relacionado ao Prêmio Grande Otelo antes de exibi-lo (hoje não exibido).",
      blocking: false,
      status: "pending",
    },
    {
      id: "trailer-imdb-verification",
      label:
        "Verificar o destino do trailer (YouTube i5uQ5QtVSGo) e do perfil IMDb nm1676461; o IMDb não pôde ser consultado automaticamente (HTTP 403).",
      blocking: true,
      status: "pending",
    },
    {
      id: "reality-inedito",
      label:
        "Confirmar autorização e forma de crédito do Reality Show Inédito (hoje em on-hold e não exibido).",
      blocking: false,
      status: "pending",
    },
    {
      id: "platform-association",
      label:
        "Confirmar a associação individual de plataformas em Sem Bloqueio e 7 Chances Para... (hoje só HBO Max em 7 Chances Para..., por constar na biografia).",
      blocking: false,
      status: "pending",
    },
    {
      id: "aquarela-worksfor",
      label:
        "Vínculo com a Aquarela Multimídia configurado como estrutura profissional de suporte e ilha de edição.",
      blocking: false,
      status: "done",
    },
  ],
};
