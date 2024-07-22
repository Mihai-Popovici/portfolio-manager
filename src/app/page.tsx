import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { desc } from "drizzle-orm";
import dynamic from "next/dynamic";

const RenderProject = dynamic(() => import('@/components/home/RenderProject'), {
  ssr: false
})

export default async function Home() {
  const projects = await db.select().from(UsersProjects).orderBy(desc(UsersProjects.updatedAt));

  return (
  <div className="p-5 w-full flex justify-center">
    <div className="w-full max-w-[1200px]">
      <RenderProject project={projects[0]}/>
    </div>
  </div>
  );
}