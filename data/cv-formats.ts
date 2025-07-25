import type { CVFormat } from "@/lib/types"

export const cvFormats: CVFormat[] = [
  {
    id: "developer",
    name: "Desarrollador Full Stack",
    description: "CV técnico enfocado en habilidades de desarrollo y proyectos",
    template: "developer",
    sections: [
      { id: "personal", name: "Información Personal", enabled: true, order: 1 },
      { id: "summary", name: "Resumen Profesional", enabled: true, order: 2 },
      { id: "skills", name: "Habilidades Técnicas", enabled: true, order: 3 },
      { id: "experience", name: "Experiencia Laboral", enabled: true, order: 4 },
      { id: "projects", name: "Proyectos Destacados", enabled: true, order: 5 },
      { id: "education", name: "Formación", enabled: true, order: 6 },
      { id: "languages", name: "Idiomas", enabled: true, order: 7 },
      { id: "certifications", name: "Certificaciones", enabled: false, order: 8 }
    ]
  },
  {
    id: "executive",
    name: "Ejecutivo/Consultor",
    description: "CV empresarial enfocado en liderazgo y resultados de negocio",
    template: "executive",
    sections: [
      { id: "personal", name: "Información Personal", enabled: true, order: 1 },
      { id: "summary", name: "Perfil Ejecutivo", enabled: true, order: 2 },
      { id: "experience", name: "Experiencia Profesional", enabled: true, order: 3 },
      { id: "achievements", name: "Logros Clave", enabled: true, order: 4 },
      { id: "skills", name: "Competencias", enabled: true, order: 5 },
      { id: "education", name: "Formación", enabled: true, order: 6 },
      { id: "projects", name: "Proyectos Estratégicos", enabled: false, order: 7 },
      { id: "languages", name: "Idiomas", enabled: true, order: 8 }
    ]
  },
  {
    id: "creative",
    name: "Creativo/Diseñador",
    description: "CV visual enfocado en diseño y creatividad",
    template: "creative",
    sections: [
      { id: "personal", name: "Información Personal", enabled: true, order: 1 },
      { id: "summary", name: "Perfil Creativo", enabled: true, order: 2 },
      { id: "projects", name: "Portfolio", enabled: true, order: 3 },
      { id: "skills", name: "Habilidades de Diseño", enabled: true, order: 4 },
      { id: "experience", name: "Experiencia", enabled: true, order: 5 },
      { id: "education", name: "Formación", enabled: true, order: 6 },
      { id: "tools", name: "Herramientas", enabled: true, order: 7 },
      { id: "languages", name: "Idiomas", enabled: true, order: 8 }
    ]
  }
]

export const personalInfo = {
  name: "Jaun Rojo",
  title: "Desarrollador Full Stack",
  email: "jaun@example.com",
  phone: "+34 XXX XXX XXX",
  location: "Madrid, España",
  website: "https://juanrojo.dev",
  linkedin: "https://linkedin.com/in/juanrojo",
  github: "https://github.com/juanrojo",
  summary: {
    developer: "Desarrollador Full Stack con más de 4 años de experiencia creando aplicaciones web modernas y escalables. Especializado en React, Next.js, Node.js y tecnologías cloud. Apasionado por el código limpio, las mejores prácticas y la experiencia de usuario.",
    executive: "Profesional tecnológico con sólida experiencia en desarrollo de software y consultoría técnica. Demostrada capacidad para liderar proyectos complejos, optimizar procesos y entregar soluciones que generan valor de negocio.",
    creative: "Desarrollador con fuerte enfoque en diseño y experiencia de usuario. Combino habilidades técnicas con sensibilidad visual para crear interfaces atractivas y funcionales que conectan con los usuarios."
  }
}

export const getCVFormatById = (id: string) => {
  return cvFormats.find(format => format.id === id)
}

export const getEnabledSections = (formatId: string) => {
  const format = getCVFormatById(formatId)
  if (!format) return []
  
  return format.sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)
}