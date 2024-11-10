import { createClient } from "@/utils/supabase/server";
import CreateEventClient from "./CreateEventClient";

export default async function CreateEventServer() {
  const supabase = await createClient();
  const { data: causes } = await supabase.from("causes").select("*");

  return <CreateEventClient causes={causes ?? []} />;
}
