'use client'

import { useState, useEffect } from 'react'
import { FileText, Plus, Search, Edit2, Trash2, Eye, Calendar, Tag, ExternalLink, Loader2 } from 'lucide-react'
import { getBlogPosts, addBlogPost, updateBlogPost, type BlogPost } from '@/lib/firebase-admin'
import { Timestamp } from 'firebase/firestore'

function formatDate(timestamp: Timestamp | undefined): string {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate()
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const data = await getBlogPosts()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(post => {
    if (filter !== 'all' && post.type !== filter) return false
    if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const openEditor = (post?: BlogPost) => {
    setEditingPost(post || null)
    setShowEditor(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    
    console.log('Form submitted!')
    
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const title = formData.get('title') as string
    const type = formData.get('type') as 'contest' | 'personal'
    const status = formData.get('status') as 'draft' | 'published'
    const content = formData.get('content') as string
    const excerpt = formData.get('excerpt') as string || ''
    
    console.log('Form data:', { title, type, status, content: content.substring(0, 50) + '...' })
    
    if (!title || !type || !status || !content) {
      setError('Please fill in all required fields')
      setSaving(false)
      return
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    try {
      console.log('Saving blog post...')
      console.log('Post data:', { title, type, status, contentLength: content.length })
      
      // Check if user is authenticated
      const { useAuth } = await import('@/lib/auth-context')
      // Note: We can't use hooks here, but Firestore rules will check auth
      
      if (editingPost?.id) {
        console.log('Updating existing post:', editingPost.id)
        // Update existing post
        const result = await updateBlogPost(editingPost.id, {
          title,
          slug,
          content,
          excerpt,
          type,
          status,
          publishedAt: status === 'published' ? Timestamp.now() : editingPost.publishedAt,
        })
        console.log('Update result:', result)
      } else {
        console.log('Creating new post')
        // Create new post
        const result = await addBlogPost({
          title,
          slug,
          content,
          excerpt,
          type,
          status,
          author: 'Admin', // You can get this from auth context
          publishedAt: status === 'published' ? Timestamp.now() : undefined,
        })
        console.log('Add result:', result)
        console.log('Post ID:', result.id)
      }

      console.log('Post saved successfully! Refreshing list...')
      
      // Refresh posts list
      const data = await getBlogPosts()
      console.log('Refreshed posts:', data.length, 'posts found')
      setPosts(data)
      
      // Close editor
      setShowEditor(false)
      setEditingPost(null)
      setError(null)
      
      alert('Blog post saved successfully!')
    } catch (error: any) {
      console.error('Error saving blog post:', error)
      console.error('Error code:', error?.code)
      console.error('Error message:', error?.message)
      console.error('Full error:', error)
      
      let errorMessage = 'Failed to save blog post.'
      
      if (error?.code === 'permission-denied') {
        errorMessage = 'Permission denied. Make sure you are logged in and Firestore rules allow writes.'
      } else if (error?.code === 'unavailable') {
        errorMessage = 'Firebase is unavailable. Check your internet connection and Firebase configuration.'
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
      alert(`Error: ${errorMessage}\n\nError Code: ${error?.code || 'unknown'}\n\nCheck browser console (F12) for more details.`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pine-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-pine-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">{posts.length}</p>
              <p className="text-sm text-charcoal/60">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-lake-100 flex items-center justify-center">
              <Eye className="w-6 h-6 text-lake-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">{posts.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString()}</p>
              <p className="text-sm text-charcoal/60">Total Views</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">{posts.filter(p => p.status === 'draft').length}</p>
              <p className="text-sm text-charcoal/60">Drafts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-pine-500 focus:ring-2 focus:ring-pine-500/10 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'contest', 'personal'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-pine-600 text-white'
                  : 'bg-white text-charcoal/70 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {f === 'all' ? 'All' : f === 'contest' ? 'Contest' : 'Personal'}
            </button>
          ))}
          <button
            onClick={() => openEditor()}
            className="px-4 py-2 rounded-lg bg-pine-600 text-white text-sm font-medium hover:bg-pine-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-charcoal/50">
            <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-pine-600" />
            <p>Loading blog posts...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/70">Title</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/70 hidden md:table-cell">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/70 hidden sm:table-cell">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/70 hidden lg:table-cell">Views</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/70">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-charcoal/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        post.type === 'contest' ? 'bg-pine-100' : 'bg-sunset-100'
                      }`}>
                        <FileText className={`w-5 h-5 ${
                          post.type === 'contest' ? 'text-pine-600' : 'text-sunset-600'
                        }`} />
                      </div>
                      <span className="font-medium text-charcoal">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.type === 'contest' ? 'bg-pine-100 text-pine-700' : 'bg-sunset-100 text-sunset-700'
                    }`}>
                      {post.type === 'contest' ? 'Contest' : 'Personal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-charcoal/60 hidden sm:table-cell">{formatDate(post.publishedAt as Timestamp)}</td>
                  <td className="px-6 py-4 text-charcoal/60 hidden lg:table-cell">{(post.views || 0).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => openEditor(post)}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-charcoal/40" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <Eye className="w-4 h-4 text-charcoal/40" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && filteredPosts.length === 0 && (
          <div className="p-12 text-center text-charcoal/50">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No blog posts found</p>
          </div>
        )}
      </div>

      {/* Post Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-charcoal mb-6">
              {editingPost ? 'Edit Post' : 'New Blog Post'}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
              
              <div>
                <label className="label-text">Title *</label>
                <input 
                  type="text" 
                  name="title"
                  className="input-field text-lg font-semibold" 
                  placeholder="Enter post title..."
                  defaultValue={editingPost?.title || ''}
                  required 
                  disabled={saving}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Blog Type *</label>
                  <select name="type" className="input-field" defaultValue={editingPost?.type || ''} required disabled={saving}>
                    <option value="">Select type</option>
                    <option value="contest">Contest Gallery</option>
                    <option value="personal">From the Editor</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Status *</label>
                  <select name="status" className="input-field" defaultValue={editingPost?.status || 'draft'} required disabled={saving}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label-text">Featured Image</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center cursor-pointer hover:border-pine-400 transition-colors">
                  <p className="text-sm text-charcoal/50">Click to upload featured image (coming soon)</p>
                </div>
              </div>

              <div>
                <label className="label-text">Content *</label>
                <textarea
                  name="content"
                  rows={12}
                  className="input-field resize-none font-mono text-sm"
                  placeholder="Write your post content here... (Markdown supported)"
                  defaultValue={editingPost?.content || ''}
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="label-text">Excerpt</label>
                <textarea
                  name="excerpt"
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Brief summary for previews..."
                  defaultValue={editingPost?.excerpt || ''}
                  disabled={saving}
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditor(false)
                    setEditingPost(null)
                    setError(null)
                  }}
                  className="btn-secondary flex-1"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className="btn-secondary flex-1 flex items-center justify-center gap-2"
                  disabled={saving}
                  onClick={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget.closest('form')
                    if (form) {
                      const statusSelect = form.querySelector('[name="status"]') as HTMLSelectElement
                      if (statusSelect) statusSelect.value = 'draft'
                      form.requestSubmit()
                    }
                  }}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Draft'
                  )}
                </button>
                <button 
                  type="button"
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                  disabled={saving}
                  onClick={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget.closest('form')
                    if (form) {
                      const statusSelect = form.querySelector('[name="status"]') as HTMLSelectElement
                      if (statusSelect) statusSelect.value = 'published'
                      form.requestSubmit()
                    }
                  }}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    'Publish'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}





