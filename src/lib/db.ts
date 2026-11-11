import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

// On Vercel / serverless:
// The root filesystem is read-only and dev.db may be located in prisma/dev.db
// We copy prisma/dev.db to /tmp/dev.db so it is both readable and writable
function setupDatabaseUrl() {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("dev.db")) {
    return process.env.DATABASE_URL;
  }

  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

  if (isServerless) {
    const tmpDbPath = path.join("/tmp", "dev.db");
    const possibleSourcePaths = [
      path.join(process.cwd(), "prisma", "dev.db"),
      path.join(process.cwd(), "dev.db"),
      path.join(process.cwd(), ".next", "server", "prisma", "dev.db"),
    ];

    if (!fs.existsSync(tmpDbPath)) {
      for (const src of possibleSourcePaths) {
        if (fs.existsSync(src)) {
          try {
            fs.copyFileSync(src, tmpDbPath);
            break;
          } catch (e) {
            console.warn("Could not copy database file to /tmp:", e);
          }
        }
      }
    }

    if (fs.existsSync(tmpDbPath)) {
      process.env.DATABASE_URL = `file:${tmpDbPath}`;
      return `file:${tmpDbPath}`;
    }
  }

  const defaultUrl = "file:./dev.db";
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = defaultUrl;
  }
  return process.env.DATABASE_URL;
}

setupDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
