import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="prose mx-auto dark:prose-invert">
        <section className="mx-auto my-4 flex flex-col items-center justify-center">
          <h1 className="text-balance font-sans text-xl font-bold md:text-3xl">
            Next.js Starter
          </h1>
          <p className="my-0 w-full max-w-lg text-muted-foreground">
            A basic starter for Next.js with Tailwind CSS, Shadcn
            (initialization) and Typescript. <br />
            Start by editing{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              src/app/page.tsx
            </code>
            .
          </p>
          <p>
            See{" "}
            <Link
              href={"https://github.com/ahmdhndr/nextjs-starter-shadcn"}
              target="_blank"
            >
              Github Repo
            </Link>{" "}
            for further information.
          </p>
        </section>
      </div>
    </div>
  );
}
