
import { db } from "@/db"
import { UsersProjects } from "@/db/schema"
import { eq } from "drizzle-orm"
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const RenderProject = dynamic(() => import('@/components/home/RenderProject'), {
  ssr: false
})

export default async function Project({ params }: { params: { slug: string } }){
  const [project] = await db.select().from(UsersProjects).where(eq(UsersProjects.slug, params.slug)).limit(1);
  if (!project){
    redirect('/');
  }
  return (
  <div className="p-5 w-full flex justify-center">
    <div className="w-full max-w-[1200px]">
      <a href="/"><ArrowLeft/></a>
      <RenderProject project={project}/>
    </div>
  </div>
  );
}