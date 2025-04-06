import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { RegisterForm } from "../_components/register-form";

export const metadata: Metadata = {
  title: "Register",
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full items-center justify-center gap-20">
      <div className="hidden lg:flex lg:w-full lg:flex-col lg:items-center lg:justify-center lg:gap-10">
        <Image
          src={"/images/general/logo.svg"}
          alt="Logo"
          width={100}
          height={100}
          quality={70}
          className="h-full object-cover object-center"
        />
        <Image
          src={"/images/illustrations/login.svg"}
          alt="Login Illustration"
          width={1280}
          height={720}
          quality={70}
          className="h-full object-cover object-center"
        />
      </div>
      <RegisterForm />
    </div>
  );
}
