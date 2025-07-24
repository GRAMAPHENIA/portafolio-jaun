---
inclusion: fileMatch
fileMatchPattern: '**/portfolio-enhancement/**'
---

# Portfolio Enhancement Project Context

## Project Overview

This project enhances Jaun Rojo's existing portfolio to create a professional, feature-rich web application that showcases technical expertise and attracts potential employers or clients.

### Current Tech Stack
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Fonts:** Jost (headings), Instrument Sans (body)
- **Theme:** Dark theme by default with light theme support

### Project Structure
```
portfolio-personal-jaun/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage with Hero, Projects, Testimonials
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Header, Footer
│   ├── projects/          # Project components
│   ├── sections/          # Hero, Testimonials
│   └── ui/               # shadcn/ui components
├── data/
│   └── projects.ts        # Project data
├── lib/
│   └── types.ts          # TypeScript interfaces
└── public/               # Static assets
```

### Existing Components
- **Header:** Navigation with theme toggle
- **Hero:** Minimalist design with "Jaun Rojo" branding
- **ProjectGrid:** Displays 6 projects with technology tags
- **TestimonialSection:** Social proof section
- **Footer:** Basic footer with links

### Current Projects (6 total)
1. Documentación de Casos de Umbral
2. El Palacio Dom
3. Sesgos cognitivos
4. Hiperstición
5. Columne
6. registros-de-consolas-de-umbral

## Enhancement Goals

### Primary Objectives
1. **Professional Polish:** Add animations, micro-interactions, and visual enhancements
2. **Content Expansion:** Add blog system, skills section, and detailed project views
3. **User Experience:** Improve navigation, add search/filtering, and contact forms
4. **Technical Excellence:** Optimize SEO, performance, and accessibility
5. **Content Management:** Enable easy content updates without code changes

### Target Audience
- **Potential Employers:** Recruiters and hiring managers
- **Clients:** Businesses looking for web development services
- **Peers:** Other developers and tech professionals
- **Community:** Blog readers interested in technical content

## Implementation Approach

### Incremental Enhancement
- Build upon existing foundation without breaking current functionality
- Add new features progressively
- Maintain existing design aesthetic while enhancing it
- Preserve current project data and structure

### Key Principles
- **Performance First:** Maintain fast loading times and smooth interactions
- **Accessibility:** Ensure WCAG 2.1 AA compliance
- **Mobile Responsive:** Optimize for all device sizes
- **SEO Optimized:** Improve search engine visibility
- **Maintainable:** Create systems for easy content updates

## Technical Considerations

### Animation Strategy
- Use Framer Motion for complex animations
- Implement CSS transforms for simple hover effects
- Respect user's motion preferences
- Optimize for 60fps performance

### Content Strategy
- Implement MDX for blog posts with syntax highlighting
- Create flexible data structures for easy updates
- Support multiple content types (projects, blog, experience)
- Enable content versioning and drafts

### Performance Targets
- Lighthouse Performance Score: >90
- Lighthouse Accessibility Score: >95
- Lighthouse Best Practices Score: >90
- Lighthouse SEO Score: >95
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers
- Graceful degradation for JavaScript-disabled users

## Content Guidelines

### Brand Voice
- Professional but approachable
- Technical expertise without jargon
- Spanish language for user-facing content
- Clear and concise communication

### Visual Identity
- Maintain current minimalist aesthetic
- Use existing color scheme and typography
- Add subtle animations and micro-interactions
- Ensure consistency across all components

### Content Types
- **Projects:** Detailed case studies with metrics and testimonials
- **Blog Posts:** Technical articles and tutorials
- **Experience:** Professional timeline with achievements
- **Skills:** Interactive visualization of technical competencies
- **About:** Personal story and professional journey