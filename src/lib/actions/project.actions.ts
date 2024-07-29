"use server";
import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { toSlug, uploadFile } from "@/lib/utils";

async function uniqTitle(title:string){
  let count = 0;
  let t = title.replace(/\s+/g, ' ');
  while ((await db.select().from(UsersProjects).where(eq(UsersProjects.slug, toSlug(t)))).length > 0) {
    count += 1;
    t = `${title} ${count}`
  }
  return t;
}

export async function newProject(formData:FormData){
  const user = await currentUser()
  if (!user) {
    throw new Error('Invalid User');
  }

  const title = await uniqTitle(formData.get("title") as string);
  const description = formData.get("description") as string;

  let project = await db.insert(UsersProjects).values({
    user_id: user.id,
    title,
    slug: toSlug(title),
    description
  }).returning();

  redirect('/admin/projects/'+project[0].slug);
}

export async function updateProject(formData:FormData){
  const user = await currentUser()
  if (!user) {
    throw new Error('Invalid User');
  }

  let id = formData.get("id") as string | number;
  id = Number(id); 
  let title = (formData.get("title") as string).replace(/\s+/g, ' ');
  const [p] = await db.select().from(UsersProjects).where(eq(UsersProjects.id, id));
  if (!p) {
    throw new Error('Invalid Project');
  }
  if (title !== p.title){
    title = await uniqTitle(title);
  }
  // const title = await uniqTitle(formData.get("title") as string);
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const thumbnailUrl = formData.get("thumbnail") as string;
  await db.update(UsersProjects).set({
    title,
    slug:toSlug(title),
    description,
    thumbnailUrl,
    content
  }).where(eq(UsersProjects.id, id)).returning();

  redirect('/admin/projects');
}

export async function deleteProject(id:number){
  await db.delete(UsersProjects).where(eq(UsersProjects.id, id));
  redirect('/admin/projects');
}