import Image from "next/image";

import { RegisterForm } from "../_components/register-form";

export default function RegisterPage() {
  return (
    <div className="absolute left-1/2 top-1/2 mt-6 flex w-full -translate-x-1/2 items-center justify-center gap-20 lg:mt-0">
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
