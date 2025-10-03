"use client";

import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getRelatedPosts, getAllBlogPosts } from "@/lib/mdx";
import { BlogPostClient } from "@/components/blog/blog-post-client";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post no encontrado",
    };
  }

  return {
    title: `${post.title} | Blog - Jaun Rojo`,
    description: post.description,
    keywords: [...post.tags, post.category, "blog", "desarrollo web"],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@juanrojo",
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
