import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

interface NeoToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export const NeoToast = ({ message, type = "success", onClose }: NeoToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-50 px-6 py-4 border-[3px] border-black font-bold flex items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-slide-in-right",
      type === "success" ? "bg-[#5E9DFF] text-white" : "bg-[#FF5E5E] text-white"
    )}>
      <span className="uppercase tracking-wide">{message}</span>
    </div>
  );
};
