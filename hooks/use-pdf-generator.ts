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

      // Hacer visible temporalmente el elemento si está oculto
      const originalDisplay = element.style.display
      const originalVisibility = element.style.visibility
      const originalPosition = element.style.position
      
      element.style.display = "block"
      element.style.visibility = "visible"
      element.style.position = "absolute"
      element.style.left = "-9999px"
      element.style.top = "0"

      // Configurar opciones de html2canvas
      const canvas = await html2canvas(element, {
        scale: Math.min(scale, 3), // Limitar el scale máximo
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: element.scrollWidth || 800,
        height: element.scrollHeight || 1200,
        onclone: (clonedDoc) => {
          // Asegurar que los estilos se apliquen correctamente
          const clonedElement = clonedDoc.getElementById(elementId)
          if (clonedElement) {
            clonedElement.style.display = "block"
            clonedElement.style.visibility = "visible"
            clonedElement.style.transform = "scale(1)"
            clonedElement.style.transformOrigin = "top left"
            clonedElement.style.position = "static"
          }
        }
      })

      // Restaurar estilos originales
      element.style.display = originalDisplay
      element.style.visibility = originalVisibility
      element.style.position = originalPosition
      element.style.left = ""
      element.style.top = ""

      // Validar dimensiones del canvas
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("El elemento no tiene dimensiones válidas para generar PDF")
      }

      // Configurar dimensiones del PDF
      const imgWidth = format === "a4" ? 210 : 216 // mm
      const imgHeight = Math.max((canvas.height * imgWidth) / canvas.width, 10) // Mínimo 10mm

      // Validar que las dimensiones sean números válidos
      if (!isFinite(imgWidth) || !isFinite(imgHeight) || imgWidth <= 0 || imgHeight <= 0) {
        throw new Error("Dimensiones de imagen inválidas para PDF")
      }

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

      // Validar calidad
      const validQuality = Math.min(Math.max(quality, 0.1), 1.0)

      // Agregar la primera página
      pdf.addImage(
        canvas.toDataURL("image/jpeg", validQuality),
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
          canvas.toDataURL("image/jpeg", validQuality),
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