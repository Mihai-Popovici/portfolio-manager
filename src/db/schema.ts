import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const UsersProjects = pgTable("users_projects", {
  id: serial('id').primaryKey(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").default('').notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(()=>new Date())
});

export const Settings = pgTable("settings", {
  id: serial('id').primaryKey(),
  title: text("title").notNull().default(''),
  subTitle: text("subtitle").notNull().default(''),
  videoUrl: text("video_url").notNull(),
  hasLinkedIn: boolean("has_linkedin").notNull().default(false),
  linkedIn: text("linkedin"),
  hasInstagram: boolean("has_instagram").notNull().default(false),
  instagram: text("instagram"),
  hasEmail: boolean("has_email").notNull().default(false),
  email: text("email"),
  hasX: boolean("has_x").notNull().default(false),
  x: text("x"),
})