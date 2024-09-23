"use client";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function LoginPage() {
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const usernameSchema = z.string().regex(/^09[0-9]{9}$/);
  // Add a new state to store the remaining time
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  // Create a function to format the time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  // Update the timerRunning state when step changes to 2
  useEffect(() => {
    if (step === 2) {
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
    }
  }, [step]);
  useEffect(() => {
    if (timerRunning) {
      const timerId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timerRunning, timeRemaining]);

  const handleUsernameInput = (inputValue: string) => {
    setUsername(inputValue); // Update the username state with the input value

    if (inputValue.length === 0) {
      // Show error if input is empty
      setError("لطفا شماره تلفن خود را وارد کنید");
    } else if (inputValue.length === 11) {
      // Validate the phone number only when the input has 11 characters
      try {
        usernameSchema.parse(inputValue);
        setError(""); // Clear error if valid
      } catch (error) {
        setError("شماره تلفن باید با 09 آغاز شود.");
      }
    } else {
      setError(""); // Clear the error message while the user is typing
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length === 0) {
      // If input is empty, show custom error
      setError("لطفا شماره تلفن خود را وارد کنید");
    } else if (error === "") {
      // Proceed to the next step if no errors
      setStep(2);
    }
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
                  برای <strong className="text-blue-500">ورود</strong> یا{" "}
                  <strong className="text-blue-500">ثبت‌ نام</strong> شماره تلفن
                  همراه خود را وارد کنید
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="۰۹*********"
                  dir="ltr"
                  inputMode="numeric"
                  pattern="09[0-9]{9}"
                  maxLength={11}
                  value={username}
                  onChange={(event) => handleUsernameInput(event.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                  onKeyPress={(event) => {
                    if (!/\d/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
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
                  کد دو مرحله ای را وارد کنید
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="text-center mt-4">
                <p>
                  زمان باقی مانده: <span id="timer">{formatTime(120)}</span>
                </p>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                بررسی
              </button>

              {/* Add a back button to go to step 1 */}
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setStep(1)}
              >
                ویرایش شماره تلفن{" "}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
