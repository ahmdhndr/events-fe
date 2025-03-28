import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface PropTypes {
  status: string;
}

export default function ActivationComponent(props: PropTypes) {
  const { status } = props;

  return (
    <>
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
          src={
            status === "success"
              ? "/images/illustrations/activation-success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="Illustration"
          width={300}
          height={300}
          quality={70}
          className="h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <h1 className="text-3xl font-bold text-primary">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-lg font-semibold text-gray-500">
          {status === "success"
            ? "Thank you for registering your account at ACARA"
            : "Confirmation code is invalid!"}
        </p>
        <Button variant="outline-primary">
          <Link href="/auth/login">Continue to login</Link>
        </Button>
      </div>
    </>
  );
}
