'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="section-title mb-4">Something Went Wrong</h1>
          <p className="section-subtitle mx-auto mb-4">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-mono text-red-800 break-all">{error.message}</p>
            </div>
          )}

          {/* Show Firebase setup links if Firebase is not configured */}
          {error.message?.includes('Firebase') && error.message?.includes('not configured') && (
            <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg text-left">
              <h3 className="font-semibold text-blue-900 mb-3">🔧 Firebase Setup Required</h3>
              <p className="text-sm text-blue-800 mb-4">
                Firebase is not configured. Here's what you need to do:
              </p>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="font-semibold text-sm text-blue-900 mb-2">1. Add Environment Variables to Vercel:</p>
                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm block"
                  >
                    → Go to Vercel Dashboard
                  </a>
                  <p className="text-xs text-blue-700 mt-1 ml-4">
                    Settings → Environment Variables → Add all 6 Firebase variables
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-sm text-blue-900 mb-2">2. Update Firestore Rules:</p>
                  <a
                    href="https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm block"
                  >
                    → Update Firestore Security Rules
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-sm text-blue-900 mb-2">3. Check Setup Status:</p>
                  <Link href="/setup-status" className="text-blue-600 hover:underline text-sm block">
                    → View Setup Status Page
                  </Link>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>Quick Links:</strong>
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <a
                    href="https://console.firebase.google.com/project/content-contest-e86c7/authentication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 bg-white border border-blue-300 rounded hover:bg-blue-100 text-blue-700"
                  >
                    🔐 Authentication
                  </a>
                  <a
                    href="https://console.firebase.google.com/project/content-contest-e86c7/firestore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 bg-white border border-blue-300 rounded hover:bg-blue-100 text-blue-700"
                  >
                    💾 Firestore
                  </a>
                  <a
                    href="https://console.firebase.google.com/project/content-contest-e86c7/storage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 bg-white border border-blue-300 rounded hover:bg-blue-100 text-blue-700"
                  >
                    📦 Storage
                  </a>
                  <Link
                    href="/setup-status"
                    className="text-xs px-3 py-1 bg-white border border-blue-300 rounded hover:bg-blue-100 text-blue-700"
                  >
                    📋 Setup Status
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link href="/" className="btn-secondary inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        <div className="mt-12 text-sm text-charcoal/60">
          <p>
            If this problem persists, please{' '}
            <Link href="/contact" className="text-pine-600 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
