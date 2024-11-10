"use client";
import { useState, useRef } from "react";

interface LoginPageProps {
  loginWithOTPEmailAction: (formData: FormData) => Promise<void>;
  loginWithOTPMobileAction: (formData: FormData) => Promise<void>;
  verifyOtpMobileAction: (phone: string, token: string) => Promise<void>;
  verifyOtpEmailAction: (email: string, token: string) => Promise<void>;
}

export function LoginPage({
  loginWithOTPEmailAction,
  loginWithOTPMobileAction,
  verifyOtpMobileAction,
  verifyOtpEmailAction,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  const [waitingForOTP, setWaitingForOTP] = useState(false);

  const emailFieldRef = useRef<HTMLInputElement>(null);
  const phoneFieldRef = useRef<HTMLInputElement>(null);

  interface LoginWithOTPEmailEvent extends React.FormEvent<HTMLFormElement> {
    target: EventTarget & HTMLFormElement;
  }

  const login = async (event: LoginWithOTPEmailEvent) => {
    event.preventDefault();

    if (email.length > 0) {
      setWaitingForOTP(true);
      await loginWithOTPEmail(event);
    } else if (phone.length > 0) {
      setWaitingForOTP(true);
      await loginWithOTPMobile(event);
    } else {
      console.error("No email or phone number provided");
    }
  };

  const loginWithOTPEmail = async (event: LoginWithOTPEmailEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    await loginWithOTPEmailAction(formData);

    // Keep email field populated after submission
    setEmail(formData.get("email") as string);
  };

  interface LoginWithOTPMobileEvent extends React.FormEvent<HTMLFormElement> {
    target: EventTarget & HTMLFormElement;
  }

  const loginWithOTPMobile = async (event: LoginWithOTPMobileEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    await loginWithOTPMobileAction(formData);

    // Keep phone field populated after submission
    setPhone(formData.get("phone") as string);
  };

  interface VerifyOtpEvent extends React.FormEvent<HTMLFormElement> {
    target: EventTarget & HTMLFormElement;
  }

  const verifyOtp = async (event: VerifyOtpEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = emailFieldRef.current?.value as string;
    const phone = phoneFieldRef.current?.value as string;
    const token = formData.get("token") as string;

    if (phone.length > 0) {
      await verifyOtpMobileAction(phone, token);
      return;
    } else if (email.length > 0) {
      await verifyOtpEmailAction(email, token);
    } else {
      console.error("No email or phone number provided");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
      <div className="border p-6 space-y-2 max-w-sm shadow-md min-w-[400px] relative">
        <div className="absolute -top-2 left-[190px] w-6 h-6 rounded-full shadow-md transform z-10 group-hover:z-10 transition-transform bg-red-500">
          <div
            className="absolute top-1 left-1 w-4 h-4 rounded-full shadow-md transform z-10 group-hover:z-10 transition-transform"
            style={{
              backgroundColor: `#ccc`,
              mixBlendMode: "multiply",
            }}
          ></div>
        </div>
        <h1 className="text-4xl font-bold bg-red-500 text-white mb-4 text-center">
          BLOCparty
        </h1>

        <form className="space-y-2" onSubmit={login}>
          <label
            htmlFor="email"
            className="block text-sm font-medium w-full text-center"
          >
            Email
          </label>
          <div className="flex flex-col items-center gap-4">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@test.com"
              className="border flex-1 w-full p-2"
              ref={emailFieldRef}
              required
              disabled={phone.length > 0}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label
            htmlFor="phone"
            className="block text-sm font-medium w-full text-center pt-4"
          >
            OR Phone
          </label>
          <div className="flex flex-col items-center gap-4">
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="123-456-7890"
              className="border w-full flex-1 p-2"
              disabled={email.length > 0}
              ref={phoneFieldRef}
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              type="submit"
              className="border px-2 w-full disabled:opacity-50"
            >
              Sign up/in
            </button>
          </div>
        </form>

        {/* OTP Verification Form */}
        <form
          className="space-y-2"
          onSubmit={verifyOtp}
          style={{ display: waitingForOTP ? "block" : "none" }}
        >
          <label
            htmlFor="token"
            className="block text-sm font-medium w-full text-center pt-4"
          >
            Token
          </label>
          <div className="flex items-center gap-4">
            <input
              id="token"
              name="token"
              type="number"
              className="border flex-1 p-2"
              style={{ appearance: "textfield" }}
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <button type="submit" className="border p-2">
              Verify
            </button>
          </div>
        </form>
        <p className="pt-8">
          <strong>BLOC</strong>: a combination of countries, parties, or groups
          sharing a common purpose.
        </p>
      </div>
    </div>
  );
}
