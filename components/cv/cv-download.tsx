"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, FileText, Eye, Loader2, ArrowLeft, File, Palette, Grid3X3 } from "lucide-react"
import { cvFormats, getCVFormatById } from "@/data/cv-formats"
import { CVTemplate } from "./cv-template"
// import { usePDFGenerator } from "@/hooks/use-pdf-generator"
import { toast } from "sonner"
import Link from "next/link"

interface CVDownloadProps {
  className?: string
}

export function CVDownload({ className = "" }: CVDownloadProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("developer")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async (formatId: string) => {
    const format = getCVFormatById(formatId)
    if (!format) return

    setIsGenerating(true)
    setError(null)

    try {
      // Importar html2canvas dinámicamente para evitar problemas de SSR
      const html2canvas = (await import('html2canvas')).default

      const element = document.getElementById("cv-template")
      if (!element) {
        throw new Error("Elemento CV no encontrado")
      }

      // Hacer visible temporalmente el elemento
      const originalDisplay = element.style.display
      const originalVisibility = element.style.visibility
      const originalPosition = element.style.position

      element.style.display = "block"
      element.style.visibility = "visible"
      element.style.position = "absolute"
      element.style.left = "-9999px"
      element.style.top = "0"

      // Generar canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 800,
        height: 1200,
      })

      // Restaurar estilos
      element.style.display = originalDisplay
      element.style.visibility = originalVisibility
      element.style.position = originalPosition
      element.style.left = ""
      element.style.top = ""

      // Crear enlace de descarga
      const link = document.createElement('a')
      link.download = `CV_Jaun_Rojo_${format.name.replace(/\s+/g, '_')}.png`
      link.href = canvas.toDataURL('image/png', 0.95)

      // Descargar
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Track download (optional analytics)
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "cv_download", {
          event_category: "engagement",
          event_label: formatId,
          value: 1
        })
      }

      toast.success("CV descargado correctamente", {
        description: `${format.name} guardado como imagen PNG`
      })

    } catch (err) {
      console.error("Error downloading CV:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
      toast.error("Error al descargar el CV", {
        description: "Por favor, inténtalo de nuevo"
      })
    } finally {
      setIsGenerating(false)
    }
  }





  if (error) {
    toast.error("Error en el generador de PDF", {
      description: error
    })
  }

  return (
    <div className={className}>
      {/* Botón de regreso al inicio */}
      <div className="mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-accent/20 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>
      </div>

      <div className="max-w-lg mx-auto">
        <Card className="border-border shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-accent" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold mb-2">Jaun Rojo</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Desarrollador Web
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Stats destacadas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-accent">4+</div>
                <div className="text-sm text-muted-foreground font-medium">Años</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-accent">15+</div>
                <div className="text-sm text-muted-foreground font-medium">Proyectos</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-accent">10+</div>
                <div className="text-sm text-muted-foreground font-medium">Tecnologías</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-accent">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Remoto</div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedFormat("developer")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Previsualizar
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0 gap-0">
                  {/* DialogTitle requerido para accesibilidad - visualmente oculto */}
                  <DialogTitle className="sr-only">Vista Previa del Curriculum Vitae de Jaun Rojo</DialogTitle>

                  {/* Header fijo */}
                  <div className="flex-shrink-0 bg-background border-b border-border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">Vista Previa del CV</h2>
                          <p className="text-xs text-muted-foreground">Jaun Rojo - Desarrollador Full Stack</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload("developer")}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              Generando...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-1" />
                              Descargar
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPreviewOpen(false)}
                        >
                          Cerrar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Área de scroll del CV */}
                  <div className="flex-1 overflow-y-auto bg-muted/10 p-6">
                    <div className="flex justify-center">
                      <div className="bg-white rounded-lg shadow-lg border w-full max-w-4xl">
                        <CVTemplate
                          format={cvFormats[0]}
                          className="!max-w-full !mx-0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer fijo */}
                  <div className="flex-shrink-0 border-t border-border bg-muted/20 px-4 py-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <File className="w-3 h-3" />
                          <span>A4</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Palette className="w-3 h-3" />
                          <span>Profesional</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Grid3X3 className="w-3 h-3" />
                          <span>{cvFormats[0]?.sections?.filter(s => s.enabled).length || 8} secciones</span>
                        </div>
                      </div>
                      <span>
                        {new Date().toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                className="flex-1"
                onClick={() => handleDownload("developer")}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generando imagen...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PNG
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Hidden CV Template for PDF Generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '0', width: '800px' }}>
        {selectedFormat && (
          <div id="cv-template">
            <CVTemplate format={getCVFormatById(selectedFormat)!} className="" />
          </div>
        )}
      </div>
    </div>
  )
}