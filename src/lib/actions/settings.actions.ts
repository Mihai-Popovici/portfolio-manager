"use server";
import { db } from "@/db";
import { Settings } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function updateSettings(formData:FormData){
  const user = await currentUser()
  if (!user) {
    throw new Error('Invalid User');
  }
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const subTitle = formData.get("subTitle") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const hasLinkedIn = formData.get("hasLinkedIn") === 'on';
  const linkedIn = formData.get("linkedIn") as string;
  const hasInstagram = formData.get("hasInstagram") === 'on';
  const instagram = formData.get("instagram") as string;
  const hasEmail = formData.get("hasEmail") === 'on';
  const email = formData.get("email") as string;
  const hasX = formData.get("hasX") === 'on';
  const x = formData.get("x") as string;
  const settings = await db.select().from(Settings).where(eq(Settings.id, Number(id)));
  console.log(hasLinkedIn, hasInstagram, hasEmail, hasX)
  if (settings && settings[0]){
    await db.update(Settings).set(
      {
        title,
        subTitle,
        videoUrl,
        hasLinkedIn,
        linkedIn,
        hasInstagram,
        instagram,
        hasEmail,
        email,
        hasX,
        x
      }
    ).where(eq(Settings.id, Number(id)));
  }else{
    await db.insert(Settings).values({
      title,
      subTitle,
      videoUrl,
      hasLinkedIn,
      linkedIn,
      hasInstagram,
      instagram,
      hasEmail,
      email,
      hasX,
      x
    })
  }
  redirect('/admin/projects');
}