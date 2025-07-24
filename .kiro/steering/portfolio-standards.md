---
inclusion: always
---

# Portfolio Development Standards

## Code Quality Standards

### TypeScript Usage
- Always use strict TypeScript with proper type definitions
- Prefer interfaces over types for object shapes
- Use generic types for reusable components
- Never use `any` - use `unknown` or proper typing instead

### Component Architecture
- Use functional components with hooks
- Implement proper prop interfaces for all components
- Use React.forwardRef for components that need ref forwarding
- Prefer composition over inheritance

### Styling Guidelines
- Use Tailwind CSS classes consistently
- Follow the existing design system with shadcn/ui components
- Maintain responsive design principles (mobile-first)
- Use CSS custom properties for theme variables

### Performance Best Practices
- Implement lazy loading for images and heavy components
- Use React.memo for expensive components
- Optimize bundle size with dynamic imports
- Follow Next.js best practices for SSR/SSG

## Animation Guidelines

### Framer Motion Standards
- Use consistent easing functions: `ease: [0.25, 0.1, 0.25, 1]`
- Keep animation durations between 0.2s - 0.8s
- Implement `prefers-reduced-motion` support
- Use `layoutId` for shared element transitions

### Performance Considerations
- Animate only `transform` and `opacity` properties
- Use `will-change` sparingly and remove after animation
- Implement intersection observer for scroll-triggered animations
- Avoid animating layout properties (width, height, padding)

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Maintain color contrast ratio of at least 4.5:1
- Ensure all interactive elements are keyboard accessible
- Provide proper ARIA labels and descriptions
- Test with screen readers

### Focus Management
- Implement visible focus indicators
- Manage focus for modals and dynamic content
- Use proper heading hierarchy (h1 → h6)
- Provide skip links for navigation

## SEO Optimization

### Meta Tags
- Include title, description, and keywords for each page
- Implement Open Graph and Twitter Card meta tags
- Use canonical URLs to prevent duplicate content
- Add structured data (JSON-LD) for rich snippets

### Content Structure
- Use semantic HTML elements
- Implement proper heading hierarchy
- Add alt text for all images
- Create descriptive link text

## Error Handling

### User Experience
- Provide clear error messages in Spanish
- Implement graceful fallbacks for failed requests
- Show loading states for async operations
- Use toast notifications for user feedback

### Development
- Implement error boundaries for React components
- Log errors with proper context information
- Handle API errors with retry mechanisms
- Validate user input on both client and server

## Testing Standards

### Component Testing
- Test component rendering with different props
- Test user interactions and event handlers
- Test accessibility features
- Mock external dependencies

### Integration Testing
- Test complete user flows
- Test API integrations
- Test responsive behavior
- Test performance metrics