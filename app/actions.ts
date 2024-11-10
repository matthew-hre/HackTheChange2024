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
