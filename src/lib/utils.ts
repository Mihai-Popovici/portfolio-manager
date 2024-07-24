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
