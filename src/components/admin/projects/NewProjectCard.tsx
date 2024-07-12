import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function NewProjectCard(){
  return (
    <Card
    className="overflow-hidden"
  >
    <CardContent className="h-full py-6">
      <button className="flex flex-col w-full h-full items-center justify-center rounded-md border border-dashed">
        <Plus className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs">New Project</span>
      </button>
    </CardContent>
  </Card>
  );
}