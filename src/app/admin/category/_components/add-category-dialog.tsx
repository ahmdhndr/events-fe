"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadFileInput from "@/components/upload-file-input";
import { useModal } from "@/context/modal-context";
import { cn } from "@/lib/utils";

import useAddCategory from "../_hooks/use-add-category";

interface AddCategoryDialogProps {
  className?: string;
}

export default function AddCategoryDialog({
  className,
}: AddCategoryDialogProps) {
  const { form, onSubmit, isPendingAddCategory, isPendingUploadIcon } =
    useAddCategory();
  const { close } = useModal();

  return (
    <div
      className={cn(
        "grid w-full max-w-[768px] items-start gap-4 px-1",
        className
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${Object.keys(form.formState.errors).length > 0 ? "space-y-1" : "space-y-4"}`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Information</FormLabel>
                <FormControl>
                  <Input autoFocus type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <UploadFileInput
                    onUpload={(files) => {
                      onChange(files);
                    }}
                    acceptedFileType="image"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPendingAddCategory || isPendingUploadIcon}
            type="submit"
            variant="default"
            className="w-full"
          >
            {isPendingAddCategory || isPendingUploadIcon ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Category"
            )}
          </Button>
          <Button
            type="button"
            variant="outline-primary"
            className="w-full"
            onClick={() => {
              form.reset();
              close();
            }}
          >
            {/* {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"} */}
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
}
