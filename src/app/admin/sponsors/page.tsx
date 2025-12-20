'use client'

import { useState } from 'react'
import { Building2, Plus, Search, Mail, Phone, DollarSign, Calendar, Edit2, Trash2, ExternalLink, Star } from 'lucide-react'

// Mock sponsors data
const mockSponsors = [
  { id: 1, name: 'Georgina Pharmacy', tier: 'gold', contact: 'John Smith', email: 'john@georginapharmacy.ca', phone: '(555) 111-2222', since: '2024-10', status: 'active', logo: null },
  { id: 2, name: 'Lake Simcoe Marina', tier: 'gold', contact: 'Susan Wong', email: 'susan@lsm.ca', phone: '(555) 222-3333', since: '2024-11', status: 'active', logo: null },
  { id: 3, name: 'Keswick Auto', tier: 'silver', contact: 'Mike Johnson', email: 'mike@keswickauto.ca', phone: '(555) 333-4444', since: '2024-11', status: 'active', logo: null },
  { id: 4, name: 'Sutton Bakery', tier: 'silver', contact: 'Maria Garcia', email: 'maria@suttonbakery.ca', phone: '(555) 444-5555', since: '2024-12', status: 'active', logo: null },
  { id: 5, name: 'Pefferlaw Hardware', tier: 'bronze', contact: 'Tom Brown', email: 'tom@pefhardware.ca', phone: '(555) 555-6666', since: '2024-12', status: 'active', logo: null },
  { id: 6, name: 'Georgina Realty', tier: 'bronze', contact: 'Lisa Chen', email: 'lisa@grealty.ca', phone: '(555) 666-7777', since: '2024-12', status: 'pending', logo: null },
]

const tierConfig = {
  gold: { label: 'Gold', bgColor: 'bg-amber-100', textColor: 'text-amber-600', borderColor: 'border-amber-200', cardBg: 'bg-amber-50/50', price: '$500/mo' },
  silver: { label: 'Silver', bgColor: 'bg-slate-100', textColor: 'text-slate-500', borderColor: 'border-slate-200', cardBg: 'bg-slate-50/50', price: '$250/mo' },
  bronze: { label: 'Bronze', bgColor: 'bg-orange-100', textColor: 'text-orange-600', borderColor: 'border-orange-200', cardBg: 'bg-orange-50/50', price: '$100/mo' },
}

export default function SponsorsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredSponsors = mockSponsors.filter(sponsor => {
    if (filter !== 'all' && sponsor.tier !== filter) return false
    if (search && !sponsor.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const goldSponsors = filteredSponsors.filter(s => s.tier === 'gold')
  const silverSponsors = filteredSponsors.filter(s => s.tier === 'silver')
  const bronzeSponsors = filteredSponsors.filter(s => s.tier === 'bronze')

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="card p-4 bg-amber-50 border-amber-200">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-2xl font-bold text-charcoal">{mockSponsors.filter(s => s.tier === 'gold').length}</p>
              <p className="text-sm text-charcoal/60">Gold Sponsors</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-slate-50 border-slate-200">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-slate-400" />
            <div>
              <p className="text-2xl font-bold text-charcoal">{mockSponsors.filter(s => s.tier === 'silver').length}</p>
              <p className="text-sm text-charcoal/60">Silver Sponsors</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-2xl font-bold text-charcoal">{mockSponsors.filter(s => s.tier === 'bronze').length}</p>
              <p className="text-sm text-charcoal/60">Bronze Sponsors</p>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-emerald-50 border-emerald-200">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-2xl font-bold text-charcoal">$1,700</p>
              <p className="text-sm text-charcoal/60">Monthly Revenue</p>
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
            placeholder="Search sponsors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-pine-500 focus:ring-2 focus:ring-pine-500/10 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm"
          >
            <option value="all">All Tiers</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-pine-600 text-white text-sm font-medium hover:bg-pine-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Sponsor
          </button>
        </div>
      </div>

      {/* Sponsors by Tier */}
      {goldSponsors.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            Gold Sponsors
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {goldSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}

      {silverSponsors.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-slate-400" />
            Silver Sponsors
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {silverSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}

      {bronzeSponsors.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-400" />
            Bronze Sponsors
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bronzeSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}

      {/* Add Sponsor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-charcoal mb-6">Add New Sponsor</h2>
            <form className="space-y-4">
              <div>
                <label className="label-text">Business Name *</label>
                <input type="text" className="input-field" placeholder="Business name" required />
              </div>
              <div>
                <label className="label-text">Sponsorship Tier *</label>
                <select className="input-field" required>
                  <option value="">Select tier</option>
                  <option value="gold">Gold - $500/mo</option>
                  <option value="silver">Silver - $250/mo</option>
                  <option value="bronze">Bronze - $100/mo</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Contact Name</label>
                  <input type="text" className="input-field" placeholder="Contact person" />
                </div>
                <div>
                  <label className="label-text">Phone</label>
                  <input type="tel" className="input-field" placeholder="(555) 555-5555" />
                </div>
              </div>
              <div>
                <label className="label-text">Email *</label>
                <input type="email" className="input-field" placeholder="email@business.com" required />
              </div>
              <div>
                <label className="label-text">Logo</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-pine-400 transition-colors">
                  <p className="text-sm text-charcoal/50">Click to upload logo image</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Add Sponsor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function SponsorCard({ sponsor }: { sponsor: typeof mockSponsors[0] }) {
  const tier = tierConfig[sponsor.tier as keyof typeof tierConfig]
  
  return (
    <div className={`card p-5 border-2 ${tier.borderColor} ${tier.cardBg}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${tier.bgColor} flex items-center justify-center`}>
            <Building2 className={`w-6 h-6 ${tier.textColor}`} />
          </div>
          <div>
            <h3 className="font-semibold text-charcoal">{sponsor.name}</h3>
            <span className={`text-xs font-medium ${tier.textColor}`}>{tier.label} • {tier.price}</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
            <Edit2 className="w-4 h-4 text-charcoal/40" />
          </button>
          <button className="p-2 rounded-lg hover:bg-red-100 transition-colors">
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-charcoal/60">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${sponsor.email}`} className="hover:text-pine-600">{sponsor.email}</a>
        </div>
        {sponsor.phone && (
          <div className="flex items-center gap-2 text-charcoal/60">
            <Phone className="w-4 h-4" />
            <span>{sponsor.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-charcoal/60">
          <Calendar className="w-4 h-4" />
          <span>Since {sponsor.since}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-charcoal/10 flex items-center justify-between">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          sponsor.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {sponsor.status === 'active' ? 'Active' : 'Pending'}
        </span>
        <button className="text-sm text-pine-600 font-medium hover:underline flex items-center gap-1">
          View Details
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

