import type React from "react"
export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  url: string
  github?: string
}

export interface NavigationItem {
  label: string
  href: string
}

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}
