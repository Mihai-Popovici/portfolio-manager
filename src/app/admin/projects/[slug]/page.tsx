import { EditProject } from "@/components/admin/projects/EditProject";
import { db } from "@/db"
import { UsersProjects } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation";

export default async function Project({ params }: { params: { slug: string } }){
  let contentRef;
  const user = await currentUser();
  if (!user || !params.slug) redirect('/admin/projects');
  const [project] = await db
    .select()
    .from(UsersProjects)
    .limit(1)
    .where(
      eq(UsersProjects.slug, params.slug)
    )
  return (
    <EditProject project={project}/>
  )
}