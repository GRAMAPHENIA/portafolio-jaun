# Design Document

## Overview

Este diseño transforma el portfolio existente de Jaun Rojo en una experiencia web profesional de nivel superior. La arquitectura mantiene la base sólida actual (Next.js 15, TypeScript, Tailwind CSS, shadcn/ui) mientras agrega funcionalidades avanzadas, animaciones profesionales, y un sistema de gestión de contenido.

El enfoque es evolutivo: mejoramos lo existente sin romper la funcionalidad actual, agregando capas de sofisticación que demuestren expertise técnico y atraigan a empleadores/clientes potenciales.

## Architecture

### Current Foundation (Maintained)
```
portfolio-personal-jaun/
├── app/                    # Next.js App Router
├── components/
│   ├── layout/            # Header, Footer
│   ├── projects/          # Project components
│   ├── sections/          # Hero, Testimonials
│   └── ui/               # shadcn/ui components
├── data/                  # Static data (projects.ts)
├── lib/                   # Types, utilities
└── public/               # Static assets
```

### Enhanced Architecture
```
portfolio-personal-jaun/
├── app/
│   ├── (routes)/
│   │   ├── blog/          # Blog system
│   │   ├── projects/      # Enhanced project pages
│   │   └── contact/       # Contact page
│   ├── api/               # API routes
│   └── globals.css        # Enhanced with animations
├── components/
│   ├── animations/        # Framer Motion components
│   ├── blog/             # Blog components
│   ├── contact/          # Contact form components
│   ├── enhanced/         # Enhanced sections
│   ├── layout/           # Enhanced layout
│   ├── projects/         # Enhanced project components
│   ├── sections/         # Enhanced sections
│   └── ui/              # Extended shadcn/ui
├── content/              # MDX content system
├── data/                 # Enhanced data layer
├── hooks/               # Custom React hooks
├── lib/                 # Enhanced utilities
└── public/              # Enhanced assets
```

## Components and Interfaces

### 1. Animation System

**Framer Motion Integration**
```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// components/animations/animated-section.tsx
interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: "fadeInUp" | "slideInLeft" | "scaleIn"
  delay?: number
}
```

**Loading States**
```typescript
// components/ui/loading-screen.tsx
interface LoadingScreenProps {
  isLoading: boolean
  progress?: number
}

// components/ui/skeleton-loader.tsx
interface SkeletonLoaderProps {
  variant: "project" | "blog" | "section"
  count?: number
}
```

### 2. Enhanced Project System

**Project Detail Modal**
```typescript
// lib/types.ts (enhanced)
interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  gallery: string[]
  technologies: Technology[]
  url: string
  github?: string
  category: ProjectCategory
  featured: boolean
  metrics?: ProjectMetrics
  testimonial?: string
}

interface Technology {
  name: string
  icon: string
  category: "frontend" | "backend" | "database" | "tool"
}

interface ProjectMetrics {
  performance: number
  accessibility: number
  seo: number
  bestPractices: number
}
```

**Project Components**
```typescript
// components/projects/project-modal.tsx
interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

// components/projects/project-filter.tsx
interface ProjectFilterProps {
  technologies: Technology[]
  categories: ProjectCategory[]
  onFilter: (filters: FilterState) => void
}

// components/projects/project-carousel.tsx
interface ProjectCarouselProps {
  projects: Project[]
  autoPlay?: boolean
}
```

### 3. Blog System

**Content Management**
```typescript
// lib/mdx.ts
interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: Date
  updatedAt?: Date
  tags: string[]
  category: string
  readingTime: number
  featured: boolean
  author: Author
}

interface Author {
  name: string
  avatar: string
  bio: string
  social: SocialLink[]
}
```

**Blog Components**
```typescript
// components/blog/blog-card.tsx
interface BlogCardProps {
  post: BlogPost
  variant: "featured" | "standard" | "compact"
}

// components/blog/blog-search.tsx
interface BlogSearchProps {
  posts: BlogPost[]
  onSearch: (results: BlogPost[]) => void
}

// components/blog/reading-progress.tsx
interface ReadingProgressProps {
  target: React.RefObject<HTMLElement>
}
```

### 4. Skills & Experience System

**Skills Visualization**
```typescript
// lib/types.ts
interface Skill {
  name: string
  level: number // 1-100
  category: SkillCategory
  icon: string
  yearsOfExperience: number
  projects: string[] // Project IDs
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate?: Date
  description: string
  achievements: string[]
  technologies: string[]
  logo: string
}
```

**Skills Components**
```typescript
// components/skills/skill-radar.tsx
interface SkillRadarProps {
  skills: Skill[]
  interactive?: boolean
}

// components/experience/timeline.tsx
interface TimelineProps {
  experiences: Experience[]
  interactive?: boolean
}
```

### 5. Contact System

**Contact Form**
```typescript
// lib/contact.ts
interface ContactForm {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  projectType?: ProjectType
  budget?: BudgetRange
  timeline?: string
}

interface ContactResponse {
  success: boolean
  message: string
  id?: string
}
```

**Contact Components**
```typescript
// components/contact/contact-form.tsx
interface ContactFormProps {
  onSubmit: (data: ContactForm) => Promise<ContactResponse>
  variant: "modal" | "page" | "inline"
}

// components/contact/scheduling-widget.tsx
interface SchedulingWidgetProps {
  availableSlots: TimeSlot[]
  onBook: (slot: TimeSlot) => void
}
```

### 6. SEO & Analytics System

**SEO Enhancement**
```typescript
// lib/seo.ts
interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage: string
  structuredData: StructuredData
  canonical: string
}

interface StructuredData {
  "@context": "https://schema.org"
  "@type": "Person" | "WebSite" | "BlogPosting"
  [key: string]: any
}
```

**Analytics Integration**
```typescript
// lib/analytics.ts
interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

interface PageView {
  path: string
  title: string
  referrer?: string
}
```

## Data Models

### Enhanced Project Model
```typescript
interface EnhancedProject extends Project {
  // Performance metrics
  lighthouse: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  
  // Social proof
  testimonial?: {
    text: string
    author: string
    role: string
    company: string
    avatar: string
  }
  
  // Technical details
  architecture: string[]
  challenges: string[]
  solutions: string[]
  
  // Media
  gallery: {
    type: "image" | "video"
    url: string
    caption: string
  }[]
}
```

### User Preferences Model
```typescript
interface UserPreferences {
  theme: "light" | "dark" | "system"
  reducedMotion: boolean
  language: "es" | "en"
  visitCount: number
  lastVisit: Date
  favoriteProjects: string[]
  completedTour: boolean
}
```

### Content Management Model
```typescript
interface ContentConfig {
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
  }
  
  about: {
    bio: string
    skills: Skill[]
    experience: Experience[]
    education: Education[]
  }
  
  contact: {
    email: string
    phone?: string
    location: string
    availability: string
    social: SocialLink[]
  }
}
```

## Error Handling

### Client-Side Error Boundaries
```typescript
// components/error-boundary.tsx
interface ErrorBoundaryProps {
  fallback: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

// components/error-fallback.tsx
interface ErrorFallbackProps {
  error: Error
  resetError: () => void
  variant: "page" | "section" | "component"
}
```

### API Error Handling
```typescript
// lib/api-client.ts
interface APIError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
}

interface APIResponse<T> {
  data?: T
  error?: APIError
  success: boolean
}
```

### Form Validation
```typescript
// lib/validation.ts
import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  company: z.string().optional(),
  projectType: z.enum(["web", "mobile", "consulting", "other"]).optional(),
  budget: z.enum(["<5k", "5k-15k", "15k-50k", ">50k"]).optional()
})
```

## Testing Strategy

### Component Testing
```typescript
// __tests__/components/project-card.test.tsx
describe("ProjectCard", () => {
  it("renders project information correctly", () => {
    // Test basic rendering
  })
  
  it("handles hover interactions", () => {
    // Test hover states and animations
  })
  
  it("opens project modal on click", () => {
    // Test modal interaction
  })
})
```

### Integration Testing
```typescript
// __tests__/pages/blog.test.tsx
describe("Blog Page", () => {
  it("loads and displays blog posts", () => {
    // Test blog post loading
  })
  
  it("filters posts by category", () => {
    // Test filtering functionality
  })
  
  it("searches posts correctly", () => {
    // Test search functionality
  })
})
```

### Performance Testing
```typescript
// __tests__/performance/lighthouse.test.ts
describe("Performance", () => {
  it("meets Lighthouse performance thresholds", () => {
    // Performance: > 90
    // Accessibility: > 95
    // Best Practices: > 90
    // SEO: > 95
  })
})
```

### Accessibility Testing
```typescript
// __tests__/accessibility/a11y.test.tsx
describe("Accessibility", () => {
  it("meets WCAG 2.1 AA standards", () => {
    // Test keyboard navigation
    // Test screen reader compatibility
    // Test color contrast
    // Test focus management
  })
})
```

## Technical Implementation Details

### Animation Performance
- Use `transform` and `opacity` for animations (GPU accelerated)
- Implement `will-change` CSS property strategically
- Use `IntersectionObserver` for scroll-triggered animations
- Implement reduced motion preferences

### Bundle Optimization
- Code splitting by route and feature
- Dynamic imports for heavy components
- Image optimization with Next.js Image component
- Font optimization with variable fonts

### SEO Implementation
- Dynamic meta tags per page
- JSON-LD structured data
- XML sitemap generation
- Open Graph and Twitter Card optimization
- Canonical URLs

### Performance Monitoring
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Error tracking and reporting
- Performance budgets and alerts

This design provides a comprehensive roadmap for transforming the existing portfolio into a professional, feature-rich web application that showcases technical expertise while maintaining excellent user experience and performance.