import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ArrowDown, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import X from "../../public/x_logo.svg";

export default async function Home() {
  const projects = await db.select().from(UsersProjects).orderBy(desc(UsersProjects.createdAt));
  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME;
  return (
    <>
      <div className="w-full h-svh relative text-white overflow-hidden">
        <div className="absolute z-20 bottom-0 w-full bg-transparent">
          <p className="w-full max-w-none text-white hidden md:flex justify-end gap-2 text-xl p-5 pr-10">SCROLL <ArrowDown className="animate-bounce"/></p>
        </div>
        <video className="max-w-none absolute left-1/2 -translate-x-1/2 w-full h-full object-cover" muted autoPlay loop>
          <source src="https://portfolio-manager.s3.tebi.io/videoplayback.mp4"></source>
        </video>
        <div className="absolute w-full left-0 bottom-0 from-black to-black/0 bg-gradient-to-t italic pt-52 pl-4 pr-16">
          <h1 className="leading-[20px] md:leading-[40px] text-2xl md:text-5xl mb-1 text-red-600">3D PRODUCT<br/>VISUALIZATION</h1>
          <h2 className="text-base md:text-2xl mt-0 text-white mb-10">BY {ownerName?.toUpperCase()}</h2>
        </div>
      </div>
      <div className="absolute z-20 h-16 md:h-24 w-full -bottom-7 sm:-bottom-[46px] flex justify-center gap-4 md:gap-20 items-center">
        <a className="w-10 md:w-16 h-10 md:h-16 p-2 md:p-4 rounded-full shadow-black/50 text-white bg-[#0a66c2] flex justify-center items-center" href="https://www.linkedin.com/in/david-popovici-43815a2a3/" target="_blanck">
          <Linkedin fill="currentColor" className="size-4 md:size-5"/>
        </a>
        <a className="w-10 md:w-16 h-10 md:h-16 p-2 md:p-4 rounded-full shadow-black/50 text-white from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-gradient-to-r flex justify-center items-center" href="https://www.instagram.com/markvici_21/" target="_blanck">
          <Instagram className="size-5 md:size-5"/>
        </a>
        <a className="w-10 md:w-16 h-10 md:h-16 p-2 md:p-4 rounded-full shadow-black/50 text-white bg-red-500 flex justify-center items-center" href="mailto:davidpopovicib@gmail.com" target="_blanck">
          <Mail className="size-5 md:size-5"/>
        </a>
        <a className="w-10 md:w-16 h-10 md:h-16 p-2 md:p-4 rounded-full shadow-black/50 text-white bg-black flex justify-center items-center" href="https://x.com/markvici/" target="_blanck">
          <Image className="invert" src={X} width={15} height={15} alt="X Logo"/>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden ">
        {(projects.map((project)=>(
          <a key={project.id} href={'/'+project.slug} className="relative group h-[300px] ">
            <h3 className="hidden group-hover:flex z-10 absolute w-full h-full top-0 left-0 bg-black/50 justify-center items-center text-xs md:text-2xl text-white">{project.title}</h3>
            <Image className="w-full h-full object-cover" src={project.thumbnailUrl || ''} width={1000} height={1000} alt="Thumbnail"></Image>
          </a>
        )))}
      </div>
    </>
  );
}