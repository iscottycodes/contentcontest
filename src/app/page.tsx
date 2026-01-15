'use client'

import Link from 'next/link'
import { Trophy, Calendar, Award, ArrowRight, Sparkles, Clock, Users, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import SponsorShowcase from '@/components/SponsorShowcase'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-animate opacity-95" />
        <div className="absolute inset-0 noise-overlay" />
        
        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunset-500/20 rounded-full blur-3xl animate-float stagger-2" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-lake-400/20 rounded-full blur-3xl animate-float stagger-3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div 
            className="max-w-4xl"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-sunset-300" />
              <span className="text-white/90 text-sm font-medium">Weekly Cash Prizes</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6"
            >
              Celebrating<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-300 via-sunset-400 to-sunset-300">
                Georgina's
              </span><br />
              Best Creators
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed"
            >
              Join our weekly content contest showcasing local artists and creators. 
              Submit your work Thursday through Sunday, winners announced every Monday.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="/submit" 
                className="group inline-flex items-center gap-3 bg-white text-charcoal px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
              >
                Enter This Week's Contest
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contest" 
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10"
            >
              {[
                { icon: Trophy, label: 'Cash Prizes', value: 'Weekly' },
                { icon: Calendar, label: 'Contest Runs', value: 'Thu–Sun' },
                { icon: Award, label: 'Winners', value: 'Every Monday' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white/80" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-cream relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-pine-600 font-semibold text-sm tracking-widest uppercase mb-4 block">How It Works</span>
            <h2 className="section-title mb-4">Simple. Fun. Rewarding.</h2>
            <p className="section-subtitle mx-auto">
              Participating in ContentContest is easy. Here's everything you need to know.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Sparkles,
                title: 'Create Your Content',
                description: 'Photography, art, writing, video—share your creative talents with the Georgina community.',
                color: 'pine'
              },
              {
                step: '02',
                icon: Clock,
                title: 'Submit Thu–Sun',
                description: 'Upload your entry through our submission form or email us. Contest opens every Thursday at midnight.',
                color: 'lake'
              },
              {
                step: '03',
                icon: Trophy,
                title: 'Win on Monday',
                description: 'Winners are announced every Monday. Cash prizes and community recognition await!',
                color: 'sunset'
              }
            ].map((item) => (
              <div key={item.step} className="card p-8 relative group">
                <span className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-pine-600 to-lake-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.step}
                </span>
                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-100 flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-charcoal/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Winners Preview */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pine-50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-pine-600 font-semibold text-sm tracking-widest uppercase mb-4 block">Contest Gallery</span>
              <h2 className="section-title mb-6">Discover Amazing Local Talent</h2>
              <p className="section-subtitle mb-8">
                Every week, we showcase incredible submissions from Georgina's creative community. 
                From stunning photography to heartfelt writing, discover what makes our community special.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/blog/contest" className="btn-primary inline-flex items-center gap-2">
                  View All Entries
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/submit" className="btn-secondary">
                  Submit Your Work
                </Link>
              </div>
            </div>

            <div className="text-center py-12">
              <Star className="w-16 h-16 text-pine-300 mx-auto mb-4 opacity-50" />
              <p className="text-charcoal/60 mb-4">No winners yet. Be the first to win!</p>
              <Link href="/submit" className="btn-primary inline-flex items-center gap-2">
                Submit Your Entry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Showcase */}
      <SponsorShowcase />

      {/* CTA Section */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pine-600/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Showcase Your Talent?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join Georgina's creative community. Submit your entry this week and you could be our next featured winner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/submit" className="btn-accent text-lg px-10 py-4 inline-flex items-center gap-3">
              Enter Contest Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/sponsors#become" className="btn-secondary text-lg px-10 py-4">
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}





