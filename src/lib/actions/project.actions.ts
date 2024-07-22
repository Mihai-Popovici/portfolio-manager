"use server";
import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function newProject(formData:FormData){
  const user = await currentUser()
  if (!user) {
    throw new Error('Invalid User');
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  let project = await db.insert(UsersProjects).values({
    user_id: user.id,
    title,
    description
  }).returning();

  redirect('/admin/projects/'+project[0].id);
}

export async function updateProject(formData:FormData){
  const user = await currentUser()
  if (!user) {
    throw new Error('Invalid User');
  }

  let id = formData.get("id") as string | number;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;

  id = Number(id); 

  console.log(id);

  let project = await db.update(UsersProjects).set({
    description,
    content
  }).where(eq(UsersProjects.id, id)).returning();

  redirect('/admin/projects');
}