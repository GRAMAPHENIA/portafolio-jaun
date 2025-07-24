"use client"

import { useState } from "react"
import { AnimatedSection } from "./animated-section"
import { LoadingScreen, LoadingSpinner } from "../ui/loading-screen"
import { SkeletonLoader } from "../ui/skeleton-loader"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export function AnimationDemo() {
  const [showLoading, setShowLoading] = useState(false)
  const [showSkeletons, setShowSkeletons] = useState(false)

  const handleShowLoading = () => {
    setShowLoading(true)
    setTimeout(() => setShowLoading(false), 3000)
  }

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-3xl font-bold text-center">Sistema de Animaciones</h2>
      
      {/* Animation Variants Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatedSection animation="fadeInUp">
          <Card>
            <CardHeader>
              <CardTitle>Fade In Up</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Esta tarjeta aparece desde abajo con un efecto de desvanecimiento.</p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fadeInLeft" delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Fade In Left</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Esta tarjeta aparece desde la izquierda con un pequeño retraso.</p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="scaleIn" delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle>Scale In</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Esta tarjeta aparece con un efecto de escala.</p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>

      {/* Loading Components Demo */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Componentes de Carga</h3>
        
        <div className="flex gap-4">
          <Button onClick={handleShowLoading}>
            Mostrar Pantalla de Carga
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setShowSkeletons(!showSkeletons)}
          >
            {showSkeletons ? "Ocultar" : "Mostrar"} Skeletons
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span>Spinner inline:</span>
          <LoadingSpinner size="sm" />
          <LoadingSpinner size="md" />
          <LoadingSpinner size="lg" />
        </div>
      </div>

      {/* Skeleton Loaders Demo */}
      {showSkeletons && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Skeleton Loaders</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-4">Proyecto</h4>
              <SkeletonLoader variant="project" />
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Blog</h4>
              <SkeletonLoader variant="blog" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Testimonial</h4>
            <SkeletonLoader variant="testimonial" />
          </div>
        </div>
      )}

      {/* Staggered Animation Demo */}
      <AnimatedSection animation="stagger">
        <h3 className="text-2xl font-semibold mb-4">Animación Escalonada</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <AnimatedSection key={i} animation="fadeInUp">
              <Card>
                <CardContent className="p-4">
                  <p>Elemento {i + 1}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      <LoadingScreen isLoading={showLoading} />
    </div>
  )
}