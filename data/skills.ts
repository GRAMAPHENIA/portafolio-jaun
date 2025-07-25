import type { Skill } from "@/lib/types"

export const skills: Skill[] = [
  // Frontend Skills
  {
    id: "react",
    name: "React",
    level: 95,
    category: "frontend",
    color: "#61DAFB",
    yearsOfExperience: 4,
    projects: ["el-palacio-dom", "sesgos-cognitivos", "columne"],
    description: "Desarrollo avanzado con React, hooks, context API y patrones de diseño"
  },
  {
    id: "nextjs",
    name: "Next.js",
    level: 90,
    category: "frontend",
    color: "#000000",
    yearsOfExperience: 3,
    projects: ["portfolio", "el-palacio-dom"],
    description: "SSR, SSG, App Router, API Routes y optimización de rendimiento"
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: 88,
    category: "frontend",
    color: "#3178C6",
    yearsOfExperience: 3,
    projects: ["portfolio", "columne", "sesgos-cognitivos"],
    description: "Tipado estático, interfaces avanzadas y patrones de diseño"
  },
  {
    id: "vue",
    name: "Vue.js",
    level: 85,
    category: "frontend",
    color: "#4FC08D",
    yearsOfExperience: 2,
    projects: ["hipersticion"],
    description: "Composition API, Vuex, Vue Router y componentes reutilizables"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    level: 92,
    category: "frontend",
    color: "#06B6D4",
    yearsOfExperience: 3,
    projects: ["portfolio", "el-palacio-dom", "columne"],
    description: "Diseño responsive, componentes personalizados y optimización"
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    level: 80,
    category: "frontend",
    color: "#0055FF",
    yearsOfExperience: 2,
    projects: ["portfolio", "sesgos-cognitivos"],
    description: "Animaciones complejas, transiciones y micro-interacciones"
  },

  // Backend Skills
  {
    id: "nodejs",
    name: "Node.js",
    level: 85,
    category: "backend",
    color: "#339933",
    yearsOfExperience: 3,
    projects: ["columne", "registros-consolas"],
    description: "APIs REST, middleware, autenticación y manejo de archivos"
  },
  {
    id: "python",
    name: "Python",
    level: 82,
    category: "backend",
    color: "#3776AB",
    yearsOfExperience: 2,
    projects: ["documentacion-umbral"],
    description: "FastAPI, procesamiento de datos y automatización"
  },
  {
    id: "express",
    name: "Express.js",
    level: 80,
    category: "backend",
    color: "#000000",
    yearsOfExperience: 2,
    projects: ["columne"],
    description: "Routing, middleware, validación y manejo de errores"
  },

  // Database Skills
  {
    id: "mongodb",
    name: "MongoDB",
    level: 78,
    category: "database",
    color: "#47A248",
    yearsOfExperience: 2,
    projects: ["columne"],
    description: "Modelado de datos, agregaciones y optimización de consultas"
  },
  {
    id: "firebase",
    name: "Firebase",
    level: 75,
    category: "database",
    color: "#FFCA28",
    yearsOfExperience: 2,
    projects: ["sesgos-cognitivos"],
    description: "Firestore, Authentication, Storage y Cloud Functions"
  },
  {
    id: "supabase",
    name: "Supabase",
    level: 70,
    category: "database",
    color: "#3ECF8E",
    yearsOfExperience: 1,
    projects: ["el-palacio-dom"],
    description: "PostgreSQL, Row Level Security y Real-time subscriptions"
  },

  // Tools & Technologies
  {
    id: "git",
    name: "Git",
    level: 90,
    category: "tools",
    color: "#F05032",
    yearsOfExperience: 4,
    description: "Control de versiones, branching strategies y colaboración"
  },
  {
    id: "docker",
    name: "Docker",
    level: 70,
    category: "tools",
    color: "#2496ED",
    yearsOfExperience: 1,
    description: "Containerización, Docker Compose y deployment"
  },
  {
    id: "aws",
    name: "AWS",
    level: 65,
    category: "tools",
    color: "#FF9900",
    yearsOfExperience: 1,
    description: "S3, Lambda, CloudFront y servicios básicos"
  },

  // Design Skills
  {
    id: "figma",
    name: "Figma",
    level: 85,
    category: "design",
    color: "#F24E1E",
    yearsOfExperience: 3,
    description: "Prototipado, sistemas de diseño y colaboración"
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    level: 80,
    category: "design",
    color: "#FF6B6B",
    yearsOfExperience: 3,
    description: "Experiencia de usuario, accesibilidad y diseño responsive"
  },

  // Soft Skills
  {
    id: "problem-solving",
    name: "Resolución de Problemas",
    level: 90,
    category: "soft-skills",
    color: "#9C88FF",
    yearsOfExperience: 5,
    description: "Análisis crítico, debugging y optimización de soluciones"
  },
  {
    id: "communication",
    name: "Comunicación",
    level: 85,
    category: "soft-skills",
    color: "#4ECDC4",
    yearsOfExperience: 5,
    description: "Documentación técnica, presentaciones y trabajo en equipo"
  },
  {
    id: "leadership",
    name: "Liderazgo",
    level: 75,
    category: "soft-skills",
    color: "#45B7D1",
    yearsOfExperience: 2,
    description: "Mentoría, gestión de proyectos y toma de decisiones"
  },

  // Languages
  {
    id: "spanish",
    name: "Español",
    level: 100,
    category: "languages",
    color: "#FF4757",
    yearsOfExperience: 25,
    description: "Nativo"
  },
  {
    id: "english",
    name: "Inglés",
    level: 85,
    category: "languages",
    color: "#3742FA",
    yearsOfExperience: 10,
    description: "Avanzado - Documentación técnica y comunicación profesional"
  }
]

export const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category)
}

export const getSkillById = (id: string) => {
  return skills.find(skill => skill.id === id)
}

export const getTopSkills = (limit: number = 10) => {
  return skills
    .sort((a, b) => b.level - a.level)
    .slice(0, limit)
}

export const skillCategories = [
  { id: "frontend", name: "Frontend", color: "#61DAFB" },
  { id: "backend", name: "Backend", color: "#339933" },
  { id: "database", name: "Base de Datos", color: "#47A248" },
  { id: "tools", name: "Herramientas", color: "#FF9900" },
  { id: "design", name: "Diseño", color: "#F24E1E" },
  { id: "soft-skills", name: "Habilidades Blandas", color: "#9C88FF" },
  { id: "languages", name: "Idiomas", color: "#FF4757" }
]