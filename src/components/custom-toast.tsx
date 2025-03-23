import clsx from "clsx";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { toast } from "sonner";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
}

export function showCustomToast({ type, title, description }: ToastProps) {
  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const bgColor = {
    success: "bg-green-100 border-green-500",
    error: "bg-red-100 border-red-500",
    warning: "bg-yellow-100 border-yellow-500",
    info: "bg-blue-100 border-blue-500",
  };

  toast(
    <div className="flex items-center gap-3">
      {iconMap[type]}
      <div>
        <p className="font-semibold">{title}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    </div>,
    {
      className: clsx("border-l-4 p-4 rounded-lg shadow-md", bgColor[type]),
    }
  );
}
