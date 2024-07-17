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
  <>
    <RenderProject project={projects[0]}/>
  </>
  );
}