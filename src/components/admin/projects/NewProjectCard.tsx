import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newProject } from "@/lib/actions/project.actions";
import { Plus } from "lucide-react";


export default function NewProjectCard() {
  return (
    <Dialog>
      <DialogTrigger className="w-full h-full">
        <Card
          className="overflow-hidden h-full">
          <CardContent className="h-full py-6">
            <div className="flex flex-col w-full h-full items-center justify-center rounded-md border border-dashed">
              <Plus className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">New Project</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <form action={newProject} className="w-full h-full">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Choose a title and description for your project. You can change it later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue="New project"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                defaultValue="My awesome new project"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}