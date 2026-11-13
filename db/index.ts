import fs from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

export type AppDatabase = LibSQLDatabase<typeof schema>;

function ensureLocalDbDir(url: string) {
  if (!url.startsWith("file:")) return;
  const filePath = url.slice(5);
  const dir = path.dirname(path.resolve(process.cwd(), filePath));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function createDbClient(
  url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:./data/portfolio.db",
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
