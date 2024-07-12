import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import placeholder from "../../../../public/placeholder.svg";

export default function ProjectCard(){
  return (
    <Card
    className="overflow-hidden"
  >
    <CardHeader>
      <CardTitle className="line-clamp-1">3D Water Simulation</CardTitle>
      <CardDescription className="line-clamp-2">
        Water simulation replicates the behavior of water in virtual environments using algorithms and physics
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-2">
        <Image
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          height="300"
          src="https://picsum.photos/id/55/300/300"
          width="300"
        />
      </div>
    </CardContent>
  </Card>
  );
}