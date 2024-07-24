import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
