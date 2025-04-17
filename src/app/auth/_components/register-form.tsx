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

import useRegister from "../_hooks/use-register";

export function RegisterForm() {
  const {
    visiblePassword,
    handleVisiblePassword,
    form,
    isPendingRegister,
    onSubmit,
  } = useRegister();

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-primary">Create Account</CardTitle>
        <CardDescription>
          Have an account?&nbsp;
          <Link href={"/auth/login"} className="font-semibold text-primary">
            Login here
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      type="text"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
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
                      type={visiblePassword.password ? "text" : "password"}
                      placeholder="Password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={() => handleVisiblePassword("password")}
                        >
                          {visiblePassword.password ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
                        </button>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input
                      type={
                        visiblePassword.confirmPassword ? "text" : "password"
                      }
                      placeholder="Confirm password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={() =>
                            handleVisiblePassword("confirmPassword")
                          }
                        >
                          {visiblePassword.confirmPassword ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
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
              disabled={isPendingRegister}
            >
              {isPendingRegister ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
