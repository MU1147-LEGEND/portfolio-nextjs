import test from "node:test";
import assert from "node:assert/strict";
import { createDbClient } from "../db/index.ts";
import { ensureSchemaAndSeed } from "../db/seed.ts";
import {
  getAllProjects,
  getPublishedProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  getSiteSettings,
  updateSiteSettings,
} from "../lib/queries.ts";

function setupTempDb() {
  const { db, client } = createDbClient(":memory:");
  return {
    db,
    cleanup: () => {
      client.close();
    },
  };
}

test("ensureSchemaAndSeed seeds idempotently and queries return ordered projects", async () => {
  const { db, cleanup } = setupTempDb();
  try {
    await ensureSchemaAndSeed(db);
    await ensureSchemaAndSeed(db);

    const all = await getAllProjects(db);
    assert.equal(all.length, 17);
    assert.equal(all[0].slug, "sanchayanbd");

    const published = await getPublishedProjects(db);
    assert.ok(published.every((p) => p.published));

    const featured = await getFeaturedProjects(db);
    assert.ok(featured.length >= 2);
    assert.ok(featured.every((p) => p.published && p.featured));

    const one = await getProjectBySlug("sanchayanbd", db);
    assert.ok(one);
    assert.equal(one.title, "SanchayanBD");

    const settings = await getSiteSettings(db);
    assert.equal(settings.whatsappNumber, "8801734906838");
  } finally {
    cleanup();
  }
});

test("homepage featured projects are the five requested projects in order", async () => {
  const { db, cleanup } = setupTempDb();
  try {
    await ensureSchemaAndSeed(db);
    const featured = await getFeaturedProjects(db);
    assert.deepEqual(featured.map((project) => project.slug), [
      "sanchayanbd",
      "nextipress",
      "basati",
      "focus-dock",
      "yucar-rental",
    ]);
  } finally {
    cleanup();
  }
});

test("seeding adds requested portfolio projects without duplicating or overwriting existing rows", async () => {
  const { db, cleanup } = setupTempDb();
  try {
    await ensureSchemaAndSeed(db);
    const before = await getProjectBySlug("sanchayanbd", db);
    assert.ok(before);

    await ensureSchemaAndSeed(db);
    const all = await getAllProjects(db);
    const requestedSlugs = [
      "yucar-rental",
      "sanchayanbd",
      "basati",
      "text-to-speech",
      "my-id-card",
      "sunnah-store",
    ];

    assert.deepEqual(
      requestedSlugs.map((slug) => all.some((project) => project.slug === slug)),
      [true, true, true, true, true, true]
    );
    assert.equal(all.filter((project) => project.slug === "sanchayanbd").length, 1);
    assert.equal((await getProjectBySlug("sanchayanbd", db))?.title, before.title);
    assert.equal((await getProjectBySlug("sanchayanbd", db))?.description, before.description);
    assert.equal((await getProjectBySlug("nextipress", db))?.domain, "saas");
    assert.equal((await getProjectBySlug("focus-dock", db))?.domain, "productivity");
    assert.equal((await getProjectBySlug("yucar-rental", db))?.domain, "travel / team");
  } finally {
    cleanup();
  }
});

test("createProject, updateProject, deleteProject, and updateSiteSettings mutate SQLite state", async () => {
  const { db, cleanup } = setupTempDb();
  try {
    await ensureSchemaAndSeed(db);

    const created = await createProject(
      {
        title: "Pulse Analytics",
        slug: "pulse-analytics",
        tagline: "Real-time telemetry dashboard",
        role: "Lead Engineer",
        year: "2026",
        category: "product",
        description: "High-throughput analytics UI.",
        problem: "Slow charts",
        solution: "Canvas + Drizzle",
        outcome: "Sub-50ms interaction",
        stack: ["Next.js", "TypeScript"],
        imageUrl: "/assets/projects/nextlearn.png",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/MU1147-LEGEND",
        featured: false,
        published: false,
        sortOrder: 4,
      },
      db
    );
    assert.equal(created.slug, "pulse-analytics");

    const publishedBefore = await getPublishedProjects(db);
    assert.equal(publishedBefore.some((p) => p.slug === "pulse-analytics"), false);

    const updated = await updateProject(created.id, { published: true, featured: true }, db);
    assert.equal(updated.published, true);
    assert.equal(updated.featured, true);

    const publishedAfter = await getPublishedProjects(db);
    assert.equal(publishedAfter.some((p) => p.slug === "pulse-analytics"), true);

    await deleteProject(created.id, db);
    const afterDelete = await getProjectBySlug("pulse-analytics", db);
    assert.equal(afterDelete, null);

    const nextSettings = await updateSiteSettings(
      { availabilityText: "Booked until Q2" },
      db
    );
    assert.equal(nextSettings.availabilityText, "Booked until Q2");
  } finally {
    cleanup();
  }
});
