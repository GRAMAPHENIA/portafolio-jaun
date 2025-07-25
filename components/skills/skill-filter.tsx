"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"
import type { SkillFilter, SkillCategory } from "@/lib/types"
import { skillCategories } from "@/data/skills"

interface SkillFilterProps {
  onFilter: (filter: SkillFilter) => void
  initialFilter?: SkillFilter
}

export function SkillFilter({ onFilter, initialFilter }: SkillFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<SkillFilter>(initialFilter || {
    categories: [],
    minLevel: 0,
    search: ""
  })

  const handleCategoryToggle = (category: SkillCategory) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter(c => c !== category)
      : [...filter.categories, category]
    
    const newFilter = { ...filter, categories: newCategories }
    setFilter(newFilter)
    onFilter(newFilter)
  }

  const handleSearchChange = (search: string) => {
    const newFilter = { ...filter, search }
    setFilter(newFilter)
    onFilter(newFilter)
  }

  const handleMinLevelChange = (value: number[]) => {
    const newFilter = { ...filter, minLevel: value[0] }
    setFilter(newFilter)
    onFilter(newFilter)
  }

  const clearFilters = () => {
    const newFilter = { categories: [], minLevel: 0, search: "" }
    setFilter(newFilter)
    onFilter(newFilter)
  }

  const hasActiveFilters = filter.categories.length > 0 || filter.minLevel > 0 || filter.search

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar habilidades..."
          value={filter.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Botón de filtros */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filtros
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {filter.categories.length + (filter.minLevel > 0 ? 1 : 0)}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Panel de filtros */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-border rounded-lg p-4 space-y-4 bg-card"
          >
            {/* Filtro por categorías */}
            <div>
              <h4 className="font-medium mb-3">Categorías</h4>
              <div className="flex flex-wrap gap-2">
                {skillCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={filter.categories.includes(category.id as SkillCategory) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryToggle(category.id as SkillCategory)}
                    className="text-xs"
                  >
                    <div 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filtro por nivel mínimo */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Nivel mínimo</h4>
                <span className="text-sm text-muted-foreground">
                  {filter.minLevel}%
                </span>
              </div>
              <Slider
                value={[filter.minLevel || 0]}
                onValueChange={handleMinLevelChange}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filtros activos */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {filter.categories.map((category) => {
            const categoryData = skillCategories.find(c => c.id === category)
            return (
              <Badge
                key={category}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: categoryData?.color }}
                />
                {categoryData?.name}
                <X 
                  className="w-3 h-3 ml-1 cursor-pointer hover:text-foreground"
                  onClick={() => handleCategoryToggle(category)}
                />
              </Badge>
            )
          })}
          
          {filter.minLevel > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Nivel ≥ {filter.minLevel}%
              <X 
                className="w-3 h-3 ml-1 cursor-pointer hover:text-foreground"
                onClick={() => handleMinLevelChange([0])}
              />
            </Badge>
          )}
        </motion.div>
      )}
    </div>
  )
}