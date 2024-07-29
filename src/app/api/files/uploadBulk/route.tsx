import { uploadFile } from "@/lib/utils";
import {NextRequest, NextResponse} from "next/server";

export async function POST (request: NextRequest){
  const data = await request.formData();
  data.forEach(async (file:any)=>{
    await uploadFile(file);
  })
  return NextResponse.json("");
}