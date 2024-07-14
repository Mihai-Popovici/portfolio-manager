import NewProjectCard from "@/components/admin/projects/NewProjectCard";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

async function getUserProjects() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  return db.query.UsersProjects.findMany({
    where: (projects, { eq }) => eq(projects.user_id, user.id),
  });
}

export default async function Projects(){
  const projects = await getUserProjects();
  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <NewProjectCard/>
          {projects.map((project)=>(
            <ProjectCard key={project.id} project={project}/>
          ))}
        </div>
      </div>
      <div className="h-full hidden lg:block">
        <Card
          className="overflow-hidden h-full"
        >
          <CardHeader>
            <CardTitle className="line-clamp-1">Project Settings</CardTitle>
            <CardDescription className="line-clamp-2">
              Select a project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}