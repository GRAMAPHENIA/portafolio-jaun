import type { Project } from "@/lib/types"
import { getTechnologyByName } from "./technologies"

// Helper function to safely get technology
const getTech = (name: string) => {
  const tech = getTechnologyByName(name)
  if (!tech) {
    console.warn(`Technology "${name}" not found`)
    return { name, category: "tool" as const, color: "#666666" }
  }
  return tech
}

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
      {
        type: "image",
        url: "/proyects/documentos-de-umbral-recorte.png",
        caption: "Vista principal de la plataforma de documentación"
      },
      {
        type: "image",
        url: "/placeholder.jpg",
        caption: "Sistema de búsqueda avanzada con Algolia"
      },
      {
        type: "image",
        url: "/placeholder.svg",
        caption: "Navegación por categorías y filtros"
      }
    ],
    technologies: [
      getTech("Next.js"),
      getTech("TypeScript"),
      getTech("Tailwind CSS"),
      getTech("MDX"),
      getTech("Algolia")
    ],
    url: "https://documentacion-de-casos-de-umbral.vercel.app/",
    github: "https://github.com/tu-usuario/documentacion-casos-umbral",
    category: "Documentación",
    tags: ["documentación", "búsqueda", "mdx", "casos de estudio"],
    featured: true,
    status: "completed",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-11-15"),
    teamSize: 2,
    role: "Full Stack Developer",
    client: "Proyecto Personal",
    architecture: [
      "Next.js App Router para SSR/SSG",
      "MDX para contenido dinámico",
      "Algolia para búsqueda en tiempo real",
      "Tailwind CSS para diseño responsive"
    ],
    challenges: [
      "Implementar búsqueda semántica eficiente",
      "Optimizar la carga de contenido MDX",
      "Crear navegación intuitiva para gran volumen de contenido"
    ],
    solutions: [
      "Integración con Algolia para búsqueda instantánea",
      "Lazy loading y code splitting para optimización",
      "Sistema de categorías jerárquico con breadcrumbs"
    ],
    metrics: {
      performance: 95,
      accessibility: 98,
      seo: 92,
      bestPractices: 96,
      loadTime: 1.2,
      bundleSize: 245
    },
    testimonial: {
      text: "La plataforma de documentación ha mejorado significativamente nuestra capacidad de organizar y acceder a información crítica. La búsqueda es increíblemente rápida y precisa.",
      author: "María González",
      role: "Directora de Proyecto",
      company: "Tech Solutions",
      avatar: "/placeholder-user.jpg",
      rating: 5
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
      {
        type: "image",
        url: "/proyects/el-palacio-dom.png",
        caption: "Dashboard principal de gestión de tareas"
      },
      {
        type: "image",
        url: "/placeholder.jpg",
        caption: "Vista de colaboración en tiempo real"
      }
    ],
    technologies: [
      getTech("React"),
      getTech("Node.js"),
      getTech("Socket.io"),
      getTech("MongoDB")
    ],
    url: "https://el-palacio-dom.vercel.app/",
    github: "https://github.com/example/tasks",
    category: "Aplicación Web",
    tags: ["colaboración", "tiempo real", "productividad", "gestión"],
    featured: false,
    status: "completed",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-09-30"),
    teamSize: 3,
    role: "Frontend Lead",
    client: "Startup Colaborativa",
    architecture: [
      "React con Context API para estado global",
      "Node.js + Express para API REST",
      "Socket.io para comunicación en tiempo real",
      "MongoDB para persistencia de datos"
    ],
    challenges: [
      "Sincronización de estado en tiempo real entre múltiples usuarios",
      "Optimización de rendimiento con grandes volúmenes de tareas",
      "Gestión de conflictos en edición colaborativa"
    ],
    solutions: [
      "Implementación de operational transformation para edición colaborativa",
      "Virtualización de listas para manejar miles de tareas",
      "Sistema de resolución de conflictos basado en timestamps"
    ],
    metrics: {
      performance: 88,
      accessibility: 94,
      seo: 85,
      bestPractices: 91,
      loadTime: 1.8,
      bundleSize: 312
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
      {
        type: "image",
        url: "/proyects/sesgos-cognitivos.png",
        caption: "Visualización interactiva de sesgos cognitivos"
      }
    ],
    technologies: [
      getTech("Vue.js"),
      getTech("D3.js"),
      getTech("Python"),
      getTech("FastAPI")
    ],
    url: "https://sesgos-cognitivos.vercel.app",
    github: "https://github.com/example/analytics",
    category: "Educativo",
    tags: ["educación", "psicología", "visualización", "interactivo"],
    featured: true,
    status: "completed",
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-06-15"),
    teamSize: 1,
    role: "Full Stack Developer",
    client: "Proyecto Académico",
    architecture: [
      "Vue.js 3 con Composition API",
      "D3.js para visualizaciones complejas",
      "FastAPI para backend de datos",
      "Python para procesamiento de datos psicológicos"
    ],
    challenges: [
      "Crear visualizaciones comprensibles de conceptos abstractos",
      "Optimizar rendimiento de animaciones complejas",
      "Diseñar interacciones intuitivas para usuarios no técnicos"
    ],
    solutions: [
      "Uso de metáforas visuales familiares para conceptos complejos",
      "Implementación de canvas para animaciones de alto rendimiento",
      "Testing extensivo con usuarios para validar UX"
    ],
    metrics: {
      performance: 92,
      accessibility: 89,
      seo: 94,
      bestPractices: 93,
      loadTime: 1.5,
      bundleSize: 278
    },
    testimonial: {
      text: "Una herramienta educativa excepcional que hace que conceptos complejos de psicología cognitiva sean accesibles y comprensibles a través de visualizaciones interactivas.",
      author: "Dr. Carlos Ruiz",
      role: "Profesor de Psicología",
      company: "Universidad Central",
      avatar: "/placeholder-user.jpg",
      rating: 5
    }
  },
  {
    id: "4",
    title: "Hiperstición",
    description:
      "Plataforma educativa con cursos interactivos, seguimiento de progreso y gamificación.",
    longDescription:
      "Una plataforma educativa moderna que combina contenido teórico con elementos interactivos y gamificación. Desarrollada con Next.js y Supabase, ofrece una experiencia de aprendizaje inmersiva con seguimiento de progreso, badges de logros y contenido adaptativo.",
    image: "/proyects/hipersticion-logo.png",
    gallery: [
      {
        type: "image",
        url: "/proyects/hipersticion-logo.png",
        caption: "Landing page de la plataforma educativa"
      }
    ],
    technologies: [
      getTech("Next.js"),
      getTech("Supabase"),
      getTech("Tailwind CSS"),
      getTech("Framer Motion")
    ],
    url: "https://hipersticion-web.vercel.app/",
    github: "https://github.com/example/learning",
    category: "Educativo",
    tags: ["educación", "gamificación", "cursos", "interactivo"],
    featured: false,
    status: "in-progress",
    startDate: new Date("2023-10-01"),
    teamSize: 2,
    role: "Frontend Developer",
    client: "Plataforma Educativa",
    architecture: [
      "Next.js 13 con App Router",
      "Supabase para autenticación y base de datos",
      "Framer Motion para animaciones educativas",
      "Tailwind CSS para diseño responsive"
    ],
    challenges: [
      "Crear experiencias de aprendizaje engaging",
      "Implementar sistema de progreso complejo",
      "Optimizar para diferentes dispositivos educativos"
    ],
    solutions: [
      "Gamificación con sistema de puntos y badges",
      "Algoritmo adaptativo de contenido",
      "PWA para acceso offline en tablets"
    ],
    metrics: {
      performance: 91,
      accessibility: 96,
      seo: 88,
      bestPractices: 94,
      loadTime: 1.4,
      bundleSize: 298
    }
  },
  {
    id: "5",
    title: "Columne",
    description:
      "Herramienta de generación de contenido impulsada por IA con optimización SEO.",
    longDescription:
      "Una herramienta avanzada de generación de contenido que utiliza IA para crear artículos optimizados para SEO. Integra OpenAI API para generación de texto, análisis de keywords y optimización automática de contenido para motores de búsqueda.",
    image: "/proyects/columne.png",
    gallery: [
      {
        type: "image",
        url: "/proyects/columne.png",
        caption: "Interface de generación de contenido con IA"
      }
    ],
    technologies: [
      getTech("React"),
      getTech("OpenAI API"),
      getTech("Express"),
      getTech("AWS")
    ],
    url: "https://example.com",
    github: "https://github.com/example/ai-content",
    category: "Herramienta",
    tags: ["ia", "contenido", "seo", "automatización"],
    featured: true,
    status: "completed",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-12-20"),
    teamSize: 4,
    role: "Full Stack Developer",
    client: "Agencia de Marketing",
    architecture: [
      "React SPA con estado global Redux",
      "Express.js API con middleware de autenticación",
      "OpenAI GPT-4 para generación de contenido",
      "AWS Lambda para procesamiento escalable"
    ],
    challenges: [
      "Integrar múltiples modelos de IA de forma eficiente",
      "Crear sistema de templates flexible",
      "Optimizar costos de API de OpenAI"
    ],
    solutions: [
      "Cache inteligente para reducir llamadas a API",
      "Sistema de templates basado en JSON Schema",
      "Batching de requests para optimizar costos"
    ],
    metrics: {
      performance: 87,
      accessibility: 92,
      seo: 96,
      bestPractices: 89,
      loadTime: 2.1,
      bundleSize: 456
    },
    testimonial: {
      text: "Columne ha revolucionado nuestro proceso de creación de contenido. La calidad del contenido generado es excepcional y el tiempo de producción se ha reducido en un 70%.",
      author: "Ana Martínez",
      role: "Content Manager",
      company: "Digital Marketing Pro",
      avatar: "/placeholder-user.jpg",
      rating: 4
    }
  },
  {
    id: "6",
    title: "registros-de-consolas-de-umbral",
    description:
      "Aplicación de seguimiento de registros de consolas de umbral con análisis detallados.",
    longDescription:
      "Una aplicación móvil desarrollada en React Native para el seguimiento y análisis de registros de consolas de umbral. Integra con HealthKit para datos de salud y Firebase para sincronización en tiempo real entre dispositivos.",
    image: "/proyects/registro-de-consolas-de-umbral.png",
    gallery: [
      {
        type: "image",
        url: "/proyects/registro-de-consolas-de-umbral.png",
        caption: "Dashboard móvil de seguimiento de registros"
      }
    ],
    technologies: [
      getTech("React Native"),
      getTech("Firebase"),
      getTech("HealthKit")
    ],
    url: "https://example.com",
    github: "https://github.com/example/fitness",
    category: "Aplicación Móvil",
    tags: ["móvil", "salud", "seguimiento", "análisis"],
    featured: false,
    status: "maintenance",
    startDate: new Date("2023-03-01"),
    endDate: new Date("2023-08-15"),
    teamSize: 2,
    role: "Mobile Developer",
    client: "Aplicación de Salud",
    architecture: [
      "React Native con navegación nativa",
      "Firebase Firestore para datos en tiempo real",
      "HealthKit para integración con datos de salud",
      "Redux Toolkit para gestión de estado"
    ],
    challenges: [
      "Integración compleja con HealthKit",
      "Sincronización offline-first",
      "Optimización de batería para tracking continuo"
    ],
    solutions: [
      "Wrapper nativo personalizado para HealthKit",
      "Redux Persist con estrategia de sincronización",
      "Background tasks optimizados para iOS/Android"
    ],
    metrics: {
      performance: 85,
      accessibility: 91,
      seo: 0, // No aplica para app móvil
      bestPractices: 88,
      loadTime: 2.3,
      bundleSize: 12.5 // MB para app móvil
    }
  },
];
