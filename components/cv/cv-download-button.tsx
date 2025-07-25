"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, Briefcase, Palette, Loader2, ChevronDown } from "lucide-react"
import { cvFormats } from "@/data/cv-formats"
import { usePDFGenerator, useDownloadTracking } from "@/hooks/use-pdf-generator"
import { toast } from "sonner"

interface CVDownloadButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  showDropdown?: boolean
}

export function CVDownloadButton({ 
  variant = "default", 
  size = "default", 
  className = "",
  showDropdown = true 
}: CVDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { generatePDF, isGenerating } = usePDFGenerator()
  const { trackDownload } = useDownloadTracking()

  const handleDownload = async (formatId: string) => {
    const format = cvFormats.find(f => f.id === formatId)
    if (!format) return

    try {
      const filename = `CV_Jaun_Rojo_${format.name.replace(/\s+/g, '_')}.pdf`
      
      // Create a temporary element with the CV template
      const tempDiv = document.createElement('div')
      tempDiv.id = 'temp-cv-template'
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '-9999px'
      tempDiv.style.width = '210mm'
      tempDiv.style.backgroundColor = 'white'
      tempDiv.style.padding = '20mm'
      tempDiv.style.fontFamily = 'Arial, sans-serif'
      
      // Add basic CV content
      tempDiv.innerHTML = `
        <div style="max-width: 170mm; margin: 0 auto;">
          <h1 style="font-size: 32px; font-weight: bold; color: #111; margin-bottom: 8px;">Jaun Rojo</h1>
          <h2 style="font-size: 18px; color: #666; margin-bottom: 16px;">Desarrollador Full Stack</h2>
          
          <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #666; margin-bottom: 32px;">
            <div>📧 jaun@example.com</div>
            <div>📱 +34 XXX XXX XXX</div>
            <div>📍 Madrid, España</div>
            <div>🌐 https://juanrojo.dev</div>
          </div>

          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #111; margin-bottom: 12px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">
              ${format.template === "executive" ? "Perfil Ejecutivo" : 
                format.template === "creative" ? "Perfil Creativo" : "Resumen Profesional"}
            </h3>
            <p style="color: #374151; line-height: 1.6; font-size: 14px;">
              Desarrollador Full Stack con más de 4 años de experiencia creando aplicaciones web modernas y escalables. 
              Especializado en React, Next.js, Node.js y tecnologías cloud. Apasionado por el código limpio, 
              las mejores prácticas y la experiencia de usuario.
            </p>
          </div>

          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #111; margin-bottom: 12px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">
              Experiencia Laboral
            </h3>
            <div style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                <div>
                  <h4 style="font-weight: 600; color: #111; margin-bottom: 4px;">Desarrollador Full Stack</h4>
                  <p style="color: #666; margin: 0;">Freelance</p>
                </div>
                <div style="text-align: right; font-size: 12px; color: #666;">
                  <p style="margin: 0;">2022 - Presente</p>
                  <p style="margin: 0;">Remoto</p>
                </div>
              </div>
              <p style="color: #374151; font-size: 12px; margin-bottom: 12px;">
                Desarrollo de aplicaciones web personalizadas para diversos clientes, enfocándome en soluciones innovadoras y experiencias de usuario excepcionales.
              </p>
              <ul style="list-style: disc; margin-left: 20px; color: #374151; font-size: 12px;">
                <li>Desarrollé más de 15 proyectos web exitosos para clientes internacionales</li>
                <li>Implementé sistemas de gestión de contenido personalizados</li>
                <li>Optimicé aplicaciones existentes mejorando el rendimiento en un 40%</li>
              </ul>
            </div>
          </div>

          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #111; margin-bottom: 12px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">
              Habilidades Técnicas
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #374151; font-size: 12px;">React</span>
                <span style="font-size: 10px; color: #666;">95%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #374151; font-size: 12px;">Next.js</span>
                <span style="font-size: 10px; color: #666;">90%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #374151; font-size: 12px;">TypeScript</span>
                <span style="font-size: 10px; color: #666;">88%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #374151; font-size: 12px;">Node.js</span>
                <span style="font-size: 10px; color: #666;">85%</span>
              </div>
            </div>
          </div>

          <div>
            <h3 style="font-size: 16px; font-weight: 600; color: #111; margin-bottom: 12px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">
              Formación
            </h3>
            <div>
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 4px;">
                <div>
                  <h4 style="font-weight: 600; color: #111; margin-bottom: 2px; font-size: 14px;">Grado en Ingeniería Informática</h4>
                  <p style="color: #666; margin: 0; font-size: 12px;">Universidad Politécnica de Madrid</p>
                </div>
                <span style="font-size: 12px; color: #666;">2016 - 2020</span>
              </div>
            </div>
          </div>
        </div>
      `
      
      document.body.appendChild(tempDiv)
      
      await generatePDF('temp-cv-template', {
        filename,
        format: "a4",
        orientation: "portrait",
        quality: 0.95,
        scale: 1.5
      })

      // Clean up
      document.body.removeChild(tempDiv)
      
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
        return <FileText className="w-4 h-4" />
      case "executive":
        return <Briefcase className="w-4 h-4" />
      case "creative":
        return <Palette className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  if (!showDropdown) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => handleDownload("developer")}
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
            Descargar CV
          </>
        )}
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
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
              Descargar CV
              <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        {cvFormats.map((format) => (
          <DropdownMenuItem
            key={format.id}
            onClick={() => {
              handleDownload(format.id)
              setIsOpen(false)
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            {getFormatIcon(format.template)}
            <div className="flex flex-col">
              <span className="font-medium">{format.name}</span>
              <span className="text-xs text-muted-foreground">
                {format.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}