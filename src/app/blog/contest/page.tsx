'use client'

import Link from 'next/link'
import { Trophy, Calendar, ArrowRight, Star, Camera, Pen, Video, Music } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data - in production this would come from your database/CMS
const contestEntries = [
  {
    id: 1,
    title: 'Golden Hour at Lake Simcoe',
    author: 'Sarah M.',
    type: 'photo',
    week: 'Week 12, 2024',
    isWinner: true,
    place: 1,
    description: 'Captured during a peaceful evening walk along the shoreline...',
  },
  {
    id: 2,
    title: 'The Old Maple Tree',
    author: 'James K.',
    type: 'writing',
    week: 'Week 12, 2024',
    isWinner: true,
    place: 2,
    description: 'A poem about the maple tree that has stood in my backyard for generations...',
  },
  {
    id: 3,
    title: 'Morning Market',
    author: 'Alex R.',
    type: 'video',
    week: 'Week 12, 2024',
    isWinner: true,
    place: 3,
    description: 'A short documentary about the Georgina Farmers Market...',
  },
  {
    id: 4,
    title: 'Winter Reflections',
    author: 'Patricia L.',
    type: 'photo',
    week: 'Week 11, 2024',
    isWinner: true,
    place: 1,
    description: 'The frozen lake creates a perfect mirror...',
  },
  {
    id: 5,
    title: 'Community Song',
    author: 'The Local Band',
    type: 'audio',
    week: 'Week 11, 2024',
    isWinner: true,
    place: 2,
    description: 'An original folk song celebrating our town...',
  },
  {
    id: 6,
    title: 'Spring Arrives',
    author: 'Michelle T.',
    type: 'photo',
    week: 'Week 10, 2024',
    isWinner: false,
    description: 'First blooms of the season in Civic Centre Park...',
  },
]

const typeIcons = {
  photo: Camera,
  writing: Pen,
  video: Video,
  audio: Music,
}

const typeColors = {
  photo: 'pine',
  writing: 'lake',
  video: 'sunset',
  audio: 'purple',
}

export default function ContestBlogPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-pine-600 font-semibold text-sm tracking-widest uppercase mb-4 block">Contest Gallery</span>
          <h1 className="section-title mb-4">Celebrating Local Talent</h1>
          <p className="section-subtitle mx-auto">
            Browse through submissions and winners from our weekly content contests. 
            Every piece tells a story about Georgina.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', 'Winners', 'Photography', 'Writing', 'Video', 'Audio'].map((filter) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'All'
                  ? 'bg-pine-600 text-white'
                  : 'bg-white text-charcoal/70 hover:bg-pine-50 hover:text-pine-700 border border-charcoal/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured Winner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-hidden mb-12"
        >
          <div className="grid lg:grid-cols-2">
            <div className="bg-gradient-to-br from-pine-100 to-lake-100 h-80 lg:h-auto flex items-center justify-center relative">
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">
                <Trophy className="w-4 h-4" />
                This Week's Winner
              </div>
              <Star className="w-24 h-24 text-pine-300" />
            </div>
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest">Week 12, 2024</span>
                <span className="px-2 py-1 rounded bg-pine-100 text-pine-700 text-xs font-medium">Photography</span>
              </div>
              <h2 className="text-3xl font-bold text-charcoal mb-2">Golden Hour at Lake Simcoe</h2>
              <p className="text-charcoal/50 mb-4">by Sarah M.</p>
              <p className="text-charcoal/70 mb-6 leading-relaxed">
                "Captured during a peaceful evening walk along the shoreline. The way the light danced 
                on the water reminded me why I love calling Georgina home. This photo represents the 
                quiet beauty that surrounds us every day."
              </p>
              <Link href="/blog/contest/1" className="btn-primary inline-flex items-center gap-2">
                View Full Entry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Grid of Entries */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contestEntries.slice(1).map((entry, i) => {
            const Icon = typeIcons[entry.type as keyof typeof typeIcons]
            return (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-pine-50 to-lake-50 h-48 flex items-center justify-center relative">
                  {entry.isWinner && (
                    <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${
                      entry.place === 1 ? 'bg-amber-400 text-amber-900' :
                      entry.place === 2 ? 'bg-slate-300 text-slate-700' :
                      'bg-orange-300 text-orange-800'
                    }`}>
                      <Trophy className="w-3 h-3" />
                      {entry.place === 1 ? '1st' : entry.place === 2 ? '2nd' : '3rd'} Place
                    </div>
                  )}
                  <Icon className="w-16 h-16 text-pine-200 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-charcoal/40" />
                    <span className="text-xs text-charcoal/50">{entry.week}</span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-1 group-hover:text-pine-700 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-charcoal/50 mb-3">by {entry.author}</p>
                  <p className="text-sm text-charcoal/60 line-clamp-2">{entry.description}</p>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Entries
          </button>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Want to See Your Work Here?</h2>
          <p className="text-charcoal/60 mb-8">
            Enter this week's contest and join our community of creators.
          </p>
          <Link href="/submit" className="btn-primary inline-flex items-center gap-2">
            Submit Your Entry
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}





