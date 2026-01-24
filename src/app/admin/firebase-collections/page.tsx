'use client'

import { useState } from 'react'
import { Database, Plus, ExternalLink, FileText, Users, Building2, Heart, Calendar, Settings, Trophy, Loader2, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { 
  addBlogPost, 
  addSubmission, 
  addSponsor, 
  addVolunteer, 
  addContest,
  getCurrentWeek 
} from '@/lib/firebase-admin'
import { Timestamp } from 'firebase/firestore'

interface Collection {
  name: string
  description: string
  icon: React.ReactNode
  consoleLink: string
  dataLink: string
}

const collections: Collection[] = [
  {
    name: 'blog_posts',
    description: 'Blog posts for contest gallery and personal blog',
    icon: <FileText className="w-5 h-5" />,
    consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fblog_posts',
    dataLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fblog_posts',
  },
  {
    name: 'submissions',
    description: 'Contest entry submissions from users',
    icon: <Trophy className="w-5 h-5" />,
    consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsubmissions',
    dataLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsubmissions',
  },
  {
    name: 'sponsors',
    description: 'Sponsor information and details',
    icon: <Building2 className="w-5 h-5" />,
    consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsponsors',
    dataLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsponsors',
  },
  {
    name: 'volunteers',
    description: 'Volunteer applications from Help Hub',
    icon: <Heart className="w-5 h-5" />,
    consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fvolunteers',
    dataLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fvolunteers',
  },
  {
    name: 'contests',
    description: 'Contest information and schedules',
    icon: <Calendar className="w-5 h-5" />,
    consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fcontests',
    dataLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fcontests',
  },
  {
    name: 'settings',
    description: 'Site settings and configuration',
    icon: <Settings className="w-5 h-5" />,
    consoleLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsettings',
    dataLink: 'https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2Fsettings',
  },
]

export default function FirebaseCollectionsPage() {
  const { user } = useAuth()
  const [creating, setCreating] = useState<string | null>(null)
  const [created, setCreated] = useState<Set<string>>(new Set())

  const createCollection = async (collectionName: string) => {
    if (!user) {
      alert('You must be logged in to create collections')
      return
    }

    setCreating(collectionName)
    setCreated(new Set(created).delete(collectionName)) // Remove from created if was there

    try {
      switch (collectionName) {
        case 'blog_posts':
          await addBlogPost({
            title: 'Sample Blog Post',
            slug: 'sample-blog-post',
            content: 'This is a sample blog post created to initialize the collection.',
            excerpt: 'Sample excerpt',
            type: 'contest',
            status: 'draft',
            author: user.email || 'Admin',
          })
          break

        case 'submissions':
          await addSubmission({
            title: 'Sample Submission',
            author: 'Sample Author',
            email: 'sample@example.com',
            type: 'photo',
            description: 'This is a sample submission created to initialize the collection.',
            status: 'pending',
            week: getCurrentWeek(),
          })
          break

        case 'sponsors':
          await addSponsor({
            name: 'Sample Sponsor',
            tier: 'bronze',
            contact: 'Sample Contact',
            email: 'sponsor@example.com',
            status: 'inactive',
            startDate: Timestamp.now(),
          })
          break

        case 'volunteers':
          await addVolunteer({
            firstName: 'Sample',
            lastName: 'Volunteer',
            email: 'volunteer@example.com',
            phone: '123-456-7890',
            city: 'Sample City',
            age: '25-35',
            interests: ['sample'],
            availability: ['weekends'],
            commitmentLevel: 'moderate',
            motivation: 'Sample motivation text',
          })
          break

        case 'contests':
          await addContest({
            title: 'Sample Contest',
            description: 'This is a sample contest created to initialize the collection.',
            week: getCurrentWeek(),
            status: 'draft',
            openDate: Timestamp.now(),
            closeDate: Timestamp.now(),
          })
          break

        case 'settings':
          // Settings collection - create a simple document
          const { doc, setDoc } = await import('firebase/firestore')
          const { db } = await import('@/lib/firebase')
          if (!db) throw new Error('Firebase not configured')
          await setDoc(doc(db, 'settings', 'site'), {
            siteName: 'ContentContest',
            createdAt: Timestamp.now(),
          })
          break

        default:
          throw new Error(`Unknown collection: ${collectionName}`)
      }

      setCreated(new Set(created).add(collectionName))
      alert(`✅ Collection "${collectionName}" created successfully! A sample document has been added.`)
    } catch (error: any) {
      console.error(`Error creating ${collectionName}:`, error)
      alert(`❌ Failed to create collection: ${error.message}\n\nCheck browser console for details.`)
    } finally {
      setCreating(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">Firebase Collections</h1>
        <p className="text-charcoal/60">
          Click any collection to view or create it in Firebase Console. Collections are created automatically when you first save data to them.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <a
          href="https://console.firebase.google.com/project/content-contest-e86c7/firestore"
          target="_blank"
          rel="noopener noreferrer"
          className="card p-4 hover:border-pine-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pine-100 flex items-center justify-center group-hover:bg-pine-200 transition-colors">
              <Database className="w-6 h-6 text-pine-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-charcoal">Firestore Database</h3>
              <p className="text-sm text-charcoal/60">View all collections</p>
            </div>
            <ExternalLink className="w-5 h-5 text-charcoal/40" />
          </div>
        </a>

        <a
          href="https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules"
          target="_blank"
          rel="noopener noreferrer"
          className="card p-4 hover:border-pine-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              <Settings className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-charcoal">Security Rules</h3>
              <p className="text-sm text-charcoal/60">Update Firestore rules</p>
            </div>
            <ExternalLink className="w-5 h-5 text-charcoal/40" />
          </div>
        </a>

        <a
          href="https://console.firebase.google.com/project/content-contest-e86c7/firestore/data"
          target="_blank"
          rel="noopener noreferrer"
          className="card p-4 hover:border-pine-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-lake-100 flex items-center justify-center group-hover:bg-lake-200 transition-colors">
              <Plus className="w-6 h-6 text-lake-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-charcoal">Create Collection</h3>
              <p className="text-sm text-charcoal/60">Add new collection</p>
            </div>
            <ExternalLink className="w-5 h-5 text-charcoal/40" />
          </div>
        </a>
      </div>

      {/* Collections List */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-charcoal">Required Collections</h2>
          <p className="text-sm text-charcoal/60 mt-1">
            These collections will be created automatically when you use them. Click to view in Firebase Console.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {collections.map((collection, index) => (
            <div
              key={collection.name}
              className="p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-pine-100 flex items-center justify-center flex-shrink-0">
                    {collection.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-charcoal mb-1 font-mono text-lg">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-charcoal/60 mb-3">
                      {collection.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => createCollection(collection.name)}
                        disabled={creating === collection.name || creating !== null}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          created.has(collection.name)
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : creating === collection.name
                            ? 'bg-slate-400 text-white cursor-not-allowed'
                            : 'bg-pine-600 text-white hover:bg-pine-700'
                        }`}
                      >
                        {creating === collection.name ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating...
                          </>
                        ) : created.has(collection.name) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Created
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Create Collection
                          </>
                        )}
                      </button>
                      <a
                        href={collection.dataLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-charcoal text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Database className="w-4 h-4" />
                        View in Firebase
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="card p-6 bg-blue-50 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">💡 How Collections Work</h3>
        <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
          <li>Click <strong>"Create Collection"</strong> to automatically create the collection with a sample document</li>
          <li>Collections are created automatically when you first save data to them</li>
          <li>After creating, you can delete the sample document if you don't need it</li>
          <li>Click "View in Firebase" to see the collection in Firebase Console</li>
          <li>You must be logged in to create collections</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="https://console.firebase.google.com/project/content-contest-e86c7/authentication"
          target="_blank"
          rel="noopener noreferrer"
          className="card p-4 hover:border-pine-500 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-pine-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-charcoal">Authentication</h3>
              <p className="text-sm text-charcoal/60">Manage users</p>
            </div>
            <ExternalLink className="w-4 h-4 text-charcoal/40" />
          </div>
        </a>

        <a
          href="https://console.firebase.google.com/project/content-contest-e86c7/storage"
          target="_blank"
          rel="noopener noreferrer"
          className="card p-4 hover:border-pine-500 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-pine-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-charcoal">Storage</h3>
              <p className="text-sm text-charcoal/60">File storage</p>
            </div>
            <ExternalLink className="w-4 h-4 text-charcoal/40" />
          </div>
        </a>
      </div>
    </div>
  )
}

