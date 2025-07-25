import type { ProjectCategory, TechnologyCategory } from "@/lib/types"

export const PROJECT_CATEGORIES: { value: ProjectCategory; label: string; description: string }[] = [
  {
    value: "Aplicación Web",
    label: "Aplicación Web",
    description: "Aplicaciones web completas con frontend y backend"
  },
  {
    value: "Aplicación Móvil",
    label: "Aplicación Móvil",
    description: "Aplicaciones nativas o híbridas para dispositivos móviles"
  },
  {
    value: "Documentación",
    label: "Documentación",
    description: "Plataformas y sistemas de documentación técnica"
  },
  {
    value: "Educativo",
    label: "Educativo",
    description: "Plataformas y herramientas educativas interactivas"
  },
  {
    value: "E-commerce",
    label: "E-commerce",
    description: "Tiendas online y plataformas de comercio electrónico"
  },
  {
    value: "Dashboard",
    label: "Dashboard",
    description: "Paneles de control y visualización de datos"
  },
  {
    value: "API",
    label: "API",
    description: "APIs y servicios backend"
  },
  {
    value: "Herramienta",
    label: "Herramienta",
    description: "Herramientas y utilidades para desarrolladores"
  },
  {
    value: "Otro",
    label: "Otro",
    description: "Otros tipos de proyectos"
  }
]

export const TECHNOLOGY_CATEGORIES: { value: TechnologyCategory; label: string; description: string }[] = [
  {
    value: "frontend",
    label: "Frontend",
    description: "Tecnologías de interfaz de usuario"
  },
  {
    value: "backend",
    label: "Backend",
    description: "Tecnologías de servidor y lógica de negocio"
  },
  {
    value: "database",
    label: "Base de Datos",
    description: "Sistemas de gestión de bases de datos"
  },
  {
    value: "tool",
    label: "Herramientas",
    description: "Librerías y herramientas de desarrollo"
  },
  {
    value: "design",
    label: "Diseño",
    description: "Herramientas de diseño y prototipado"
  },
  {
    value: "testing",
    label: "Testing",
    description: "Frameworks y herramientas de testing"
  },
  {
    value: "deployment",
    label: "Deployment",
    description: "Plataformas y herramientas de despliegue"
  }
]

export const PROJECT_STATUS_OPTIONS = [
  {
    value: "completed" as const,
    label: "Completado",
    description: "Proyecto finalizado y en producción"
  },
  {
    value: "in-progress" as const,
    label: "En Progreso",
    description: "Proyecto actualmente en desarrollo"
  },
  {
    value: "maintenance" as const,
    label: "Mantenimiento",
    description: "Proyecto en fase de mantenimiento"
  },
  {
    value: "archived" as const,
    label: "Archivado",
    description: "Proyecto archivado o descontinuado"
  }
]