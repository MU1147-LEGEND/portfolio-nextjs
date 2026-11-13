import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-guard";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/lib/queries";
import { projectPatchSchema } from "@/lib/validators";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = projectPatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const existing = await getProjectById(numericId);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const project = await updateProject(numericId, parsed.data);
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${existing.slug}`);
    revalidatePath(`/work/${project.slug}`);
    revalidatePath("/resume");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ project });
  } catch {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const existing = await getProjectById(numericId);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteProject(numericId);
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${existing.slug}`);
  revalidatePath("/resume");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
