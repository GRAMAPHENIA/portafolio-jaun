import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/types"
import { getTechIcon } from "@/lib/tech-icons"

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const isLarge = className.includes("row-span-2")

  return (
    <article
      className={`group relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/30 overflow-hidden hover:border-border/60 transition-all duration-500 ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={project.image || "/placeholder.svg"}
          alt=""
          className="w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`relative p-8 h-full flex flex-col justify-between ${isLarge ? "min-h-[400px]" : "min-h-[240px]"}`}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 bg-accent/60 rounded-full"></div>
            <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Proyecto</span>
          </div>

          <h3 className="font-heading text-2xl font-medium mb-3 group-hover:text-foreground/90 transition-colors duration-300">
            {project.title}
          </h3>

          {isLarge && (
            <p className="font-body text-muted-foreground mb-6 text-sm leading-relaxed">{project.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, isLarge ? 5 : 3).map((tech) => {
              const Icon = getTechIcon(tech)
              return (
                <div key={tech} className="flex items-center gap-2 px-3 py-1.5 bg-muted/30 rounded-full" title={tech}>
                  <Icon className="w-3 h-3 text-muted-foreground" />
                  {isLarge && <span className="font-body text-xs text-muted-foreground">{tech}</span>}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full font-body text-sm font-medium hover:bg-foreground/90 transition-colors duration-200"
          >
            <ExternalLink className="w-3 h-3" />
            {isLarge && "Ver"}
          </a>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-border/50 hover:bg-muted/30 transition-colors duration-200"
              title="Ver código"
            >
              <Github className="w-4 h-4 text-muted-foreground" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
