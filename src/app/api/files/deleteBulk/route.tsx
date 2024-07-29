import { deleteFile } from "@/lib/utils";
import {NextRequest, NextResponse} from "next/server";

export async function POST (request: NextRequest){
  const data:string[] = await request.json();
  data.forEach(async (file)=>{
    await deleteFile(file);
  })
  return NextResponse.json("");
}