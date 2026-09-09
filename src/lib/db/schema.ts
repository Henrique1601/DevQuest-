import { pgTable, text, timestamp, integer, boolean, uuid, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),
  xp: integer("xp").default(0).notNull(),
  level: integer("level").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  category: text("category").notNull(), // frontend, backend, fullstack
  estimatedHours: integer("estimated_hours").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  features: jsonb("features").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const challenges = pgTable("challenges", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  category: text("category").notNull(),
  xp: integer("xp").default(50).notNull(),
  description: text("description").notNull(),
  starterCode: text("starter_code").notNull(),
  functionName: text("function_name").notNull(),
  testCases: jsonb("test_cases").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  challengeId: text("challenge_id").references(() => challenges.id),
  code: text("code").notNull(),
  passed: boolean("passed").notNull(),
  executedAt: timestamp("executed_at").defaultNow().notNull(),
});
