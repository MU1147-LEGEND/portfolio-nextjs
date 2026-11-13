import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession, requireAdminApi } from "@/lib/admin-guard";
import {
  createProject,
  getAllProjects,
  getPublishedProjects,
} from "@/lib/queries";
import { projectInputSchema } from "@/lib/validators";

export async function GET() {
  const session = await getAdminSession();
  const data = session ? await getAllProjects() : await getPublishedProjects();
  return NextResponse.json({ projects: data });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const parsed = projectInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Validation failed",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const project = await createProject(parsed.data);
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath("/resume");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ project }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
