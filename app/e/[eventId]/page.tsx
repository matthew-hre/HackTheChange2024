import CreateEventClient from "@/app/@modal/(.)e/[eventId]/EventClient";
import { createClient } from "@/utils/supabase/server";

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const p = await params;

  const supabase = await createClient();
  const { data: causes } = await supabase.from("causes").select("*");

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", p.eventId)
    .single();

  return <CreateEventClient causes={causes ?? []} event={event} />;
}
