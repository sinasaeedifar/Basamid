"use client";
import "./globals.css";
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const metadata: Metadata = {
  title: "نوبت",
  description: "اپلیکیشن نوبت دهی پزشکان",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  // const queryClient = new QueryClient();
  return (
    <html lang="fa" dir="rtl">
      <body
        className="relative bg-cover bg-center bg-no-repeat min-h-screen backdrop-blur-sm"
        style={{ backgroundImage: "url('/images/main-background.jpg')" }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
