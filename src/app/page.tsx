import { db } from "@/db";
import { UsersProjects } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const projects = await db.select().from(UsersProjects).orderBy(desc(UsersProjects.updatedAt));

  return (
    (projects.map((project)=>(
      <a key={project.id} href={'/'+project.slug}>{project.title}</a>
    )))
  );
}