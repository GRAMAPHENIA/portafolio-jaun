import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";
import { getTechIcon } from "@/lib/tech-icons";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const isLarge = className.includes("row-span-2");

  return (
    <article
      className={`group relative bg-card/10 rounded-3xl border overflow-hidden transition-all duration-500 ${className} border-border/80 dark:border-zinc-400/20 hover:border-border/80 dark:hover:border-border/90`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 opacity-100 group-hover:opacity-20 group-hover:scale-105"
        />
        <div className="absolute inset-0 group-hover:bg-zinc-950/30 transition-all duration-700 group-hover:backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div
        className={`relative p-8 h-full flex flex-col justify-between transform transition-all duration-700 ${
          isLarge ? "min-h-[400px]" : "min-h-[240px]"
        } opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0`}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 bg-accent/80 rounded-full"></div>
            <span className="font-body text-xs text-foreground/80 uppercase tracking-wider">
              Proyecto
            </span>
          </div>

          <h3 className="font-heading text-2xl font-medium mb-3 text-foreground/90">
            {project.title}
          </h3>

          {isLarge && (
            <p className="font-body text-foreground/80 mb-6 text-sm leading-relaxed">
              {project.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, isLarge ? 5 : 3).map((tech) => {
              const Icon = getTechIcon(tech);
              return (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-950/10 backdrop-blur-sm rounded-full border border-foreground/10"
                  title={tech}
                >
                  <Icon className="w-3 h-3 text-foreground/80" />
                  {isLarge && (
                    <span className="font-body text-xs text-foreground/80">
                      {tech}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full font-body text-sm font-medium hover:bg-foreground/90 transition-all duration-200 transform "
          >
            <ExternalLink className="w-3 h-3" />
            {isLarge && "Ver Proyecto"}
          </a>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-all duration-200 transform"
              title="Ver código"
            >
              <Github className="w-4 h-4 text-foreground/80" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
