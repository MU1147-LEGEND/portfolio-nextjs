import fs from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

export type AppDatabase = LibSQLDatabase<typeof schema>;

function ensureLocalDbDir(url: string) {
  if (!url.startsWith("file:")) return;
  try {
    const filePath = url.slice(5);
    const dir = path.dirname(path.resolve(process.cwd(), filePath));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.warn("Could not create local DB directory:", err);
  }
}

export function resolveDbUrl(): string {
  if (process.env.TURSO_DATABASE_URL) {
    return process.env.TURSO_DATABASE_URL;
  }
  if (process.env.DATABASE_URL) {
    if (process.env.VERCEL && process.env.DATABASE_URL.startsWith("file:")) {
      return "file:/tmp/portfolio.db";
    }
    return process.env.DATABASE_URL;
  }
  if (process.env.VERCEL) {
    return "file:/tmp/portfolio.db";
  }
  return "file:./data/portfolio.db";
}

export function createDbClient(
  url = resolveDbUrl(),
  authToken = process.env.TURSO_AUTH_TOKEN
): { client: Client; db: AppDatabase } {
  ensureLocalDbDir(url);
  const client = createClient({
    url,
    authToken: authToken || undefined,
  });
  const db = drizzle(client, { schema });
  return { client, db };
}

const globalForDb = globalThis as unknown as {
  __portfolioDb?: { client: Client; db: AppDatabase };
};

export function getDb(): AppDatabase {
  if (!globalForDb.__portfolioDb) {
    globalForDb.__portfolioDb = createDbClient();
  }
  return globalForDb.__portfolioDb.db;
}

export const db = getDb();
