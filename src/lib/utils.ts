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
    return "Error"
  }
  let bestMatch = {
    length: -1,
    pathname: '',
  }
  hrefs.forEach((href)=>{
    let lenght = href.length;
    let slice = pathname.slice(0, href.length);
    if (slice === href && lenght > bestMatch.length){
      bestMatch = {
        length: lenght,
        pathname: slice
      }
    }
  })
  return bestMatch.pathname;
}
