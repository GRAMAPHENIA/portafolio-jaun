import { ProjectCard } from "./project-card"
import { projects } from "@/data/projects"

export function ProjectGrid() {
  return (
    <section id="proyectos" className="pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-muted-foreground/30"></div>
            <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">
              Estados
            </span>
          </div>
          <h2 className="font-heading text-4xl font-light">Proyectos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} className={getGridItemClass(index)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function getGridItemClass(index: number): string {
  const patterns = [
    "md:col-span-2 md:row-span-2", // Grande
    "md:col-span-2 md:row-span-1", // Ancho
    "md:col-span-2 md:row-span-1", // Ancho
    "md:col-span-2 md:row-span-2", // Grande
    "md:col-span-2 md:row-span-1", // Ancho
    "md:col-span-2 md:row-span-1", // Ancho
  ]

  return patterns[index % patterns.length]
}
