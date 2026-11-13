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
