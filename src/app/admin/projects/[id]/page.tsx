import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/db"
import { UsersProjects } from "@/db/schema"
import { updateProject } from "@/lib/actions/project.actions";
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation";

export default async function Project({ params }: { params: { id: string } }){
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
  return(
    <form action={updateProject} className="flex flex-col gap-4 col-span-3">
      <input hidden name="id" value={project.id}></input>
      <Button type="submit">Save</Button>
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" defaultValue={project.title}/>
      <Label htmlFor="description">Description</Label>
      <Input id="description" name="description" defaultValue={project.description}/>
      <Label htmlFor="content">Content</Label>
      <Input id="content" name="content" defaultValue={project.content || ''}/>
    </form>
  )
}