"use client";

import Link from "next/link";

import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useLogin from "../_hooks/use-login";

export function LoginForm() {
  const {
    isVisible,
    toggleVisibilityPassword,
    form,
    isPendingLogin,
    onSubmit,
  } = useLogin();

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-primary">Login</CardTitle>
        <CardDescription>
          Don&apos;t have an account?&nbsp;
          <Link href={"/auth/register"} className="font-semibold text-primary">
            Register here
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`${Object.keys(form.formState.errors).length > 0 ? "space-y-1" : "space-y-4"}`}
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Username</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Email / Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="Password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibilityPassword}
                        >
                          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"default"}
              className="w-full"
              disabled={isPendingLogin}
            >
              {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
