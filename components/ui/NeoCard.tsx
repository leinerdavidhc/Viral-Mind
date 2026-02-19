import { cn } from "@/lib/utils";
import React from "react";

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  actions?: React.ReactNode;
}

export const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  ({ className, title, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border-[3px] border-black p-6",
          "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          className
        )}
        {...props}
      >
        {(title || actions) && (
          <div className="flex justify-between items-center mb-4 border-b-[3px] border-black pb-2">
            {title && <h3 className="text-xl font-black uppercase">{title}</h3>}
            {actions && <div>{actions}</div>}
          </div>
        )}
        {children}
      </div>
    );
  }
);
NeoCard.displayName = "NeoCard";
