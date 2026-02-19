import React from "react";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-[4px] border-black animate-spin shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FF5E5E]" />
        <div className="absolute inset-2 border-[4px] border-black bg-[#5E9DFF] animate-pulse" />
      </div>
      <p className="font-black text-xl uppercase animate-bounce">Generando Estrategia...</p>
    </div>
  );
};
