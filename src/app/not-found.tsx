import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="font-display text-9xl font-bold text-pine-600 mb-4">404</h1>
          <h2 className="section-title mb-4">Page Not Found</h2>
          <p className="section-subtitle mx-auto mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link href="/contest" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            View Contest
          </Link>
        </div>

        <div className="card p-8 bg-pine-50 border-pine-200">
          <h3 className="font-semibold text-charcoal mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-pine-600" />
            Popular Pages
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <Link href="/submit" className="text-pine-600 hover:text-pine-700 hover:underline">
              Submit Entry
            </Link>
            <Link href="/blog/contest" className="text-pine-600 hover:text-pine-700 hover:underline">
              Contest Gallery
            </Link>
            <Link href="/sponsors" className="text-pine-600 hover:text-pine-700 hover:underline">
              Sponsors
            </Link>
            <Link href="/contact" className="text-pine-600 hover:text-pine-700 hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
