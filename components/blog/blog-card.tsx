"use client"

import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { BlogPostMeta } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface BlogCardProps {
  post: BlogPostMeta
  variant?: 'featured' | 'standard' | 'compact'
}

export function BlogCard({ post, variant = 'standard' }: BlogCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const cardVariants = {
    featured: 'col-span-full md:col-span-2',
    standard: 'col-span-1',
    compact: 'col-span-1'
  }

  const contentVariants = {
    featured: 'p-8',
    standard: 'p-6',
    compact: 'p-4'
  }

  return (
    <div className={cardVariants[variant]}>
      <Link href={`/blog/${post.slug}`}>
        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
          <CardHeader className={contentVariants[variant]}>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge variant="default" className="text-xs bg-accent">
                  Destacado
                </Badge>
              )}
            </div>
            
            <CardTitle className={`group-hover:text-accent transition-colors ${
              variant === 'featured' ? 'text-2xl md:text-3xl' : 
              variant === 'compact' ? 'text-lg' : 'text-xl'
            }`}>
              {post.title}
            </CardTitle>
            
            <CardDescription className={`${
              variant === 'featured' ? 'text-base' : 'text-sm'
            } line-clamp-2`}>
              {post.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className={`${contentVariants[variant]} pt-0`}>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime.text}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
            </div>
            
            {variant !== 'compact' && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, variant === 'featured' ? 5 : 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > (variant === 'featured' ? 5 : 3) && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - (variant === 'featured' ? 5 : 3)} más
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}