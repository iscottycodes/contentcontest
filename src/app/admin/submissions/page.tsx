'use client'

import { useState } from 'react'
import { Trophy, Search, Filter, CheckCircle, XCircle, Star, Eye, MoreVertical, Calendar, Camera, Pen, Video, Music } from 'lucide-react'

// Mock submissions data
const mockSubmissions = [
  { id: 1, title: 'Golden Hour at Lake Simcoe', author: 'Sarah M.', email: 'sarah@email.com', type: 'photo', status: 'pending', date: '2024-12-19', description: 'Captured during a peaceful evening walk...' },
  { id: 2, title: 'Voices of Georgina', author: 'Mike T.', email: 'mike@email.com', type: 'audio', status: 'pending', date: '2024-12-19', description: 'A community song celebrating our town...' },
  { id: 3, title: 'The Old Bridge', author: 'Emily R.', email: 'emily@email.com', type: 'writing', status: 'reviewed', date: '2024-12-18', description: 'A short story about the historic bridge...' },
  { id: 4, title: 'Winter Morning', author: 'James K.', email: 'james@email.com', type: 'photo', status: 'winner', place: 1, date: '2024-12-15', description: 'First snow of the season...' },
  { id: 5, title: 'Market Day', author: 'Patricia L.', email: 'patricia@email.com', type: 'video', status: 'winner', place: 2, date: '2024-12-15', description: 'Documentary about the farmers market...' },
  { id: 6, title: 'Summer Memories', author: 'Alex R.', email: 'alex@email.com', type: 'photo', status: 'rejected', date: '2024-12-14', description: 'Beach photos from last summer...' },
]

const typeIcons = {
  photo: Camera,
  writing: Pen,
  video: Video,
  audio: Music,
}

const statusConfig = {
  pending: { label: 'Pending Review', bgColor: 'bg-amber-100', textColor: 'text-amber-700', icon: Calendar },
  reviewed: { label: 'Reviewed', bgColor: 'bg-blue-100', textColor: 'text-blue-700', icon: Eye },
  winner: { label: 'Winner', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700', icon: Trophy },
  rejected: { label: 'Rejected', bgColor: 'bg-red-100', textColor: 'text-red-700', icon: XCircle },
}

export default function SubmissionsPage() {
  const [selectedSubmission, setSelectedSubmission] = useState<typeof mockSubmissions[0] | null>(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredSubmissions = mockSubmissions.filter(sub => {
    if (filter !== 'all' && sub.status !== filter) return false
    if (search && !sub.title.toLowerCase().includes(search.toLowerCase()) && !sub.author.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search submissions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-pine-500 focus:ring-2 focus:ring-pine-500/10 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'reviewed', 'winner'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-pine-600 text-white'
                  : 'bg-white text-charcoal/70 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2 card divide-y divide-slate-100">
          {filteredSubmissions.map((sub) => {
            const TypeIcon = typeIcons[sub.type as keyof typeof typeIcons]
            const status = statusConfig[sub.status as keyof typeof statusConfig]
            return (
              <div
                key={sub.id}
                onClick={() => setSelectedSubmission(sub)}
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedSubmission?.id === sub.id ? 'bg-pine-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <TypeIcon className="w-6 h-6 text-charcoal/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-charcoal truncate">{sub.title}</h3>
                        <p className="text-sm text-charcoal/50">by {sub.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {sub.place && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-medium">
                            <Trophy className="w-3 h-3" />
                            #{sub.place}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal/60 mt-1 line-clamp-1">{sub.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
          {filteredSubmissions.length === 0 && (
            <div className="p-12 text-center text-charcoal/50">
              No submissions found
            </div>
          )}
        </div>

        {/* Submission Detail Panel */}
        <div className="card p-6">
          {selectedSubmission ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-charcoal">Submission Details</h2>
                <button className="p-2 rounded-lg hover:bg-slate-100">
                  <MoreVertical className="w-5 h-5 text-charcoal/40" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Preview Area */}
                <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center">
                  {(() => {
                    const TypeIcon = typeIcons[selectedSubmission.type as keyof typeof typeIcons]
                    return <TypeIcon className="w-16 h-16 text-charcoal/20" />
                  })()}
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">{selectedSubmission.title}</h3>
                  <p className="text-charcoal/60 text-sm">{selectedSubmission.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-charcoal/50 mb-1">Author</p>
                    <p className="font-medium text-charcoal">{selectedSubmission.author}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/50 mb-1">Email</p>
                    <p className="font-medium text-charcoal">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/50 mb-1">Type</p>
                    <p className="font-medium text-charcoal capitalize">{selectedSubmission.type}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/50 mb-1">Submitted</p>
                    <p className="font-medium text-charcoal">{selectedSubmission.date}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedSubmission.status === 'pending' && (
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <p className="text-sm font-medium text-charcoal mb-3">Actions</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="p-3 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors text-center">
                        <Trophy className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-xs font-medium">1st</span>
                      </button>
                      <button className="p-3 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-center">
                        <Trophy className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-xs font-medium">2nd</span>
                      </button>
                      <button className="p-3 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors text-center">
                        <Trophy className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-xs font-medium">3rd</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button className="p-3 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Approve</span>
                      </button>
                      <button className="p-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Reject</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-charcoal/40">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a submission to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

