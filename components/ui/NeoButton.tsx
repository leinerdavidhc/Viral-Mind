import { cn } from "@/lib/utils";
import React from "react";

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
}

export const NeoButton = React.forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary: "bg-[#FF5E5E] text-white hover:bg-[#FF4040]",
      secondary: "bg-[#5E9DFF] text-white hover:bg-[#4080FF]",
      accent: "bg-[#FFD93D] text-black hover:bg-[#FFC000]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-6 py-3 font-black uppercase text-lg transition-all border-[3px] border-black",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
NeoButton.displayName = "NeoButton";
