"use client";

import { useState, useEffect } from "react";
import { Home, FolderOpen, Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type NavItem = {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { icon: Home, href: "#inicio", label: "Inicio" },
  { icon: FolderOpen, href: "#proyectos", label: "Proyectos" },
  { icon: Mail, href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Actualizar sección activa al hacer scroll
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;
      isScrolling = true;

      const scrollPosition = window.scrollY + 100;
      const windowHeight = window.innerHeight;

      // Verificar si estamos en la sección de contacto
      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        if (contactRect.top <= windowHeight * 0.5 && contactRect.bottom >= windowHeight * 0.3) {
          setActiveSection("contacto");
          isScrolling = false;
          return;
        }
      }

      // Buscar la sección más cercana al centro
      let newActiveSection = "inicio";
      let closestDistance = Infinity;

      navItems.forEach(({ href }) => {
        const sectionId = href.replace("#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementMiddle = (top + bottom) / 2;
          const distance = Math.abs(windowHeight / 2 - elementMiddle);

          if (distance < closestDistance) {
            closestDistance = distance;
            newActiveSection = sectionId;
          }
        }
      });

      setActiveSection(prev => {
        if (prev !== newActiveSection) {
          return newActiveSection;
        }
        return prev;
      });

      isScrolling = false;
    };

    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Verificar posición inicial

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");

    // Actualizar la sección activa inmediatamente
    setActiveSection(sectionId);
    setIsMenuOpen(false);

    // Scroll especial para cada sección
    if (sectionId === 'contacto') {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
      return;
    }

    // Para otras secciones
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Reducido para mejor alineación
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4">
      <div className="bg-background/70 backdrop-blur-md border border-border/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo o indicador */}
          <div className="w-2 h-2 rounded-full bg-accent/80" />

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ icon: Icon, href, label }) => {
              const isActive = activeSection === href.replace("#", "");
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`p-2.5 rounded-lg transition-colors ${isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/90"
                    }`}
                  title={label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <Icon
                      className={`w-4 h-4 transition-transform ${isActive ? "scale-110" : "scale-100"
                        }`}
                    />
                  </div>
                  <span className="sr-only">{label}</span>
                </a>
              );
            })}
          </nav>

          {/* Controles móviles */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              className="md:hidden p-2 -mr-1 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-3 pt-3 border-t border-border/30"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map(({ icon: Icon, href, label }) => {
                const isActive = activeSection === href.replace("#", "");
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm ${isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground/90"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
