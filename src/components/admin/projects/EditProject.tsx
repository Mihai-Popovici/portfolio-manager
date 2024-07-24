"use client";
import { ForwardRefEditor } from "@/components/editor/ForwardRefEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsersProjects } from "@/db/schema";
import { updateProject } from "@/lib/actions/project.actions";
import { InferSelectModel } from "drizzle-orm";
import { FormEvent, useState } from "react";

type Props = {
  project: InferSelectModel<typeof UsersProjects>
}

export function EditProject({project}:Props){
  const [title, setTitle] = useState(project.title || '');
  const [description, setDescription] = useState(project.description || '');
  const [content, setContent] = useState(project.content || '');

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', ''+project.id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    updateProject(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 col-span-3">
      <Button type="submit">Save</Button>
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" defaultValue={title} onChange={(e)=>setTitle(e.target.value)}/>
      <Label htmlFor="description">Description</Label>
      <Input id="description" name="description" defaultValue={description} onChange={(e)=>setDescription(e.target.value)}/>
      <Label htmlFor="content">Content</Label>
      <ForwardRefEditor markdown={content} diffMarkdown={project.content || ''} onChange={setContent}/>
    </form>
  );
}