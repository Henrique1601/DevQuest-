import { NextResponse } from "next/server";
import { mockChallenges } from "@/lib/data/challenges";

export async function GET() {
  return NextResponse.json({
    total: mockChallenges.length,
    challenges: mockChallenges,
  });
}
