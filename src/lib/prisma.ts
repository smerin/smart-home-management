import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Use existing client or create new one
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// Store it globally in development
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
