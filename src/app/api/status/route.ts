import { NextResponse } from "next/server";
import { hasDbConnection } from "@/lib/db";

export async function GET() {
  return NextResponse.json({
    status: "online",
    platform: "DevQuest",
    database: hasDbConnection ? "connected (Neon Serverless)" : "fallback (Local mock mode)",
    timestamp: new Date().toISOString(),
  });
}
