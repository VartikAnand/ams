import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

async function checkDBConnection() {
  try {
    await db.$connect();
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

checkDBConnection();
