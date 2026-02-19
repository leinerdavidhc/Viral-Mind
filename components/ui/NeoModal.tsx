import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { X } from "lucide-react";

interface NeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const NeoModal = ({ isOpen, onClose, title, children }: NeoModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className={cn(
          "bg-white border-[4px] border-black w-full max-w-lg max-h-[90vh] overflow-y-auto relative p-6",
          "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        )}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 border-[2px] border-transparent hover:border-black transition-all"
        >
          <X className="w-6 h-6" />
        </button>
        
        {title && (
          <h2 className="text-2xl font-black uppercase mb-6 border-b-[3px] border-black pb-2">
            {title}
          </h2>
        )}
        
        {children}
      </div>
    </div>
  );
};
