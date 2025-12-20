'use client'

import Link from 'next/link'
import { Trophy, Users, Building2, FileText, TrendingUp, Eye, ArrowUpRight, ArrowRight, Clock, CheckCircle, AlertCircle, Heart } from 'lucide-react'

// Mock data
const stats = [
  { label: 'Submissions This Week', value: '24', change: '+12%', icon: Trophy, bgColor: 'bg-pine-100', iconColor: 'text-pine-600' },
  { label: 'Active Sponsors', value: '8', change: '+2', icon: Building2, bgColor: 'bg-sunset-100', iconColor: 'text-sunset-600' },
  { label: 'Volunteer Applications', value: '15', change: '+5', icon: Heart, bgColor: 'bg-lake-100', iconColor: 'text-lake-600' },
  { label: 'Page Views', value: '2.4k', change: '+18%', icon: Eye, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
]

const recentSubmissions = [
  { id: 1, title: 'Sunset at the Marina', author: 'Sarah M.', type: 'Photo', status: 'pending', time: '2 hours ago' },
  { id: 2, title: 'Voices of Georgina', author: 'Mike T.', type: 'Audio', status: 'pending', time: '5 hours ago' },
  { id: 3, title: 'The Old Bridge', author: 'Emily R.', type: 'Writing', status: 'reviewed', time: '1 day ago' },
  { id: 4, title: 'Winter Morning', author: 'James K.', type: 'Photo', status: 'winner', time: '2 days ago' },
]

const recentVolunteers = [
  { id: 1, name: 'Jennifer Lee', interest: 'Youth Mentorship', time: '3 hours ago' },
  { id: 2, name: 'Robert Chen', interest: 'Administrative', time: '1 day ago' },
  { id: 3, name: 'Maria Santos', interest: 'Event Planning', time: '2 days ago' },
]

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  reviewed: 'bg-blue-100 text-blue-700',
  winner: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="card p-6 bg-gradient-to-r from-pine-600 to-lake-600 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back! 👋</h2>
            <p className="text-white/80">Here's what's happening with ContentContest this week.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/submissions" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Review Submissions
            </Link>
            <Link href="/admin/blog" className="bg-white hover:bg-white/90 text-pine-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Write Post
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <ArrowUpRight className="w-4 h-4" />
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-charcoal mb-1">{stat.value}</h3>
            <p className="text-sm text-charcoal/50">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-charcoal">Recent Submissions</h3>
            <Link href="/admin/submissions" className="text-sm text-pine-600 font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pine-100 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-pine-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal">{sub.title}</h4>
                    <p className="text-sm text-charcoal/50">by {sub.author} • {sub.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[sub.status as keyof typeof statusColors]}`}>
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </span>
                  <span className="text-xs text-charcoal/40 hidden sm:block">{sub.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Volunteers */}
        <div className="space-y-6">
          {/* Contest Status */}
          <div className="card p-6 bg-emerald-50 border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-emerald-800">Contest Status</h3>
            </div>
            <p className="text-emerald-700 mb-4">Submissions are currently <strong>OPEN</strong></p>
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <Clock className="w-4 h-4" />
              Closes Sunday at 11:59 PM
            </div>
          </div>

          {/* Recent Volunteer Applications */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-charcoal">New Volunteer Apps</h3>
              <Link href="/admin/volunteers" className="text-sm text-pine-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {recentVolunteers.map((vol) => (
                <div key={vol.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="w-8 h-8 rounded-full bg-lake-100 flex items-center justify-center text-lake-600 font-medium text-sm">
                    {vol.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-charcoal text-sm truncate">{vol.name}</p>
                    <p className="text-xs text-charcoal/50">{vol.interest}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="font-bold text-charcoal mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/admin/submissions?action=announce" className="block w-full p-3 rounded-lg bg-sunset-100 text-sunset-700 font-medium text-sm hover:bg-sunset-200 transition-colors text-center">
                🏆 Announce Winners
              </Link>
              <Link href="/admin/blog?action=new" className="block w-full p-3 rounded-lg bg-pine-100 text-pine-700 font-medium text-sm hover:bg-pine-200 transition-colors text-center">
                ✏️ New Blog Post
              </Link>
              <Link href="/admin/sponsors?action=add" className="block w-full p-3 rounded-lg bg-lake-100 text-lake-700 font-medium text-sm hover:bg-lake-200 transition-colors text-center">
                🤝 Add Sponsor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

