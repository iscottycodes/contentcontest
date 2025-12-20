'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trophy, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  
  const router = useRouter()
  const { signIn, resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      router.push('/admin')
    } catch (err: any) {
      console.error('Login error:', err)
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.')
      } else {
        setError('Failed to sign in. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await resetPassword(email)
      setResetSent(true)
    } catch (err: any) {
      console.error('Reset error:', err)
      setError('Failed to send reset email. Please check your email address.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-slate-900 to-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pine-500 to-lake-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pine-500/20">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">ContentContest</h1>
          <p className="text-white/50 text-sm">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {showReset ? (
            // Reset Password Form
            <>
              <h2 className="text-xl font-bold text-charcoal mb-2">Reset Password</h2>
              <p className="text-charcoal/60 text-sm mb-6">
                Enter your email and we'll send you a reset link.
              </p>

              {resetSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">Check Your Email</h3>
                  <p className="text-charcoal/60 text-sm mb-6">
                    We've sent a password reset link to {email}
                  </p>
                  <button
                    onClick={() => {
                      setShowReset(false)
                      setResetSent(false)
                    }}
                    className="text-pine-600 font-medium hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="label-text">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field pl-10"
                        placeholder="admin@contentcontest.ca"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowReset(false)}
                    className="w-full text-center text-charcoal/60 hover:text-charcoal text-sm"
                  >
                    Back to Login
                  </button>
                </form>
              )}
            </>
          ) : (
            // Login Form
            <>
              <h2 className="text-xl font-bold text-charcoal mb-2">Welcome Back</h2>
              <p className="text-charcoal/60 text-sm mb-6">
                Sign in to access your dashboard.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label-text">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-10"
                      placeholder="admin@contentcontest.ca"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label-text">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="w-full text-center text-charcoal/60 hover:text-pine-600 text-sm"
                >
                  Forgot your password?
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          © {new Date().getFullYear()} ContentContest.ca
        </p>
      </div>
    </div>
  )
}





