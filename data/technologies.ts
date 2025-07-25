import type { Technology } from "@/lib/types"

export const technologies: Technology[] = [
  // Frontend
  {
    name: "React",
    category: "frontend",
    color: "#61DAFB"
  },
  {
    name: "Next.js",
    category: "frontend",
    color: "#000000"
  },
  {
    name: "Vue.js",
    category: "frontend",
    color: "#4FC08D"
  },
  {
    name: "TypeScript",
    category: "frontend",
    color: "#3178C6"
  },
  {
    name: "JavaScript",
    category: "frontend",
    color: "#F7DF1E"
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    color: "#06B6D4"
  },
  {
    name: "Framer Motion",
    category: "frontend",
    color: "#0055FF"
  },
  {
    name: "React Native",
    category: "frontend",
    color: "#61DAFB"
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    color: "#339933"
  },
  {
    name: "Express",
    category: "backend",
    color: "#000000"
  },
  {
    name: "FastAPI",
    category: "backend",
    color: "#009688"
  },
  {
    name: "Python",
    category: "backend",
    color: "#3776AB"
  },
  {
    name: "Supabase",
    category: "backend",
    color: "#3ECF8E"
  },

  // Database
  {
    name: "MongoDB",
    category: "database",
    color: "#47A248"
  },
  {
    name: "Firebase",
    category: "database",
    color: "#FFCA28"
  },
  {
    name: "PostgreSQL",
    category: "database",
    color: "#336791"
  },

  // Tools
  {
    name: "Socket.io",
    category: "tool",
    color: "#010101"
  },
  {
    name: "D3.js",
    category: "tool",
    color: "#F9A03C"
  },
  {
    name: "MDX",
    category: "tool",
    color: "#1B1F24"
  },
  {
    name: "Algolia",
    category: "tool",
    color: "#003DFF"
  },
  {
    name: "OpenAI API",
    category: "tool",
    color: "#412991"
  },
  {
    name: "HealthKit",
    category: "tool",
    color: "#FF2D92"
  },

  // Deployment
  {
    name: "AWS",
    category: "deployment",
    color: "#FF9900"
  },
  {
    name: "Vercel",
    category: "deployment",
    color: "#000000"
  }
]

export const getTechnologyByName = (name: string): Technology | undefined => {
  return technologies.find(tech => tech.name === name)
}

export const getTechnologiesByCategory = (category: string): Technology[] => {
  return technologies.filter(tech => tech.category === category)
}