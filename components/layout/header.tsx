"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { Home, FolderOpen, Mail, Menu, X } from "lucide-react"
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
  const [activeSection, setActiveSection] = useState("inicio")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "proyectos", "contacto"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)
    
    setActiveSection(targetId)
    setIsMobileMenuOpen(false)

    if (targetElement) {
      const headerOffset = 100
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-2xl px-6 py-4 hover:border-accent/30 transition-colors duration-300">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Indicator */}
          <div className="flex items-center">
            <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
          </div>

          {/* Right-Center - Navigation */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative p-2 rounded-xl group transition-colors duration-300"
                    title={item.label}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-accent/20 rounded-xl"></div>
                    )}
                    <div className="relative">
                      <item.icon 
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? 'text-accent' : 'text-foreground'
                        }`} 
                      />
                    </div>
                  </a>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4">
          <nav className="flex flex-col gap-2">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "")
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                >
                  <div>
                    <item.icon 
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? 'text-accent' : 'text-foreground'
                      }`} 
                    />
                  </div>
                  <span className={`font-body text-sm ${isActive ? 'text-accent' : 'text-foreground'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="w-1 h-1 bg-accent rounded-full ml-auto"></div>
                  )}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
