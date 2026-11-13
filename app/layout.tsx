import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { getSiteSettings } from "@/lib/queries";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammadullah.me"),
  title: {
    default: "Mohammad Ullah — Full-Stack Engineer",
    template: "%s — Mohammad Ullah",
  },
  description:
    "Full-Stack Engineer crafting fast Next.js applications, resilient architectures, and tactile user interfaces.",
  icons: {
    icon: "/favicon-v2.ico",
    shortcut: "/favicon-v2.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Mohammad Ullah",
    title: "Mohammad Ullah — Full-Stack Engineer",
    description:
      "Full-Stack Engineer crafting fast Next.js applications, resilient architectures, and tactile user interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Ullah — Full-Stack Engineer",
    description:
      "Full-Stack Engineer crafting fast Next.js applications, resilient architectures, and tactile user interfaces.",
  },
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.fullName,
    url: "https://mohammadullah.me",
    jobTitle: settings.roleTitle,
    description: settings.bio,
    email: `mailto:${settings.email}`,
    sameAs: [
      settings.githubUrl,
      settings.linkedinUrl,
      settings.instagramUrl,
      settings.facebookUrl,
    ].filter(Boolean),
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-[var(--accent)] selection:text-white">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader
          fullName={settings.fullName}
          whatsappNumber={settings.whatsappNumber}
        />
        <main id="main">{children}</main>
        <SiteFooter settings={settings} />
        <SmoothScroll />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
