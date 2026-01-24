'use client'

import { Database, Plus, ExternalLink, FileText, Users, Building2, Heart, Calendar, Settings, Trophy } from 'lucide-react'

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
                      <a
                        href={collection.dataLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-pine-600 text-white text-sm font-medium rounded-lg hover:bg-pine-700 transition-colors"
                      >
                        <Database className="w-4 h-4" />
                        View Collection
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={`https://console.firebase.google.com/project/content-contest-e86c7/firestore/data/~2F${collection.name}?add`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-charcoal text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Document
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
          <li>Collections are created <strong>automatically</strong> when you first save data to them</li>
          <li>You don't need to manually create collections - just use your app and they'll appear</li>
          <li>Click "View Collection" to see existing documents</li>
          <li>Click "Add Document" to manually create a test document</li>
          <li>If a collection is empty, it means no data has been saved to it yet</li>
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

