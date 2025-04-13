import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { errorToast } from "@/lib/error-toast";
import { emailRegex } from "@/utils/email-regex";
import type { ILogin } from "@/utils/types/auth";

const loginSchema = z.object({
  identifier: z
    .string()
    .nonempty("Please fill in your email or username")
    .refine(
      (val) => {
        const isEmail = emailRegex.test(val);
        const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(val);
        return isEmail || isUsername;
      },
      {
        message: "Identifier must be a valid email or username",
      }
    ),
  password: z.string().nonempty("Please fill in your password"),
});

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibilityPassword = () => setIsVisible(!isVisible);

  const url = searchParams.get("callbackUrl") || "/";
  const callbackUrl = decodeURIComponent(url);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const loginFn = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      throw new Error("Wrong identifier or password");
    }
  };

  const { mutate: loginMutate, isPending: isPendingLogin } = useMutation({
    mutationFn: loginFn,
    onError: (error) => {
      errorToast(error);
    },
    onSuccess: () => {
      router.push(callbackUrl);
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => loginMutate(values);

  return {
    isVisible,
    toggleVisibilityPassword,
    form,
    onSubmit,
    isPendingLogin,
  };
};

export default useLogin;
