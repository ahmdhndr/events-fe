import { authServices } from "@/services/auth/auth-services";

import ActivationComponent from "./activation-component";

async function getActivationCode(code: string) {
  try {
    const res = await authServices.activation({ code });
    if (res.data.data) {
      return {
        status: "success",
      };
    } else {
      return {
        status: "failed",
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      status: "failed",
    };
  }
}

export default async function ActivationPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const { code } = await searchParams;

  const result = await getActivationCode(code!);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <ActivationComponent status={result.status} />
    </div>
  );
}
