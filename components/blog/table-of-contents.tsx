"use client"

import React, { useEffect, useState } from 'react'
import { List } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extraer headings del contenido MDX
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const headings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()

      headings.push({ id, text, level })
    }

    setToc(headings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    // Observar todos los headings
    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24 bg-card border border-border rounded-lg p-6 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-lg">Tabla de Contenidos</h3>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {toc.map(({ id, text, level }) => (
            <li key={id}>
              <button
                onClick={() => scrollToHeading(id)}
                className={`
                  block w-full text-left text-sm transition-colors hover:text-accent
                  ${activeId === id ? 'text-accent font-medium' : 'text-muted-foreground'}
                  ${level === 1 ? 'pl-0' : 
                    level === 2 ? 'pl-4' : 
                    level === 3 ? 'pl-8' : 
                    level === 4 ? 'pl-12' : 
                    level === 5 ? 'pl-16' : 'pl-20'}
                `}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  )
}