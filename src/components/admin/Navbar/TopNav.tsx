"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { icons } from 'lucide-react';
import { usePathname } from "next/navigation";
import { cn, findBestHref } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

type Icon = keyof typeof icons;

type IconProps = {
  name:Icon,
  color?:string,
  size?:string
}

function Icon({name, color, size}:IconProps) {
  const LucideIcon = icons[name];
  return <LucideIcon color={color} size={size} />;
};

type Props = {
  showLabels?:boolean,
  closeSheet?:boolean
}

export default function TopNav({showLabels=false,closeSheet=false}:Props){
  const pathname = usePathname();
  const NavRoutes:{
    id:string,
    href:string,
    label:string,
    icon:Icon
  }[] = [
    {
      id:'dashboard',
      href:'/admin',
      label:'Dashboard',
      icon:'LayoutDashboard'
    },
    {
      id:'projects',
      href:'/admin/projects',
      label:'Projects',
      icon:'NotebookPen'
    },
    {
      id:'tags',
      href:'/admin/tags',
      label:'Tags',
      icon:'Tags'
    }
  ]
  const hrefs = NavRoutes.map((route)=>route.href);

  if (closeSheet){
    return (
      <>
      {NavRoutes.map(({id, href, label, icon})=>(
        <Link
          key={id}
          href={href}>
          <SheetClose  className={
            cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                showLabels && "w-[80%] px-2 gap-4 justify-start",
                findBestHref(hrefs, pathname) === href && 'text-background bg-foreground hover:text-background'
              )}>
            <Icon name={icon}></Icon>
            <span className={cn("sr-only")}>{label}</span>
            {showLabels && <span>{label}</span>}
            </SheetClose>
          </Link>
      ))}
      </>
    );
  }

  return (
    <>
    {NavRoutes.map(({id, href, label, icon})=>(
        <Tooltip key={id}>
          <TooltipTrigger asChild>
              <Link
                href={href}
                  className={
                    cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                      showLabels && "w-[80%] px-2 gap-4 justify-start",
                      findBestHref(hrefs, pathname) === href && 'text-background bg-foreground hover:text-background'
                    )}

                >
                  <Icon name={icon}></Icon>
                  <span className={cn("sr-only")}>{label}</span>
                  {showLabels && <span>{label}</span>}
                </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
    ))}
    </>
  );
}