import {NextRequest, NextResponse} from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { Settings } from "@/db/schema";

export async function GET (request: NextRequest){
  const user = await currentUser()
  if (!user) {
    throw new Error('Invalid User');
  }
  let [settings] = await db.select().from(Settings);
  return NextResponse.json(settings);
}