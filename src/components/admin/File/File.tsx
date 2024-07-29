import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { _Object } from "@aws-sdk/client-s3"
import Image from "next/image"

type Props = {
  file: _Object
}

export default function File({file}:Props){
  const isVideo = ['mp4'].includes(file.Key?.split('.')[1] || '')
  return (
    <>
      <Card
        className="overflow-hidden"
      >
        <CardHeader>
          <CardTitle className="w-full line-clamp-2 text-xs">{file.Key}</CardTitle>
          <CardDescription className="line-clamp-2">
            Size: {Math.round((file.Size || 0)/1000) >= 1000 ? `${Math.round((file.Size || 0)/1000000)} MB` : `${Math.round((file.Size || 0)/1000)} KB`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {
              isVideo
              ? 
              <video muted autoPlay loop disablePictureInPicture>
                <source className="w-full h-full max-w-[450px] max-h-[250px] object-cover" src={'https://portfolio-manager.s3.tebi.io/'+file.Key || ''} width={450} height={250}/>
              </video> 
              : 
              <Image className="w-full h-full max-w-[450px] max-h-[250px] object-cover" src={'https://portfolio-manager.s3.tebi.io/'+file.Key || ''} alt={file.Key || ''} width={450} height={250}/>
            }
          </div>
        </CardContent>
      </Card>
    </>
  )
}