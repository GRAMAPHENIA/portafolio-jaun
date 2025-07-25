"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/lib/types"
import { getTechIcon } from "@/lib/tech-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!project || !isVisible) return null

  const images = project.gallery || [project.image]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modal */}
      <div
        className={`fixed inset-4 md:inset-8 lg:inset-16 bg-background border border-border rounded-2xl z-50 overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-5'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                {project.title}
              </h2>
              {project.category && (
                <Badge variant="secondary" className="mt-2">
                  {project.category}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} - Imagen ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Image thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? "border-accent"
                            : "border-transparent hover:border-muted-foreground"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-3">
                    Descripción
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-3">
                    Tecnologías
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => {
                      const Icon = getTechIcon(tech)
                      return (
                        <div
                          key={tech}
                          className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{tech}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-3">
                      Métricas de Lighthouse
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">
                          {project.metrics.performance}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Performance
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {project.metrics.accessibility}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Accessibility
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600">
                          {project.metrics.seo}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          SEO
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">
                          {project.metrics.bestPractices}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Best Practices
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-3">
                      Testimonio
                    </h3>
                    <div className="bg-muted rounded-lg p-4">
                      <blockquote className="text-muted-foreground italic mb-4">
                        "{project.testimonial.text}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        {project.testimonial.avatar && (
                          <img
                            src={project.testimonial.avatar}
                            alt={project.testimonial.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-foreground">
                            {project.testimonial.author}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {project.testimonial.role} en {project.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button asChild className="flex-1">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Proyecto
                    </a>
                  </Button>
                  {project.github && (
                    <Button variant="outline" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Código
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}