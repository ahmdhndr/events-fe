import { AxiosError } from "axios";

import { showCustomToast } from "@/components/custom-toast";

export const errorToast = (error: unknown) => {
  if (error instanceof AxiosError) {
    showCustomToast({
      type: "error",
      title:
        (
          error.response?.data as {
            status?: string;
          }
        )?.status || "Failed",
      description:
        (
          error.response?.data as {
            message?: string;
          }
        )?.message || error.message,
    });
  } else if (error instanceof Error) {
    showCustomToast({
      type: "error",
      title: error.name,
      description: error.message,
    });
  } else {
    showCustomToast({
      type: "error",
      title: "Unknown Error",
      description: "Something went wrong.",
    });
  }
};
