"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Clock, Tag, Folder } from "lucide-react"
import { getSearchSuggestions } from "@/lib/project-utils"
import { projects } from "@/data/projects"


interface ProjectSearchSuggestionsProps {
  searchTerm: string
  onSuggestionSelect: (suggestion: string) => void
  onClose: () => void
  isVisible: boolean
}

export function ProjectSearchSuggestions({
  searchTerm,
  onSuggestionSelect,
  onClose,
  isVisible
}: ProjectSearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchTerm.trim()) {
      const newSuggestions = getSearchSuggestions(projects, searchTerm)
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  useEffect(() => {
    // Cargar búsquedas recientes del localStorage
    const saved = localStorage.getItem('project-search-history')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading search history:', error)
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, onClose])

  const handleSuggestionClick = (suggestion: string) => {
    // Guardar en historial de búsquedas
    const updatedHistory = [suggestion, ...recentSearches.filter(s => s !== suggestion)].slice(0, 5)
    setRecentSearches(updatedHistory)
    localStorage.setItem('project-search-history', JSON.stringify(updatedHistory))
    
    onSuggestionSelect(suggestion)
    onClose()
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('project-search-history')
  }

  if (!isVisible) return null

  const showRecentSearches = !searchTerm.trim() && recentSearches.length > 0
  const showSuggestions = searchTerm.trim() && suggestions.length > 0

  if (!showRecentSearches && !showSuggestions) return null

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
    >
      {showRecentSearches && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Búsquedas recientes
            </h4>
            <button
              onClick={clearRecentSearches}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Limpiar
            </button>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {showSuggestions && (
        <div className="p-3">
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Sugerencias
          </h4>
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => {
              const isProject = projects.some(p => p.title === suggestion)
              const isTechnology = projects.some(p => 
                p.technologies.some(tech => tech.name === suggestion)
              )
              const isCategory = projects.some(p => p.category === suggestion)
              
              let IconComponent = Search
              if (isProject) IconComponent = Folder
              else if (isTechnology) IconComponent = Tag
              else if (isCategory) IconComponent = Folder

              return (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4 text-muted-foreground" />
                  <span>{suggestion}</span>
                  {isProject && (
                    <span className="ml-auto text-xs text-muted-foreground">Proyecto</span>
                  )}
                  {isTechnology && (
                    <span className="ml-auto text-xs text-muted-foreground">Tecnología</span>
                  )}
                  {isCategory && (
                    <span className="ml-auto text-xs text-muted-foreground">Categoría</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}