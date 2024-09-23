"use client";
// app/(auth)/login/page.tsx
import { useState } from "react";

export default function LoginPage() {
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP

  // Function to handle login submit (e.g., send OTP)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending OTP (in real case, integrate with SMS API like Twilio)
    setStep(2); // Move to OTP step
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP verification (real case would verify against backend)
    alert("OTP Verified! Logging in...");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              ورود / ثبت نام
            </h2>
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
              <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 text-right"
                >
                  برای <strong className="text-blue-500">ورود</strong> یا <strong className="text-blue-500">ثبت‌ نام</strong> شماره تلفن همراه خود را وارد کنید
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="۰۹*********"
                  required
                  dir="ltr"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-[#56b6f2] hover:bg-[#FF69B4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ادامه
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              ورود کد دو مرحله ای
            </h2>
            <form className="space-y-6" onSubmit={handleOTPSubmit}>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  کد دو مرحله ای را وارد کیند
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                بررسی
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
