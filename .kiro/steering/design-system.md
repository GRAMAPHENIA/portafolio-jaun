---
inclusion: always
---

# Design System Guidelines

## Color Palette

### Current Theme Colors (Maintain Consistency)
```css
/* Primary Colors */
--background: hsl(var(--background))
--foreground: hsl(var(--foreground))
--accent: hsl(var(--accent))
--accent-foreground: hsl(var(--accent-foreground))

/* Semantic Colors */
--muted: hsl(var(--muted))
--muted-foreground: hsl(var(--muted-foreground))
--border: hsl(var(--border))
--input: hsl(var(--input))
```

### Usage Guidelines
- Use `accent` color for highlights and CTAs
- Use `muted-foreground` for secondary text
- Maintain proper contrast ratios for accessibility
- Support both light and dark themes

## Typography

### Font Hierarchy
```css
/* Current Fonts (Maintain) */
--font-heading: Jost (for headings and titles)
--font-body: Instrument Sans (for body text)
```

### Typography Scale
```css
/* Headings */
.text-6xl md:text-8xl  /* Hero title */
.text-4xl md:text-5xl  /* Section titles */
.text-2xl md:text-3xl  /* Subsection titles */
.text-xl               /* Card titles */

/* Body Text */
.text-lg               /* Large body text */
.text-base             /* Default body text */
.text-sm               /* Small text */
.text-xs               /* Caption text */
```

## Spacing System

### Consistent Spacing
```css
/* Use Tailwind spacing scale */
.space-y-4    /* Small vertical spacing */
.space-y-8    /* Medium vertical spacing */
.space-y-16   /* Large vertical spacing */

/* Container padding */
.px-4         /* Mobile padding */
.px-8         /* Tablet padding */
.px-16        /* Desktop padding */
```

### Layout Patterns
- Use `container mx-auto` for main content areas
- Implement consistent section padding: `py-16 md:py-24`
- Use `max-w-4xl mx-auto` for content width constraints

## Component Patterns

### Card Components
```tsx
// Standard card pattern
<div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

### Button Variants
- Primary: Use `accent` background for main actions
- Secondary: Use `muted` background for secondary actions
- Ghost: Transparent background with hover effects
- Maintain consistent padding and border radius

### Animation Patterns
```tsx
// Standard fade in animation
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

// Hover effects
.hover:scale-105 .transition-transform .duration-300
```

## Layout Guidelines

### Grid System
- Use CSS Grid for complex layouts
- Use Flexbox for component-level layouts
- Maintain responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

### Responsive Design
```css
/* Mobile First Approach */
.grid-cols-1 md:grid-cols-2 lg:grid-cols-3
.text-center md:text-left
.px-4 md:px-8 lg:px-16
```

### Section Structure
```tsx
// Standard section pattern
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      {/* Section content */}
    </div>
  </div>
</section>
```

## Interactive Elements

### Hover States
- Scale transforms: `hover:scale-105`
- Shadow effects: `hover:shadow-lg`
- Color transitions: `hover:text-accent`
- Smooth transitions: `transition-all duration-300`

### Focus States
- Visible focus rings for accessibility
- Consistent focus styling across components
- Proper focus management for modals and dropdowns

### Loading States
- Skeleton loaders for content areas
- Spinner animations for buttons
- Progress indicators for multi-step processes

## Accessibility Guidelines

### Color Contrast
- Ensure 4.5:1 contrast ratio for normal text
- Ensure 3:1 contrast ratio for large text
- Test with both light and dark themes

### Interactive Elements
- Minimum touch target size: 44px × 44px
- Clear visual feedback for all interactions
- Keyboard navigation support
- Screen reader compatibility

## Component Library Usage

### shadcn/ui Components
- Use existing components when possible
- Extend components with custom variants
- Maintain consistent styling patterns
- Follow component composition principles

### Custom Components
- Follow the same patterns as shadcn/ui
- Use Tailwind CSS for styling
- Implement proper TypeScript interfaces
- Include accessibility features by default