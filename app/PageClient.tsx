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

  const emailFieldRef = useRef<HTMLInputElement>(null);
  const phoneFieldRef = useRef<HTMLInputElement>(null);

  interface LoginWithOTPEmailEvent extends React.FormEvent<HTMLFormElement> {
    target: EventTarget & HTMLFormElement;
  }

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
    <>
      <form
        className="flex flex-col space-y-4 w-max"
        onSubmit={loginWithOTPEmail}
      >
        <label htmlFor="email">Email:</label>
        <div className="flex flex-row gap-4">
          <input
            id="email"
            name="email"
            type="email"
            className="border"
            ref={emailFieldRef}
            required
            disabled={phone.length > 0}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="border flex-1">
            Sign up/in with OTP
          </button>
        </div>
      </form>

      <form
        className="flex flex-col space-y-4 w-max"
        onSubmit={loginWithOTPMobile}
      >
        <label htmlFor="phone">Phone:</label>
        <div className="flex flex-row gap-4">
          <input
            id="phone"
            name="phone"
            type="tel"
            className="border"
            disabled={email.length > 0}
            ref={phoneFieldRef}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit" className="border flex-1">
            Sign up/in with OTP
          </button>
        </div>
      </form>

      <form className="flex flex-col space-y-4 w-max" onSubmit={verifyOtp}>
        <label htmlFor="token">Token:</label>
        <div className="flex flex-row gap-4">
          <input
            id="token"
            name="token"
            type="number"
            className="border"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button type="submit" className="border flex-1">
            Verify OTP
          </button>
        </div>
      </form>
    </>
  );
}
