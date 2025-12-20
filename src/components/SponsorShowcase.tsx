'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

// Placeholder sponsors - these would come from the database in production
const sponsors = [
  { id: 1, name: 'Sponsor One', tier: 'gold', logo: null },
  { id: 2, name: 'Sponsor Two', tier: 'gold', logo: null },
  { id: 3, name: 'Sponsor Three', tier: 'silver', logo: null },
  { id: 4, name: 'Sponsor Four', tier: 'silver', logo: null },
  { id: 5, name: 'Sponsor Five', tier: 'bronze', logo: null },
  { id: 6, name: 'Sponsor Six', tier: 'bronze', logo: null },
]

export default function SponsorShowcase({ showCTA = true }: { showCTA?: boolean }) {
  const goldSponsors = sponsors.filter(s => s.tier === 'gold')
  const silverSponsors = sponsors.filter(s => s.tier === 'silver')
  const bronzeSponsors = sponsors.filter(s => s.tier === 'bronze')

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sunset-600 font-semibold text-sm tracking-widest uppercase mb-4 block">Our Sponsors</span>
          <h2 className="section-title mb-4">Proudly Supported By</h2>
          <p className="section-subtitle mx-auto">
            These amazing local businesses make ContentContest possible. Thank you for supporting Georgina's creative community!
          </p>
        </div>

        {/* Gold Sponsors - Largest display */}
        {goldSponsors.length > 0 && (
          <div className="mb-12">
            <p className="text-center text-xs font-semibold text-sunset-600 tracking-widest uppercase mb-6">Gold Sponsors</p>
            <div className="flex flex-wrap justify-center gap-8">
              {goldSponsors.map((sponsor) => (
                <div 
                  key={sponsor.id}
                  className="card p-8 w-64 h-40 flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 hover:border-amber-400 transition-colors"
                >
                  {sponsor.logo ? (
                    <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-amber-600">{sponsor.name.charAt(0)}</span>
                      </div>
                      <span className="font-semibold text-charcoal/80">{sponsor.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Silver Sponsors */}
        {silverSponsors.length > 0 && (
          <div className="mb-12">
            <p className="text-center text-xs font-semibold text-charcoal/40 tracking-widest uppercase mb-6">Silver Sponsors</p>
            <div className="flex flex-wrap justify-center gap-6">
              {silverSponsors.map((sponsor) => (
                <div 
                  key={sponsor.id}
                  className="card p-6 w-48 h-32 flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 hover:border-slate-400 transition-colors"
                >
                  {sponsor.logo ? (
                    <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold text-slate-500">{sponsor.name.charAt(0)}</span>
                      </div>
                      <span className="text-sm font-medium text-charcoal/70">{sponsor.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bronze Sponsors */}
        {bronzeSponsors.length > 0 && (
          <div className="mb-12">
            <p className="text-center text-xs font-semibold text-charcoal/30 tracking-widest uppercase mb-6">Bronze Sponsors</p>
            <div className="flex flex-wrap justify-center gap-4">
              {bronzeSponsors.map((sponsor) => (
                <div 
                  key={sponsor.id}
                  className="card p-4 w-36 h-24 flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:border-orange-300 transition-colors"
                >
                  {sponsor.logo ? (
                    <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-center">
                      <span className="text-sm font-medium text-charcoal/60">{sponsor.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {showCTA && (
          <div className="text-center mt-12 pt-8 border-t border-charcoal/10">
            <p className="text-charcoal/60 mb-4">Want to support local creators and get your business featured?</p>
            <Link href="/sponsors#become" className="btn-primary inline-flex items-center gap-2">
              Become a Sponsor
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}





