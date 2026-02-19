import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface NeoSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

export const NeoSelect: React.FC<NeoSelectProps> = ({
  label,
  value,
  onChange,
  options,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative" ref={containerRef}>
      {label && (
        <label className="block text-lg font-black mb-2 uppercase tracking-tight">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between text-left appearance-none bg-white border-[3px] border-black p-4 font-bold outline-none transition-all cursor-pointer",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            isOpen
              ? "translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              : "hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]",
            className
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : "Seleccionar..."}
          </span>
          <ChevronDown
            className={cn(
              "w-6 h-6 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "p-3 font-bold cursor-pointer border-b-[3px] last:border-b-0 border-black flex items-center justify-between transition-colors",
                  opt.value === value
                    ? "bg-[#FFD93D] text-black"
                    : "hover:bg-gray-100"
                )}
              >
                <span>{opt.label}</span>
                {opt.value === value && <Check className="w-5 h-5" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
