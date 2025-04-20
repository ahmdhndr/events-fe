// mutations/add-category-mutation.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { errorToast } from "@/lib/error-toast";
import { categoryServices } from "@/services/category/category-services";
import { ICategory } from "@/utils/types/category";

export const useAddCategoryMutation = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: async (payload: ICategory) => {
      const result = await categoryServices.addCategory(payload);
      return result.data;
    },
    onError: (error) => {
      errorToast(error);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      onSuccessCallback();
    },
  });
};
