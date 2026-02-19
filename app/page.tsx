"use client";

import { useState } from "react";
import { GeminiResponse } from "@/types";
import { NeoTextArea } from "@/components/ui/NeoTextArea";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoSelect } from "@/components/ui/NeoSelect";
import { NeoCard } from "@/components/ui/NeoCard";
import { Loader } from "@/components/ui/Loader";
import { NeoToast } from "@/components/ui/NeoToast";
import { NeoModal } from "@/components/ui/NeoModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Copy, RefreshCw, History, Image as ImageIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Short");
  const [language, setLanguage] = useState("Español");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeminiResponse | null>(null);
  const [history, setHistory] = useLocalStorage<GeminiResponse[]>("strategy_history", []);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const generateStrategy = async () => {
    if (!title.trim()) {
      setToast({ message: "Por favor ingresa un título", type: "error" });
      return;
    }
    if (title.length < 5) {
      setToast({ message: "El título es muy corto", type: "error" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, type, language }),
      });

      if (!response.ok) {
        throw new Error("Error al generar la estrategia");
      }

      const data = await response.json();
      setResult(data);
      setHistory((prev) => [data, ...prev].slice(0, 10)); // Keep last 10
      setToast({ message: "Estrategia generada con éxito", type: "success" });
    } catch (error) {
      setToast({ message: "Error al conectar con Gemini", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const [showHistory, setShowHistory] = useState(false);

  const loadFromHistory = (item: GeminiResponse) => {
    setResult(item);
    setShowHistory(false);
    setToast({ message: "Estrategia cargada del historial", type: "success" });
  };

  const clearHistory = () => {
     setHistory([]);
     setToast({ message: "Historial borrado", type: "success" });
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast({ message: "Copiado al portapapeles", type: "success" });
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] p-4 md:p-8 font-sans text-black pb-24">
      {toast && (
        <NeoToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <NeoModal isOpen={showHistory} onClose={() => setShowHistory(false)} title="HISTORIAL DE ESTRATEGIAS">
        {history.length === 0 ? (
          <p className="text-center font-bold text-gray-500 py-8">No hay estrategias guardadas aún.</p>
        ) : (
          <div className="space-y-4">
             <div className="flex justify-end">
                <button onClick={clearHistory} className="text-red-500 font-bold hover:underline text-sm uppercase">Borrar Historial</button>
             </div>
            {history.map((item, idx) => (
              <div key={idx} className="border-[3px] border-black p-4 hover:bg-gray-50 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px active:shadow-none transition-all" onClick={() => loadFromHistory(item)}>
                <h4 className="font-black uppercase mb-1 line-clamp-1">{item.titles[0]}</h4>
                <p className="text-xs font-bold text-gray-500 truncate">{item.youtube_description.substring(0, 60)}...</p>
              </div>
            ))}
          </div>
        )}
      </NeoModal>

      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4 mb-12 relative">
           <div className="absolute top-0 right-0 md:absolute md:top-2 md:right-0">
              <button 
                onClick={() => setShowHistory(true)} 
                className="flex items-center gap-2 px-4 py-2 font-black uppercase tracking-widest text-sm border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all" 
                title="Ver Historial"
              >
                <History className="w-5 h-5" />
                <span>Historial</span>
              </button>
           </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-sm">
            Viral Mind
          </h1>
          <p className="text-lg md:text-xl font-bold uppercase tracking-wide">Tu estratega digital de bolsillo</p>
        </header>

        <section className="space-y-6 bg-white p-6 md:p-8 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeoSelect
              label="TIPO DE CONTENIDO"
              value={type}
              onChange={(val) => setType(val)}
              options={[
                { label: "Short / Reel / TikTok", value: "Short" },
                { label: "Video Largo Formato", value: "Largo formato" },
                { label: "Historia / Story", value: "Historia" },
                { label: "Documental", value: "Documental" },
                { label: "Opinión / Vlog", value: "Opinión" },
                { label: "Reacción", value: "Reacción" },
              ]}
            />
            <NeoSelect
              label="IDIOMA DE SALIDA"
              value={language}
              onChange={(val) => setLanguage(val)}
              options={[
                { label: "Español", value: "Español" },
                { label: "Inglés", value: "Inglés" },
                { label: "Portugués", value: "Portugués" },
              ]}
            />
          </div>

          <NeoTextArea
            label="IDEA DETALLADA DEL CONTENIDO"
            placeholder="Ej: 1️⃣ Heath Ledger&#10;Título: “La última noche del Joker”&#10;Conflicto: Éxito absoluto vs desgaste mental..."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)}
            maxLength={2000}
            className="min-h-[200px]"
          />
          <div className="flex justify-between text-sm font-bold uppercase text-gray-600">
            <span>{title.length} / 2000 caracteres</span>
            {title.length < 10 && title.length > 0 && <span className="text-red-600 font-black">Muy corto</span>}
          </div>

          <NeoButton 
            className="w-full text-xl py-4" 
            onClick={generateStrategy} 
            disabled={loading}
          >
            {loading ? "ANALIZANDO ESTRATEGIA..." : "GENERAR ESTRATEGIA MAESTRA"}
          </NeoButton>
        </section>

        {loading && (
          <div className="py-20 animate-in fade-in duration-700">
            <Loader />
          </div>
        )}

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700">
            {/* Títulos */}
            <NeoCard title="Títulos Optimizados" className="md:col-span-2 bg-[#FFD93D]">
              <ul className="space-y-3">
                {result.titles.map((t, i) => (
                  <li key={i} className="flex justify-between items-center gap-4 p-4 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group" onClick={() => copyToClipboard(t)}>
                    <span className="font-extrabold text-lg md:text-xl font-sans tracking-tight leading-tight">{i + 1}. {t}</span>
                    <Copy className="w-5 h-5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </li>
                ))}
              </ul>
            </NeoCard>

             {/* Keywords */}
             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeoCard title="Palabras Clave (SEO)" className="bg-[#E5E5E5]">
                    <div className="flex flex-wrap gap-2">
                        {result.primary_keywords.map((k, i) => (
                             <span key={i} className="bg-black text-white px-3 py-1 font-bold text-sm uppercase transform -rotate-1">
                                {k}
                             </span>
                        ))}
                    </div>
                </NeoCard>
                <NeoCard title="Secundarias (Contexto)" className="bg-[#E5E5E5]">
                    <div className="flex flex-wrap gap-2">
                        {result.secondary_keywords.map((k, i) => (
                             <span key={i} className="bg-white border-2 border-black px-3 py-1 font-bold text-sm text-gray-700">
                                {k}
                             </span>
                        ))}
                    </div>
                </NeoCard>
             </div>
             
             {/* Thumbnails */}
             {result.thumbnail_prompts && result.thumbnail_prompts.length > 0 && (
                <NeoCard title="Ideas para Miniatura (Thumbnails)" className="md:col-span-2 bg-[#FFD93D]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {result.thumbnail_prompts.map((prompt, i) => (
                            <div key={i} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-2 border-b-2 border-black pb-2">
                                    <ImageIcon className="w-5 h-5" />
                                    <span className="font-black uppercase text-sm">Opción {i + 1}</span>
                                </div>
                                <p className="text-sm font-medium leading-snug">{prompt}</p>
                            </div>
                        ))}
                    </div>
                </NeoCard>
             )}


            {/* Hashtags */}
            <NeoCard title="Hashtags YouTube">
              <div className="flex flex-wrap gap-2 cursor-pointer group" onClick={() => copyToClipboard(result.youtube_hashtags.map(t => t.startsWith('#') ? t : `#${t}`).join(" "))}>
                {result.youtube_hashtags.map((tag, i) => (
                  <span key={i} className="bg-white border-2 border-black px-2 py-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF5E5E] hover:text-white transition-colors">
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
                <div className="w-full mt-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1">Click para copiar todos</span>
                </div>
              </div>
            </NeoCard>
             <NeoCard title="Hashtags Facebook">
              <div className="flex flex-wrap gap-2 cursor-pointer group" onClick={() => copyToClipboard(result.facebook_hashtags.map(t => t.startsWith('#') ? t : `#${t}`).join(" "))}>
                {result.facebook_hashtags.map((tag, i) => (
                  <span key={i} className="bg-white border-2 border-black px-2 py-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#5E9DFF] hover:text-white transition-colors">
                     {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
                <div className="w-full mt-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1">Click para copiar todos</span>
                </div>
              </div>
            </NeoCard>

             {/* Descriptions */}
             <NeoCard title="Descripción YouTube" className="md:col-span-2 relative group">
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <NeoButton variant="secondary" className="px-4 py-2 text-sm shadow-none" onClick={() => copyToClipboard(result.youtube_description)}>COPIAR</NeoButton>
                </div>
                <div className="prose prose-lg max-w-none font-medium text-lg leading-relaxed p-2">
                    <ReactMarkdown components={{
                        strong: ({node, ...props}) => <span className="bg-black text-white px-1 font-black uppercase" {...props} />
                    }}>{result.youtube_description}</ReactMarkdown>
                </div>
             </NeoCard>

             <NeoCard title="Descripción Facebook" className="md:col-span-2 relative group">
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <NeoButton variant="secondary" className="px-4 py-2 text-sm shadow-none" onClick={() => copyToClipboard(result.facebook_description)}>COPIAR</NeoButton>
                </div>
                 <div className="prose prose-lg max-w-none font-medium text-lg leading-relaxed p-2">
                    <ReactMarkdown components={{
                        strong: ({node, ...props}) => <span className="bg-black text-white px-1 font-black uppercase" {...props} />
                    }}>{result.facebook_description}</ReactMarkdown>
                 </div>
             </NeoCard>

             {/* Comments */}
             <NeoCard title="Comentario Fijado (YT)">
                <div className="font-bold text-lg cursor-pointer hover:bg-[#f0f0f0] p-4 border-[2px] border-dashed border-gray-300 hover:border-black transition-all rounded-sm" onClick={() => copyToClipboard(result.youtube_comment)}>
                    {result.youtube_comment}
                </div>
             </NeoCard>
             <NeoCard title="Comentario (FB)">
                 <div className="font-bold text-lg cursor-pointer hover:bg-[#f0f0f0] p-4 border-[2px] border-dashed border-gray-300 hover:border-black transition-all rounded-sm" onClick={() => copyToClipboard(result.facebook_comment)}>
                    {result.facebook_comment}
                </div>
             </NeoCard>
          </div>
        )}
      </div>
    </main>
  );
}
