import type { Project } from "@/lib/types"

export const projects: Project[] = [
  {
    id: "1",
    title: "Documentación de Casos de Umbral",
    description:
      "Plataforma de documentación para casos de umbral con búsqueda avanzada y navegación intuitiva.",
    longDescription:
      "Una plataforma completa de documentación desarrollada con Next.js que permite a los usuarios explorar casos de umbral de manera intuitiva. Incluye búsqueda avanzada con Algolia, navegación por categorías, y un sistema de contenido basado en MDX para facilitar la creación y mantenimiento de documentación técnica.",
    image: "/proyects/documentos-de-umbral-recorte.png",
    gallery: [
      "/proyects/documentos-de-umbral-recorte.png",
      "/placeholder.jpg",
      "/placeholder.svg"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Algolia"],
    url: "https://documentacion-de-casos-de-umbral.vercel.app/",
    github: "https://github.com/tu-usuario/documentacion-casos-umbral",
    category: "Documentación",
    featured: true,
    metrics: {
      performance: 95,
      accessibility: 98,
      seo: 92,
      bestPractices: 96
    },
    testimonial: {
      text: "La plataforma de documentación ha mejorado significativamente nuestra capacidad de organizar y acceder a información crítica. La búsqueda es increíblemente rápida y precisa.",
      author: "María González",
      role: "Directora de Proyecto",
      company: "Tech Solutions",
      avatar: "/placeholder-user.jpg"
    }
  },
  {
    id: "2",
    title: "El Palacio Dom",
    description:
      "Aplicación de gestión de tareas colaborativa con tiempo real y sincronización multiplataforma.",
    longDescription:
      "Una aplicación web completa para gestión de tareas colaborativas que permite a los equipos trabajar de manera sincronizada en tiempo real. Desarrollada con React y Node.js, incluye funcionalidades como asignación de tareas, seguimiento de progreso, notificaciones en tiempo real y sincronización multiplataforma.",
    image: "/proyects/el-palacio-dom.png",
    gallery: [
      "/proyects/el-palacio-dom.png",
      "/placeholder.jpg"
    ],
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    url: "https://el-palacio-dom.vercel.app/",
    github: "https://github.com/example/tasks",
    category: "Aplicación Web",
    featured: false,
    metrics: {
      performance: 88,
      accessibility: 94,
      seo: 85,
      bestPractices: 91
    }
  },
  {
    id: "3",
    title: "Sesgos cognitivos",
    description:
      "Dashboard de analíticas en tiempo real con visualizaciones interactivas y reportes automatizados.",
    longDescription:
      "Un dashboard interactivo que explora y visualiza diferentes tipos de sesgos cognitivos. Desarrollado con Vue.js y D3.js para crear visualizaciones dinámicas e interactivas que ayudan a entender cómo funcionan estos sesgos en la toma de decisiones. Incluye ejemplos prácticos y ejercicios interactivos.",
    image: "/proyects/sesgos-cognitivos.png",
    gallery: [
      "/proyects/sesgos-cognitivos.png"
    ],
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    url: "https://sesgos-cognitivos.vercel.app",
    github: "https://github.com/example/analytics",
    category: "Educativo",
    featured: true,
    metrics: {
      performance: 92,
      accessibility: 89,
      seo: 94,
      bestPractices: 93
    },
    testimonial: {
      text: "Una herramienta educativa excepcional que hace que conceptos complejos de psicología cognitiva sean accesibles y comprensibles a través de visualizaciones interactivas.",
      author: "Dr. Carlos Ruiz",
      role: "Profesor de Psicología",
      company: "Universidad Central",
      avatar: "/placeholder-user.jpg"
    }
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
    title: "registros-de-consolas-de-umbral",
    description:
      "Aplicación de seguimiento de registros de consolas de umbral con análisis detallados.",
    image: "/proyects/registro-de-consolas-de-umbral.png",
    technologies: ["React Native", "Firebase", "HealthKit"],
    url: "https://example.com",
    github: "https://github.com/example/fitness",
  },
];
