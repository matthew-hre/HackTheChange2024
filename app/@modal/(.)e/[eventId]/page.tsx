import { createClient } from "@/utils/supabase/server";
import CreateEventClient from "./EventClient";

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const supabase = await createClient();

  const { eventId } = await params;

  const { data: causes } = await supabase.from("causes").select("*");

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  return <CreateEventClient event={event} causes={causes ?? []} />;
}
