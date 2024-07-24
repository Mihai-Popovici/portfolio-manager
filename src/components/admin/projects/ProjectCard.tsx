"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import placeholder from "../../../../public/placeholder.svg";
import {UsersProjects} from "@/db/schema";
import { redirect } from "next/navigation";

type Props = {
  project: InferSelectModel<typeof UsersProjects>
}

export default function ProjectCard({project}:Props){
  return (
    <form action={()=>redirect('/admin/projects/'+project.slug)}>
      <button type="submit" className="text-start">
        <Card
        className="overflow-hidden cursor-pointer"
        >
          <CardHeader>
            <CardTitle className="line-clamp-1">{project.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="300"
                src={project.thumbnailUrl || placeholder}
                width="300"
              />
            </div>
          </CardContent>
        </Card>
      </button>
    </form>
  );
}