'use client'

import Link from 'next/link'
import { Calendar, ArrowRight, Heart, MessageCircle, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock blog posts - in production from database/CMS
const blogPosts = [
  {
    id: 1,
    title: 'Why I Started ContentContest',
    excerpt: 'Every community has stories worth telling. Georgina is full of talented artists, writers, photographers, and creators who deserve a platform to shine...',
    date: 'December 15, 2024',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'The Beauty of Small Town Creativity',
    excerpt: 'There\'s something special about creativity that comes from a place of deep connection to community. When artists create from a place they truly know...',
    date: 'December 8, 2024',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Thank You to Our First Sponsors',
    excerpt: 'I am so grateful to announce our founding sponsors who believed in this vision from day one. Their support makes it possible to offer cash prizes...',
    date: 'December 1, 2024',
    readTime: '3 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'What Makes Georgina Special',
    excerpt: 'After living here for over a decade, I\'ve come to appreciate the unique character of our town. From the shores of Lake Simcoe to the trails...',
    date: 'November 24, 2024',
    readTime: '6 min read',
    featured: false,
  },
]

export default function PersonalBlogPage() {
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

        {/* Featured Post */}
        {blogPosts.filter(p => p.featured).map(post => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card overflow-hidden mb-12"
          >
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 bg-gradient-to-br from-sunset-100 to-amber-100 h-64 lg:h-auto flex items-center justify-center">
                <Heart className="w-20 h-20 text-sunset-300" />
              </div>
              <div className="lg:col-span-3 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-sunset-100 text-sunset-700 text-xs font-semibold">Featured</span>
                  <span className="text-sm text-charcoal/50">{post.date}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-charcoal mb-4">{post.title}</h2>
                <p className="text-charcoal/60 mb-6 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal/40">{post.readTime}</span>
                  <Link href={`/blog/personal/${post.id}`} className="btn-primary text-sm py-2 px-4 inline-flex items-center gap-2">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        {/* Post List */}
        <div className="space-y-6">
          {blogPosts.filter(p => !p.featured).map((post, i) => (
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
                    <span className="text-sm text-charcoal/50">{post.date}</span>
                    <span className="text-sm text-charcoal/40">•</span>
                    <span className="text-sm text-charcoal/40">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-sunset-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-charcoal/60 line-clamp-2">{post.excerpt}</p>
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





