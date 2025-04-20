"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { FaFileImage } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface UploadFileInputProps {
  name: string;
  className?: string;
  isDropable?: boolean;
  onUpload?: (files?: FileList) => void;
  onDelete?: () => void;
  acceptedFileType?: "pdf" | "image";
}

export default function UploadFileInput({
  name,
  className,
  isDropable = false,
  onUpload,
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

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      setUploadedFile(files[0]);
      onUpload(files);
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
    <section className="w-full space-y-2">
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
          onChange={handleOnUpload}
          accept={acceptedFiles}
          name={name}
          id={`upload-file-${dropzoneId}`}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <IoMdCloudUpload className="h-10 w-10 text-primary" />
          <div className="flex flex-col items-center justify-center gap-1 text-sm text-gray-500">
            {isDropable ? (
              <span>Drag and Drop or Click to upload a file</span>
            ) : (
              <span>Click to upload a file</span>
            )}
            <span className="text-xs">
              Accepted file types: {textAcceptedFile}
            </span>
          </div>
        </div>
      </label>
      <h3 className="text-sm">Preview</h3>
      <div className="flex w-full flex-col items-start gap-1">
        {uploadedFile ? (
          <div className="relative flex w-full items-center gap-2 rounded-lg border p-2">
            <FaFileImage className="h-8 w-8" />
            <div className="flex flex-1 flex-col gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="max-w-[min(100%,300px)]] inline-block w-fit truncate text-sm">
                    {uploadedFile.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs break-words">
                  <span>{uploadedFile.name}</span>
                </TooltipContent>
              </Tooltip>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto"
              onClick={handleClearPreview}
            >
              <MdDelete className="h-8 w-8 text-destructive" />
            </Button>
          </div>
        ) : (
          <span className="text-sm text-gray-500">No file uploaded.</span>
        )}
      </div>
    </section>
  );
}
