"use client";

import Image from "next/image";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { IoMdCloudUpload } from "react-icons/io";
import { MdClear } from "react-icons/md";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface UploadFileInputProps {
  name: string;
  className?: string;
  isDropable?: boolean;
  acceptedFileType?: "pdf" | "image";
}

export default function UploadFileInput({
  name,
  className,
  isDropable = false,
  acceptedFileType = "image",
}: UploadFileInputProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();
  const [acceptedFiles, setAcceptedFiles] = useState<string>("");
  const [textAcceptedFile, setTextAcceptedFile] = useState<string>("");

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      if (isDropable) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isDropable]
  );

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadedFile(e.dataTransfer?.files?.[0] || null);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleClearPreview = () => {
    setUploadedFile(null);
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);
    }

    return () => {
      dropCurrent?.removeEventListener("dragover", handleDragOver);
      dropCurrent?.removeEventListener("drop", handleDrop);
    };
  }, [handleDragOver]);

  useEffect(() => {
    switch (acceptedFileType) {
      case "pdf":
        setAcceptedFiles(".pdf");
        setTextAcceptedFile("PDF");
        break;
      default:
        setAcceptedFiles("image/*");
        setTextAcceptedFile("JPEG, PNG, SVG");
    }
  }, [acceptedFileType]);

  return (
    <section className="space-y-2">
      <label
        ref={drop}
        htmlFor={`upload-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-100 border-primary bg-gray-50 p-1 hover:bg-gray-100",
          Boolean(uploadedFile) ? "pointer-events-none" : "cursor-pointer",
          className
        )}
      >
        <Input
          type="file"
          className="hidden"
          disabled={Boolean(uploadedFile)}
          onChange={handleOnChange}
          accept={acceptedFiles}
          name={name}
          id={`upload-file-${dropzoneId}`}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <IoMdCloudUpload className="h-10 w-10 text-primary" />
          {isDropable ? (
            <div className="flex flex-col items-center justify-center gap-1 text-sm text-gray-500">
              <span>Drag and Drop or Click to upload a file</span>
              <span className="text-xs">
                Accepted file types: {textAcceptedFile}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 text-sm text-gray-500">
              <span>Click to upload a file</span>
              <span className="text-xs">
                Accepted file types: {textAcceptedFile}
              </span>
            </div>
          )}
        </div>
      </label>
      <h3 className="text-sm">Preview</h3>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center justify-center gap-1">
          {uploadedFile ? (
            <div className="relative h-24 w-24">
              <div className="absolute -right-2 -top-2 z-10">
                <Button
                  variant={"outline-primary"}
                  className="h-8 w-8 rounded-full"
                  onClick={handleClearPreview}
                >
                  <MdClear />
                </Button>
              </div>
              <div className="relative h-24 w-24 rounded-lg border p-1">
                <Image
                  fill
                  src={URL.createObjectURL(uploadedFile)}
                  alt={`uploaded ${uploadedFile.name}`}
                  className="object-contain p-1"
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="max-w-22 w-full truncate text-sm">
                    {uploadedFile.name}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{uploadedFile.name}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-500">No file uploaded.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
