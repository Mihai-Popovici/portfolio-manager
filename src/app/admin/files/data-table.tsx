"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import SelectOne from "@/components/admin/File/SelectOne"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [rowSelection, setRowSelection] = React.useState({})
  const [files, setFiles] = React.useState<FileList|[]>([]);
  const [loading, setLoading] = React.useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  })

  function handleUpload(){
    setLoading(true);
    const form = new FormData();
    for (let i = 0; i < files.length; i++){
      form.append(i.toString(), files[i]);
    }
    fetch('/api/files/uploadBulk',{
      method: 'POST',
      body: form
    }).then((res)=>{
      res.text().then(()=>{
        setTimeout(()=>{
          window.location.reload();
        },500);
      })
    }).catch(()=>setLoading(false))
  }

  function handleDelete(){
    setLoading(true);
    const ids = table.getSelectedRowModel().rows.map((row)=>{
      let original = row.original as {id:string};
      return original.id
    })
    table.toggleAllRowsSelected(false);
    fetch('/api/files/deleteBulk',{
      method: 'POST',
      body: JSON.stringify(ids)
    }).then(()=>{
      window.location.href = "/admin/files"
    }).catch(()=>setLoading(false))
  }

  return (
    <>
    <div className="w-full flex justify-end gap-5">
      <Input type="file" multiple onChange={(e)=>setFiles(e.target.files || [])}/>
      <Button disabled={loading} variant="outline" onClick={handleUpload}>
        Upload ({files.length})
      </Button>
      <Button disabled={loading} variant="destructive" onClick={handleDelete}>
        Delete ({table.getSelectedRowModel().rows.length})
      </Button>
    </div>
    <div className="rounded-md border">
      <Table className="m-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </>
  )
}
