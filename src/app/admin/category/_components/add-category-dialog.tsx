"use client";

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
  const { form } = useAddCategory();
  const { close } = useModal();
  return (
    <div
      className={cn("grid w-full max-w-[768px] items-start gap-4", className)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <UploadFileInput acceptedFileType="image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" className="w-full">
            {/* {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"} */}
            Create Category
          </Button>
          <Button
            type="button"
            variant="outline-primary"
            className="w-full"
            onClick={close}
          >
            {/* {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"} */}
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
}
