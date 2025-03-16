import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Auth",
    default: "Halaman Register",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="mx-auto max-w-screen-xl px-6 lg:p-6">
        {children}
      </section>
    </>
  );
}
