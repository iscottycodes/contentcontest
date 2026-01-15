'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trophy, CheckCircle, ArrowRight, Building2, Users, Eye, Megaphone, Mail, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import SponsorShowcase from '@/components/SponsorShowcase'

const sponsorBenefits = [
  'Premium logo placement on homepage',
  'Featured in all contest announcements',
  'Social media promotion',
  'Exclusive sponsor spotlight blog post',
  'Logo on winner certificates',
  'Recognition on sponsor page',
  'Community engagement opportunities',
]

export default function SponsorsPage() {
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sunset-600 font-semibold text-sm tracking-widest uppercase mb-4 block">Support Local Creativity</span>
          <h1 className="section-title mb-6">Become a Sponsor</h1>
          <p className="section-subtitle mx-auto">
            Join the businesses that are investing in Georgina's creative community. 
            Your sponsorship directly supports local artists through cash prizes and recognition.
          </p>
        </div>
      </section>

      {/* Current Sponsors */}
      <SponsorShowcase showCTA={false} />

      {/* Why Sponsor */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Why Sponsor ContentContest?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Community Reach', desc: 'Connect with engaged local audiences who care about Georgina' },
              { icon: Eye, title: 'High Visibility', desc: 'Your brand featured prominently across our platform' },
              { icon: Megaphone, title: 'Positive Association', desc: 'Be known for supporting arts and local talent' },
              { icon: Building2, title: 'Local Focus', desc: 'Perfect for businesses serving the Georgina area' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-pine-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-pine-600" />
                </div>
                <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Benefits */}
      <section id="become" className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Become a Sponsor</h2>
            <p className="section-subtitle mx-auto">
              Support local creativity and get your business featured across our platform. 
              Connect with us to discuss sponsorship opportunities tailored to your business.
            </p>
          </div>

          <div className="card p-8 md:p-12 mb-8">
            <h3 className="text-2xl font-bold text-charcoal mb-6 text-center">Sponsorship Benefits</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {sponsorBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-pine-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal/70">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowContactForm(true)}
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
              >
                Connect With Us to Sponsor
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-charcoal mb-2">Become a Sponsor</h2>
            <p className="text-charcoal/60 mb-6">
              Tell us about your business and how you'd like to support ContentContest. We'll work with you to create a sponsorship package that fits your goals.
            </p>
            <form className="space-y-4">
              <div>
                <label className="label-text">Business Name *</label>
                <input type="text" className="input-field" placeholder="Your Business Name" required />
              </div>
              <div>
                <label className="label-text">Contact Name *</label>
                <input type="text" className="input-field" placeholder="Your Name" required />
              </div>
              <div>
                <label className="label-text">Email *</label>
                <input type="email" className="input-field" placeholder="email@business.com" required />
              </div>
              <div>
                <label className="label-text">Phone</label>
                <input type="tel" className="input-field" placeholder="(555) 555-5555" />
              </div>
              <div>
                <label className="label-text">Message</label>
                <textarea
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us about your business and sponsorship goals..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                  Send Inquiry
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Alternative Contact */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Mail className="w-12 h-12 text-white/50 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Prefer to Email?</h2>
          <p className="text-white/70 mb-6">
            Reach out directly to discuss sponsorship opportunities.
          </p>
          <a 
            href="mailto:sponsors@contentcontest.ca" 
            className="text-xl font-semibold text-sunset-400 hover:text-sunset-300 transition-colors"
          >
            sponsors@contentcontest.ca
          </a>
        </div>
      </section>
    </div>
  )
}





