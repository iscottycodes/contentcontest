'use client'

import Link from 'next/link'
import { Trophy, Calendar, Clock, CheckCircle, AlertCircle, Award, FileText, Camera, Pen, Video, Music, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function ContestPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-pine-600 font-semibold text-sm tracking-widest uppercase mb-4 block"
          >
            Contest Information
          </motion.span>
          <motion.h1 
            {...fadeInUp}
            className="section-title mb-6"
          >
            Contest Rules & Guidelines
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="section-subtitle mx-auto mb-8"
          >
            Everything you need to know about participating in ContentContest.ca's weekly creative competition.
          </motion.p>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Link href="/submit" className="btn-primary inline-flex items-center gap-2">
              Submit Your Entry
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="card p-8 md:p-12 bg-gradient-to-br from-pine-50 to-lake-50">
          <h2 className="text-2xl font-bold text-charcoal mb-8 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-pine-600" />
            Weekly Schedule
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { day: 'Thursday', time: '12:00 AM', event: 'Contest Opens', icon: Clock, color: 'pine' },
              { day: 'Sunday', time: '11:59 PM', event: 'Submissions Close', icon: AlertCircle, color: 'sunset' },
              { day: 'Monday', time: '12:00 PM', event: 'Winners Announced', icon: Trophy, color: 'lake' },
              { day: 'Tue–Wed', time: 'All Day', event: 'Judging Period', icon: Award, color: 'charcoal' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <item.icon className={`w-8 h-8 text-${item.color}-600 mb-4`} />
                <h3 className="font-bold text-charcoal text-lg">{item.day}</h3>
                <p className="text-sm text-charcoal/50 mb-2">{item.time}</p>
                <p className="text-charcoal/70">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accepted Content Types */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold text-charcoal mb-8 flex items-center gap-3">
          <FileText className="w-7 h-7 text-pine-600" />
          Accepted Content Types
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { type: 'Photography', icon: Camera, desc: 'Original photos capturing Georgina\'s beauty, people, or events' },
            { type: 'Writing', icon: Pen, desc: 'Poetry, short stories, essays, or articles about local life' },
            { type: 'Video', icon: Video, desc: 'Short films, vlogs, or creative video content (under 5 min)' },
            { type: 'Music & Audio', icon: Music, desc: 'Original songs, compositions, or audio productions' },
          ].map((item) => (
            <div key={item.type} className="card p-6 hover:border-pine-200">
              <div className="w-14 h-14 rounded-2xl bg-pine-100 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-pine-600" />
              </div>
              <h3 className="font-bold text-charcoal mb-2">{item.type}</h3>
              <p className="text-sm text-charcoal/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Eligibility */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-pine-600" />
              Eligibility Requirements
            </h2>
            <div className="space-y-4">
              {[
                'Must be a resident of Georgina',
                'Open to all ages (minors need parental consent)',
                'One submission per person, per week',
                'Content must be original and created by the submitter',
                'Content must be appropriate for all audiences',
                'Previously submitted content cannot be re-entered',
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pine-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-pine-600 text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-charcoal/70">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Guidelines */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
              <FileText className="w-7 h-7 text-lake-600" />
              Submission Guidelines
            </h2>
            <div className="space-y-4">
              {[
                'Include your name (or pen name) and contact email',
                'Provide a title and brief description of your work',
                'Photos: JPG/PNG format, minimum 1200px wide',
                'Videos: MP4 format, maximum 5 minutes, under 500MB',
                'Writing: PDF or plain text, 100-2000 words',
                'Audio: MP3 format, maximum 10 minutes',
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-lake-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lake-600 text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-charcoal/70">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="card p-8 md:p-12 bg-gradient-to-br from-sunset-50 to-amber-50 border-2 border-sunset-200">
          <h2 className="text-2xl font-bold text-charcoal mb-8 flex items-center gap-3">
            <Trophy className="w-7 h-7 text-sunset-600" />
            Weekly Prizes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">1st Place</h3>
              <p className="text-3xl font-display font-bold text-sunset-600">$100</p>
              <p className="text-sm text-charcoal/50 mt-2">Cash Prize</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">2nd Place</h3>
              <p className="text-3xl font-display font-bold text-charcoal/70">$50</p>
              <p className="text-sm text-charcoal/50 mt-2">Cash Prize</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">3rd Place</h3>
              <p className="text-3xl font-display font-bold text-charcoal/60">$25</p>
              <p className="text-sm text-charcoal/50 mt-2">Cash Prize</p>
            </div>
          </div>
          <p className="text-center text-charcoal/50 mt-8 text-sm">
            * Prize amounts are subject to sponsor support and may be adjusted. All winners receive feature placement on our website and social recognition.
          </p>
        </div>
      </section>

      {/* Terms */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="card p-8 bg-charcoal/5">
          <h2 className="text-xl font-bold text-charcoal mb-6">Additional Terms & Conditions</h2>
          <div className="prose prose-sm text-charcoal/70 max-w-none">
            <ul className="space-y-2">
              <li>By submitting, you grant ContentContest.ca permission to display your work on our website and social media for promotional purposes.</li>
              <li>You retain all rights to your original content.</li>
              <li>Judges' decisions are final and not subject to appeal.</li>
              <li>ContentContest.ca reserves the right to disqualify any entry that violates community guidelines.</li>
              <li>Winners will be contacted via their provided email address and must respond within 48 hours to claim their prize.</li>
              <li>Prizes are paid via e-transfer to Canadian bank accounts only.</li>
              <li>ContentContest.ca reserves the right to modify these rules at any time.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-charcoal mb-4">Ready to Enter?</h2>
        <p className="text-charcoal/60 mb-8">
          Submit your creative work and join Georgina's community of talented artists and creators.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/submit" className="btn-primary inline-flex items-center gap-2">
            Submit Your Entry
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/blog/contest" className="btn-secondary">
            View Past Winners
          </Link>
        </div>
      </section>
    </div>
  )
}





