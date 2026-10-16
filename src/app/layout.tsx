import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { portfolioData } from "@/data/portfolioData";
import { isPreview, siteUrl } from "@/lib/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ProjectDialogProvider } from "@/components/ProjectDialogProvider";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-serif",
});

// Itálico só aparece em detalhes (composição do hero e citação): não precisa de preload.
const serifItalic = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-serif-italic",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const { seo, identity, uiLabels } = portfolioData;

export const metadata: Metadata = {
  // Sem domínio oficial informado, o fallback local só serve para resolver URLs em desenvolvimento.
  metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
  title: seo.title,
  description: seo.description,
  applicationName: identity.name,
  authors: [{ name: identity.name }],
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  // Prévias (pendências bloqueantes ou domínio não definido) não devem ser indexadas.
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: seo.locale,
    siteName: identity.name,
    title: seo.title,
    description: seo.description,
    url: siteUrl ?? undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={seo.lang} className={`${serif.variable} ${serifItalic.variable} ${sans.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-amber focus:px-5 focus:py-3 focus:font-medium focus:text-ink"
        >
          {uiLabels.skipToContent}
        </a>
        <ProjectDialogProvider>
          <Header />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </ProjectDialogProvider>
        <JsonLd />
      </body>
    </html>
  );
}
