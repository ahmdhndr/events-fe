import { AxiosError } from "axios";
import { toast } from "sonner";

import { capitalizeFirstLetter } from "@/utils/capitalize-letter";

type AxiosErrorData = {
  status?: string;
  message?: string;
};

export const errorToast = (error: unknown) => {
  const getDefaultToast = () =>
    toast.error(capitalizeFirstLetter("error"), {
      description: "Something went wrong.",
    });

  if (error instanceof AxiosError) {
    const data = error.response?.data as AxiosErrorData;
    const status = data?.status ?? "Failed";
    const message = data?.message ?? error.message;

    toast.error(capitalizeFirstLetter(status), {
      description: message,
    });
  } else if (error instanceof Error) {
    toast.error(capitalizeFirstLetter("error"), {
      description: error.message,
    });
  } else {
    getDefaultToast();
  }
};
