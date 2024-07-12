import { PanelLeft } from "lucide-react";
import TopNav from "./TopNav";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function NavToogle(){
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle className="hidden">Admin Navigation</SheetTitle>
        <SheetDescription className="hidden">Select what page you want to visit</SheetDescription>
        <nav className="grid gap-6 text-lg font-medium">
          <TopNav showLabels closeSheet/>
        </nav>
      </SheetContent>
    </Sheet>
  );
}