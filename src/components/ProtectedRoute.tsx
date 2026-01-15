'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Trophy } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!loading && !user && !isRedirecting) {
      setIsRedirecting(true)
      // Use replace instead of push to avoid adding to history
      router.replace('/admin/login')
    }
  }, [user, loading, router, isRedirecting])

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pine-500 to-lake-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <p className="text-charcoal/60">Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading state while redirecting
  if (!user || isRedirecting) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pine-500 to-lake-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <p className="text-charcoal/60">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}





