import {NextRequest, NextResponse} from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from 'crypto'

export async function POST (request: NextRequest){
  const data = await request.formData();
  const file = data.get('file') as File;
  const arrayBuffer = await file.arrayBuffer();

  const fileName = randomUUID()+file.name;
  const fileData = Buffer.from(arrayBuffer);

  const credentials = {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET
  };

  // Create an S3 service client object.
  const s3Client = new S3Client({
      endpoint: process.env.BUCKET_ENDPOINT,
      credentials: credentials,
      region: process.env.BUCKET_REGION
  }as any);
  const uploadData = await s3Client.send(
    new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            ACL:'public-read',
            Key: fileName,
            Body: fileData
    })
  );
  const url = `https://${process.env.BUCKET_NAME}.s3.tebi.io/${fileName}`;
  return NextResponse.json(url);
}