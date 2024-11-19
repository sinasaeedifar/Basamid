// app/layout.tsx
import './globals.css';
import { Metadata } from 'next';

// Define the metadata object for the app
export const metadata: Metadata = {
  title: 'نوبت',
  description: 'اپلیکیشن نوبت دهی پزشکان',
};

// Server-side layout
export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
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
