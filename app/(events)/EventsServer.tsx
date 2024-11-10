import EventsClient from "./EventsClient";
import { createClient } from "@/utils/supabase/server";

export default async function EventsServer() {
  const supabase = await createClient();

  const { data: causes } = await supabase.from("causes").select("*");

  const { data: events } = await supabase.from("events").select("*");

  const { data: userCauses } = await supabase
    .from("users")
    .select("causes")
    .eq("id", (await supabase.auth.getUser())?.data?.user?.id)
    .single();

  return (
    <EventsClient
      causes={causes ?? []}
      events={events ?? []}
      userCauses={userCauses?.causes ?? []}
    />
  );
}
