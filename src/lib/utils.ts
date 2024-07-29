import { DeleteObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type ClassValue, clsx } from "clsx"
import { randomUUID } from "crypto";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function uploadFile(file:File){
  const arrayBuffer = await file.arrayBuffer();

  const fileName = randomUUID()+'_'+file.name;
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
  await s3Client.send(
    new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            ACL:'public-read',
            Key: fileName,
            Body: fileData
    })
  );
  return `https://${process.env.BUCKET_NAME}.s3.tebi.io/${fileName}`;
}

export async function listFiles(){
  const credentials = {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET
  };

  const s3Client = new S3Client({
    endpoint: process.env.BUCKET_ENDPOINT,
    credentials: credentials,
    region: process.env.BUCKET_REGION
  }as any);

  const data = await s3Client.send(
    new ListObjectsCommand({
      Bucket: process.env.BUCKET_NAME
    })
  )
  return data
}

export async function deleteFile(filename:string){
  const credentials = {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET
  };

  const s3Client = new S3Client({
    endpoint: process.env.BUCKET_ENDPOINT,
    credentials: credentials,
    region: process.env.BUCKET_REGION
  }as any);

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: filename
    })
  )
}

export function readImageFile(file:File, cb:(data:string | ArrayBuffer | null)=>void){
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      cb(reader.result);
    },
    false,
  );
  reader.readAsDataURL(file);
}

export function getMeta(url: string, cb:(err:any,img?:any)=>void) {
  const img = new Image();
  img.onload = () => cb(null, img);
  img.onerror = (err) => cb(err);
  img.src = url;
};

export function findBestHref(hrefs:string[], pathname:string) {
  if (!hrefs || hrefs.length < 1 || !pathname || pathname === ""){
    return ""
  }
  let bestMatch = {
    length: -1,
    pathname: '',
  }
  hrefs.forEach((href)=>{
    let length = href.length;
    let slice = pathname.slice(0, href.length);
    if (slice === href && length > bestMatch.length){
      bestMatch = {
        length: length,
        pathname: slice
      }
    }
  })
  return bestMatch.pathname;
}

/* https://gist.github.com/codeguy/6684588 */
export function toSlug (string:string, separator='-') {
  return string.toString()
      .normalize('NFD')                   // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, separator);
}
