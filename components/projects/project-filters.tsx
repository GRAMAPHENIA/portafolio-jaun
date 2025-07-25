"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { ProjectSearchSuggestions } from "./project-search-suggestions"
import { PROJECT_CATEGORIES, TECHNOLOGY_CATEGORIES, PROJECT_STATUS_OPTIONS } from "@/data/categories"
import { technologies } from "@/data/technologies"
import type { ProjectFilter, ProjectSort, ProjectCategory, ProjectStatus } from "@/lib/types"

interface ProjectFiltersProps {
  onFilterChange: (filters: ProjectFilter) => void
  onSortChange: (sort: ProjectSort) => void
  totalProjects: number
  filteredCount: number
}

export function ProjectFilters({ 
  onFilterChange, 
  onSortChange, 
  totalProjects, 
  filteredCount 
}: ProjectFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortField, setSortField] = useState<ProjectSort["field"]>("startDate")
  const [sortDirection, setSortDirection] = useState<ProjectSort["direction"]>("desc")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)

  // Actualizar filtros cuando cambien los valores
  useEffect(() => {
    const filters: ProjectFilter = {
      categories: selectedCategories,
      technologies: selectedTechnologies,
      status: selectedStatus,
      featured: showFeaturedOnly || undefined,
      search: searchTerm.trim() || undefined
    }
    onFilterChange(filters)
  }, [searchTerm, selectedCategories, selectedTechnologies, selectedStatus, showFeaturedOnly])

  // Actualizar ordenamiento cuando cambien los valores
  useEffect(() => {
    onSortChange({ field: sortField, direction: sortDirection })
  }, [sortField, sortDirection])

  const handleCategoryToggle = (category: ProjectCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleTechnologyToggle = (technology: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(technology) 
        ? prev.filter(t => t !== technology)
        : [...prev, technology]
    )
  }

  const handleStatusToggle = (status: ProjectStatus) => {
    setSelectedStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedTechnologies([])
    setSelectedStatus([])
    setShowFeaturedOnly(false)
  }

  const hasActiveFilters = searchTerm || selectedCategories.length > 0 || 
    selectedTechnologies.length > 0 || selectedStatus.length > 0 || showFeaturedOnly

  const activeFiltersCount = selectedCategories.length + selectedTechnologies.length + 
    selectedStatus.length + (showFeaturedOnly ? 1 : 0) + (searchTerm ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y controles principales */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSearchSuggestions(true)}
            className="pl-10"
          />
          <ProjectSearchSuggestions
            searchTerm={searchTerm}
            onSuggestionSelect={setSearchTerm}
            onClose={() => setShowSearchSuggestions(false)}
            isVisible={showSearchSuggestions}
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Contador de resultados */}
          <span className="text-sm text-muted-foreground">
            {filteredCount} de {totalProjects} proyectos
          </span>

          {/* Botón de filtros */}
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="relative"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {/* Ordenamiento */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Ordenar
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sortField === "startDate" && sortDirection === "desc"}
                onCheckedChange={() => {
                  setSortField("startDate")
                  setSortDirection("desc")
                }}
              >
                Más recientes
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortField === "startDate" && sortDirection === "asc"}
                onCheckedChange={() => {
                  setSortField("startDate")
                  setSortDirection("asc")
                }}
              >
                Más antiguos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortField === "title" && sortDirection === "asc"}
                onCheckedChange={() => {
                  setSortField("title")
                  setSortDirection("asc")
                }}
              >
                Nombre A-Z
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortField === "title" && sortDirection === "desc"}
                onCheckedChange={() => {
                  setSortField("title")
                  setSortDirection("desc")
                }}
              >
                Nombre Z-A
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortField === "featured"}
                onCheckedChange={() => {
                  setSortField("featured")
                  setSortDirection("desc")
                }}
              >
                Destacados primero
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Panel de filtros expandible */}
      {isFiltersOpen && (
        <div className="bg-card/50 border border-border rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filtros avanzados</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Limpiar filtros
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Filtro por categorías */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Categorías</h4>
              <div className="space-y-2">
                {PROJECT_CATEGORIES.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.value)}
                      onChange={() => handleCategoryToggle(category.value)}
                      className="rounded border-border"
                    />
                    <span className="text-sm">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro por tecnologías */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Tecnologías</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {TECHNOLOGY_CATEGORIES.map((techCategory) => (
                  <div key={techCategory.value} className="space-y-2">
                    <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {techCategory.label}
                    </h5>
                    {technologies
                      .filter(tech => tech.category === techCategory.value)
                      .map((tech) => (
                        <label
                          key={tech.name}
                          className="flex items-center space-x-2 cursor-pointer ml-2"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTechnologies.includes(tech.name)}
                            onChange={() => handleTechnologyToggle(tech.name)}
                            className="rounded border-border"
                          />
                          <span className="text-sm">{tech.name}</span>
                        </label>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Filtro por estado */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Estado</h4>
              <div className="space-y-2">
                {PROJECT_STATUS_OPTIONS.map((status) => (
                  <label
                    key={status.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(status.value)}
                      onChange={() => handleStatusToggle(status.value)}
                      className="rounded border-border"
                    />
                    <span className="text-sm">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtros adicionales */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Otros filtros</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm">Solo destacados</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros activos como badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Búsqueda: "{searchTerm}"
              <button
                onClick={() => setSearchTerm("")}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <button
                onClick={() => handleCategoryToggle(category)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          
          {selectedTechnologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="gap-1">
              {tech}
              <button
                onClick={() => handleTechnologyToggle(tech)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          
          {selectedStatus.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1">
              {PROJECT_STATUS_OPTIONS.find(s => s.value === status)?.label}
              <button
                onClick={() => handleStatusToggle(status)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          
          {showFeaturedOnly && (
            <Badge variant="secondary" className="gap-1">
              Solo destacados
              <button
                onClick={() => setShowFeaturedOnly(false)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}