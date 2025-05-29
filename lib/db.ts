import { PrismaClient } from "@prisma/client";

declare global {
  interface Global {
    prisma: PrismaClient | undefined;
  }
}

const globalForPrisma = global as { prisma?: PrismaClient };

const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;