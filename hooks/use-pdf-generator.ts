"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface PDFGeneratorOptions {
  filename?: string
  format?: "a4" | "letter"
  orientation?: "portrait" | "landscape"
  quality?: number
  scale?: number
}

interface PDFGeneratorResult {
  generatePDF: (elementId: string, options?: PDFGeneratorOptions) => Promise<void>
  isGenerating: boolean
  error: string | null
}

export function usePDFGenerator(): PDFGeneratorResult {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generatePDF = async (
    elementId: string, 
    options: PDFGeneratorOptions = {}
  ) => {
    const {
      filename = "CV_Jaun_Rojo.pdf",
      format = "a4",
      orientation = "portrait",
      quality = 1.0,
      scale = 2
    } = options

    setIsGenerating(true)
    setError(null)

    try {
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error(`Elemento con ID "${elementId}" no encontrado`)
      }

      // Configurar opciones de html2canvas
      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Asegurar que los estilos se apliquen correctamente
          const clonedElement = clonedDoc.getElementById(elementId)
          if (clonedElement) {
            clonedElement.style.transform = "scale(1)"
            clonedElement.style.transformOrigin = "top left"
          }
        }
      })

      // Configurar dimensiones del PDF
      const imgWidth = format === "a4" ? 210 : 216 // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Crear PDF
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: format,
        compress: true
      })

      const pageHeight = format === "a4" ? 297 : 279 // mm
      let heightLeft = imgHeight
      let position = 0

      // Agregar la primera página
      pdf.addImage(
        canvas.toDataURL("image/jpeg", quality),
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      )

      heightLeft -= pageHeight

      // Agregar páginas adicionales si es necesario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(
          canvas.toDataURL("image/jpeg", quality),
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        )
        heightLeft -= pageHeight
      }

      // Descargar el PDF
      pdf.save(filename)

      // Tracking de descarga (opcional)
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "cv_download", {
          event_category: "engagement",
          event_label: filename,
          value: 1
        })
      }

    } catch (err) {
      console.error("Error generando PDF:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    generatePDF,
    isGenerating,
    error
  }
}

// Hook para tracking de descargas
export function useDownloadTracking() {
  const [downloads, setDownloads] = useState<Record<string, number>>({})

  const trackDownload = (format: string) => {
    setDownloads(prev => ({
      ...prev,
      [format]: (prev[format] || 0) + 1
    }))

    // Guardar en localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cv_downloads")
      const data = stored ? JSON.parse(stored) : {}
      data[format] = (data[format] || 0) + 1
      localStorage.setItem("cv_downloads", JSON.stringify(data))
    }
  }

  const getDownloadCount = (format: string) => {
    return downloads[format] || 0
  }

  const getTotalDownloads = () => {
    return Object.values(downloads).reduce((sum, count) => sum + count, 0)
  }

  return {
    trackDownload,
    getDownloadCount,
    getTotalDownloads,
    downloads
  }
}