"use client";
import { ForwardRefEditor } from "@/components/editor/ForwardRefEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsersProjects } from "@/db/schema";
import { deleteProject, updateProject } from "@/lib/actions/project.actions";
import { InferSelectModel } from "drizzle-orm";
import { FormEvent, useRef, useState } from "react";
import placeholder from "../../../../public/placeholder.svg";
import Image from "next/image";
import { readImageFile } from "@/lib/utils";
import { Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type Props = {
  project: InferSelectModel<typeof UsersProjects>
}

export function EditProject({project}:Props){
  const [title, setTitle] = useState(project.title || '');
  const [thumbnail, setThumbnail] = useState<null | FileList>(null);
  const thumbnailRef = useRef<null | HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [description, setDescription] = useState(project.description || '');
  const [content, setContent] = useState(project.content || '');

  function handleThumbnailChange(files: FileList | null){
    setThumbnail(files)
    if (!files || files.length < 1){
      setImagePreview(null);
      return;
    }
    readImageFile(files[0], (data)=>setImagePreview(data));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', ''+project.id);
    formData.append('title', title);
    formData.append('description', description);
    if (thumbnail && thumbnail[0]){
      console.log(thumbnail[0]);
      formData.append('thumbnail', thumbnail[0])
    }
    formData.append('content', content);
    updateProject(formData);
  }

  function handleDelete(){
    deleteProject(project.id)
  }

  function clearThumbail() {
    setThumbnail(null);
    setImagePreview(null);
    if (thumbnailRef.current){
      thumbnailRef.current.value = ""
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 col-span-3">
      <Label className="w-full flex justify-between items-end" htmlFor="title">Title
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  project from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        </Label>
      <Input id="title" name="title" defaultValue={title} onChange={(e)=>setTitle(e.target.value)}/>
      <Label htmlFor="description">Description</Label>
      <Input id="description" name="description" defaultValue={description} onChange={(e)=>setDescription(e.target.value)}/>
      <Label className="flex items-center gap-2" htmlFor="thumbnail">
        Thumbnail
        {imagePreview && <Button onClick={(e)=>{e.preventDefault();clearThumbail()}} className="w-8 h-8 p-2" variant="outline" size="icon">
          <Trash/>
        </Button>}
      </Label>
      <Image src={imagePreview || project.thumbnailUrl || placeholder} width={250} height={250} alt="Thumbnail"/>
      <Input ref={thumbnailRef} type="file" accept="image/*" id="thumbnail" name="thumbnail" onChange={(e)=>handleThumbnailChange(e.target.files)}/>
      <Label htmlFor="content">Content</Label>
      <ForwardRefEditor markdown={content} diffMarkdown={project.content || ''} onChange={setContent}/>
    </form>
  );
}