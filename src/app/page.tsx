import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ArrowDown, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import X from "../../public/x_logo.svg";

export default async function Home() {
  const projects = await db.select().from(UsersProjects).orderBy(desc(UsersProjects.createdAt));
  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME;
  return (
    <>
      <div className="w-full h-screen relative bg-black text-white overflow-hidden">
        <div className="absolute z-20 bottom-0 mb-5 w-full border-b border-white bg-transparent">
          <p className="text-white flex gap-2 text-xl p-5">SCROLL <ArrowDown className="animate-bounce"/></p>
        </div>
        <video className="max-w-none absolute left-1/2 -translate-x-1/2 w-screen h-screen object-cover" muted autoPlay loop>
          <source src="https://portfolio-manager.s3.tebi.io/videoplayback.mp4"></source>
        </video>
        <div className="absolute left-0 bottom-60 bg-white/70 rounded-tr-[2rem] rounded-br-[2rem] text-black italic pt-8 pl-16 pb-2 pr-16">
          <h1 className="leading-[20px] md:leading-[40px] text-2xl md:text-5xl mb-0">3D PRODUCT<br/>VISUALIZATION</h1>
          <h2 className="text-base md:text-2xl mt-0">BY {ownerName?.toUpperCase()}</h2>
          {/* <h1 className="relative bg-black/10 backdrop-blur-md p-3 text-xl md:text-6xl my-0 skew-x-12 border-b md:border-b-2 border-green-400">{ownerName}</h1>
          <h2 className="relative h-[52px] md:h-[84px] bg-black/10 backdrop-blur-md p-3 text-lg md:text-4xl my-0 -skew-x-12 border-t md:border-t-2 border-green-400">3D Modeling and Animation</h2> */}
        </div>
      </div>
      <div className="hidden sticky z-20 h-16 md:h-24 w-full top-0  backdrop:blur-lg flex justify-center gap-10 md:gap-20 items-center text-black backdrop-blur-[8px] mask-tb">
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
      <div className="w-full flex flex-col lg:flex-row justify-center py-10">
        <div className="w-full lg:w-1/2 flex justify-end">
          <h3 className="h-min text-4xl md:text-7xl italic w-[80%] py-2 pl-5 pr-20 bg-black text-white leading-[28px!important] md:leading-[60px!important]">DESIGNED <br/>TO <b>DELIGHT</b></h3>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-5 justify-start pl-5 pr-20">
          <p className="text-end text-lg md:text-xl">Are you launching a <b>new product</b> and need visuals to get people as excited about it as you are? I got you.</p>
          <div className="w-full max-w-[1200px] flex justify-end">
            <button className="w-fit italic px-8 py-4 text-4xl bg-orange-600 hover:bg-black text-white font-bold">TALK TO DAVID</button>
          </div>
          <p className="text-end text-sm md:text-base text-slate-500">(this button will allow you to <b>set up a call with me</b>)</p>
        </div>       
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
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