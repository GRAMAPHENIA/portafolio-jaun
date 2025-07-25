"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Briefcase, Palette, Eye, Loader2 } from "lucide-react"
import { cvFormats, getCVFormatById } from "@/data/cv-formats"
import { CVTemplate } from "./cv-template"
import { usePDFGenerator, useDownloadTracking } from "@/hooks/use-pdf-generator"
import { toast } from "sonner"

interface CVDownloadProps {
  className?: string
}

export function CVDownload({ className = "" }: CVDownloadProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("developer")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { generatePDF, isGenerating, error } = usePDFGenerator()
  const { trackDownload, getDownloadCount } = useDownloadTracking()

  const handleDownload = async (formatId: string) => {
    const format = getCVFormatById(formatId)
    if (!format) return

    try {
      const filename = `CV_Jaun_Rojo_${format.name.replace(/\s+/g, '_')}.pdf`
      
      await generatePDF("cv-template", {
        filename,
        format: "a4",
        orientation: "portrait",
        quality: 0.95,
        scale: 2
      })

      // Track download
      trackDownload(formatId)
      
      toast.success("CV descargado correctamente", {
        description: `${format.name} guardado como ${filename}`
      })

    } catch (err) {
      console.error("Error downloading CV:", err)
      toast.error("Error al descargar el CV", {
        description: "Por favor, inténtalo de nuevo"
      })
    }
  }

  const getFormatIcon = (template: string) => {
    switch (template) {
      case "developer":
        return <FileText className="w-5 h-5" />
      case "executive":
        return <Briefcase className="w-5 h-5" />
      case "creative":
        return <Palette className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getFormatColor = (template: string) => {
    switch (template) {
      case "developer":
        return "bg-blue-50 border-blue-200 hover:bg-blue-100"
      case "executive":
        return "bg-purple-50 border-purple-200 hover:bg-purple-100"
      case "creative":
        return "bg-orange-50 border-orange-200 hover:bg-orange-100"
      default:
        return "bg-gray-50 border-gray-200 hover:bg-gray-100"
    }
  }

  if (error) {
    toast.error("Error en el generador de PDF", {
      description: error
    })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Descargar CV</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Elige el formato que mejor se adapte a tus necesidades. Cada versión está optimizada 
          para diferentes tipos de oportunidades profesionales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cvFormats.map((format) => (
          <Card 
            key={format.id} 
            className={`cursor-pointer transition-all duration-200 ${getFormatColor(format.template)}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getFormatIcon(format.template)}
                  <CardTitle className="text-lg">{format.name}</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getDownloadCount(format.id)} descargas
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {format.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {format.sections.filter(s => s.enabled).slice(0, 4).map((section) => (
                    <Badge key={section.id} variant="outline" className="text-xs">
                      {section.name}
                    </Badge>
                  ))}
                  {format.sections.filter(s => s.enabled).length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{format.sections.filter(s => s.enabled).length - 4} más
                    </Badge>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedFormat(format.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Vista Previa
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Vista Previa - {format.name}</DialogTitle>
                        <DialogDescription>
                          Previsualización del CV en formato {format.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="mt-4">
                        <CVTemplate format={format} className="scale-75 origin-top" />
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                          Cerrar
                        </Button>
                        <Button 
                          onClick={() => handleDownload(format.id)}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Generando...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Descargar PDF
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(format.id)}
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Download Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="w-5 h-5" />
            Descarga Rápida
          </CardTitle>
          <CardDescription>
            Selecciona un formato y descarga directamente
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="sm:w-64">
                <SelectValue placeholder="Selecciona un formato" />
              </SelectTrigger>
              <SelectContent>
                {cvFormats.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    <div className="flex items-center gap-2">
                      {getFormatIcon(format.template)}
                      {format.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={() => handleDownload(selectedFormat)}
              disabled={isGenerating || !selectedFormat}
              className="sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generando PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar CV
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hidden CV Template for PDF Generation */}
      <div className="hidden">
        {selectedFormat && (
          <CVTemplate format={getCVFormatById(selectedFormat)!} />
        )}
      </div>
    </div>
  )
}