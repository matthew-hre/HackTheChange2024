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
          <div className="flex flex-row gap-4 pb-4">
            {user?.email ? user.email : user?.phone ? user.phone : null}
            <button onClick={signOut} className="block border px-2">
              Sign out
            </button>
            <Link href="/add" className="block border px-2">
              Add Card
            </Link>
          </div>
          <EventsServer />
        </div>
      ) : null}
    </div>
  );
}
