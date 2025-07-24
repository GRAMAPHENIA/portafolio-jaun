"use client";

import type React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

export function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax effects for background elements
  const yBg = useTransform(scrollY, [0, 500], [0, -150]);
  const yContent = useTransform(scrollY, [0, 500], [0, -50]);
  
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/20 rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/30 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-px h-8 bg-accent/10"></div>
      </motion.div>

      <motion.div 
        style={{ y: yContent }}
        className="container mx-auto px-4 text-center"
      >
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            variants={staggerItem}
            className="w-1 h-16 bg-accent/60 mx-auto mb-12"
          ></motion.div>

          <motion.h1 
            className="font-heading text-6xl md:text-8xl font-light mb-8 leading-tight tracking-tight"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.span variants={staggerItem} className="inline-block">
              J<span className="text-accent">aun</span>
            </motion.span>
            <br />
            <motion.span variants={staggerItem} className="inline-block">
              <span className="text-accent">R</span>ojo
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={staggerItem}
            className="font-body text-lg text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed"
          >
            Exportación de estados que no terminan de resolverse.
          </motion.p>
          
          <motion.span 
            variants={staggerItem}
            className="font-body text-xs text-muted-foreground mb-16 max-w-md mx-auto leading-relaxed block"
          >
            Commit de advertencia.
          </motion.span>

          <motion.div 
            variants={staggerItem}
            className="w-12 h-px bg-muted-foreground/30 mx-auto"
          ></motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#proyectos"
        onClick={handleScrollToProjects}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 p-4 rounded-full hover:bg-muted/30 transition-colors duration-300 group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 1.2, duration: 0.6 }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            y: [0, 8, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
        </motion.div>
      </motion.a>
    </section>
  );
}
