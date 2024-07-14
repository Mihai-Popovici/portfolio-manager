export default function Project({ params }: { params: { id: string } }){
  return(
    <h1>{params.id}</h1>
  )
}