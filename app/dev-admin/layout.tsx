import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin CMS | Mohammad Ullah",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DevAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
