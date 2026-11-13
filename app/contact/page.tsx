import type { Metadata } from "next";
import WhatsAppComposer from "@/components/contact/WhatsAppComposer";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Mohammad Ullah directly on WhatsApp or email.",
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
