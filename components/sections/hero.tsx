"use client";

import type React from "react";
import { ArrowDown } from "lucide-react";
import { CVDownloadButton } from "@/components/cv/cv-download-button";

export function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("proyectos");

    if (projectsSection) {
      const headerOffset = 100;
      const elementPosition = projectsSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/20 rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/30 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-px h-8 bg-accent/10"></div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-1 h-16 bg-accent/60 mx-auto mb-12"></div>

          <h1 className="font-heading text-6xl md:text-8xl font-light mb-8 leading-tight tracking-tight">
            <span className="inline-block">
              J<span className="text-accent">aun</span>
            </span>
            <br />
            <span className="inline-block">
              <span className="text-accent">R</span>ojo
            </span>
          </h1>

          <p className="font-body text-lg text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed">
            Exportación de estados que no terminan de resolverse.
          </p>
          
          <span className="font-body text-xs text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed block">
            Commit de advertencia.
          </span>

          <div className="flex justify-center mb-16">
            <CVDownloadButton 
              variant="outline" 
              size="lg"
              className="hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
            />
          </div>

          <div className="w-12 h-px bg-muted-foreground/30 mx-auto"></div>
        </div>
      </div>

      <a
        href="#proyectos"
        onClick={handleScrollToProjects}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 p-4 rounded-full hover:bg-muted/30 transition-colors duration-300 group"
      >
        <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
      </a>
    </section>
  );
}
