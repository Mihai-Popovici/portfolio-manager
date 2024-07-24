import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import X from "../../public/x_logo.svg";

export default async function Home() {
  const projects = await db.select().from(UsersProjects).orderBy(desc(UsersProjects.createdAt));
  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME;
  return (
    <>
      <div className="w-full relative bg-black text-white">
        <video className="w-full" muted autoPlay loop>
          <source src="https://portfolio-manager.s3.tebi.io/videoplayback.mp4"></source>
        </video>
        <div className="absolute bottom-2 md:top-1/2 md:-translate-y-1/2 ml-2 md:ml-10 mb-0 md:mb-2">
          <h1 className="relative bg-black/10 backdrop-blur-md p-3 text-xl md:text-6xl my-0 skew-x-12 border-b md:border-b-2 border-green-400">{ownerName}</h1>
          <h2 className="relative h-[52px] md:h-[84px] bg-black/10 backdrop-blur-md p-3 text-lg md:text-4xl my-0 -skew-x-12 border-t md:border-t-2 border-green-400">3D Modeling and Animation</h2>
        </div>
      </div>
      <div className="sticky z-20 h-16 md:h-24 w-full top-0  backdrop:blur-lg flex justify-center gap-10 md:gap-20 items-center text-black backdrop-blur-[8px] mask-tb">
        <div className="relative shadow-lg rounded-full">
          <div className="w-10 md:w-16 h-10 md:h-16 bg-[#0a66c2] rounded-full">
          </div>
          <a className="absolute z-2 top-1/2 left-1/2 bg-white hover:bg-transparent -translate-x-1/2 -translate-y-1/2 group p-2 md:p-4 rounded-full shadow-black/50 hover:text-white transition-all" href="https://www.linkedin.com/in/david-popovici-43815a2a3/" target="_blanck">
            <Linkedin fill="currentColor" className="size-3 md:size-5"/>
          </a>
        </div>
        <div className="relative shadow-lg rounded-full">
          <div className="w-10 md:w-16 h-10 md:h-16 from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-gradient-to-r rounded-full">
          </div>
          <a className="absolute z-2 top-1/2 left-1/2 bg-white hover:bg-transparent -translate-x-1/2 -translate-y-1/2 group p-2 md:p-4 rounded-full shadow-black/50 hover:text-white transition-all" href="https://www.instagram.com/markvici_21/" target="_blanck">
            <Instagram className="size-3 md:size-5"/>
          </a>
        </div>
        <div className="relative shadow-lg rounded-full">
          <div className="w-10 md:w-16 h-10 md:h-16 bg-black rounded-full">
          </div>
          <a className="group absolute z-2 top-1/2 left-1/2 w-7 md:w-[52px] h-7 md:h-[52px] bg-white hover:bg-transparent -translate-x-1/2 -translate-y-1/2 group p-2 md:p-3 rounded-full  shadow-black/50 hover:text-white flex justify-center items-center transition-all" href="https://x.com/markvici/" target="_blanck">
            <Image className="size-3 md:size-5 group-hover:invert" src={X} width={20} height={20} alt="X Logo"/>
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {(projects.map((project)=>(
          <a key={project.id} href={'/'+project.slug} className="group h-[300px] hover:border-8 border-white hover:outline hover:outline-4 outline-green-400 overflow-hidden relative transition-all m-[2px]">
            <h3 className="z-10 absolute w-full text-center top-1/2 text-xs md:text-2xl text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transition-all group-hover:top-1/3 group-hover:text-sm md:group-hover:text-4xl">{project.title}</h3>
            <Image className="w-full h-full object-cover" src={project.thumbnailUrl || ''} width={1000} height={1000} alt="Thumbnail"></Image>
          </a>
        )))}
      </div>
    </>
  );
}