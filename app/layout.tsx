import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Viral Mind | AI Strategy Generator",
    template: "%s | Viral Mind"
  },
  description: "Tu estratega digital de bolsillo. Genera estrategias virales para YouTube y Facebook con IA de alto rendimiento.",
  keywords: ["Viral Strategy", "AI Content Generator", "YouTube Growth", "Facebook Viral", "Content Strategy", "Leiner Hoyos", "Gemini AI", "Marketing Digital"],
  authors: [{ name: "Leiner Hoyos" }],
  creator: "Leiner Hoyos",
  publisher: "Leiner Hoyos",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Viral Mind | Tu Estratega Digital con IA",
    description: "Genera ganchos, títulos y descripciones virales para YouTube y Facebook en segundos.",
    siteName: "Viral Mind",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Mind | AI Strategy Generator",
    description: "Domina el algoritmo con estrategias generadas por IA.",
    creator: "@leinerhoyos", // Asumiendo, o genérico
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
