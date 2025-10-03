import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from './components/blog/mdx-components'

// Este archivo es requerido para usar MDX en Next.js 13+ con App Router
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  }
}