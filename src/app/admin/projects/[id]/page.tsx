import { EditProject } from "@/components/admin/projects/EditProject";
import { db } from "@/db"
import { UsersProjects } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation";

export default async function Project({ params }: { params: { id: string } }){
  let contentRef;
  const user = await currentUser();
  const id = Number(params.id);
  if (!user || !id) redirect('/admin/projects');
  const [project] = await db
    .select()
    .from(UsersProjects)
    .limit(1)
    .where(
      eq(UsersProjects.id, id)
    )
  return (
    <EditProject project={project}/>
  )
}