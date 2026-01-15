'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { getBlogPosts, type BlogPost } from '@/lib/firebase-admin'
import { Timestamp } from 'firebase/firestore'

function formatDate(timestamp: Timestamp | undefined): string {
  if (!timestamp) return ''
  const date = timestamp.toDate()
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function estimateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export default function PersonalBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getBlogPosts('personal', true)
        setBlogPosts(data)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sunset-600 font-semibold text-sm tracking-widest uppercase mb-4 block">From the Editor</span>
          <h1 className="section-title mb-4">Thoughts & Stories</h1>
          <p className="section-subtitle mx-auto">
            Personal reflections on creativity, community, and what makes Georgina home.
          </p>
        </div>

        {/* Author Card */}
        <div className="card p-6 md:p-8 mb-12 bg-gradient-to-br from-sunset-50 to-amber-50">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sunset-400 to-amber-400 flex items-center justify-center text-white text-3xl font-display font-bold">
              E
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-charcoal mb-2">The Editor</h2>
              <p className="text-charcoal/60 max-w-xl">
                A passionate believer in local creativity and community connection. 
                Through ContentContest, I hope to give Georgina's artists and creators 
                the recognition they deserve.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-charcoal/50">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-sunset-300 mx-auto mb-4 opacity-50" />
            <p className="text-charcoal/60">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured Post (first post) */}
            {blogPosts.length > 0 && (
              <motion.article
                key={blogPosts[0].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card overflow-hidden mb-12"
              >
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-gradient-to-br from-sunset-100 to-amber-100 h-64 lg:h-auto flex items-center justify-center">
                    {blogPosts[0].featuredImage ? (
                      <img src={blogPosts[0].featuredImage} alt={blogPosts[0].title} className="w-full h-full object-cover" />
                    ) : (
                      <Heart className="w-20 h-20 text-sunset-300" />
                    )}
                  </div>
                  <div className="lg:col-span-3 p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-sunset-100 text-sunset-700 text-xs font-semibold">Featured</span>
                      <span className="text-sm text-charcoal/50">{formatDate(blogPosts[0].publishedAt as Timestamp)}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-charcoal mb-4">{blogPosts[0].title}</h2>
                    <p className="text-charcoal/60 mb-6 leading-relaxed">{blogPosts[0].excerpt || blogPosts[0].content.substring(0, 150) + '...'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-charcoal/40">{estimateReadTime(blogPosts[0].content)}</span>
                      <Link href={`/blog/personal/${blogPosts[0].id}`} className="btn-primary text-sm py-2 px-4 inline-flex items-center gap-2">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Post List */}
            <div className="space-y-6">
              {blogPosts.slice(1).map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-6 md:p-8 group hover:border-sunset-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sunset-100 to-amber-100 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-8 h-8 text-sunset-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-4 h-4 text-charcoal/40" />
                        <span className="text-sm text-charcoal/50">{formatDate(post.publishedAt as Timestamp)}</span>
                        <span className="text-sm text-charcoal/40">•</span>
                        <span className="text-sm text-charcoal/40">{estimateReadTime(post.content)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-sunset-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-charcoal/60 line-clamp-2">{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                    </div>
                    <Link 
                      href={`/blog/personal/${post.id}`}
                      className="text-sunset-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 card p-8 md:p-12 bg-charcoal text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Get notified about new blog posts, contest announcements, and community updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
            />
            <button className="btn-accent whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}





