import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addCategoryFormSchema = z.object({
  name: z.string().nonempty("Please enter the category name"),
  description: z.string().nonempty("Please enter the category description"),
  icon: z.string().nonempty("Please upload an icon"),
});

const useAddCategory = () => {
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
    },
  });

  return {
    form,
  };
};

export default useAddCategory;
