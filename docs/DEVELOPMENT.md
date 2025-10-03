# Guía de Desarrollo

Esta guía proporciona información detallada para desarrolladores que trabajen en el portfolio de Juan Rojo.

## 🚀 Configuración del Entorno

### Prerrequisitos

- **Node.js**: Versión 18 o superior
- **PNPM**: Gestor de paquetes requerido
- **Git**: Para control de versiones
- **Editor**: VS Code recomendado con extensiones

### Extensiones de VS Code Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "unifiedjs.vscode-mdx",
    "ms-vscode.vscode-json"
  ]
}
```

### Configuración Inicial

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/portfolio-personal-jaun.git
   cd portfolio-personal-jaun
   ```

2. **Instalar PNPM (si no está instalado)**

   ```bash
   npm install -g pnpm
   ```

3. **Instalar dependencias**

   ```bash
   pnpm install
   ```

4. **Configurar variables de entorno**

   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus valores
   ```

5. **Ejecutar en modo desarrollo**

   ```bash
   pnpm dev
   ```

## 📁 Estructura del Proyecto Detallada

```text
portfolio-personal-jaun/
├── .github/                # GitHub Actions y templates
├── .kiro/                  # Configuración de Kiro (steering rules)
├── .next/                  # Build output de Next.js (generado)
├── .vscode/                # Configuración de VS Code
├── app/                    # Next.js App Router
│   ├── (routes)/          # Rutas agrupadas
│   │   ├── blog/          # Sistema de blog
│   │   ├── cv/            # Página de CV
│   │   └── projects/      # Páginas de proyectos
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout raíz
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React
│   ├── animations/        # Componentes de animación
│   ├── blog/             # Componentes del blog
│   ├── layout/           # Header, Footer, Navigation
│   ├── projects/         # Componentes de proyectos
│   ├── sections/         # Secciones principales
│   └── ui/               # Componentes UI base (shadcn/ui)
├── content/              # Contenido MDX
│   └── blog/             # Artículos del blog
├── data/                 # Datos estructurados
│   ├── projects.ts       # Información de proyectos
│   ├── experience.ts     # Experiencia profesional
│   ├── skills.ts         # Habilidades técnicas
│   └── technologies.ts   # Tecnologías disponibles
├── docs/                 # Documentación del proyecto
├── hooks/                # Hooks personalizados de React
├── lib/                  # Utilidades y configuraciones
│   ├── types.ts          # Definiciones de tipos TypeScript
│   ├── utils.ts          # Funciones utilitarias
│   ├── animations.ts     # Configuraciones de animación
│   └── constants.ts      # Constantes del proyecto
├── public/               # Archivos estáticos
│   ├── images/           # Imágenes del proyecto
│   ├── icons/            # Iconos y favicons
│   └── projects/         # Imágenes de proyectos
├── scripts/              # Scripts de automatización
├── styles/               # Estilos adicionales
└── types/                # Tipos TypeScript globales
```

## 🛠️ Scripts de Desarrollo

### Scripts Principales

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo (puerto 3000)
pnpm dev:turbo        # Desarrollo con Turbopack (experimental)

# Construcción
pnpm build            # Construir para producción
pnpm start            # Servidor de producción

# Calidad de código
pnpm lint             # Ejecutar ESLint
pnpm lint:fix         # Corregir errores de linting automáticamente
pnpm type-check       # Verificar tipos de TypeScript
pnpm format           # Formatear código con Prettier

# Testing
pnpm test             # Ejecutar tests
pnpm test:watch       # Tests en modo watch
pnpm test:coverage    # Tests con cobertura

# Análisis
pnpm analyze          # Analizar bundle size
pnpm lighthouse       # Ejecutar auditoría de Lighthouse
```

### Scripts Personalizados

```bash
# Generación de contenido
pnpm generate:sitemap    # Generar sitemap.xml
pnpm generate:rss        # Generar feed RSS
pnpm optimize:images     # Optimizar imágenes

# Base de datos y contenido
pnpm content:validate    # Validar contenido MDX
pnpm data:seed          # Poblar datos de ejemplo
```

## 🎨 Desarrollo de Componentes

### Estructura de Componente

```typescript
// components/example/example-component.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface ExampleComponentProps {
  title: string
  description?: string
  variant?: 'default' | 'secondary'
  className?: string
  children?: React.ReactNode
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  description,
  variant = 'default',
  className,
  children
}) => {
  return (
    <div className={cn(
      'base-styles',
      variant === 'secondary' && 'secondary-styles',
      className
    )}>
      <h2 className="text-xl font-heading">{title}</h2>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  )
}

// Exportar tipos para uso externo
export type { ExampleComponentProps }
```

### Convenciones de Naming

```typescript
// ✅ Correcto
const ProjectCard = () => {}           // PascalCase para componentes
const useProjectFilters = () => {}     // camelCase para hooks
const PROJECT_CATEGORIES = []          // UPPER_SNAKE_CASE para constantes
const projectUtils = {}               // camelCase para objetos/funciones

// ❌ Incorrecto
const project_card = () => {}          // snake_case
const UseProjectFilters = () => {}     // PascalCase para hooks
const projectCategories = []          // camelCase para constantes
```

### Patrones de Props

```typescript
// Props con variantes
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

// Props con children
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

// Props con render props
interface DataFetcherProps<T> {
  children: (data: T, loading: boolean, error?: Error) => React.ReactNode
}

// Props con forwarded ref
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <input ref={ref} className={cn('input-styles', className)} {...props} />
        {error && <span className="error">{error}</span>}
      </div>
    )
  }
)
```

## 🎭 Sistema de Animaciones

### Configuración de Framer Motion

```typescript
// lib/animations.ts
export const animations = {
  // Animaciones de entrada
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  // Animaciones de hover
  hoverScale: {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.2 }
  },
  
  // Animaciones escalonadas
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}

// Configuración de reducción de movimiento
export const getAnimation = (animationName: keyof typeof animations) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 }
    }
  }
  
  return animations[animationName]
}
```

### Uso de Animaciones

```tsx
import { motion } from 'framer-motion'
import { animations } from '@/lib/animations'

// Animación simple
<motion.div {...animations.fadeInUp}>
  <h2>Título animado</h2>
</motion.div>

// Animación con delay
<motion.div 
  {...animations.fadeInUp}
  transition={{ ...animations.fadeInUp.transition, delay: 0.2 }}
>
  <p>Contenido con delay</p>
</motion.div>

// Animaciones escalonadas
<motion.div {...animations.staggerContainer}>
  {items.map((item, index) => (
    <motion.div key={item.id} {...animations.fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 📝 Gestión de Contenido

### Estructura de Datos

```typescript
// data/projects.ts
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  gallery: GalleryItem[]
  technologies: Technology[]
  url: string
  github?: string
  category: ProjectCategory
  tags: string[]
  featured: boolean
  status: ProjectStatus
  startDate: Date
  endDate?: Date
  teamSize: number
  role: string
  client: string
  architecture: string[]
  challenges: string[]
  solutions: string[]
  metrics: ProjectMetrics
  testimonial?: Testimonial
}
```

### Validación de Datos

```typescript
// lib/validation.ts
import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(200),
  longDescription: z.string().min(50),
  image: z.string().url(),
  technologies: z.array(z.string()).min(1),
  url: z.string().url(),
  github: z.string().url().optional(),
  category: z.enum(['web', 'mobile', 'desktop', 'other']),
  featured: z.boolean(),
  status: z.enum(['completed', 'in-progress', 'maintenance', 'archived'])
})

// Validar datos en tiempo de construcción
export const validateProjects = (projects: unknown[]) => {
  return projects.map((project, index) => {
    try {
      return projectSchema.parse(project)
    } catch (error) {
      throw new Error(`Invalid project at index ${index}: ${error.message}`)
    }
  })
}
```

### Contenido MDX

```markdown
---
title: "Mi Artículo Técnico"
description: "Una descripción detallada del artículo"
publishedAt: "2024-01-15"
updatedAt: "2024-01-20"
tags: ["react", "nextjs", "typescript"]
category: "tutorial"
featured: true
author:
  name: "Juan Rojo"
  avatar: "/images/avatar.jpg"
---

# Mi Artículo Técnico

Este es el contenido del artículo en **MDX**.

## Código de Ejemplo

```typescript
const ejemplo = (param: string): string => {
  return `Hola ${param}`
}
```

## Componente Interactivo

<InteractiveDemo />

## Conclusión

Resumen del artículo...

```

## 🧪 Testing

### Configuración de Testing

```typescript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/data/(.*)$': '<rootDir>/data/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

### Ejemplos de Tests

```typescript
// __tests__/components/project-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectCard } from '@/components/projects/project-card'
import { mockProject } from '@/test-utils/mocks'

describe('ProjectCard', () => {
  it('renderiza correctamente', () => {
    render(<ProjectCard project={mockProject} />)
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument()
    expect(screen.getByText(mockProject.description)).toBeInTheDocument()
  })

  it('maneja eventos de click', () => {
    const handleClick = jest.fn()
    render(<ProjectCard project={mockProject} onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledWith(mockProject)
  })

  it('muestra tecnologías como badges', () => {
    render(<ProjectCard project={mockProject} />)
    
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech.name)).toBeInTheDocument()
    })
  })
})

// __tests__/hooks/use-project-filters.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useProjectFilters } from '@/hooks/use-project-filters'
import { mockProjects } from '@/test-utils/mocks'

describe('useProjectFilters', () => {
  it('filtra proyectos por búsqueda', () => {
    const { result } = renderHook(() => useProjectFilters(mockProjects))
    
    act(() => {
      result.current.setSearchTerm('React')
    })
    
    expect(result.current.filteredProjects).toHaveLength(2)
    expect(result.current.filteredProjects[0].title).toContain('React')
  })

  it('combina múltiples filtros', () => {
    const { result } = renderHook(() => useProjectFilters(mockProjects))
    
    act(() => {
      result.current.toggleFilter('category', 'web')
      result.current.toggleFilter('status', 'completed')
    })
    
    const filtered = result.current.filteredProjects
    expect(filtered.every(p => p.category === 'web' && p.status === 'completed')).toBe(true)
  })
})
```

### Testing de Accesibilidad

```typescript
// __tests__/accessibility/a11y.test.tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ProjectCard } from '@/components/projects/project-card'
import { mockProject } from '@/test-utils/mocks'

expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  it('ProjectCard no tiene violaciones de accesibilidad', async () => {
    const { container } = render(<ProjectCard project={mockProject} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('soporta navegación por teclado', () => {
    render(<ProjectCard project={mockProject} />)
    const card = screen.getByRole('button')
    
    card.focus()
    expect(card).toHaveFocus()
    
    fireEvent.keyDown(card, { key: 'Enter' })
    // Verificar que se ejecuta la acción
  })
})
```

## 🔧 Herramientas de Desarrollo

### ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Prettier Configuration

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 📊 Monitoreo y Analytics

### Performance Monitoring

```typescript
// lib/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  
  console.log(`${name} took ${end - start} milliseconds`)
  
  // Enviar a analytics si está en producción
  if (process.env.NODE_ENV === 'production') {
    gtag('event', 'timing_complete', {
      name: name,
      value: Math.round(end - start)
    })
  }
}

// Monitoreo de Core Web Vitals
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
}
```

### Error Tracking

```typescript
// lib/error-tracking.ts
export const trackError = (error: Error, context?: Record<string, any>) => {
  console.error('Error tracked:', error, context)
  
  if (process.env.NODE_ENV === 'production') {
    // Enviar a servicio de tracking (Sentry, LogRocket, etc.)
    Sentry.captureException(error, {
      contexts: { additional: context }
    })
  }
}

// Error Boundary
export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    trackError(error, { errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }

    return this.props.children
  }
}
```

## 🚀 Optimización

### Bundle Analysis

```bash
# Analizar bundle size
ANALYZE=true pnpm build

# Ver qué está incluido en el bundle
pnpm add -D @next/bundle-analyzer
```

### Image Optimization

```typescript
// next.config.mjs
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año
  }
}
```

### Code Splitting

```typescript
// Lazy loading de componentes
const ProjectModal = dynamic(() => import('@/components/projects/project-modal'), {
  loading: () => <SkeletonLoader />,
  ssr: false
})

// Lazy loading de páginas
const BlogPage = dynamic(() => import('@/app/blog/page'), {
  loading: () => <PageLoader />
})
```

## 🔒 Seguridad

### Content Security Policy

```typescript
// next.config.mjs
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
  child-src *.youtube.com *.google.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' *.gstatic.com;
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
]
```

### Input Sanitization

```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target']
  })
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}
```

---

Esta guía cubre los aspectos fundamentales del desarrollo en el portfolio. Para preguntas específicas o problemas, consulta la documentación adicional o abre un issue en el repositorio.
