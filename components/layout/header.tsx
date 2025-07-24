"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.header 
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.div 
        className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-2xl px-8 py-4"
        whileHover={{ 
          borderColor: "hsl(var(--accent) / 0.3)",
          transition: { duration: 0.3 }
        }}
      >
        <div className="flex items-center gap-8">
          <motion.div 
            className="w-2 h-2 bg-accent/60 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          ></motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "")
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative p-2 rounded-xl group"
                  title={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-accent/20 rounded-xl"
                      layoutId="activeBackground"
                      initial={false}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }}
                    />
                  )}
                  <motion.div
                    className="relative"
                    animate={{ 
                      color: isActive ? "hsl(var(--accent))" : "hsl(var(--foreground))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                </motion.a>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <ThemeToggle />
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{ 
                        color: isActive ? "hsl(var(--accent))" : "hsl(var(--foreground))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <span className={`font-body text-sm ${isActive ? 'text-accent' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="w-1 h-1 bg-accent rounded-full ml-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
