'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Upload, Mail, User, FileText, Camera, Pen, Video, Music, CheckCircle, AlertCircle, ArrowRight, Send, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { addSubmission, getCurrentWeek } from '@/lib/firebase-admin'
import { uploadSubmissionFile, formatFileSize, validateFileSize } from '@/lib/storage'

const contentTypes = [
  { id: 'photo', label: 'Photography', icon: Camera, accept: 'image/jpeg,image/png,image/webp', maxSize: 10 },
  { id: 'writing', label: 'Writing', icon: Pen, accept: '.pdf,.txt,.doc,.docx', maxSize: 5 },
  { id: 'video', label: 'Video', icon: Video, accept: 'video/mp4,video/webm', maxSize: 500 },
  { id: 'audio', label: 'Music/Audio', icon: Music, accept: 'audio/mpeg,audio/wav', maxSize: 50 },
]

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    postalCode: '',
    title: '',
    contentType: '',
    description: '',
    agreeToTerms: false,
    isLocalResident: false,
  })
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedType = contentTypes.find(t => t.id === formData.contentType)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file size
    if (selectedType && !validateFileSize(selectedFile, selectedType.maxSize)) {
      setError(`File size exceeds ${selectedType.maxSize}MB limit`)
      return
    }

    setFile(selectedFile)
    setError('')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (!droppedFile) return

    if (selectedType && !validateFileSize(droppedFile, selectedType.maxSize)) {
      setError(`File size exceeds ${selectedType.maxSize}MB limit`)
      return
    }

    setFile(droppedFile)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    setUploadProgress(0)
    
    try {
      // Generate a temporary ID for the submission
      const tempId = `temp_${Date.now()}`
      
      let fileUrl = ''
      let fileName = ''

      // Upload file if present
      if (file) {
        fileName = file.name
        fileUrl = await uploadSubmissionFile(file, tempId, (progress) => {
          setUploadProgress(progress)
        })
      }

      // Save submission to Firestore
      await addSubmission({
        title: formData.title,
        author: formData.name,
        email: formData.email,
        postalCode: formData.postalCode.replace(/\s/g, ''), // Remove spaces before saving
        type: formData.contentType as 'photo' | 'writing' | 'video' | 'audio',
        description: formData.description,
        fileUrl,
        fileName,
        status: 'pending',
        week: getCurrentWeek(),
      })

      setSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setError('Failed to submit entry. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-12 max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-pine-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-pine-600" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-4">Entry Submitted!</h1>
          <p className="text-charcoal/60 mb-8">
            Thank you for your submission! We've received your entry and will review it soon. 
            Winners are announced every Monday.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/blog/contest" className="btn-secondary">
              View Gallery
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-pine-600 font-semibold text-sm tracking-widest uppercase mb-4 block">Enter the Contest</span>
          <h1 className="section-title mb-4">Submit Your Entry</h1>
          <p className="section-subtitle mx-auto">
            Share your creative work with Georgina. Contest runs Thursday through Sunday weekly.
          </p>
        </div>

        {/* Status Banner */}
        <div className="card p-4 mb-8 bg-pine-50 border-pine-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-pine-100 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-pine-600" />
          </div>
          <div>
            <p className="font-semibold text-pine-800">Contest is Open!</p>
            <p className="text-sm text-pine-600">Submissions close Sunday at 11:59 PM</p>
          </div>
        </div>

        {/* Alternative Submission */}
        <div className="card p-6 mb-8 bg-lake-50 border-lake-200">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-lake-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-charcoal mb-1">Prefer Email?</h3>
              <p className="text-sm text-charcoal/70 mb-2">
                You can also submit your entry by emailing us directly at:
              </p>
              <a href="mailto:submit@contentcontest.ca" className="text-lake-600 font-semibold hover:underline">
                submit@contentcontest.ca
              </a>
            </div>
          </div>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <div className="card p-8">
            <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
              <User className="w-6 h-6 text-pine-600" />
              Your Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-text">Name or Pen Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  placeholder="How you'd like to be credited"
                />
              </div>
              <div>
                <label className="label-text">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-charcoal/50 mt-1">We'll only use this to contact winners</p>
              </div>
            </div>
            <div className="mt-6">
              <label className="label-text">Postal Code *</label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) => {
                  // Format as user types: L0E1A0 -> L0E 1A0
                  let value = e.target.value.toUpperCase().replace(/\s/g, '')
                  if (value.length > 3) {
                    value = value.slice(0, 3) + ' ' + value.slice(3, 6)
                  }
                  setFormData({...formData, postalCode: value})
                }}
                className="input-field max-w-xs"
                placeholder="L0E 1A0"
                pattern="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"
                maxLength={7}
              />
              <p className="text-xs text-charcoal/50 mt-1">Georgina residents only</p>
            </div>
          </div>

          {/* Content Details */}
          <div className="card p-8">
            <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-pine-600" />
              Your Submission
            </h2>
            
            {/* Content Type */}
            <div className="mb-6">
              <label className="label-text">Content Type *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setFormData({...formData, contentType: type.id})
                      setFile(null) // Reset file when type changes
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.contentType === type.id
                        ? 'border-pine-500 bg-pine-50'
                        : 'border-charcoal/10 hover:border-pine-300'
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                      formData.contentType === type.id ? 'text-pine-600' : 'text-charcoal/40'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.contentType === type.id ? 'text-pine-700' : 'text-charcoal/70'
                    }`}>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="label-text">Title of Your Work *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input-field"
                placeholder="Give your submission a title"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="label-text">Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="input-field resize-none"
                placeholder="Tell us about your work - what inspired you, what it means to you, or any context that helps us understand your submission."
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="label-text">Upload Your Content *</label>
              {file ? (
                <div className="border-2 border-pine-400 bg-pine-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {selectedType && <selectedType.icon className="w-8 h-8 text-pine-600" />}
                      <div>
                        <p className="font-medium text-charcoal">{file.name}</p>
                        <p className="text-sm text-charcoal/50">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="p-2 rounded-lg hover:bg-pine-100 text-charcoal/50 hover:text-charcoal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-4">
                      <div className="h-2 bg-pine-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pine-600 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-pine-600 mt-1">Uploading... {Math.round(uploadProgress)}%</p>
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-charcoal/20 rounded-xl p-8 text-center hover:border-pine-400 transition-colors cursor-pointer"
                  onClick={() => formData.contentType && fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <Upload className="w-10 h-10 text-charcoal/30 mx-auto mb-4" />
                  {formData.contentType ? (
                    <>
                      <p className="text-charcoal/70 mb-2">Drag and drop your file here, or click to browse</p>
                      <p className="text-xs text-charcoal/50">
                        {selectedType?.id === 'photo' && `Images: JPG/PNG (max ${selectedType.maxSize}MB)`}
                        {selectedType?.id === 'video' && `Videos: MP4/WEBM (max ${selectedType.maxSize}MB)`}
                        {selectedType?.id === 'writing' && `Documents: PDF/TXT/DOC (max ${selectedType.maxSize}MB)`}
                        {selectedType?.id === 'audio' && `Audio: MP3/WAV (max ${selectedType.maxSize}MB)`}
                      </p>
                    </>
                  ) : (
                    <p className="text-charcoal/70">Please select a content type first</p>
                  )}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept={selectedType?.accept}
                    onChange={handleFileSelect}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Agreements */}
          <div className="card p-8">
            <h2 className="text-xl font-bold text-charcoal mb-6">Confirmations</h2>
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.isLocalResident}
                  onChange={(e) => setFormData({...formData, isLocalResident: e.target.checked})}
                  className="w-5 h-5 rounded border-charcoal/20 text-pine-600 focus:ring-pine-500 mt-0.5"
                />
                <span className="text-charcoal/70">
                  I confirm that I am a resident of Georgina. *
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                  className="w-5 h-5 rounded border-charcoal/20 text-pine-600 focus:ring-pine-500 mt-0.5"
                />
                <span className="text-charcoal/70">
                  I agree to the <Link href="/contest" className="text-pine-600 hover:underline">contest rules and terms</Link>, 
                  and confirm this is my original work. *
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !file}
            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Submitting...'}
              </>
            ) : (
              <>
                Submit Entry
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Help */}
        <div className="mt-12 text-center">
          <p className="text-charcoal/50 text-sm">
            Having trouble? Email us at{' '}
            <a href="mailto:help@contentcontest.ca" className="text-pine-600 hover:underline">
              help@contentcontest.ca
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
