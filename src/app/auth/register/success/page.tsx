import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Success Page",
};
export default function RegisterSuccessPage() {
  return (
    <div className="absolute left-1/2 top-1/2 mt-6 flex w-full -translate-x-1/2 items-center justify-center gap-20 lg:mt-10">
      <h1>Register Success</h1>
    </div>
  );
}
