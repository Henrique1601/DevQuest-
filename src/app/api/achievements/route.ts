import { NextRequest, NextResponse } from "next/server";
import { db, hasDbConnection } from "@/lib/db";
import { achievements, userAchievements, users } from "@/lib/db/schema";
import { mockAchievements } from "@/lib/data/achievements";
import { eq, ilike } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "henrique_dev";

  if (hasDbConnection && db) {
    try {
      const dbAchievements = await db.select().from(achievements);
      const user = await db
        .select()
        .from(users)
        .where(ilike(users.name, username))
        .limit(1);

      let unlockedIds: string[] = [];
      if (user.length > 0) {
        const unlocked = await db
          .select()
          .from(userAchievements)
          .where(eq(userAchievements.userId, user[0].id));
        unlockedIds = unlocked.map((u) => u.achievementId ?? "");
      }

      const list = dbAchievements.length > 0 ? dbAchievements : mockAchievements;
      const items = list.map((a) => ({
        ...a,
        unlocked: unlockedIds.includes(a.id) || (username.includes("henrique") && ["ach-1", "ach-2", "ach-3", "ach-4", "ach-5", "ach-7"].includes(a.id)),
      }));

      return NextResponse.json({
        success: true,
        achievements: items,
        totalUnlocked: items.filter((i) => i.unlocked).length,
      });
    } catch (err) {
      console.warn("DevQuest Achievements API: Falha ao consultar Neon, usando fallback:", err);
    }
  }

  // Fallback resiliente
  const isHenrique = username.toLowerCase().includes("henrique");
  const items = mockAchievements.map((a) => ({
    ...a,
    unlocked: isHenrique ? ["ach-1", "ach-2", "ach-3", "ach-4", "ach-5", "ach-7"].includes(a.id) : ["ach-1"].includes(a.id),
  }));

  return NextResponse.json({
    success: true,
    achievements: items,
    totalUnlocked: items.filter((i) => i.unlocked).length,
  });
}
