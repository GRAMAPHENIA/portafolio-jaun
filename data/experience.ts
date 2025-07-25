import type { Experience, Education } from "@/lib/types"

export const experiences: Experience[] = [
  {
    id: "freelance-developer",
    company: "Freelance",
    position: "Desarrollador Full Stack",
    startDate: new Date("2022-01-01"),
    description: "Desarrollo de aplicaciones web personalizadas para diversos clientes, enfocándome en soluciones innovadoras y experiencias de usuario excepcionales.",
    achievements: [
      "Desarrollé más de 15 proyectos web exitosos para clientes internacionales",
      "Implementé sistemas de gestión de contenido personalizados",
      "Optimicé aplicaciones existentes mejorando el rendimiento en un 40%",
      "Establecí procesos de desarrollo ágil y mejores prácticas de código"
    ],
    technologies: [
      "React", "Next.js", "TypeScript", "Node.js", "MongoDB", 
      "Firebase", "Tailwind CSS", "Framer Motion", "AWS"
    ],
    location: "Remoto",
    type: "freelance",
    website: "https://juanrojo.dev"
  },
  {
    id: "tech-consultant",
    company: "Consultoría Tecnológica",
    position: "Consultor de Desarrollo Web",
    startDate: new Date("2021-06-01"),
    endDate: new Date("2021-12-31"),
    description: "Asesoramiento técnico a startups y pequeñas empresas en la implementación de soluciones web modernas y escalables.",
    achievements: [
      "Asesoré a 8 startups en la elección de stack tecnológico",
      "Implementé arquitecturas escalables que soportaron crecimiento del 300%",
      "Reduje costos de infraestructura en un 25% mediante optimizaciones",
      "Capacité equipos de desarrollo en mejores prácticas"
    ],
    technologies: [
      "React", "Vue.js", "Node.js", "Python", "PostgreSQL", 
      "Docker", "AWS", "Firebase"
    ],
    location: "Madrid, España",
    type: "contract"
  },
  {
    id: "junior-developer",
    company: "TechStart Solutions",
    position: "Desarrollador Frontend Junior",
    startDate: new Date("2020-09-01"),
    endDate: new Date("2021-05-31"),
    description: "Desarrollo de interfaces de usuario modernas y responsivas para aplicaciones web empresariales.",
    achievements: [
      "Contribuí al desarrollo de 3 aplicaciones web principales",
      "Implementé componentes reutilizables que redujeron el tiempo de desarrollo en 30%",
      "Mejoré la accesibilidad de las aplicaciones cumpliendo estándares WCAG 2.1",
      "Colaboré en la migración de jQuery a React"
    ],
    technologies: [
      "React", "JavaScript", "CSS3", "HTML5", "Bootstrap", 
      "jQuery", "Git", "Webpack"
    ],
    location: "Barcelona, España",
    type: "full-time"
  },
  {
    id: "web-developer-intern",
    company: "Digital Agency Pro",
    position: "Desarrollador Web - Prácticas",
    startDate: new Date("2020-03-01"),
    endDate: new Date("2020-08-31"),
    description: "Prácticas profesionales enfocadas en el desarrollo frontend y la optimización de sitios web corporativos.",
    achievements: [
      "Desarrollé 5 sitios web corporativos desde cero",
      "Implementé mejoras de SEO que aumentaron el tráfico orgánico en 50%",
      "Optimicé tiempos de carga reduciendo el tiempo promedio en 2 segundos",
      "Aprendí metodologías ágiles y trabajo en equipo"
    ],
    technologies: [
      "HTML5", "CSS3", "JavaScript", "PHP", "WordPress", 
      "MySQL", "Photoshop", "Git"
    ],
    location: "Valencia, España",
    type: "internship"
  }
]

export const education: Education[] = [
  {
    id: "computer-science-degree",
    institution: "Universidad Politécnica de Madrid",
    degree: "Grado en Ingeniería Informática",
    field: "Ingeniería de Software",
    startDate: new Date("2016-09-01"),
    endDate: new Date("2020-06-30"),
    description: "Formación integral en desarrollo de software, algoritmos, estructuras de datos y arquitectura de sistemas.",
    achievements: [
      "Graduado con Matrícula de Honor (9.2/10)",
      "Proyecto Final: Sistema de gestión de bibliotecas con React y Node.js",
      "Participación en hackathons universitarios (2 primeros puestos)",
      "Tutor de programación para estudiantes de primer año"
    ],
    location: "Madrid, España"
  },
  {
    id: "web-development-bootcamp",
    institution: "Ironhack",
    degree: "Bootcamp Full Stack Web Development",
    field: "Desarrollo Web",
    startDate: new Date("2019-06-01"),
    endDate: new Date("2019-08-31"),
    description: "Programa intensivo de desarrollo web full stack con enfoque práctico en tecnologías modernas.",
    achievements: [
      "Completado con calificación excelente (95/100)",
      "Desarrollé 3 proyectos full stack durante el programa",
      "Mejor proyecto final: Aplicación de red social para desarrolladores",
      "Certificación en metodologías ágiles"
    ],
    location: "Madrid, España"
  },
  {
    id: "aws-certification",
    institution: "Amazon Web Services",
    degree: "AWS Certified Solutions Architect",
    field: "Cloud Computing",
    startDate: new Date("2021-10-01"),
    endDate: new Date("2021-11-15"),
    description: "Certificación en arquitectura de soluciones en la nube con AWS.",
    achievements: [
      "Certificación obtenida en el primer intento",
      "Puntuación: 850/1000",
      "Especialización en servicios de compute, storage y networking"
    ],
    location: "Online"
  }
]

export const getCurrentExperience = () => {
  return experiences.find(exp => !exp.endDate)
}

export const getTotalExperienceYears = () => {
  const startDate = new Date("2020-03-01") // Primera experiencia
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
  return diffYears
}

export const getExperienceByType = (type: string) => {
  return experiences.filter(exp => exp.type === type)
}