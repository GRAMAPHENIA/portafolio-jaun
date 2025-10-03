import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXComponents } from 'mdx/types'

// Componente para código inline
const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
    {children}
  </code>
)

// Componente para bloques de código
const CodeBlock = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) => {
  const language = className?.replace('language-', '') || 'text'
  
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
        {language}
      </div>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

// Componente para enlaces
const CustomLink = ({ 
  href, 
  children 
}: { 
  href?: string
  children: React.ReactNode 
}) => {
  if (!href) return <span>{children}</span>
  
  // Enlaces internos
  if (href.startsWith('/')) {
    return (
      <Link 
        href={href} 
        className="text-accent hover:text-accent/80 underline underline-offset-4"
      >
        {children}
      </Link>
    )
  }
  
  // Enlaces externos
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:text-accent/80 underline underline-offset-4"
    >
      {children}
    </a>
  )
}

// Componente para imágenes
const CustomImage = ({ 
  src, 
  alt, 
  ...props 
}: { 
  src?: string
  alt?: string
  [key: string]: any 
}) => {
  if (!src) return null
  
  return (
    <div className="my-8">
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg w-full h-auto"
        {...props}
      />
      {alt && (
        <p className="text-sm text-muted-foreground text-center mt-2 italic">
          {alt}
        </p>
      )}
    </div>
  )
}

// Componente para blockquotes
const Blockquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-accent pl-4 my-6 italic text-muted-foreground">
    {children}
  </blockquote>
)

// Componente para tablas
const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto my-6">
    <table className="w-full border-collapse border border-border">
      {children}
    </table>
  </div>
)

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-muted">
    {children}
  </thead>
)

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b border-border">
    {children}
  </tr>
)

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border border-border px-4 py-2">
    {children}
  </td>
)

const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
  <th className="border border-border px-4 py-2 text-left font-semibold">
    {children}
  </th>
)

// Componentes para listas
const OrderedList = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal list-inside space-y-2 my-4 ml-4">
    {children}
  </ol>
)

const UnorderedList = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc list-inside space-y-2 my-4 ml-4">
    {children}
  </ul>
)

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="leading-relaxed">
    {children}
  </li>
)

// Componentes para headings con anclas
const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const HeadingComponent = ({ children, id }: { children: React.ReactNode, id?: string }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements
    const sizes = {
      1: 'text-4xl md:text-5xl font-bold',
      2: 'text-3xl md:text-4xl font-bold',
      3: 'text-2xl md:text-3xl font-semibold',
      4: 'text-xl md:text-2xl font-semibold',
      5: 'text-lg md:text-xl font-medium',
      6: 'text-base md:text-lg font-medium'
    }
    
    return (
      <Tag 
        id={id}
        className={`${sizes[level]} mt-8 mb-4 scroll-mt-20 group`}
      >
        {id && (
          <a 
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity mr-2 text-accent"
            aria-label={`Enlace a ${children}`}
          >
            #
          </a>
        )}
        {children}
      </Tag>
    )
  }
  
  HeadingComponent.displayName = `Heading${level}`
  return HeadingComponent
}

// Componente para párrafos
const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-relaxed my-4 text-foreground">
    {children}
  </p>
)

// Componente para separadores
const HorizontalRule = () => (
  <hr className="my-8 border-border" />
)

// Exportar todos los componentes MDX
export const mdxComponents: MDXComponents = {
  // Headings
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  
  // Text elements
  p: Paragraph,
  code: InlineCode,
  pre: CodeBlock,
  blockquote: Blockquote,
  hr: HorizontalRule,
  
  // Links and images
  a: CustomLink,
  img: CustomImage,
  
  // Lists
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  
  // Tables
  table: Table,
  thead: TableHeader,
  tbody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
  tr: TableRow,
  td: TableCell,
  th: TableHeaderCell,
  
  // Custom components can be added here
  // Example: CalloutBox, CodeSandbox, etc.
}