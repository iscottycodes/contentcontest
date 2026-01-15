'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trophy, Calendar, ArrowRight, Star, Camera, Pen, Video, Music } from 'lucide-react'
import { motion } from 'framer-motion'
import { getSubmissions, type Submission } from '@/lib/firebase-admin'
import { Timestamp } from 'firebase/firestore'

function formatWeek(week: string): string {
  return week || 'Unknown Week'
}

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
  const [entries, setEntries] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEntries() {
      try {
        // Get all submissions, we'll filter winners in the UI
        const data = await getSubmissions()
        setEntries(data)
      } catch (error) {
        console.error('Error fetching entries:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEntries()
  }, [])

  // Separate winners and other entries
  const winners = entries.filter(e => e.status === 'winner' && e.place).sort((a, b) => {
    // Sort by week (newest first), then by place
    if (a.week !== b.week) {
      return b.week.localeCompare(a.week)
    }
    return (a.place || 0) - (b.place || 0)
  })
  const otherEntries = entries.filter(e => e.status !== 'winner' || !e.place)

  // Get the most recent winner for featured section
  const featuredWinner = winners[0]

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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-charcoal/50">Loading entries...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-pine-300 mx-auto mb-4 opacity-50" />
            <p className="text-charcoal/60 mb-4">No contest entries yet.</p>
            <Link href="/submit" className="btn-primary inline-flex items-center gap-2">
              Submit Your Entry
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Winner */}
            {featuredWinner && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card overflow-hidden mb-12"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="bg-gradient-to-br from-pine-100 to-lake-100 h-80 lg:h-auto flex items-center justify-center relative">
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">
                      <Trophy className="w-4 h-4" />
                      {featuredWinner.place === 1 ? '1st Place Winner' : featuredWinner.place === 2 ? '2nd Place Winner' : '3rd Place Winner'}
                    </div>
                    {featuredWinner.fileUrl ? (
                      <img src={featuredWinner.fileUrl} alt={featuredWinner.title} className="w-full h-full object-cover" />
                    ) : (
                      <Star className="w-24 h-24 text-pine-300" />
                    )}
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest">{formatWeek(featuredWinner.week)}</span>
                      <span className="px-2 py-1 rounded bg-pine-100 text-pine-700 text-xs font-medium capitalize">{featuredWinner.type}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-charcoal mb-2">{featuredWinner.title}</h2>
                    <p className="text-charcoal/50 mb-4">by {featuredWinner.author}</p>
                    <p className="text-charcoal/70 mb-6 leading-relaxed">{featuredWinner.description}</p>
                    {featuredWinner.fileUrl && (
                      <Link href={featuredWinner.fileUrl} target="_blank" className="btn-primary inline-flex items-center gap-2">
                        View Full Entry
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid of Entries */}
            {(winners.length > 1 || otherEntries.length > 0) && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {winners.slice(1).map((entry, i) => {
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
                        {entry.place && (
                          <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${
                            entry.place === 1 ? 'bg-amber-400 text-amber-900' :
                            entry.place === 2 ? 'bg-slate-300 text-slate-700' :
                            'bg-orange-300 text-orange-800'
                          }`}>
                            <Trophy className="w-3 h-3" />
                            {entry.place === 1 ? '1st' : entry.place === 2 ? '2nd' : '3rd'} Place
                          </div>
                        )}
                        {entry.fileUrl ? (
                          <img src={entry.fileUrl} alt={entry.title} className="w-full h-full object-cover" />
                        ) : (
                          <Icon className="w-16 h-16 text-pine-200 group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-3.5 h-3.5 text-charcoal/40" />
                          <span className="text-xs text-charcoal/50">{formatWeek(entry.week)}</span>
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
                {otherEntries.slice(0, 6).map((entry, i) => {
                  const Icon = typeIcons[entry.type as keyof typeof typeIcons]
                  return (
                    <motion.article
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (winners.length - 1 + i) * 0.1 }}
                      className="card overflow-hidden group"
                    >
                      <div className="bg-gradient-to-br from-pine-50 to-lake-50 h-48 flex items-center justify-center relative">
                        {entry.fileUrl ? (
                          <img src={entry.fileUrl} alt={entry.title} className="w-full h-full object-cover" />
                        ) : (
                          <Icon className="w-16 h-16 text-pine-200 group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-3.5 h-3.5 text-charcoal/40" />
                          <span className="text-xs text-charcoal/50">{formatWeek(entry.week)}</span>
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
            )}
          </>
        )}

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





