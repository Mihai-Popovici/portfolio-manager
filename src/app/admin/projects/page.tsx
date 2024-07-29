import NewProjectCard from "@/components/admin/projects/NewProjectCard";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

async function getUserProjects() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  return db.select().from(UsersProjects).orderBy(desc(UsersProjects.updatedAt));
}

export default async function Projects(){
  const projects = await getUserProjects();
  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          <NewProjectCard/>
          {projects.map((project)=>(
            <ProjectCard key={project.id} project={project}/>
          ))}
        </div>
      </div>
    </>
  );
}