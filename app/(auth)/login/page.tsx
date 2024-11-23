"use client";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function LoginPage() {
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const usernameSchema = z.string().regex(/^09[0-9]{9}$/);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (c) => englishDigits[persianDigits.indexOf(c)]);
  };

  const englishToPersianDigits = (str) => {
    const englishDigits = "0123456789";
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return str.replace(/[0-9]/g, (c) => persianDigits[englishDigits.indexOf(c)]);
  };

  const formatPersianDate = (dateStr) => {
    dateStr = persianToEnglishDigits(dateStr);
    const [yearMonthDay, weekday] = dateStr.split(", ");
    const [year, month, day] = yearMonthDay.split(" ");
    return `${weekday} ${englishToPersianDigits(day)} ${month} ${englishToPersianDigits(year)}`;
  };

  const date = new Date();
  const formatter = new Intl.DateTimeFormat("fa-IR", { dateStyle: "full" });
  const formattedDate = formatPersianDate(formatter.format(date));

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${englishToPersianDigits(minutes.toString())}:${englishToPersianDigits(seconds.toString().padStart(2, "0"))}`;
  };

  useEffect(() => {
    if (step === 2) {
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
    }
  }, [step]);

  useEffect(() => {
    if (timerRunning) {
      if (timeRemaining > 0) {
        const timerId = setInterval(() => {
          setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);
        return () => clearInterval(timerId);
      } else {
        setTimerRunning(false); // Stop the timer when it reaches 0
      }
    }
  }, [timerRunning, timeRemaining]);

  const handleUsernameInput = (inputValue) => {
    const englishValue = persianToEnglishDigits(inputValue);
    setUsername(englishToPersianDigits(englishValue));

    if (englishValue.length === 0) {
      setError("لطفا شماره تلفن خود را وارد کنید");
    } else if (englishValue.length === 11) {
      try {
        usernameSchema.parse(englishValue);
        setError("");
      } catch (error) {
        setError("شماره تلفن باید با 09 آغاز شود.");
      }
    } else {
      setError("");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0) {
      setError("لطفا شماره تلفن خود را وارد کنید");
    } else if (error === "") {
      setStep(2);
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    alert("OTP Verified! Logging in...");
  };

  const handleResend = () => {
    setTimeRemaining(120); // Reset timer
    setTimerRunning(true); // Restart timer
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        {step === 1 && (
          <>
            <p>{formattedDate}</p>
            <h2 className="text-2xl font-semibold text-center mb-6">
              ورود / ثبت نام
            </h2>
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
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
                  زمان باقی مانده: <span id="timer">{formatTime(timeRemaining)}</span>
                </p>
              </div>

              {timeRemaining === 0 && (
                <button
                  type="button"
                  className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={handleResend}
                >
                  ارسال مجدد کد
                </button>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                بررسی
              </button>
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
