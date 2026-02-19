import { cn } from "@/lib/utils";
import React from "react";

export interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const NeoInput = React.forwardRef<HTMLInputElement, NeoInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-lg font-black mb-2 uppercase tracking-tight">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-white border-[3px] border-black p-4 font-bold outline-none transition-all",
            "placeholder:text-gray-400 placeholder:font-normal",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            "focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px]",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-600 font-bold mt-1 text-sm">{error}</p>}
      </div>
    );
  }
);
NeoInput.displayName = "NeoInput";
