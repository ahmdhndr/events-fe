import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acara",
    default: "Register Page",
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
        <div className="relative">{children}</div>
      </section>
    </>
  );
}
