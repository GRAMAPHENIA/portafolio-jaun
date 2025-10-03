import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: Date
  updatedAt?: Date
  tags: string[]
  category: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
  featured: boolean
  author: {
    name: string
    avatar: string
    bio: string
    social: Array<{
      platform: string
      url: string
    }>
  }
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

export function getAllBlogPosts(): BlogPostMeta[] {
  const blogDirectory = path.join(contentDirectory, 'blog')
  
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readingTimeResult = readingTime(content)

      return {
        slug,
        title: data.title,
        description: data.description,
        publishedAt: new Date(data.publishedAt),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
        tags: data.tags || [],
        category: data.category,
        readingTime: readingTimeResult,
        featured: data.featured || false,
        author: data.author
      } as BlogPostMeta
    })

  return allPostsData.sort((a, b) => {
    return b.publishedAt.getTime() - a.publishedAt.getTime()
  })
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const blogDirectory = path.join(contentDirectory, 'blog')
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readingTimeResult = readingTime(content)

    return {
      slug,
      title: data.title,
      description: data.description,
      content,
      publishedAt: new Date(data.publishedAt),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
      tags: data.tags || [],
      category: data.category,
      readingTime: readingTimeResult,
      featured: data.featured || false,
      author: data.author
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getFeaturedPosts(): BlogPostMeta[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter(post => post.featured)
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

export function searchPosts(query: string): BlogPostMeta[] {
  const allPosts = getAllBlogPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  )
}

export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts()
  const categories = new Set(allPosts.map(post => post.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const allPosts = getAllBlogPosts()
  const tags = new Set(allPosts.flatMap(post => post.tags))
  return Array.from(tags).sort()
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const currentPost = getBlogPost(currentSlug)
  if (!currentPost) return []

  const allPosts = getAllBlogPosts()
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug)

  // Calcular puntuación de similitud basada en tags y categoría
  const postsWithScore = otherPosts.map(post => {
    let score = 0
    
    // Misma categoría = +3 puntos
    if (post.category === currentPost.category) {
      score += 3
    }
    
    // Tags compartidos = +1 punto por tag
    const sharedTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    )
    score += sharedTags.length

    return { ...post, score }
  })

  // Ordenar por puntuación y tomar los primeros
  return postsWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...post }) => post)
}