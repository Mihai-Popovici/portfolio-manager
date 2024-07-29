import { listFiles } from "@/lib/utils"
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Files(){
  const data = await listFiles();
  let files = data['Contents']
  files = files?.sort((a, b)=>(b.LastModified?.valueOf() || 0) - (a.LastModified?.valueOf() || 0));
  let totalSize = 0;
  let unit = 'B';
  files?.forEach((file)=>{
    totalSize += file.Size || 0;
  })
  if (totalSize >= 1000){
    totalSize = Math.round(totalSize/1000);
    unit = 'KB';
  }
  if (totalSize >= 1000){
    totalSize = Math.round(totalSize/1000);
    unit = 'MB';
  }
  if (totalSize >= 1000){
    totalSize = Math.round(totalSize/1000);
    unit = 'GB';
  }
  const tableData = files?.map((file)=>(
    {
      id:file.Key || '',
      filename:file.Key || '',
      size:Math.round((file.Size || 0)/10000)/100,
      uploadDate: file.LastModified?.toLocaleDateString("ro-RO") || ""
    }))
  return (
    <div className="col-span-full flex flex-col gap-5">
      <p>Total Files: {files?.length || 0}</p>
      <p>Total Size: {totalSize} {unit} / 25 GB</p>
      <DataTable columns={columns} data={tableData || []} />
      {/* <div className="flex flex-wrap gap-5">
        {files && files.map((file)=>(
          <File key={file.Key} file={file}></File>
        ))}
      </div> */}
    </div>
  )
}