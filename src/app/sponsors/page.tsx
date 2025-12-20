'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trophy, Star, CheckCircle, ArrowRight, Building2, Users, Eye, Megaphone, CreditCard, Mail, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import SponsorShowcase from '@/components/SponsorShowcase'

const sponsorTiers = [
  {
    id: 'gold',
    name: 'Gold Sponsor',
    price: '$500',
    period: '/month',
    color: 'amber',
    features: [
      'Premium logo placement on homepage',
      'Featured in all contest announcements',
      'Large ad banner on all pages',
      'Social media promotion (weekly)',
      'Exclusive sponsor spotlight blog post',
      'Logo on winner certificates',
    ],
    popular: true,
  },
  {
    id: 'silver',
    name: 'Silver Sponsor',
    price: '$250',
    period: '/month',
    color: 'slate',
    features: [
      'Logo placement on homepage',
      'Mentioned in contest announcements',
      'Medium ad placement',
      'Social media promotion (bi-weekly)',
      'Logo on sponsor page',
    ],
    popular: false,
  },
  {
    id: 'bronze',
    name: 'Bronze Sponsor',
    price: '$100',
    period: '/month',
    color: 'orange',
    features: [
      'Logo on sponsor page',
      'Small ad placement',
      'Monthly social media mention',
      'Thank you in newsletter',
    ],
    popular: false,
  },
]

export default function SponsorsPage() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedTier, setSelectedTier] = useState('')

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

      {/* Pricing Tiers */}
      <section id="become" className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Sponsorship Packages</h2>
            <p className="section-subtitle mx-auto">
              Choose the package that fits your business. All sponsors receive recognition on our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {sponsorTiers.map((tier) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card p-8 relative ${tier.popular ? 'border-2 border-amber-400 shadow-xl' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl bg-${tier.color}-100 flex items-center justify-center mb-6`}>
                  <Star className={`w-7 h-7 text-${tier.color}-500`} />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-charcoal">{tier.price}</span>
                  <span className="text-charcoal/50">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-pine-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSelectedTier(tier.id)
                    setShowContactForm(true)
                  }}
                  className={`w-full py-3 rounded-full font-semibold transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 hover:shadow-lg hover:shadow-amber-500/25'
                      : 'btn-secondary'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          {/* Custom Sponsorship */}
          <div className="mt-12 text-center">
            <p className="text-charcoal/60 mb-4">
              Looking for something different? We offer custom sponsorship packages including ad takeovers and exclusive partnerships.
            </p>
            <button
              onClick={() => {
                setSelectedTier('custom')
                setShowContactForm(true)
              }}
              className="text-pine-600 font-semibold hover:underline"
            >
              Contact us for custom options →
            </button>
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
              {selectedTier === 'custom' 
                ? 'Tell us about your custom sponsorship needs.'
                : `You've selected the ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} package.`
              }
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





