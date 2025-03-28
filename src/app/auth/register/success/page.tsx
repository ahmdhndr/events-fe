import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Register Success",
};
export default function RegisterSuccessPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <Image
          src={"/images/general/logo.svg"}
          alt="Logo"
          width={100}
          height={100}
          quality={70}
          className="h-full object-cover object-center"
        />
        <Image
          src={"/images/illustrations/register-success.svg"}
          alt="success Illustration"
          width={300}
          height={300}
          quality={70}
          className="h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <h1 className="text-3xl font-bold text-primary">
          Create Account Success
        </h1>
        <p className="text-lg font-semibold text-gray-500">
          Check your email for account activation
        </p>
        <Button
          variant="outline-primary"
          // className="border-primary text-primary"
        >
          <Link href="/auth/login">Continue to login</Link>
        </Button>
      </div>
    </div>
  );
}
