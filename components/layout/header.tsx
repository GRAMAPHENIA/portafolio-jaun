"use client"

import type React from "react"
import { Home, FolderOpen, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

const navigationItems: NavigationItem[] = [
  { icon: Home, href: "#inicio", label: "Inicio" },
  { icon: FolderOpen, href: "#proyectos", label: "Proyectos" },
  { icon: Mail, href: "#contacto", label: "Contacto" },
]

export function Header() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const headerOffset = 100
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-2xl px-8 py-4">
        <div className="flex items-center gap-8">
          <div className="w-2 h-2 bg-accent/60 rounded-full"></div>

          <nav className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="p-2 rounded-xl hover:bg-muted/50 transition-all duration-300 group"
                title={item.label}
              >
                <item.icon className="w-5 h-5 group-hover:text-foreground/80 transition-colors duration-300" />
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
