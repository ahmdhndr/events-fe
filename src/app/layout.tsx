import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import QueryProviders from "./query-provider";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Acara",
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
      <body
        className={`${jakartaSans.variable} ${geistMono.variable} h-full w-full antialiased`}
      >
        <QueryProviders>
          <div className="flex h-screen w-screen flex-col justify-between overflow-x-hidden">
            <main className="container flex-grow">{children}</main>
          </div>
        </QueryProviders>
        <Toaster />
      </body>
    </html>
  );
}
