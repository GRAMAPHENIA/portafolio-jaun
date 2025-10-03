import React from 'react'
import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { getAllBlogPosts, getFeaturedPosts, getAllCategories } from '@/lib/mdx'
import { BlogCard } from '@/components/blog/blog-card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Jaun Rojo - Desarrollador Full Stack',
  description: 'Artículos técnicos sobre desarrollo web, React, Next.js, TypeScript y más. Comparto mi experiencia y conocimientos en desarrollo de software.',
  keywords: ['blog', 'desarrollo web', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'programación'],
  openGraph: {
    title: 'Blog - Jaun Rojo',
    description: 'Artículos técnicos sobre desarrollo web y programación',
    type: 'website',
    url: '/blog'
  }
}

export default function BlogPage() {
  const allPosts = getAllBlogPosts()
  const featuredPosts = getFeaturedPosts()
  const categories = getAllCategories()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-8 h-8 text-accent" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Blog Técnico
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comparto mi experiencia y conocimientos sobre desarrollo web, 
              mejores prácticas y las últimas tecnologías del ecosistema JavaScript.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-6 h-6 text-accent" />
                <h2 className="text-3xl font-bold">Artículos Destacados</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard 
                    key={post.slug} 
                    post={post} 
                    variant="featured"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Artículos Recientes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogCard 
                  key={post.slug} 
                  post={post} 
                  variant="standard"
                />
              ))}
            </div>
            
            {allPosts.length > 6 && (
              <div className="text-center mt-12">
                <p className="text-muted-foreground">
                  Mostrando {Math.min(6, allPosts.length)} de {allPosts.length} artículos
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">
                  {allPosts.length}
                </div>
                <div className="text-muted-foreground">
                  Artículos Publicados
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-accent mb-2">
                  {categories.length}
                </div>
                <div className="text-muted-foreground">
                  Categorías
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-accent mb-2">
                  {Math.round(allPosts.reduce((acc, post) => acc + post.readingTime.minutes, 0) / allPosts.length) || 0}
                </div>
                <div className="text-muted-foreground">
                  Min. Lectura Promedio
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}