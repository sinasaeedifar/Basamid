// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "نوبت",
//   description: "اپلیکیشن نوبت دهی پزشکان",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نوبت",
  description: "اپلیکیشن نوبت دهی پزشکان",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className="relative bg-cover bg-center bg-no-repeat min-h-screen backdrop-blur-sm"
        style={{ backgroundImage: "url('/images/main-background.jpg')" }}
      >
        {children}
      </body>
    </html>
  );
}
