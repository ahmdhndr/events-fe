// mutations/upload-media-mutation.ts
import { useMutation } from "@tanstack/react-query";

import { errorToast } from "@/lib/error-toast";
import { mediaServices } from "@/services/media/media-services";

type UploadMediaPayload = {
  file: FileList;
};

export const useUploadMedia = (onSuccess: (secureUrl: string) => void) => {
  return useMutation({
    mutationFn: async ({ file }: UploadMediaPayload) => {
      const formData = new FormData();
      formData.append("file", file[0]);

      const {
        data: {
          data: { secure_url },
        },
      } = await mediaServices.upload(formData);

      return secure_url;
    },
    onError: (error) => {
      errorToast(error);
    },
    onSuccess,
  });
};
