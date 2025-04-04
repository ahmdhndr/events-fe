import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { errorToast } from "@/lib/error-toast";
import { authServices } from "@/services/auth/auth-services";
import type { IRegister } from "@/utils/types/auth";

const registerSchema = z
  .object({
    fullName: z.string().nonempty("Please fill in your full name"),
    username: z.string().nonempty("Please fill in your username"),
    email: z
      .string()
      .nonempty("Please fill in your email")
      .email("Must be a valid email"),
    password: z
      .string()
      .nonempty("Please fill in your password")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .nonempty("Please fill in password confirmation"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const useRegister = () => {
  const router = useRouter();

  const [visiblePassword, setVisiblePassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerFn = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: registerMutate, isPending: isPendingRegister } = useMutation({
    mutationFn: registerFn,
    onError: (error) => {
      errorToast(error);
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) =>
    registerMutate(values);

  return {
    visiblePassword,
    handleVisiblePassword,
    form,
    onSubmit,
    isPendingRegister,
  };
};

export default useRegister;
