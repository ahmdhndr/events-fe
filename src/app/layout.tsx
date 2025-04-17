import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import QueryProviders from "./query-provider";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "Acara | %s",
    default: "Home",
  },
  description: "Acara | Event Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/general/logo.svg" type="image/x-icon" />
      <body className={`${interSans.variable} h-full w-full antialiased`}>
        <QueryProviders>
          <div className="flex h-screen w-screen flex-col justify-between overflow-x-hidden">
            <main className="flex-grow">{children}</main>
          </div>
        </QueryProviders>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
