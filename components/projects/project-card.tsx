import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { getTechIcon } from "@/lib/tech-icons";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const isLarge = className.includes("row-span-2");

  return (
    <motion.article
      className={`group relative bg-card/10 rounded-3xl border overflow-hidden ${className} border-border/80 dark:border-zinc-400/20`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ 
        scale: 1.02,
        borderColor: "hsl(var(--accent))",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1, opacity: 1 }}
          whileHover={{ 
            scale: 1.1, 
            opacity: 0.3,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-zinc-950/0 backdrop-blur-none"
          whileHover={{ 
            backgroundColor: "rgba(9, 9, 11, 0.4)",
            backdropFilter: "blur(2px)",
            transition: { duration: 0.6 }
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className={`relative p-8 h-full flex flex-col justify-between ${
          isLarge ? "min-h-[400px]" : "min-h-[240px]"
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
        }}
        variants={staggerContainer}
      >
        <motion.div variants={staggerItem}>
          <motion.div 
            className="flex items-center gap-3 mb-4"
            variants={staggerItem}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-accent/80 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            ></motion.div>
            <span className="font-body text-xs text-foreground/80 uppercase tracking-wider">
              Proyecto
            </span>
          </motion.div>

          <motion.h3 
            className="font-heading text-2xl font-medium mb-3 text-foreground/90"
            variants={staggerItem}
          >
            {project.title}
          </motion.h3>

          {isLarge && (
            <motion.p 
              className="font-body text-foreground/80 mb-6 text-sm leading-relaxed"
              variants={staggerItem}
            >
              {project.description}
            </motion.p>
          )}

          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            variants={staggerContainer}
            initial="initial"
            whileHover="animate"
          >
            {project.technologies.slice(0, isLarge ? 5 : 3).map((tech, index) => {
              const Icon = getTechIcon(tech);
              return (
                <motion.div
                  key={tech}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-950/10 backdrop-blur-sm rounded-full border border-foreground/10"
                  title={tech}
                  variants={{
                    initial: { opacity: 0.8, scale: 1 },
                    animate: { 
                      opacity: 1, 
                      scale: 1.05,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1]
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "hsl(var(--accent) / 0.1)",
                    borderColor: "hsl(var(--accent) / 0.3)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.2
                      }
                    }}
                  >
                    <Icon className="w-3 h-3 text-foreground/80" />
                  </motion.div>
                  {isLarge && (
                    <span className="font-body text-xs text-foreground/80">
                      {tech}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex items-center gap-3"
          variants={staggerItem}
        >
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full font-body text-sm font-medium"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "hsl(var(--accent))",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="w-3 h-3" />
            </motion.div>
            {isLarge && "Ver Proyecto"}
          </motion.a>

          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-foreground/20"
              title="Ver código"
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "hsl(var(--foreground) / 0.1)",
                borderColor: "hsl(var(--accent) / 0.5)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.4 }
                }}
              >
                <Github className="w-4 h-4 text-foreground/80" />
              </motion.div>
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
