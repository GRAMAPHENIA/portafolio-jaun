"use client";

import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { BlogCard } from "@/components/blog/blog-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, ArrowLeft, Share2, Tag } from "lucide-react";
import Link from "next/link";

interface BlogPostClientProps {
  post: any; // Reemplaza 'any' con tu tipo de post
  relatedPosts: any[]; // Reemplaza 'any' con tu tipo de posts relacionados
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const contentRef = React.useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error al compartir:", error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      {isMounted && contentRef.current && (
        <ReadingProgress target={contentRef} />
      )}

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link href="/blog">
                <Button variant="ghost" className="mb-6 -ml-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Blog
                </Button>
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                {post.featured && (
                  <Badge variant="default" className="bg-accent">
                    Destacado
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Publicado el {formatDate(post.publishedAt)}</span>
                </div>

                {post.updatedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Actualizado el {formatDate(post.updatedAt)}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime.text}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <AvatarFallback>
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {post.author.name}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                  onClick={sharePost}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <article
                ref={contentRef}
                className="prose dark:prose-invert prose-lg max-w-none w-full lg:w-3/4"
              >
                <MDXRemote source={post.content} components={mdxComponents} />
              </article>

              <aside className="lg:w-1/4 space-y-8">
                <TableOfContents content={post.content} />

                {post.tags?.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Etiquetas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>

            <Separator className="my-12" />

            {/* Posts relacionados */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">
                  Artículos relacionados
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
