import type { Metadata } from "next";
import CapabilitiesGrid from "@/components/home/CapabilitiesGrid";
import ContactBand from "@/components/home/ContactBand";
import CredentialLedger from "@/components/home/CredentialLedger";
import Hero from "@/components/home/Hero";
import WorkShowcaseStage from "@/components/home/WorkShowcaseStage";
import {
  getFeaturedProjects,
  getPublishedProjects,
  getSiteSettings,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mohammad Ullah — Software Engineer & Full-Stack Web Developer",
  description:
    "Official portfolio of Mohammad Ullah, Full-Stack Web Developer and Software Engineer. Explore Next.js SaaS platforms, fintech software, e-commerce applications, and modern web architectures.",
  alternates: {
    canonical: "https://mohammadullah.me",
  },
};

export default async function HomePage() {
  const [settings, featured, published] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getPublishedProjects(),
  ]);

  const stageProjects = featured.length > 0 ? featured : published;

  return (
    <>
      <Hero settings={settings} projectCount={published.length} />
      <WorkShowcaseStage
        projects={stageProjects}
        totalPublishedCount={published.length}
      />
      <CapabilitiesGrid />
      <CredentialLedger />
      <ContactBand
        whatsappNumber={settings.whatsappNumber}
        email={settings.email}
      />
    </>
  );
}
