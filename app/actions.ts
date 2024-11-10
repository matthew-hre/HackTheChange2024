"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function loginWithOTPEmail(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.signInWithOtp(data);

  if (error) {
    redirect("/error");
  }
}

export async function loginWithOTPMobile(formData: FormData) {
  const supabase = await createClient();

  const data = {
    phone: formData.get("phone") as string,
  };

  const { error } = await supabase.auth.signInWithOtp(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }
}

export async function verifyOtpEmail(email: string, token: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

export async function verifyOtpMobile(phone: string, token: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

export const signOut = async () => {
  "use server";

  console.log("logging out");

  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/", "layout");
};

export const saveUserCausesPreferences = async (causeIds: number[]) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("users")
    .update({ causes: causeIds })
    .eq("id", (await supabase.auth.getUser())?.data?.user?.id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/", "layout");
};

export const createEvent = async (formData: FormData) => {
  "use server";

  const event = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    date: new Date(`${formData.get("date")}T12:00:00Z`).toISOString(), // Adding time of noon to the date with timezone
    location: formData.get("location") as string,
    source: formData.get("source") as string,
    causes: [parseInt(formData.get("causes") as string)],
  };

  const supabase = await createClient();

  const userId = (await supabase.auth.getUser())?.data?.user?.id;

  const updatedEvent = {
    ...event,
    user_id: userId,
  };

  const { data, error } = await supabase
    .from("events")
    .insert([updatedEvent])
    .select();

  if (error) {
    console.error(error);
    return;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/send-sms-notifications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: data?.[0].id,
        eventTitle: event.name,
        eventCause: event.causes[0],
        eventDescription: event.description,
        eventLocation: event.location,
        eventDate: event.date,
      }),
    }
  );

  if (!response.ok) {
    console.error("Failed to send notifications");
  }

  const emailResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/send-email-notifications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: data?.[0].id,
        eventTitle: event.name,
        eventCause: event.causes[0],
        eventDescription: event.description,
        eventLocation: event.location,
        eventDate: event.date,
      }),
    }
  );

  if (!emailResponse.ok) {
    console.error("Failed to send notifications");
  }
};
