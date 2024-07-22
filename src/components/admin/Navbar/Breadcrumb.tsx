"use client";
import { Breadcrumb as Br, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb(){ 

  const pathname = usePathname();
  const breadcrumb = pathname.slice(1,pathname.split('').length).split('/');

  return (
    <Br className="hidden md:flex">
      <BreadcrumbList>
      {Array(breadcrumb.length-1).fill('').map((b,i)=>(
        <React.Fragment key={'b_'+breadcrumb[i]}>
          <BreadcrumbItem className="p-0">
            <BreadcrumbLink asChild>
              <Link className="capitalize" href={'/'+breadcrumb.slice(0,i+1).join('/') || '/'}>{breadcrumb[i] === '' ? 'Home' : breadcrumb[i]}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="p-0"/>
        </React.Fragment>
      ))}
      {
        breadcrumb[breadcrumb.length-1] && 
        <BreadcrumbItem className="p-0" key={'b_'+breadcrumb[breadcrumb.length-1]}>
          <BreadcrumbPage className="capitalize">{breadcrumb[breadcrumb.length-1]}</BreadcrumbPage>
        </BreadcrumbItem>
      }
      </BreadcrumbList>
    </Br>
  );
}