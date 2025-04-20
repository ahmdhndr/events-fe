// hooks/use-add-category.ts
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useModal } from "@/context/modal-context";
import { useUploadMedia } from "@/hooks/upload-media-mutation";
import { createFileListSchema } from "@/lib/zod/create-file-list-schema";

import { useAddCategoryMutation } from "./add-category-mutation";
import useCategory from "./use-category";

const addCategoryFormSchema = z.object({
  name: z.string().nonempty("Please enter the category name"),
  description: z.string().nonempty("Please enter the category description"),
  icon: createFileListSchema({
    maxSize: 2 * 1024 * 1024, // 2MB,
    acceptedTypes: ["image/png", "image/jpg", "image/jpeg", "image/svg"],
  }),
});

const useAddCategory = () => {
  const { close } = useModal();
  const { refetchCategory } = useCategory();
  const [uploadedIconUrl, setUploadedIconUrl] = useState("");

  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: undefined,
    },
  });

  const { mutate: mutateAddCategory, isPending: isPendingAddCategory } =
    useAddCategoryMutation(() => {
      form.reset();
      close();
      setTimeout(() => refetchCategory(), 100);
    });

  const { mutate: mutateUploadIcon, isPending: isPendingUploadIcon } =
    useUploadMedia((secureUrl) => {
      setUploadedIconUrl(secureUrl);
    });

  useEffect(() => {
    if (!uploadedIconUrl) return;
    const { name, description } = form.getValues();
    mutateAddCategory({
      name,
      description,
      icon: uploadedIconUrl,
    });
  }, [form, mutateAddCategory, uploadedIconUrl]);

  const onSubmit = (values: z.infer<typeof addCategoryFormSchema>) =>
    mutateUploadIcon({ file: values.icon });

  return {
    form,
    onSubmit,
    isPendingAddCategory,
    isPendingUploadIcon,
  };
};

export default useAddCategory;
