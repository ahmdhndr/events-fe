export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="mx-auto h-full max-w-screen-xl px-6 lg:p-6">
        {children}
      </section>
    </>
  );
}
