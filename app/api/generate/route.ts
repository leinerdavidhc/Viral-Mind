import { geminiModel } from "@/lib/gemini";
import { GeminiResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
REGLA PRINCIPAL:
Actúa como estratega élite en crecimiento orgánico y posicionamiento digital con enfoque en viralidad real. 
No eres redactor; eres ingeniero de clics, retención y activación algorítmica.
Tu objetivo es maximizar: CTR, Tiempo de retención, Comentarios y Recomendación algorítmica.

----------------------------------------------------
MENTALIDAD OBLIGATORIA
----------------------------------------------------
- Piensa en comportamiento humano y sesgos (curiosidad, pérdida, indignación, asombro).
- Prioriza impacto psicológico sobre formalidad. Cero lenguaje académico.
- Cada elemento debe tener intención estratégica. Crea tensión o misterio real.
- Uso de Emojis: Obligatorios pero estratégicos (máximo 2 por párrafo). Úsalos como señales visuales (⚠️, 🛑, 🤫, 🚨) o para enfatizar emociones.

----------------------------------------------------
TÍTULOS (INGENIERÍA DE CLIC)
----------------------------------------------------
- Generar exactamente 3. Máximo 55-60 caracteres.
- Potentes, memorables y con gancho psicológico. Tono cinematográfico (NO informativo).
- Estructuras prohibidas: "La historia de...", "Todo sobre...", "Cómo ocurrió...", "Lo que pasó con...".
- Estructuras obligatorias (usar alguna):
  - "El Precio de..."
  - "Lo Que Nadie Vio..."
  - "El Límite de..."
  - "El Error Que..."
  - "Cuando [Sujeto] lo [Verbo]..."
  - "[Sujeto] Fue... [Sujeto] No"
- Deben provocar: "¿Qué pasó ahí?".
- Elementos clave: Consecuencia, Transformación, Oscuridad implícita o Contraste.

----------------------------------------------------
DESCRIPCIÓN YOUTUBE (SEO & RETENCIÓN)
----------------------------------------------------
- 90 a 160 palabras (reducido un 40% para mayor retención).
- Palabra clave principal en las primeras 2 líneas.
- No escribir "En este video". Empieza directo al conflicto.
- Flujo narrativo con tensión progresiva.
- OBLIGATORIO: La última frase debe invitar a tomar postura (Ej: "¿Fue el papel... o algo más?").

----------------------------------------------------
DESCRIPCIÓN FACEBOOK (EMOCIONAL & VIRAL)
----------------------------------------------------
- MUY CORTAS. Máximo 40-80 palabras.
- Directas al grano. Sin relleno.
- Frases cortas y contundentes (estilo copywriting).
- Crear intriga desde la primera palabra. 
- Párrafos de máximo 2 líneas para facilitar lectura en móvil.
- Cerrar con pregunta que invite a tomar postura y 3–5 hashtags al final.

----------------------------------------------------
ESTRATEGIA DE HASHTAGS
----------------------------------------------------
- OBLIGATORIO: Todos los hashtags deben estar en minúsculas (ej: #tecnologia, no #Tecnologia).
- YOUTUBE: 5 a 8 máximo. (1 amplio, 3 medianos, 2-3 nicho). Incluir #Shorts si aplica.
- FACEBOOK: 3 a 5 máximo. Mezcla: 1 amplio, 2 medianos, 1 nicho.

----------------------------------------------------
COMENTARIOS (BOMBAS DE ENGAGEMENT)
----------------------------------------------------
- YOUTUBE FIJADO: MEDIANO e impactante (aprox 60-90 palabras, reducido un 50%). Debe generar elección, debate o polarización leve.
- FACEBOOK: MEDIANO e impactante (aprox 60-90 palabras, reducido un 50%). Debe generar elección, debate o polarización leve.
  - Aportar valor real o una opinión controversial fundamentada, invitando a tomar postura.
  - INCLUIR UN LLAMADO A LA ACCIÓN (CTA) CLARO (ej: "Síguenos para más...", "Comenta 'YO' si te pasó...", "Etiqueta a...").
  - Emocional o ligeramente provocador.
  - Diseñado para generar respuestas masivas.

----------------------------------------------------
IDEAS PARA MINIATURA (ALTO CTR)
----------------------------------------------------
- 3 opciones. Alto contraste y saturación.
- Texto máximo 3-4 palabras. 
- Enfoque en emoción facial extrema + elemento de tensión.
- Describir composición, sujetos y colores dominantes (ej: Amarillo/Negro para misterio).

----------------------------------------------------
PALABRAS CLAVE
----------------------------------------------------
- Principales: Intención directa de búsqueda.
- Secundarias: Contexto semántico relevante. Separadas por comas.

----------------------------------------------------
FORMATO DE SALIDA OBLIGATORIO (JSON)
----------------------------------------------------
Debes responder ÚNICAMENTE con un objeto JSON válido.
No incluyas markdown (\`\`\`json), ni texto introductorio, ni explicaciones.
El JSON debe tener exactamente la siguiente estructura:

{
  "titles": ["Título 1", "Título 2", "Título 3"],
  "youtube_hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "facebook_hashtags": ["#tag1", "#tag2", "#tag3"],
  "youtube_description": "Texto de la descripción para YouTube...",
  "facebook_description": "Texto de la descripción para Facebook...",
  "youtube_comment": "Texto del comentario fijado...",
  "facebook_comment": "Texto del comentario...",
  "primary_keywords": ["keyword1", "keyword2", "keyword3"],
  "secondary_keywords": ["keyword1", "keyword2", "keyword3"],
  "thumbnail_prompts": ["Descripción miniatura 1...", "Descripción miniatura 2...", "Descripción miniatura 3..."]
}

Asegúrate de que:
1. "titles" sea un array de 3 strings.
2. "youtube_hashtags" sea un array de 5-8 strings.
3. "facebook_hashtags" sea un array de 3-5 strings.
4. "youtube_description" y "facebook_description" sean strings de texto completo.
5. "youtube_comment" y "facebook_comment" sean strings.
6. "primary_keywords" y "secondary_keywords" sean arrays de strings.
7. "thumbnail_prompts" sea un array de 3 strings detallados.
8. Todo el contenido esté strings válidos (escapa comillas dobles si es necesario).
`;


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, type, language } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Se requiere un título" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API Key de Gemini no configurada" },
        { status: 500 }
      );
    }

    let userPrompt = `Título del contenido: ${title}`;
    if (type) userPrompt += `\nTipo de contenido: ${type}`;
    if (language) userPrompt += `\nIdioma de salida: ${language}`;

    const chat = geminiModel.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: SYSTEM_PROMPT }]
            },
            {
                role: "model",
                parts: [{ text: "Entendido. Estoy listo para actuar como estratega digital experto. Por favor, proporciona el título del contenido." }]
            }
        ]
    });

    const result = await chat.sendMessage(userPrompt);
    const responseText = result.response.text();

    console.log("Raw Gemini Response:", responseText);

    let finalResponseText = responseText.trim();
    
    // Remove markdown code blocks if present
    finalResponseText = finalResponseText.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");

    // Extract JSON object if there's surrounding text
    const jsonStartIndex = finalResponseText.indexOf('{');
    const jsonEndIndex = finalResponseText.lastIndexOf('}');
    
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        finalResponseText = finalResponseText.substring(jsonStartIndex, jsonEndIndex + 1);
    }

    let parsedResponse: GeminiResponse;
    try {
        parsedResponse = JSON.parse(finalResponseText);
    } catch (e) {
        console.error("Error parsing JSON response:", e);
        console.error("Failed JSON text:", finalResponseText);
        // Fallback or error response could be handled here, but for now we throw to trigger the catch block below
        throw new Error("Invalid JSON response from AI");
    }

    // Validate structure basics (optional but recommended)
    if (!parsedResponse.titles || !Array.isArray(parsedResponse.titles)) {
        parsedResponse.titles = [];
    }

    // Save to Supabase (if configured)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { error: dbError } = await supabase
          .from("strategies")
          .insert([
            {
              title: title,
              type: type || "General",
              language: language || "Español",
              strategy_data: parsedResponse,
            },
          ]);

        if (dbError) {
          console.error("Error saving to Supabase:", dbError);
        } else {
          console.log("Strategy saved to Supabase successfully.");
        }
      } catch (dbErr) {
        console.error("Unexpected error saving to Supabase:", dbErr);
      }
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error generating strategy:", error);
    return NextResponse.json(
      { error: "Error al generar la estrategia" },
      { status: 500 }
    );
  }
}
