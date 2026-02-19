
interface NeoTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function NeoTextArea({ label, className = "", ...props }: NeoTextAreaProps) {
  return (
    <div className="flex flex-col gap-2 font-sans">
      <label className="font-black uppercase tracking-tight text-lg">{label}</label>
      <textarea
        className={`
            w-full bg-white border-[3px] border-black p-4 text-lg font-bold outline-none resize-y min-h-[150px]
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
            focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            transition-all placeholder:text-gray-400 placeholder:font-medium
            ${className}
        `}
        {...props}
      />
    </div>
  );
}
