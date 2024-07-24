
import { db } from "@/db"
import { UsersProjects } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const RenderProject = dynamic(() => import('@/components/home/RenderProject'), {
  ssr: false
})

export default async function Project({ params }: { params: { slug: string } }){
  const [project] = await db.select().from(UsersProjects).where(eq(UsersProjects.slug, params.slug)).limit(1);
  if (!project){
    redirect('/');
  }
  return (
  <div className="p-5 w-full">
      <Button>
        <a href="/" className="flex gap-2 items-center">
          <ArrowLeft/>Go Back
        </a>
      </Button>
      <RenderProject project={project}/>
  </div>
  );
}