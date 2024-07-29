"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type File = {
  id: string
  filename: string
  size: number,
  uploadDate: string
}

export const columns: ColumnDef<File>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    size:150,
    cell: ({row}) => {
      const filename = row.getValue('filename') as string;
      const isVideo = ['mp4'].includes(filename.split('.')[1] || '')
      return (
        isVideo
        ? 
        <video muted autoPlay loop disablePictureInPicture className="w-full h-full max-w-[150px] max-h-[150px] object-cover">
          <source src={'https://portfolio-manager.s3.tebi.io/'+filename || ''} width={150} height={150}/>
        </video> 
        : 
        <Image className="w-full h-full max-w-[150px] max-h-[150px] object-cover" src={'https://portfolio-manager.s3.tebi.io/'+filename || ''} alt={filename || ''} width={150} height={150}/>
      )
    }
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "size",
    header: "Size (mB)",
  },
  {
    accessorKey: "uploadDate",
    header: "Upload Date",
  }
]
