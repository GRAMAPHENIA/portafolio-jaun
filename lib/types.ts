import type React from "react"
export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  gallery?: string[]
  technologies: string[]
  url: string
  github?: string
  category?: string
  featured?: boolean
  metrics?: ProjectMetrics
  testimonial?: ProjectTestimonial
}

export interface ProjectMetrics {
  performance: number
  accessibility: number
  seo: number
  bestPractices: number
}

export interface ProjectTestimonial {
  text: string
  author: string
  role: string
  company: string
  avatar?: string
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
