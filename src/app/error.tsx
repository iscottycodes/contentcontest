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
