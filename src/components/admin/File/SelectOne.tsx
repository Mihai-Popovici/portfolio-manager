"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  onChange: (filename:string)=>void
}

export default function SelectOne({onChange}:Props){
  const filesInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<FileList | []>([]);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState('');
  const [open, setOpen] = useState(false);

  function getFiles(){
    fetch('/api/files/list').then((res)=>{
      res.json().then((data)=>{
        const filesData = data['Contents']?.map((file:any)=>(
          {
            key:file.Key,
            url:`https://portfolio-manager.s3.tebi.io/${file.Key}`,
            LastModified:(new Date(file.LastModified)).valueOf()
          }
        )).sort((a:any,b:any)=>b.LastModified - a.LastModified)
        setFiles(filesData)
      })
    })
  }

  function uploadFiles(){
    setUploading(true);
    const form = new FormData();
    for (let i = 0; i < filesToUpload.length; i++){
      form.append(i.toString(), filesToUpload[i]);
    }
    setFilesToUpload([]);
    if (filesInputRef.current){
      filesInputRef.current.value = ""
    }
    fetch('/api/files/uploadBulk',{
      method: 'POST',
      body: form
    }).then((res)=>{
      res.text().then(()=>{
        setTimeout(()=>{
          getFiles();
          setUploading(false);
        },500);
      })
    })
  }

  useEffect(()=>{
    getFiles();
  },[open])

  useEffect(()=>{
    onChange(file);
    setOpen(false);
  // eslint-disable-next-line
  },[file])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="max-w-full overflow-hidden justify-start" variant="outline">{file === '' ? 'Choose file' : file}</Button>
      </DialogTrigger>
      <DialogContent className="h-svh flex flex-col gap-5">
        <DialogHeader className="h-fit">
          <DialogTitle>Choose file</DialogTitle>
          <DialogDescription>
            Select one file from your gallery.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex gap-5">
          <Input ref={filesInputRef} type="file" multiple onChange={(e)=>setFilesToUpload(e.target.files || [])}/>
          <Button disabled={uploading} onClick={uploadFiles}>Upload ({filesToUpload.length})</Button>
          <Button disabled={!file} onClick={()=>setFile('')}>Clear</Button>
        </div>
        <div className="flex flex-wrap gap-2 overflow-auto no-scrollbar">
          {
            files?.map((fileItem:any)=>(
              <div key={fileItem.key} onClick={()=>setFile(fileItem.key)} className={cn(fileItem.key === file && 'border border-red-600')}>
                {
                  fileItem.key.split('.')[1] === 'mp4' ?
                  <video className="w-32 object-cover" width={128} height={128} muted autoPlay loop disablePictureInPicture>
                    <source src={fileItem.url} />
                  </video>
                  :
                  <img className="w-32 object-cover" src={fileItem.url} alt="Image" width={128} height={128}/>
                }
              </div>
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}