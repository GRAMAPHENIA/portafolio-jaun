import { Metadata } from "next"
import { CVDownload } from "@/components/cv/cv-download"

export const metadata: Metadata = {
  title: "Descargar CV | Jaun Rojo - Desarrollador Full Stack",
  description: "Descarga el CV de Jaun Rojo en diferentes formatos optimizados para desarrollador, ejecutivo o creativo. PDF de alta calidad disponible para descarga inmediata.",
  keywords: ["CV", "curriculum", "resume", "desarrollador", "full stack", "descarga", "PDF"],
  openGraph: {
    title: "Descargar CV - Jaun Rojo",
    description: "Descarga el CV profesional en formato PDF",
    type: "website",
    url: "https://juanrojo.dev/cv",
  },
  twitter: {
    card: "summary_large_image",
    title: "Descargar CV - Jaun Rojo",
    description: "Descarga el CV profesional en formato PDF",
  }
}

export default function CVPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <CVDownload />
      </div>
    </div>
  )
}