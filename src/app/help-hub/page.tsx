'use client'

import { useState } from 'react'
import { Heart, Users, Briefcase, MapPin, CheckCircle, ArrowRight, Building, GraduationCap, HeartHandshake, Send, Clock, Star, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { addVolunteer } from '@/lib/firebase-admin'

const interestAreas = [
  'Youth Mentorship',
  'Senior Support',
  'Event Planning',
  'Environmental',
  'Food Security',
  'Administrative',
  'Marketing/Social Media',
  'Photography/Video',
  'Trades & Maintenance',
  'Driving/Transportation',
  'Teaching/Tutoring',
  'Healthcare Support',
  'Animal Care',
  'Sports & Recreation',
  'Arts & Culture',
  'Other',
]

const availabilityOptions = [
  'Weekday Mornings',
  'Weekday Afternoons',
  'Weekday Evenings',
  'Weekend Mornings',
  'Weekend Afternoons',
  'Weekend Evenings',
  'Flexible',
]

export default function HelpHubPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    age: '',
    occupation: '',
    interests: [] as string[],
    availability: [] as string[],
    experience: '',
    motivation: '',
    skills: '',
    hasVehicle: '',
    commitmentLevel: '',
    referralSource: '',
    agreeToContact: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const toggleAvailability = (time: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(time)
        ? prev.availability.filter(t => t !== time)
        : [...prev.availability, time]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await addVolunteer({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        age: formData.age,
        occupation: formData.occupation,
        interests: formData.interests,
        availability: formData.availability,
        commitmentLevel: formData.commitmentLevel,
        experience: formData.experience,
        skills: formData.skills,
        motivation: formData.motivation,
        hasVehicle: formData.hasVehicle,
        referralSource: formData.referralSource,
      })

      setSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setError('Failed to submit application. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-teal-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-12 max-w-lg text-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-4">Application Received!</h1>
          <p className="text-charcoal/60 mb-6">
            Thank you for your interest in volunteering with Georgina Help Hub! We've received your application 
            and will be in touch within 5-7 business days to schedule an interview.
          </p>
          <p className="text-sm text-charcoal/50">
            Questions? Email us at <a href="mailto:volunteers@georginahelphub.ca" className="text-emerald-600 hover:underline">volunteers@georginahelphub.ca</a>
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero - Different branding from main site */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <HeartHandshake className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Georgina Help Hub</h1>
              <p className="text-emerald-200 text-sm">Connecting Volunteers. Building Community.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
                Make a Difference in
                <span className="text-emerald-300"> Your Community</span>
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Georgina Help Hub connects passionate volunteers with organizations that need you. 
                Whether you're looking to mentor youth, support seniors, or help grow our local workforce — 
                there's a place for you here.
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Users, label: 'Connect Volunteers' },
                  { icon: GraduationCap, label: 'Empower Youth' },
                  { icon: Briefcase, label: 'Grow Workforce' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-emerald-300" />
                    <span className="text-white/90">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-emerald-300" />
                Why Volunteer with Us?
              </h3>
              <ul className="space-y-4">
                {[
                  'Get matched with opportunities that fit your skills',
                  'Flexible scheduling around your availability',
                  'Build valuable experience and references',
                  'Connect with your community and make new friends',
                  'Receive training and support throughout',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Volunteer Application</h2>
            <p className="section-subtitle mx-auto">
              Complete the form below and we'll reach out to schedule a brief interview to learn more about you.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="card p-4 mb-8 bg-red-50 border-red-200 flex items-center gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-emerald-600" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label-text">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="input-field"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="label-text">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="input-field"
                    placeholder="Last name"
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
                <div>
                  <label className="label-text">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="input-field"
                    placeholder="(555) 555-5555"
                  />
                </div>
                <div>
                  <label className="label-text">City/Town *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="input-field"
                    placeholder="Georgina, Keswick, etc."
                  />
                </div>
                <div>
                  <label className="label-text">Age Range *</label>
                  <select
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select age range</option>
                    <option value="under18">Under 18</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65+">65+</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label-text">Current Occupation</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    className="input-field"
                    placeholder="Student, Retired, Self-employed, etc."
                  />
                </div>
              </div>
            </div>

            {/* Volunteer Interests */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-emerald-600" />
                Areas of Interest
              </h3>
              <p className="text-charcoal/60 mb-4">Select all areas you'd be interested in volunteering (choose at least one) *</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestAreas.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                      formData.interests.includes(interest)
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-charcoal/10 hover:border-emerald-300 text-charcoal/70'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-600" />
                Availability
              </h3>
              <p className="text-charcoal/60 mb-4">When are you typically available? (select all that apply) *</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {availabilityOptions.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggleAvailability(time)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      formData.availability.includes(time)
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-charcoal/10 hover:border-emerald-300 text-charcoal/70'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="label-text">How much time can you commit per week? *</label>
                <select
                  required
                  value={formData.commitmentLevel}
                  onChange={(e) => setFormData({...formData, commitmentLevel: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select commitment level</option>
                  <option value="1-2">1-2 hours per week</option>
                  <option value="3-5">3-5 hours per week</option>
                  <option value="6-10">6-10 hours per week</option>
                  <option value="10+">10+ hours per week</option>
                  <option value="one-time">One-time/event-based only</option>
                </select>
              </div>
            </div>

            {/* Experience & Skills */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-emerald-600" />
                Experience & Skills
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="label-text">Previous Volunteer Experience</label>
                  <textarea
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="input-field resize-none"
                    placeholder="Tell us about any previous volunteer work or relevant experience..."
                  />
                </div>
                <div>
                  <label className="label-text">Special Skills or Certifications</label>
                  <textarea
                    rows={3}
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    className="input-field resize-none"
                    placeholder="First aid, specific trade skills, languages spoken, software skills, etc."
                  />
                </div>
                <div>
                  <label className="label-text">Why do you want to volunteer? *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    className="input-field resize-none"
                    placeholder="What motivates you to give back to your community?"
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-emerald-600" />
                Additional Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label-text">Do you have access to a vehicle?</label>
                  <select
                    value={formData.hasVehicle}
                    onChange={(e) => setFormData({...formData, hasVehicle: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="sometimes">Sometimes</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">How did you hear about us?</label>
                  <select
                    value={formData.referralSource}
                    onChange={(e) => setFormData({...formData, referralSource: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select an option</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Family</option>
                    <option value="search">Online Search</option>
                    <option value="event">Community Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeToContact}
                  onChange={(e) => setFormData({...formData, agreeToContact: e.target.checked})}
                  className="w-5 h-5 rounded border-charcoal/20 text-emerald-600 focus:ring-emerald-500 mt-0.5"
                />
                <span className="text-charcoal/70">
                  I agree to be contacted by Georgina Help Hub regarding volunteer opportunities and 
                  understand my information will be kept confidential. *
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || formData.interests.length === 0 || formData.availability.length === 0}
              className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  Submit Application
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-charcoal/50 text-sm">
              After submitting, you'll receive a confirmation email. We'll contact you within 5-7 business days.
            </p>
          </form>
        </div>
      </section>

      {/* Footer - Simple for this page */}
      <footer className="bg-emerald-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HeartHandshake className="w-8 h-8 text-emerald-300" />
            <span className="font-display text-xl font-bold">Georgina Help Hub</span>
          </div>
          <p className="text-white/60 text-sm mb-4">
            A for-profit organization connecting volunteers with groups who need them, 
            empowering youth, and growing the local workforce.
          </p>
          <p className="text-white/40 text-xs">
            Promoting Georgina as a place to live and work.
          </p>
        </div>
      </footer>
    </div>
  )
}
