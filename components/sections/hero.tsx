"use client";

import type React from "react";

import { ArrowDown } from "lucide-react";

export function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("proyectos");

    if (projectsSection) {
      const headerOffset = 100;
      const elementPosition = projectsSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden "
    >
      <div className="container mx-auto px-4 text-center ">
        <div className="max-w-4xl mx-auto ">
          <div className="w-1 h-16 bg-accent/60 mx-auto mb-12"></div>

          <h1 className="font-heading text-6xl md:text-8xl font-light mb-8 leading-tight tracking-tight">
            J<span className="text-accent">aun</span>
            <br />
            <span className="text-accent">R</span>ojo
          </h1>

          <p className="font-body text-lg text-muted-foreground mb-16 max-w-md mx-auto leading-relaxed">
            Exportación de estados que no terminan de resolverse.
          </p>
          <span className="font-body text-xs text-muted-foreground mb-16 max-w-md mx-auto leading-relaxed">
            Commit de advertencia.
          </span>

          <div className="w-12 h-px bg-muted-foreground/30 mx-auto"></div>
        </div>
      </div>

      <a
        href="#proyectos"
        onClick={handleScrollToProjects}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 p-4 rounded-full hover:bg-muted/30 transition-colors duration-300"
      >
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </a>
    </section>
  );
}
