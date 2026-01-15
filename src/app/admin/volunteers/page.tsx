'use client'

import { useState, useEffect } from 'react'
import { Search, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle, Clock, MessageSquare, User, Loader2 } from 'lucide-react'
import { getVolunteers, type Volunteer } from '@/lib/firebase-admin'
import { Timestamp } from 'firebase/firestore'

function formatDate(timestamp: Timestamp | undefined): string {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate()
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const statusConfig = {
  new: { label: 'New', bgColor: 'bg-amber-100', textColor: 'text-amber-700', icon: Clock },
  contacted: { label: 'Contacted', bgColor: 'bg-blue-100', textColor: 'text-blue-700', icon: Mail },
  interviewed: { label: 'Interviewed', bgColor: 'bg-purple-100', textColor: 'text-purple-700', icon: MessageSquare },
  approved: { label: 'Approved', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700', icon: CheckCircle },
  declined: { label: 'Declined', bgColor: 'bg-red-100', textColor: 'text-red-700', icon: XCircle },
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchVolunteers() {
      try {
        setLoading(true)
        const data = await getVolunteers(filter !== 'all' ? filter : undefined)
        setVolunteers(data)
      } catch (error) {
        console.error('Error fetching volunteers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVolunteers()
  }, [filter])

  const filteredVolunteers = volunteers.filter(vol => {
    const fullName = `${vol.firstName} ${vol.lastName}`.toLowerCase()
    if (search && !fullName.includes(search.toLowerCase()) && !vol.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search volunteers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-pine-500 focus:ring-2 focus:ring-pine-500/10 outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'new', 'contacted', 'interviewed', 'approved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === f
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-charcoal/70 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Volunteers List */}
        <div className="lg:col-span-2 card divide-y divide-slate-100">
          {loading ? (
            <div className="p-12 text-center text-charcoal/50">
              <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-pine-600" />
              <p>Loading volunteers...</p>
            </div>
          ) : filteredVolunteers.length > 0 ? (
            filteredVolunteers.map((vol) => {
              const status = statusConfig[vol.status as keyof typeof statusConfig]
              const fullName = `${vol.firstName} ${vol.lastName}`
              return (
                <div
                  key={vol.id}
                  onClick={() => setSelectedVolunteer(vol)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                    selectedVolunteer?.id === vol.id ? 'bg-emerald-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-700 font-semibold">{vol.firstName[0]}{vol.lastName[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-charcoal">{fullName}</h3>
                          <p className="text-sm text-charcoal/50">{vol.city} • {vol.age}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {vol.interests.slice(0, 3).map((interest) => (
                          <span key={interest} className="px-2 py-0.5 rounded bg-slate-100 text-charcoal/60 text-xs">
                            {interest}
                          </span>
                        ))}
                        {vol.interests.length > 3 && (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-charcoal/60 text-xs">
                            +{vol.interests.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="p-12 text-center text-charcoal/50">
              <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No volunteer applications found</p>
            </div>
          )}
        </div>

        {/* Volunteer Detail Panel */}
        <div className="card p-6">
          {selectedVolunteer ? (
            <div>
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-700 font-bold text-2xl">
                    {selectedVolunteer.firstName[0]}{selectedVolunteer.lastName[0]}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-charcoal">{selectedVolunteer.firstName} {selectedVolunteer.lastName}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${statusConfig[selectedVolunteer.status as keyof typeof statusConfig].bgColor} ${statusConfig[selectedVolunteer.status as keyof typeof statusConfig].textColor}`}>
                  {statusConfig[selectedVolunteer.status as keyof typeof statusConfig].label}
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Mail className="w-4 h-4 text-charcoal/40" />
                  <a href={`mailto:${selectedVolunteer.email}`} className="text-pine-600 hover:underline">{selectedVolunteer.email}</a>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Phone className="w-4 h-4 text-charcoal/40" />
                  <span>{selectedVolunteer.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <MapPin className="w-4 h-4 text-charcoal/40" />
                  <span>{selectedVolunteer.city}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Calendar className="w-4 h-4 text-charcoal/40" />
                  <span>Applied {formatDate(selectedVolunteer.createdAt as Timestamp)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-charcoal mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVolunteer.interests.map((interest) => (
                    <span key={interest} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-charcoal mb-3">Availability</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVolunteer.availability.map((time) => (
                    <span key={time} className="px-3 py-1 rounded-full bg-lake-100 text-lake-700 text-xs font-medium">
                      {time}
                    </span>
                  ))}
                </div>
                <p className="text-charcoal/60 mt-2 text-sm">{selectedVolunteer.commitmentLevel}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-charcoal mb-3">Motivation</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">"{selectedVolunteer.motivation}"</p>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                <button className="w-full p-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Schedule Interview
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 rounded-lg bg-emerald-100 text-emerald-700 font-medium hover:bg-emerald-200 transition-colors text-sm">
                    Approve
                  </button>
                  <button className="p-3 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 transition-colors text-sm">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-charcoal/40">
              <div className="text-center">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select an application to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

