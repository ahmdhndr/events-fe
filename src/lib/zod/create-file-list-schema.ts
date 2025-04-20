import { z } from "zod";

export const createFileListSchema = ({
  maxSize,
  acceptedTypes,
  requiredMessage = "Please upload a file",
}: {
  maxSize: number;
  acceptedTypes: string[];
  requiredMessage?: string;
}) =>
  z
    .custom<FileList>(
      (fileList) => fileList instanceof FileList && fileList.length > 0,
      {
        message: requiredMessage,
      }
    )
    .refine(
      (fileList) => {
        const file = fileList?.[0];
        return file && acceptedTypes.includes(file.type);
      },
      {
        message: `File must be one of: ${acceptedTypes.join(", ")}`,
      }
    )
    .refine(
      (fileList) => {
        const file = fileList?.[0];
        return file && file.size <= maxSize;
      },
      {
        message: `File must be smaller than ${Math.floor(maxSize / 1024 / 1024)}MB`,
      }
    );
