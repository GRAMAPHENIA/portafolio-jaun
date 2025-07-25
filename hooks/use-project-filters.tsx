"use client"

import { useState, useMemo, useCallback } from "react"
import { filterProjects, sortProjects, searchProjects } from "@/lib/project-utils"
import type { Project, ProjectFilter, ProjectSort } from "@/lib/types"

interface UseProjectFiltersProps {
  projects: Project[]
  initialFilters?: Partial<ProjectFilter>
  initialSort?: ProjectSort
}

export function useProjectFilters({
  projects,
  initialFilters = {},
  initialSort = { field: "startDate", direction: "desc" }
}: UseProjectFiltersProps) {
  const [filters, setFilters] = useState<ProjectFilter>({
    categories: [],
    technologies: [],
    status: [],
    featured: undefined,
    search: undefined,
    ...initialFilters
  })

  const [sort, setSort] = useState<ProjectSort>(initialSort)

  // Aplicar filtros y ordenamiento
  const filteredAndSortedProjects = useMemo(() => {
    if (!projects || projects.length === 0) {
      return []
    }

    let result = [...projects]

    // Si hay término de búsqueda, usar búsqueda con scoring
    if (filters.search?.trim()) {
      result = searchProjects(result, filters.search)
    }

    // Aplicar otros filtros
    result = filterProjects(result, {
      ...filters,
      search: undefined // Ya aplicamos la búsqueda arriba
    })

    // Aplicar ordenamiento
    result = sortProjects(result, sort)

    return result
  }, [projects, filters, sort])

  // Funciones para actualizar filtros
  const updateFilters = useCallback((newFilters: Partial<ProjectFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const updateSort = useCallback((newSort: ProjectSort) => {
    setSort(newSort)
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      technologies: [],
      status: [],
      featured: undefined,
      search: undefined
    })
  }, [])

  const toggleCategory = useCallback((category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category as any)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category as any]
    }))
  }, [])

  const toggleTechnology = useCallback((technology: string) => {
    setFilters(prev => ({
      ...prev,
      technologies: prev.technologies.includes(technology)
        ? prev.technologies.filter(t => t !== technology)
        : [...prev.technologies, technology]
    }))
  }, [])

  const toggleStatus = useCallback((status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status as any)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status as any]
    }))
  }, [])

  const setSearchTerm = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search: search.trim() || undefined }))
  }, [])

  const toggleFeaturedOnly = useCallback(() => {
    setFilters(prev => ({ ...prev, featured: prev.featured ? undefined : true }))
  }, [])

  // Estadísticas
  const stats = useMemo(() => ({
    total: projects.length,
    filtered: filteredAndSortedProjects.length,
    hasActiveFilters: Boolean(
      filters.search ||
      filters.categories.length > 0 ||
      filters.technologies.length > 0 ||
      filters.status.length > 0 ||
      filters.featured
    ),
    activeFiltersCount: 
      (filters.search ? 1 : 0) +
      filters.categories.length +
      filters.technologies.length +
      filters.status.length +
      (filters.featured ? 1 : 0)
  }), [projects.length, filteredAndSortedProjects.length, filters])

  return {
    // Estado
    filters,
    sort,
    filteredProjects: filteredAndSortedProjects,
    stats,

    // Acciones
    updateFilters,
    updateSort,
    clearFilters,
    toggleCategory,
    toggleTechnology,
    toggleStatus,
    setSearchTerm,
    toggleFeaturedOnly
  }
}