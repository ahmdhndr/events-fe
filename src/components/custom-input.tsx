import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function CustomInput() {
  return (
    <div className="relative w-full">
      {/* Input */}
      <Input className="pr-10" placeholder="Cari sesuatu..." />

      {/* End Content (Icon di Kanan) */}
      <div className="absolute inset-y-0 right-3 flex items-center">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
