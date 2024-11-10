import { createClient } from "@/utils/supabase/server";
import CreateEventClient from "./EventClient";

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const supabase = await createClient();

  const p = await params;

  const { data: causes } = await supabase.from("causes").select("*");

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", p.eventId)
    .single();

  return <CreateEventClient event={event} causes={causes ?? []} />;
}
