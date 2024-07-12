"use client";
import { Breadcrumb as Br, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb(){ 

  const pathname = usePathname();
  const breadcrumb = pathname.slice(1,pathname.split('').length).split('/');
  console.log(breadcrumb);
  return (
    <Br className="hidden md:flex">
      <BreadcrumbList>
      {Array(breadcrumb.length-1).fill('').map((b,i)=>(
        <React.Fragment key={'b_'+breadcrumb[i]}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="capitalize" href={'/'+breadcrumb.slice(0,i+1).join('/') || '/'}>{breadcrumb[i] === '' ? 'Home' : breadcrumb[i]}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
        </React.Fragment>
      ))}
      {
        breadcrumb[breadcrumb.length-1] && 
        <BreadcrumbItem key={'b_'+breadcrumb[breadcrumb.length-1]}>
          <BreadcrumbPage className="capitalize">{breadcrumb[breadcrumb.length-1]}</BreadcrumbPage>
        </BreadcrumbItem>
      }
      </BreadcrumbList>
    </Br>
  );
}