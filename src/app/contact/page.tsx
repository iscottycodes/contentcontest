'use client'

import { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, Trophy, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

const contactOptions = [
  { id: 'general', label: 'General Inquiry', icon: MessageCircle },
  { id: 'contest', label: 'Contest Question', icon: Trophy },
  { id: 'sponsor', label: 'Sponsorship', icon: Building2 },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-12 max-w-lg text-center"
        >
          <div className="w-20 h-20 rounded-full bg-pine-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-pine-600" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-4">Message Sent!</h1>
          <p className="text-charcoal/60">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-pine-600 font-semibold text-sm tracking-widest uppercase mb-4 block">Get in Touch</span>
          <h1 className="section-title mb-4">Contact Us</h1>
          <p className="section-subtitle mx-auto">
            Have a question about the contest, interested in sponsoring, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pine-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-pine-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Email Us</h3>
                  <a href="mailto:hello@contentcontest.ca" className="text-pine-600 hover:underline">
                    hello@contentcontest.ca
                  </a>
                  <p className="text-sm text-charcoal/50 mt-1">We respond within 24-48 hours</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-lake-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-lake-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Location</h3>
                  <p className="text-charcoal/70">Georgina, Ontario</p>
                  <p className="text-sm text-charcoal/50 mt-1">Proudly local</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sunset-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-sunset-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Contest Schedule</h3>
                  <p className="text-charcoal/70">Open Thu–Sun</p>
                  <p className="text-sm text-charcoal/50 mt-1">Winners announced Mondays</p>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-pine-50 border-pine-200">
              <h3 className="font-semibold text-charcoal mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:submit@contentcontest.ca" className="text-pine-600 hover:underline">
                    submit@contentcontest.ca
                  </a>
                  <span className="text-charcoal/50"> — Contest submissions</span>
                </li>
                <li>
                  <a href="mailto:sponsors@contentcontest.ca" className="text-pine-600 hover:underline">
                    sponsors@contentcontest.ca
                  </a>
                  <span className="text-charcoal/50"> — Sponsorship inquiries</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="card p-8">
              <h2 className="text-xl font-bold text-charcoal mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="label-text">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-text">What's this about?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {contactOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFormData({...formData, subject: option.id})}
                        className={`p-3 rounded-xl border-2 transition-all text-sm ${
                          formData.subject === option.id
                            ? 'border-pine-500 bg-pine-50 text-pine-700'
                            : 'border-charcoal/10 hover:border-pine-300 text-charcoal/70'
                        }`}
                      >
                        <option.icon className={`w-5 h-5 mx-auto mb-1 ${
                          formData.subject === option.id ? 'text-pine-600' : 'text-charcoal/40'
                        }`} />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label-text">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="input-field resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





