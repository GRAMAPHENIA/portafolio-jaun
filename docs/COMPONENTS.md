# Documentación de Componentes

Esta documentación describe todos los componentes del portfolio, su uso, props y ejemplos de implementación.

## 📁 Estructura de Componentes

```text
components/
├── blog/              # Componentes del sistema de blog
├── layout/            # Componentes de layout (Header, Footer)
├── projects/          # Componentes relacionados con proyectos
├── sections/          # Secciones principales de la página
└── ui/               # Componentes UI base (shadcn/ui)
```

## 🎨 Componentes UI Base

### Button

Componente de botón reutilizable con múltiples variantes.

```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
  children: React.ReactNode
}
```

**Ejemplo de uso:**

```tsx
import { Button } from '@/components/ui/button'

// Botón primario
<Button variant="default">Ver proyecto</Button>

// Botón secundario
<Button variant="outline">Leer más</Button>

// Botón como enlace
<Button variant="link" asChild>
  <Link href="/contacto">Contactar</Link>
</Button>
```

### Card

Componente de tarjeta para mostrar contenido agrupado.

```typescript
interface CardProps {
  className?: string
  children: React.ReactNode
}
```

**Ejemplo de uso:**

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Título del Proyecto</CardTitle>
    <CardDescription>Descripción breve del proyecto</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido de la tarjeta</p>
  </CardContent>
</Card>
```

### Dialog

Modal reutilizable para mostrar contenido superpuesto.

```typescript
interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}
```

**Ejemplo de uso:**

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título del Modal</DialogTitle>
    </DialogHeader>
    <p>Contenido del modal</p>
  </DialogContent>
</Dialog>
```

## 🏗️ Componentes de Layout

### Header

Barra de navegación principal con menú responsive y toggle de tema.

```typescript
interface HeaderProps {
  // No recibe props, usa configuración interna
}
```

**Características:**

- Navegación responsive con menú hamburguesa en móvil
- Toggle de tema claro/oscuro
- Enlaces de navegación con indicadores activos
- Animaciones suaves en transiciones

**Ejemplo de uso:**

```tsx
import { Header } from '@/components/layout/header'

<Header />
```

### Footer

Pie de página con enlaces y información de contacto.

```typescript
interface FooterProps {
  // No recibe props, usa configuración interna
}
```

**Características:**

- Enlaces a redes sociales
- Información de copyright
- Enlaces de navegación secundarios
- Diseño responsive

**Ejemplo de uso:**

```tsx
import { Footer } from '@/components/layout/footer'

<Footer />
```

## 📄 Componentes de Secciones

### Hero

Sección principal de la página de inicio con animaciones de entrada.

```typescript
interface HeroProps {
  // No recibe props, usa configuración interna
}
```

**Características:**

- Animaciones de entrada escalonadas
- Texto principal con efectos de typing
- Botón de llamada a la acción
- Indicador de scroll animado

**Ejemplo de uso:**

```tsx
import { Hero } from '@/components/sections/hero'

<Hero />
```

### TestimonialSection

Sección de testimonios con carrusel de reseñas.

```typescript
interface TestimonialSectionProps {
  testimonials?: Testimonial[]
}

interface Testimonial {
  id: string
  text: string
  author: string
  role: string
  company: string
  avatar: string
  rating: number
}
```

**Ejemplo de uso:**

```tsx
import { TestimonialSection } from '@/components/sections/testimonial'

<TestimonialSection testimonials={testimonials} />
```

## 🚀 Componentes de Proyectos

### ProjectGrid

Grid responsive que muestra todos los proyectos con filtros.

```typescript
interface ProjectGridProps {
  projects?: Project[]
  showFilters?: boolean
}
```

**Características:**

- Grid responsive (1-3 columnas según dispositivo)
- Sistema de filtros integrado
- Animaciones de entrada escalonadas
- Estados de carga y vacío

**Ejemplo de uso:**

```tsx
import { ProjectGrid } from '@/components/projects/project-grid'

<ProjectGrid projects={projects} showFilters={true} />
```

### ProjectCard

Tarjeta individual de proyecto con hover effects.

```typescript
interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: Technology[]
  url: string
  github?: string
  category: string
  featured: boolean
}
```

**Características:**

- Hover effects con escala y sombra
- Overlay con información adicional
- Badges de tecnologías
- Enlaces a demo y código fuente

**Ejemplo de uso:**

```tsx
import { ProjectCard } from '@/components/projects/project-card'

<ProjectCard 
  project={project} 
  onClick={() => openProjectModal(project)} 
/>
```

### ProjectModal

Modal detallado que muestra información completa del proyecto.

```typescript
interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}
```

**Características:**

- Galería de imágenes con navegación
- Métricas de rendimiento (Lighthouse)
- Testimonios de clientes
- Información técnica detallada
- Enlaces a demo y repositorio

**Ejemplo de uso:**

```tsx
import { ProjectModal } from '@/components/projects/project-modal'

<ProjectModal 
  project={selectedProject}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

### ProjectFilters

Sistema de filtros avanzado para proyectos.

```typescript
interface ProjectFiltersProps {
  projects: Project[]
  onFilter: (filteredProjects: Project[]) => void
  onSearch: (searchTerm: string) => void
}
```

**Características:**

- Filtros por categoría, tecnología y estado
- Búsqueda en tiempo real
- Sugerencias de búsqueda
- Badges de filtros activos
- Contador de resultados

**Ejemplo de uso:**

```tsx
import { ProjectFilters } from '@/components/projects/project-filters'

<ProjectFilters 
  projects={allProjects}
  onFilter={setFilteredProjects}
  onSearch={handleSearch}
/>
```

### ProjectSearchSuggestions

Componente de sugerencias de búsqueda inteligente.

```typescript
interface ProjectSearchSuggestionsProps {
  searchTerm: string
  projects: Project[]
  onSuggestionClick: (suggestion: string) => void
  isVisible: boolean
}
```

**Características:**

- Sugerencias basadas en contenido existente
- Categorización de sugerencias
- Historial de búsquedas recientes
- Navegación por teclado

**Ejemplo de uso:**

```tsx
import { ProjectSearchSuggestions } from '@/components/projects/project-search-suggestions'

<ProjectSearchSuggestions 
  searchTerm={searchTerm}
  projects={projects}
  onSuggestionClick={handleSuggestionClick}
  isVisible={showSuggestions}
/>
```

## 📝 Componentes de Blog

### BlogCard

Tarjeta de artículo de blog con información resumida.

```typescript
interface BlogCardProps {
  post: BlogPost
  variant?: 'featured' | 'standard' | 'compact'
}

interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: Date
  tags: string[]
  readingTime: number
  featured: boolean
  author: Author
}
```

**Ejemplo de uso:**

```tsx
import { BlogCard } from '@/components/blog/blog-card'

<BlogCard post={blogPost} variant="featured" />
```

### BlogSearch

Componente de búsqueda para artículos de blog.

```typescript
interface BlogSearchProps {
  posts: BlogPost[]
  onSearch: (results: BlogPost[]) => void
  placeholder?: string
}
```

**Ejemplo de uso:**

```tsx
import { BlogSearch } from '@/components/blog/blog-search'

<BlogSearch 
  posts={allPosts}
  onSearch={setFilteredPosts}
  placeholder="Buscar artículos..."
/>
```

## 🎭 Componentes de Animación

### AnimatedSection

Wrapper que agrega animaciones de entrada a secciones.

```typescript
interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: 'fadeInUp' | 'slideInLeft' | 'scaleIn'
  delay?: number
  className?: string
}
```

**Ejemplo de uso:**

```tsx
import { AnimatedSection } from '@/components/animations/animated-section'

<AnimatedSection animation="fadeInUp" delay={0.2}>
  <h2>Título Animado</h2>
  <p>Contenido que aparece con animación</p>
</AnimatedSection>
```

### LoadingScreen

Pantalla de carga con indicador de progreso.

```typescript
interface LoadingScreenProps {
  isLoading: boolean
  progress?: number
  message?: string
}
```

**Ejemplo de uso:**

```tsx
import { LoadingScreen } from '@/components/ui/loading-screen'

<LoadingScreen 
  isLoading={isPageLoading}
  progress={loadingProgress}
  message="Cargando portfolio..."
/>
```

## 🎯 Hooks Personalizados

### useProjectFilters

Hook para manejar el estado de filtros de proyectos.

```typescript
interface UseProjectFiltersReturn {
  filteredProjects: Project[]
  searchTerm: string
  activeFilters: FilterState
  setSearchTerm: (term: string) => void
  toggleFilter: (type: FilterType, value: string) => void
  clearFilters: () => void
  sortProjects: (field: SortField, direction: SortDirection) => void
}
```

**Ejemplo de uso:**

```tsx
import { useProjectFilters } from '@/hooks/use-project-filters'

const {
  filteredProjects,
  searchTerm,
  activeFilters,
  setSearchTerm,
  toggleFilter,
  clearFilters
} = useProjectFilters(allProjects)
```

### useLocalStorage

Hook para persistir datos en localStorage.

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void]
```

**Ejemplo de uso:**

```tsx
import { useLocalStorage } from '@/hooks/use-local-storage'

const [theme, setTheme] = useLocalStorage('theme', 'dark')
const [preferences, setPreferences] = useLocalStorage('user-preferences', {
  reducedMotion: false,
  language: 'es'
})
```

## 🎨 Patrones de Diseño

### Composición de Componentes

```tsx
// ✅ Correcto - Composición flexible
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    <ProjectInfo project={project} />
    <TechnologyBadges technologies={project.technologies} />
  </CardContent>
  <CardFooter>
    <Button>Ver más</Button>
  </CardFooter>
</Card>

// ❌ Incorrecto - Componente monolítico
<ProjectCardWithEverything project={project} />
```

### Render Props

```tsx
// Componente con render prop para máxima flexibilidad
<ProjectFilter>
  {({ filteredProjects, isLoading }) => (
    <div>
      {isLoading ? (
        <SkeletonLoader count={6} />
      ) : (
        <ProjectGrid projects={filteredProjects} />
      )}
    </div>
  )}
</ProjectFilter>
```

### Compound Components

```tsx
// Componentes compuestos para APIs intuitivas
<Modal>
  <Modal.Trigger>
    <Button>Abrir</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Título</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Contenido del modal
    </Modal.Body>
  </Modal.Content>
</Modal>
```

## 🧪 Testing de Componentes

### Ejemplo de Test

```tsx
// __tests__/components/project-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectCard } from '@/components/projects/project-card'
import { mockProject } from '@/test-utils/mocks'

describe('ProjectCard', () => {
  it('renderiza la información del proyecto correctamente', () => {
    render(<ProjectCard project={mockProject} />)
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument()
    expect(screen.getByText(mockProject.description)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockProject.title)
  })

  it('maneja el click correctamente', () => {
    const handleClick = jest.fn()
    render(<ProjectCard project={mockProject} onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('muestra las tecnologías como badges', () => {
    render(<ProjectCard project={mockProject} />)
    
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech.name)).toBeInTheDocument()
    })
  })
})
```

## 📱 Responsive Design

### Breakpoints

```typescript
// Breakpoints de Tailwind CSS utilizados
const breakpoints = {
  sm: '640px',   // Móvil grande
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop pequeño
  xl: '1280px',  // Desktop grande
  '2xl': '1536px' // Desktop extra grande
}
```

### Patrones Responsive

```tsx
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map(project => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>

// Texto responsive
<h1 className="text-2xl md:text-4xl lg:text-6xl font-heading">
  Título Responsive
</h1>

// Espaciado responsive
<section className="py-8 md:py-16 lg:py-24">
  <div className="container mx-auto px-4 md:px-8 lg:px-16">
    {/* Contenido */}
  </div>
</section>
```

## ♿ Accesibilidad

### Mejores Prácticas

```tsx
// Etiquetas ARIA apropiadas
<button
  aria-label="Cerrar modal"
  aria-expanded={isOpen}
  onClick={onClose}
>
  <X className="h-4 w-4" />
</button>

// Navegación por teclado
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
  onClick={handleClick}
>
  Elemento clickeable
</div>

// Texto alternativo para imágenes
<img
  src={project.image}
  alt={`Captura de pantalla del proyecto ${project.title}`}
  className="w-full h-48 object-cover"
/>
```

## 🔧 Configuración y Personalización

### Temas

```typescript
// lib/theme.ts
export const themes = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    accent: 'hsl(210 40% 98%)',
  },
  dark: {
    background: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',
    accent: 'hsl(217.2 32.6% 17.5%)',
  }
}
```

### Configuración de Componentes

```typescript
// components.config.ts
export const componentConfig = {
  projectCard: {
    hoverScale: 1.05,
    animationDuration: 0.3,
    showTechnologies: true,
    maxTechnologies: 4
  },
  modal: {
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true
  }
}
```

---

Para más información sobre componentes específicos, consulta el código fuente en el directorio `components/` o abre un issue en el repositorio.
