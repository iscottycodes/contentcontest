'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'

export default function TestFirebasePage() {
  const { user } = useAuth()
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const testFirebase = async () => {
    setTesting(true)
    setResult(null)

    try {
      console.log('=== Firebase Connection Test ===')
      
      // Test 1: Check if db exists
      if (!db) {
        throw new Error('Firebase database (db) is null. Environment variables may not be set.')
      }
      console.log('✅ Database connection exists')

      // Test 2: Check authentication
      if (!user) {
        throw new Error('User is not authenticated. Please log in.')
      }
      console.log('✅ User is authenticated:', user.email)

      // Test 3: Try to write to Firestore
      console.log('Attempting to write to test collection...')
      const testRef = collection(db, 'test_collection')
      const docRef = await addDoc(testRef, {
        test: true,
        timestamp: serverTimestamp(),
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      })
      console.log('✅ Write successful! Document ID:', docRef.id)

      setResult({
        success: true,
        message: `Firebase is working! Document created with ID: ${docRef.id}`
      })
    } catch (error: any) {
      console.error('❌ Firebase test failed:', error)
      console.error('Error code:', error?.code)
      console.error('Error message:', error?.message)
      
      let message = error?.message || 'Unknown error'
      
      if (error?.code === 'permission-denied') {
        message = 'Permission denied. Firestore rules are blocking writes. Update rules in Firebase Console.'
      } else if (error?.code === 'unavailable') {
        message = 'Firebase is unavailable. Check internet connection and Firebase project status.'
      } else if (error?.message?.includes('not configured')) {
        message = 'Firebase is not configured. Add environment variables to Vercel.'
      }

      setResult({
        success: false,
        message: message
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">Firebase Connection Test</h1>
        <p className="text-charcoal/60">
          Test if Firebase is properly configured and you can write to Firestore
        </p>
      </div>

      <div className="card p-6">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-charcoal mb-2">Status Checks</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {db ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Firebase database connection: ✅ Connected</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm">Firebase database connection: ❌ Not connected</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {user ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Authentication: ✅ Logged in as {user.email}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm">Authentication: ❌ Not logged in</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={testFirebase}
            disabled={testing || !db || !user}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {testing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Testing Firebase Connection...
              </>
            ) : (
              'Test Firebase Write'
            )}
          </button>

          {result && (
            <div className={`p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold ${
                    result.success ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {result.success ? '✅ Success!' : '❌ Failed'}
                  </p>
                  <p className={`text-sm mt-1 ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>⚠️ You must be logged in</strong> to test Firebase writes. Go to <a href="/admin/login" className="underline">/admin/login</a> and sign in.
              </p>
            </div>
          )}

          {!db && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>❌ Firebase is not configured.</strong> Add environment variables to Vercel. See <code>DO_THIS_NOW.md</code> for instructions.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="card p-6 bg-blue-50 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">What This Test Does</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Checks if Firebase database connection exists</li>
          <li>Verifies you are logged in</li>
          <li>Attempts to write a test document to Firestore</li>
          <li>Shows detailed error messages if something fails</li>
        </ul>
        <p className="text-sm text-blue-700 mt-3">
          <strong>Note:</strong> This creates a document in a <code>test_collection</code>. You can delete it later in Firebase Console.
        </p>
      </div>
    </div>
  )
}

