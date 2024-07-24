import {NextRequest, NextResponse} from "next/server";
import { uploadFile } from "@/lib/utils";

export async function POST (request: NextRequest){
  const data = await request.formData();
  const file = data.get('file') as File;
  let url = await uploadFile(file);
  return NextResponse.json(url);
}