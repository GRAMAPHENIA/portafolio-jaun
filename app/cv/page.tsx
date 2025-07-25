import { Metadata } from "next"
import { CVDownload } from "@/components/cv/cv-download"
import { CVAnalytics } from "@/components/cv/cv-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BarChart3 } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="download" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="download" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Descargar CV
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Estadísticas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="download" className="space-y-6">
            <CVDownload />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <CVAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}