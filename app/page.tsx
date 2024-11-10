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

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-12 space-y-4 min-h-screen">
      {user ? null : (
        <LoginPage
          loginWithOTPEmailAction={loginWithOTPEmailAction}
          loginWithOTPMobileAction={loginWithOTPMobileAction}
          verifyOtpMobileAction={verifyOtpMobile}
          verifyOtpEmailAction={verifyOtpEmail}
        />
      )}
      {user ? (
        <div className="w-full min-h-screen">
          <div className="flex flex-row gap-4 pb-4">
            {user?.email ? user.email : user?.phone ? user.phone : null}
            <button onClick={signOut} className="block border px-2">
              Sign out
            </button>
          </div>
          <EventsServer />
        </div>
      ) : null}
    </div>
  );
}
