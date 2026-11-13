import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/admin-guard";
import { getAllProjects, getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [projects, settings] = await Promise.all([
    getAllProjects(),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboard initialProjects={projects} initialSettings={settings} />
  );
}
