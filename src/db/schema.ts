import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const UsersProjects = pgTable("users_projects", {
  id: serial('id').primaryKey(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(()=>new Date())
});