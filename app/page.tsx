import { createClient } from "@/utils/supabase/server";
import {
  loginWithOTPMobile as loginWithOTPMobileAction,
  loginWithOTPEmail as loginWithOTPEmailAction,
  signOut,
  verifyOtpMobile,
  verifyOtpEmail,
} from "./actions";
import { LoginPage } from "./PageClient";
import EventsServer from "./(events)/EventsServer";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="font-[family-name:var(--font-geist-sans)] space-y-4 min-h-screen">
      {user ? null : (
        <LoginPage
          loginWithOTPEmailAction={loginWithOTPEmailAction}
          loginWithOTPMobileAction={loginWithOTPMobileAction}
          verifyOtpMobileAction={verifyOtpMobile}
          verifyOtpEmailAction={verifyOtpEmail}
        />
      )}
      {user ? (
        <div className="w-full min-h-screen p-12">
          <div className="flex flex-row gap-4 pb-4 items-center border-b mb-8">
            <span className="text-gray-700">
              Logged in as{" "}
              <strong>
                {user?.email
                  ? user.email
                  : user?.phone
                  ? user.phone
                  : "Unknown"}
              </strong>
            </span>
            <button
              onClick={signOut}
              className="block border px-4 py-1 mr-auto rounded-full"
            >
              Sign out
            </button>
            <Link
              href="/add"
              className="border px-4 py-1 rounded-full flex flex-row items-center gap-2 bg-red-500 font-bold text-white"
            >
              <Plus size={24} />
              Add new event
            </Link>
          </div>
          <EventsServer />
        </div>
      ) : null}
    </div>
  );
}
