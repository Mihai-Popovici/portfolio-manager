"use client";
import SelectOne from "@/components/admin/File/SelectOne";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettings } from "@/lib/actions/settings.actions";
import { useEffect, useState } from "react";

type Props = {
  settings?: {
    id: number;
    x: string | null;
    title: string;
    subTitle: string;
    videoUrl: string;
    hasLinkedIn: boolean;
    linkedIn: string | null;
    hasInstagram: boolean;
    instagram: string | null;
    hasEmail: boolean;
    email: string | null;
    hasX: boolean;
  }
}

export default function Form(){
  const [settings, setSettings] = useState<null|Props['settings']>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [social, setSocial] = useState({
    linkedin:settings?.hasLinkedIn,
    instagram:settings?.hasInstagram,
    email:settings?.hasEmail,
    x:settings?.hasX,
  })

  useEffect(()=>{
    fetch('/api/settings').then((res)=>{
      res.json().then((data:Props['settings'])=>{
        setSettings(data)
      })
    })
  },[])

  useEffect(()=>{
    setVideoUrl(settings?.videoUrl || '');
    setSocial({
      linkedin:settings?.hasLinkedIn,
      instagram:settings?.hasInstagram,
      email:settings?.hasEmail,
      x:settings?.hasX,
    })
  },[settings])

  return (
    <form className="flex flex-col gap-5" action={updateSettings}>
      <input className="hidden" name="id" defaultValue={settings?.id}/>
      <Label htmlFor="title">Title</Label>
      <Input name="title" defaultValue={settings?.title}/>
      <Label htmlFor="subtitle">Subtitle</Label>
      <Input name="subTitle" defaultValue={settings?.subTitle}/>
      <Label htmlFor="videoUrl">Video</Label>
      <Input className="hidden" name="videoUrl" defaultValue={videoUrl}/>
      <video key={videoUrl} className="w-[450px]" controls autoPlay muted loop disablePictureInPicture>
        <source src={videoUrl}/>
      </video>
      <SelectOne onChange={(filename)=>{
        if (filename !== '')
        {
          setVideoUrl(`https://portfolio-manager.s3.tebi.io/${filename}`);
        }else{
          setVideoUrl(settings?.videoUrl || '');
        }
      }}/>
      <Label htmlFor="hasLinkedIn">LinkedIn</Label>
      <div className="flex gap-5">
        <Input type="checkbox" className="w-8" name="hasLinkedIn" checked={social.linkedin} onChange={(v)=>setSocial({...social, linkedin:v.target.checked})} />
        <Input disabled={!social.linkedin} name="linkedIn" defaultValue={settings?.linkedIn || ''}></Input> 
      </div>
      <Label htmlFor="hasInstagram">Instagram</Label>
      <div className="flex gap-5">
        <Input type="checkbox" className="w-8" name="hasInstagram" checked={social.instagram} onChange={(v)=>setSocial({...social, instagram:v.target.checked})} />
        <Input disabled={!social.instagram} name="instagram" defaultValue={settings?.instagram || ''}></Input> 
      </div>
      <Label htmlFor="hasEmail">Email</Label>
      <div className="flex gap-5">
        <Input type="checkbox" className="w-8" name="hasEmail" checked={social.email} onChange={(v)=>setSocial({...social, email:v.target.checked})} />
        <Input disabled={!social.email} name="email" defaultValue={settings?.email || ''}></Input> 
      </div>
      <Label htmlFor="hasX">X</Label>
      <div className="flex gap-5">
        <Input type="checkbox" className="w-8" name="hasX" checked={social.x} onChange={(v)=>setSocial({...social, x:v.target.checked})} />
        <Input disabled={!social.x} name="x" defaultValue={settings?.x || ''}></Input> 
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}