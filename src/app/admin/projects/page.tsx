import NewProjectCard from "@/components/admin/projects/NewProjectCard";
import ProjectCard from "@/components/admin/projects/ProjectCard";

export default function Projects(){
  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <NewProjectCard/>
          <ProjectCard/>
        </div>
      </div>
      <div>
        {/* Card For Project Settings */}
      </div>
    </>
  );
}