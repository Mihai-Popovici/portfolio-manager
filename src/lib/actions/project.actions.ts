"use server";
import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type NewProjectState = {
  success:boolean,
  message:string
}

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