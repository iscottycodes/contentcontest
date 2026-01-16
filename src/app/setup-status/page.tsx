'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface CollectionStatus {
  name: string
  exists: boolean
  consoleLink: string
  description: string
}

export default function SetupStatusPage() {
  const [envStatus, setEnvStatus] = useState({
    apiKey: false,
    authDomain: false,
    projectId: false,
    storageBucket: false,
    messagingSenderId: false,
    appId: false,
  })

  const [collections, setCollections] = useState<CollectionStatus[]>([])

  useEffect(() => {
    // Check environment variables
    setEnvStatus({
      apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    })

    // Define required collections
    const requiredCollections: CollectionStatus[] = [
      {
        name: 'submissions',
        exists: false, // Would need to check via API
        consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsubmissions',
        description: 'Contest entry submissions from users',
      },
      {
        name: 'sponsors',
        exists: false,
        consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsponsors',
        description: 'Sponsor information and details',
      },
      {
        name: 'volunteers',
        exists: false,
        consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fvolunteers',
        description: 'Volunteer applications from Help Hub',
      },
      {
        name: 'blog_posts',
        exists: false,
        consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fblog_posts',
        description: 'Blog posts for contest gallery and personal blog',
      },
      {
        name: 'contests',
        exists: false,
        consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fcontests',
        description: 'Contest information and schedules',
      },
      {
        name: 'settings',
        exists: false,
        consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsettings',
        description: 'Site settings and configuration',
      },
    ]

    setCollections(requiredCollections)
  }, [])

  const allEnvVarsSet = Object.values(envStatus).every(v => v)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-2">🔥 Firebase Setup Status</h1>
          <p className="text-gray-600 mb-6">
            Check what's configured and what needs to be set up
          </p>

          {/* Environment Variables Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className={`p-4 rounded-lg mb-4 ${allEnvVarsSet ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-bold ${allEnvVarsSet ? 'text-green-800' : 'text-red-800'}`}>
                {allEnvVarsSet ? '✅ All environment variables are set!' : '❌ Missing environment variables'}
              </p>
              {!allEnvVarsSet && (
                <p className="text-sm text-red-700 mt-2">
                  Add these to Vercel: Settings → Environment Variables
                </p>
              )}
            </div>

            <div className="space-y-2">
              {Object.entries(envStatus).map(([key, isSet]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-mono text-sm">NEXT_PUBLIC_FIREBASE_{key.toUpperCase()}</span>
                  <span className={isSet ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {isSet ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
              ))}
            </div>

            {!allEnvVarsSet && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-800 mb-2">📝 How to Fix:</p>
                <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                  <li>Go to <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">Vercel Dashboard</a></li>
                  <li>Click your project → Settings → Environment Variables</li>
                  <li>Add all 6 variables (see DO_THIS_NOW.md for values)</li>
                  <li>Redeploy your site</li>
                </ol>
              </div>
            )}
          </div>

          {/* Firebase Services Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Firebase Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://console.firebase.google.com/project/content-contest-e86c7/authentication"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <h3 className="font-semibold mb-1">🔐 Authentication</h3>
                <p className="text-sm text-gray-600">Enable Email/Password login</p>
                <p className="text-xs text-blue-600 mt-2">Open in Firebase Console →</p>
              </a>

              <a
                href="https://console.firebase.google.com/project/content-contest-e86c7/firestore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <h3 className="font-semibold mb-1">💾 Firestore Database</h3>
                <p className="text-sm text-gray-600">Create database and collections</p>
                <p className="text-xs text-blue-600 mt-2">Open in Firebase Console →</p>
              </a>

              <a
                href="https://console.firebase.google.com/project/content-contest-e86c7/storage"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <h3 className="font-semibold mb-1">📦 Storage</h3>
                <p className="text-sm text-gray-600">Enable file storage for uploads</p>
                <p className="text-xs text-blue-600 mt-2">Open in Firebase Console →</p>
              </a>

              <a
                href="https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <h3 className="font-semibold mb-1">🔒 Security Rules</h3>
                <p className="text-sm text-gray-600">Update Firestore security rules</p>
                <p className="text-xs text-blue-600 mt-2">Open in Firebase Console →</p>
              </a>
            </div>
          </div>

          {/* Required Collections */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Required Firestore Collections</h2>
            <p className="text-sm text-gray-600 mb-4">
              These collections will be created automatically when you use them, but you can view them here:
            </p>
            <div className="space-y-2">
              {collections.map((collection) => (
                <a
                  key={collection.name}
                  href={collection.consoleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{collection.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{collection.description}</p>
                    </div>
                    <span className="text-blue-600 text-sm">View →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://console.firebase.google.com/project/content-contest-e86c7/authentication/users"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 text-center"
              >
                👤 Create Admin User
              </a>
              <a
                href="https://console.firebase.google.com/project/content-contest-e86c7/settings/general"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 text-center"
              >
                ⚙️ Project Settings
              </a>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 text-center"
              >
                🚀 Vercel Dashboard
              </a>
              <Link
                href="/test-env"
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 text-center"
              >
                🧪 Test Environment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

