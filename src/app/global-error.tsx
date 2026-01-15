'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-cream">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-4xl font-bold text-charcoal mb-4">Critical Error</h1>
              <p className="text-lg text-charcoal/70 mb-4">
                A critical error occurred. Please refresh the page or contact support.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={reset}
                className="bg-pine-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pine-700 transition-colors inline-flex items-center gap-2"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="bg-white text-charcoal px-6 py-3 rounded-full font-semibold border-2 border-charcoal/10 hover:border-pine-600 transition-colors inline-flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
