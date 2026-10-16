# Portfólio — Leli Figueiredo

Site institucional de Leli Figueiredo (Montadora, Editora Sênior e Finalizadora).
Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React.

> **Status: PRÉVIA — não está pronto para lançamento.** Veja [Bloqueios de publicação](#bloqueios-de-publicação).

---

## 1. Executar

Requisitos: Node.js 20+ (testado com Node 24.21 / npm 11.19).

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + build
npm run build && npm start   # versão de produção
```

> [!WARNING]
> **Não rode `npm install` dentro da pasta do Google Drive.** A sincronização do Drive
> trava arquivos durante a instalação (erros `EBADF`, `EPERM`, `TAR_ENTRY_ERROR`).
> Copie o projeto para um disco local (ex.: `C:\dev\leli`), instale e rode por lá.
> O Drive serve como backup do código-fonte (sem `node_modules` e `.next`).

### Domínio

Copie `.env.example` para `.env.local` e preencha `NEXT_PUBLIC_SITE_URL` **somente com o domínio oficial**.
Sem esse valor, o site não gera canonical nem sitemap e fica com `noindex`.

---

## 2. Onde editar o conteúdo

**Todo o conteúdo fica em [`src/data/portfolioData.ts`](src/data/portfolioData.ts).** Não é preciso mexer nos componentes.
Os tipos estão em [`src/data/types.ts`](src/data/types.ts); o TypeScript avisa se faltar algum campo.

| O que mudar | Bloco em `portfolioData` |
|---|---|
| Nome, funções, localização | `identity` |
| Menu | `navigation` |
| Título, subtítulo, linha técnica, CTAs da abertura | `hero` |
| Biografia e trecho em destaque | `biography` (`pullQuote` deve ser um trecho literal dos parágrafos) |
| Serviços / estrutura técnica | `services`, `technicalStructure` |
| Canais, produtoras e plataformas | `brands.items` |
| Obras e créditos | lista `projects` (no topo do arquivo) |
| WhatsApp, e-mail, LinkedIn, IMDb | `contact` |
| Título, descrição, JSON-LD | `seo` |
| Textos de botões e rótulos | `uiLabels` |
| Pendências de lançamento | `publicationChecklist` |

### Contatos

```ts
whatsapp: { number: "5521XXXXXXXXX", message: "..." } // só dígitos, com código do país
email: "nome@dominio.com"
linkedin: { url: "https://www.linkedin.com/in/..." }
imdb: { id: "nm1676461", approved: true }            // approved=true só após conferir o perfil
```

Com um WhatsApp válido, o site passa a mostrar automaticamente "Falar sobre um projeto"
no header e no contato (a mensagem é codificada no link). Campos `null` não aparecem.
Depois, marque o item `contact-channel` em `publicationChecklist` como `"done"`.

### Obras e créditos

Cada obra é **um único registro** em `projects`, usado pela vitrine **e** pela filmografia.

- `categories`: uma ou mais categorias (`"tv-streaming" | "cinema" | "documentarios" | "shows" | "raizes"`).
- `periodLabel`: o período **como informado**. Não troque pela data de lançamento.
- `role`, `description`, `organizations`: só informações daquela obra; `null`/`[]` some da interface.
- `featuredOrder`: posição de 1 a 8 na vitrine (`null` = só no catálogo). As 4 primeiras aparecem logo de início.
- `publicationStatus: "on-hold"` mantém o registro na base sem publicar.
- `pendingChecks`, `withheldClaims`, `sourceNotes`: anotações internas, **nunca exibidas**.
- A ordem da lista é a ordem do catálogo (mais recente → mais antigo; itens sem ano têm posição fixa).

### Imagens

1. Coloque o arquivo aprovado em `public/images/projetos/` (ou `public/images/` para retrato/hero).
2. Preencha `media.image` da obra:

```ts
image: {
  src: "/images/projetos/marietta.jpg",
  alt: "Descrição fiel do que aparece no frame",
  width: 1920, height: 1080,
  kind: "frame",          // "frame" = recorte 16:9 | "poster" = proporção preservada
  focalPoint: "50% 35%",  // opcional
}
```

Sem imagem, o site usa um fallback tipográfico com o título real. Para o retrato use
`biography.portrait`; para a abertura, `hero.image` (a imagem do hero carrega com prioridade).

### Vídeos

```ts
video: { provider: "youtube", id: "i5uQ5QtVSGo", status: "available", checkedOn: "AAAA-MM-DD" }
```

Só `status: "available"` mostra "Assistir trailer" e o ícone de play; qualquer outro status
abre a ficha da obra. O player só carrega depois do clique e é encerrado ao fechar.

### Link externo de uma obra

```ts
externalLink: { url: "https://...", label: "Ver no A Gente Transforma" }
```

---

## 3. Estrutura

```
src/
  app/            layout (fontes, metadados, JSON-LD), page, OG image, robots, sitemap
  components/     Header, Hero, FeaturedWorks, BrandsStrip, About, Services,
                  Filmography, Contact, Footer, ProjectDialog(+Provider), WorkArtwork, Reveal
  data/           portfolioData.ts (conteúdo) · types.ts
  lib/            projects.ts (seletores), site.ts (contato/SEO/prévia), utils.ts
```

---

## 4. Testes executados (14/10/2026)

Ambiente: Windows, Node 24.21, build de produção (`next start`), Chromium (Playwright) headless.

| Verificação | Resultado |
|---|---|
| `tsc --noEmit` | ver relatório final da entrega |
| `eslint .` | ver relatório final da entrega |
| `next build` | ver relatório final da entrega |
| Playwright + axe-core (360/390/768/1024/1440 px) | ver relatório final da entrega |
| Lighthouse | ver relatório final da entrega |

Os resultados detalhados estão na seção "Testes" do relatório de entrega. Não foram feitos
testes em dispositivos reais, Safari/iOS, Firefox ou com leitores de tela.

---

## 5. Pendências

| # | Pendência | Bloqueia lançamento? |
|---|---|---|
| 1 | WhatsApp ou outro canal real de contato | **Sim** |
| 2 | Domínio oficial (`NEXT_PUBLIC_SITE_URL`) | **Sim** |
| 3 | Conferir destino do trailer (YouTube `i5uQ5QtVSGo`, publicado no canal da Cinesystem) e do perfil IMDb `nm1676461` | **Sim** |
| 4 | Retrato e imagens aprovadas das obras | Não (há fallback) |
| 5 | URL do LinkedIn | Não |
| 6 | URL de *A Força da Floresta* em A Gente Transforma | Não |
| 7 | Confirmar "Selecionado ao Prêmio Grande Otelo" (guardado, não exibido) | Não |
| 8 | Autorização e forma de crédito do *Reality Show Inédito* (não exibido) | Não |
| 9 | Plataforma individual de *Sem Bloqueio* (e confirmar HBO Max em *7 Chances Para...*) | Não |
| 10 | Vínculo com a Aquarela Multimídia para `worksFor` no JSON-LD | Não |

### Ambiguidades registradas (sem correção silenciosa)

- *Encontro e É de Casa*, *Vida de Mallandro e Pequenos Notáveis*, *Fantástico e Campanha Fernando Gabeira*
  foram separados em registros próprios, todos com o período do agrupamento original.
- "Mallandro": grafia preservada como fornecida.
- *Trailers de Orfeu, Bossa Nova, Oriundi e Outras Histórias*: mantido como um registro (assistência em trailers, não montagem dos longas).
- Funções em "Raízes" vêm do título do grupo ("Assistência a João Paulo de Carvalho").
- O link do IMDb aparece na prévia, mas só entra no `sameAs` do JSON-LD com `approved: true`.
