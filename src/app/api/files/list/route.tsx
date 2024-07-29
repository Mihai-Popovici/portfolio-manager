import {NextRequest, NextResponse} from "next/server";
import { listFiles } from "@/lib/utils";

export async function GET (request: NextRequest){
  let files = await listFiles();
  return NextResponse.json(files);
}