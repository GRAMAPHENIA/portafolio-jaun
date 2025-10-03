import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Blog - Jaun Rojo',
    default: 'Blog - Jaun Rojo'
  },
  description: 'Blog técnico sobre desarrollo web, React, Next.js, TypeScript y más.',
}

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}