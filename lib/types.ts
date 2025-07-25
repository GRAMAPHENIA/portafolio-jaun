import type React from "react"
export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  gallery?: ProjectGalleryItem[]
  technologies: Technology[]
  url: string
  github?: string
  category: ProjectCategory
  tags: string[]
  featured?: boolean
  status: ProjectStatus
  startDate: Date
  endDate?: Date
  metrics?: ProjectMetrics
  testimonial?: ProjectTestimonial
  architecture?: string[]
  challenges?: string[]
  solutions?: string[]
  teamSize?: number
  role?: string
  client?: string
}

export interface Technology {
  name: string
  icon?: string
  category: TechnologyCategory
  color?: string
}

export interface ProjectGalleryItem {
  type: "image" | "video"
  url: string
  caption?: string
  thumbnail?: string
}

export interface ProjectMetrics {
  performance: number
  accessibility: number
  seo: number
  bestPractices: number
  loadTime?: number
  bundleSize?: number
}

export interface ProjectTestimonial {
  text: string
  author: string
  role: string
  company: string
  avatar?: string
  rating?: number
}

export type ProjectCategory = 
  | "Aplicación Web"
  | "Aplicación Móvil"
  | "Documentación"
  | "Educativo"
  | "E-commerce"
  | "Dashboard"
  | "API"
  | "Herramienta"
  | "Otro"

export type TechnologyCategory = 
  | "frontend"
  | "backend"
  | "database"
  | "tool"
  | "design"
  | "testing"
  | "deployment"

export type ProjectStatus = 
  | "completed"
  | "in-progress"
  | "maintenance"
  | "archived"

export interface ProjectFilter {
  categories: ProjectCategory[]
  technologies: string[]
  status: ProjectStatus[]
  featured?: boolean
  search?: string
}

export interface ProjectSort {
  field: "title" | "startDate" | "endDate" | "featured"
  direction: "asc" | "desc"
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

// Skills and Experience Types
export interface Skill {
  id: string
  name: string
  level: number // 1-100
  category: SkillCategory
  icon?: string
  color?: string
  yearsOfExperience: number
  projects?: string[] // Project IDs
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate?: Date
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
  location?: string
  type: ExperienceType
  website?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  description?: string
  achievements?: string[]
  logo?: string
  location?: string
}

export type SkillCategory = 
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "design"
  | "soft-skills"
  | "languages"

export type ExperienceType = 
  | "full-time"
  | "part-time"
  | "freelance"
  | "contract"
  | "internship"

export interface SkillFilter {
  categories: SkillCategory[]
  minLevel?: number
  search?: string
}

export interface CVFormat {
  id: string
  name: string
  description: string
  template: "developer" | "executive" | "creative"
  sections: CVSection[]
}

export interface CVSection {
  id: string
  name: string
  enabled: boolean
  order: number
}
