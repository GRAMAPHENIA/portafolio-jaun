import type { Project } from "@/lib/types"

export const projects: Project[] = [
  {
    id: "1",
    title: "Documentación de Casos de Umbral",
    description:
      "Plataforma de documentación para casos de umbral con búsqueda avanzada y navegación intuitiva.",
    image: "/proyects/documentos-de-umbral-recorte.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Algolia"],
    url: "https://documentacion-de-casos-de-umbral.vercel.app/",
    github: "https://github.com/tu-usuario/documentacion-casos-umbral",
  },
  {
    id: "2",
    title: "El Palacio Dom",
    description:
      "Aplicación de gestión de tareas colaborativa con tiempo real y sincronización multiplataforma.",
    image: "/proyects/el-palacio-dom.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    url: "https://el-palacio-dom.vercel.app/",
    github: "https://github.com/example/tasks",
  },
  {
    id: "3",
    title: "Sesgos cognitivos",
    description:
      "Dashboard de analíticas en tiempo real con visualizaciones interactivas y reportes automatizados.",
    image: "/proyects/sesgos-cognitivos.png",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    url: "https://sesgos-cognitivos.vercel.app",
    github: "https://github.com/example/analytics",
  },
  {
    id: "4",
    title: "Hiperstición",
    description:
      "Plataforma educativa con cursos interactivos, seguimiento de progreso y gamificación.",
    image: "/proyects/hipersticion-logo.png",
    technologies: ["Next.js", "Supabase", "Tailwind", "Framer Motion"],
    url: "https://hipersticion-web.vercel.app/",
    github: "https://github.com/example/learning",
  },
  {
    id: "5",
    title: "Columne",
    description:
      "Herramienta de generación de contenido impulsada por IA con optimización SEO.",
    image: "/proyects/columne.png",
    technologies: ["React", "OpenAI API", "Express", "AWS"],
    url: "https://example.com",
    github: "https://github.com/example/ai-content",
  },
  {
    id: "6",
    title: "Fitness Tracker",
    description:
      "Aplicación de seguimiento fitness con planes personalizados y métricas detalladas.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React Native", "Firebase", "HealthKit"],
    url: "https://example.com",
    github: "https://github.com/example/fitness",
  },
];
