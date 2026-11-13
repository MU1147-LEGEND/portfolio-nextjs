import type { Metadata } from "next";
import WhatsAppComposer from "@/components/contact/WhatsAppComposer";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hire Mohammad Ullah — Full-Stack Web Developer & Software Engineer",
  description:
    "Get in touch with Mohammad Ullah for full-stack web development, Next.js product engineering, and technical consulting. Direct WhatsApp channel and email contact.",
  alternates: {
    canonical: "https://mohammadullah.me/contact",
  },
  openGraph: {
    title: "Hire Mohammad Ullah — Full-Stack Web Developer & Software Engineer",
    description:
      "Direct WhatsApp and email contact for freelance, contract, and full-time web development opportunities.",
    url: "https://mohammadullah.me/contact",
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <h1 className="display-hero font-semibold text-[var(--ink-primary)]">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-[58ch] text-[18px] leading-relaxed text-[var(--ink-secondary)]">
          {settings.availabilityText}. Reach out directly on WhatsApp or via email.
        </p>

        <div className="mt-12">
          <WhatsAppComposer
            whatsappNumber={settings.whatsappNumber}
            email={settings.email}
            location={settings.location}
          />
        </div>
      </div>
    </section>
  );
}
