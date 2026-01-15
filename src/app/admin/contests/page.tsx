'use client'

import { useState, useEffect } from 'react'
import { Trophy, Plus, Calendar, Clock, CheckCircle, XCircle, Edit2, Trash2, Loader2, DollarSign } from 'lucide-react'
import { getContests, addContest, updateContest, deleteContest, type Contest } from '@/lib/firebase-admin'
import { Timestamp } from 'firebase/firestore'

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-700', icon: Clock },
  open: { label: 'Open', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  closed: { label: 'Closed', color: 'bg-amber-100 text-amber-700', icon: XCircle },
  judging: { label: 'Judging', color: 'bg-blue-100 text-blue-700', icon: Clock },
  completed: { label: 'Completed', color: 'bg-charcoal/10 text-charcoal/70', icon: CheckCircle },
}

function formatDate(timestamp: Timestamp | undefined): string {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate()
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function formatDateTime(timestamp: Timestamp | undefined): string {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate()
  return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingContest, setEditingContest] = useState<Contest | null>(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchContests()
  }, [filter])

  async function fetchContests() {
    try {
      setLoading(true)
      const data = await getContests(filter !== 'all' ? filter : undefined)
      setContests(data)
    } catch (error) {
      console.error('Error fetching contests:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const openDate = new Date(formData.get('openDate') as string)
    const closeDate = new Date(formData.get('closeDate') as string)
    const announceDate = formData.get('announceDate') ? new Date(formData.get('announceDate') as string) : undefined

    const contestData: Omit<Contest, 'id' | 'createdAt' | 'updatedAt'> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || undefined,
      week: formData.get('week') as string,
      status: formData.get('status') as Contest['status'],
      openDate: Timestamp.fromDate(openDate),
      closeDate: Timestamp.fromDate(closeDate),
      announceDate: announceDate ? Timestamp.fromDate(announceDate) : undefined,
      prizeFirst: formData.get('prizeFirst') ? Number(formData.get('prizeFirst')) : undefined,
      prizeSecond: formData.get('prizeSecond') ? Number(formData.get('prizeSecond')) : undefined,
      prizeThird: formData.get('prizeThird') ? Number(formData.get('prizeThird')) : undefined,
      rules: formData.get('rules') ? (formData.get('rules') as string).split('\n').filter(r => r.trim()) : undefined,
    }

    try {
      if (editingContest?.id) {
        await updateContest(editingContest.id, contestData)
      } else {
        await addContest(contestData)
      }
      setShowModal(false)
      setEditingContest(null)
      fetchContests()
    } catch (error) {
      console.error('Error saving contest:', error)
      alert('Error saving contest. Please try again.')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this contest?')) return
    
    try {
      await deleteContest(id)
      fetchContests()
    } catch (error) {
      console.error('Error deleting contest:', error)
      alert('Error deleting contest. Please try again.')
    }
  }

  function openEditModal(contest: Contest) {
    setEditingContest(contest)
    setShowModal(true)
  }

  function openNewModal() {
    setEditingContest(null)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditingContest(null)
  }

  // Helper to format date for input
  function formatDateForInput(timestamp: Timestamp | undefined): string {
    if (!timestamp) return ''
    const date = timestamp.toDate()
    return date.toISOString().slice(0, 16)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal mb-1">Contest Management</h1>
          <p className="text-charcoal/60">Create and manage contests</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="judging">Judging</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={openNewModal}
            className="px-4 py-2 rounded-lg bg-pine-600 text-white text-sm font-medium hover:bg-pine-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Contest
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card p-12 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-pine-600" />
          <p className="text-charcoal/50">Loading contests...</p>
        </div>
      ) : contests.length === 0 ? (
        <div className="card p-12 text-center text-charcoal/50">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No contests found</p>
          <button
            onClick={openNewModal}
            className="mt-4 btn-primary"
          >
            Create Your First Contest
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => {
            const status = statusConfig[contest.status]
            const StatusIcon = status.icon
            
            return (
              <div key={contest.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-charcoal mb-2">{contest.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${status.color} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal/60 mb-1">Week: {contest.week}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditModal(contest)}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-charcoal/40" />
                    </button>
                    <button
                      onClick={() => contest.id && handleDelete(contest.id)}
                      className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-charcoal/60">
                    <Calendar className="w-4 h-4" />
                    <span>Opens: {formatDate(contest.openDate as Timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/60">
                    <Clock className="w-4 h-4" />
                    <span>Closes: {formatDate(contest.closeDate as Timestamp)}</span>
                  </div>
                  
                  {(contest.prizeFirst || contest.prizeSecond || contest.prizeThird) && (
                    <div className="pt-3 border-t border-charcoal/10">
                      <div className="flex items-center gap-2 text-charcoal/60 mb-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">Prizes</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        {contest.prizeFirst && <p>1st: ${contest.prizeFirst}</p>}
                        {contest.prizeSecond && <p>2nd: ${contest.prizeSecond}</p>}
                        {contest.prizeThird && <p>3rd: ${contest.prizeThird}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-charcoal mb-6">
              {editingContest ? 'Edit Contest' : 'Create New Contest'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-text">Contest Title *</label>
                <input
                  type="text"
                  name="title"
                  className="input-field"
                  placeholder="e.g., Week 15, 2024"
                  defaultValue={editingContest?.title}
                  required
                />
              </div>

              <div>
                <label className="label-text">Week Identifier *</label>
                <input
                  type="text"
                  name="week"
                  className="input-field"
                  placeholder="e.g., Week 15, 2024"
                  defaultValue={editingContest?.week}
                  required
                />
              </div>

              <div>
                <label className="label-text">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Optional description or theme for this contest..."
                  defaultValue={editingContest?.description}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Open Date & Time *</label>
                  <input
                    type="datetime-local"
                    name="openDate"
                    className="input-field"
                    defaultValue={formatDateForInput(editingContest?.openDate as Timestamp)}
                    required
                  />
                </div>
                <div>
                  <label className="label-text">Close Date & Time *</label>
                  <input
                    type="datetime-local"
                    name="closeDate"
                    className="input-field"
                    defaultValue={formatDateForInput(editingContest?.closeDate as Timestamp)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label-text">Announce Date & Time</label>
                <input
                  type="datetime-local"
                  name="announceDate"
                  className="input-field"
                  defaultValue={formatDateForInput(editingContest?.announceDate as Timestamp)}
                />
              </div>

              <div>
                <label className="label-text">Status *</label>
                <select
                  name="status"
                  className="input-field"
                  defaultValue={editingContest?.status || 'draft'}
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="judging">Judging</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label-text">1st Place Prize ($)</label>
                  <input
                    type="number"
                    name="prizeFirst"
                    className="input-field"
                    placeholder="100"
                    min="0"
                    defaultValue={editingContest?.prizeFirst}
                  />
                </div>
                <div>
                  <label className="label-text">2nd Place Prize ($)</label>
                  <input
                    type="number"
                    name="prizeSecond"
                    className="input-field"
                    placeholder="50"
                    min="0"
                    defaultValue={editingContest?.prizeSecond}
                  />
                </div>
                <div>
                  <label className="label-text">3rd Place Prize ($)</label>
                  <input
                    type="number"
                    name="prizeThird"
                    className="input-field"
                    placeholder="25"
                    min="0"
                    defaultValue={editingContest?.prizeThird}
                  />
                </div>
              </div>

              <div>
                <label className="label-text">Rules (one per line)</label>
                <textarea
                  name="rules"
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Enter contest rules, one per line..."
                  defaultValue={editingContest?.rules?.join('\n')}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {editingContest ? 'Update Contest' : 'Create Contest'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
