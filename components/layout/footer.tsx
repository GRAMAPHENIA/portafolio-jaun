import type React from "react"
import { Github, Linkedin, Mail, Instagram, Youtube } from "lucide-react"

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
]

export function Footer() {
  return (
    <footer id="contacto" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-muted-foreground/20"></div>
            <div className="w-1.5 h-1.5 bg-accent/60 rounded-full"></div>
            <div className="w-12 h-px bg-muted-foreground/20"></div>
          </div>

          <div className="flex gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="p-4 rounded-2xl hover:bg-muted/20 transition-all duration-300 group"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 font-body text-xs text-muted-foreground/40 uppercase tracking-widest">
            <span>MMXXIV</span>
            <div className="w-px h-3 bg-muted-foreground/20"></div>
            <span className="font-heading font-light normal-case tracking-wide">Elaborado por Jaun</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
