import Form from "@/components/admin/Settings/Form";
import { db } from "@/db"
import {Settings as S} from "@/db/schema"

export default async function Settings(){
  const settings = await db.select().from(S);
  console.log(settings);
  return (
    <Form/>
  )
}