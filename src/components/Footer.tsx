import Link from 'next/link'
import { Trophy, Mail, MapPin, Calendar } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pine-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lake-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pine-500 to-lake-500 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">ContentContest</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Celebrating the best of Georgina through weekly creative contests. Showcasing local talent, one submission at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Contest</h4>
            <ul className="space-y-2">
              <li><Link href="/contest" className="text-white/60 hover:text-pine-400 transition-colors text-sm">Contest Rules</Link></li>
              <li><Link href="/submit" className="text-white/60 hover:text-pine-400 transition-colors text-sm">Submit Entry</Link></li>
              <li><Link href="/blog/contest" className="text-white/60 hover:text-pine-400 transition-colors text-sm">Past Winners</Link></li>
              <li><Link href="/sponsors" className="text-white/60 hover:text-pine-400 transition-colors text-sm">Our Sponsors</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/blog/personal" className="text-white/60 hover:text-pine-400 transition-colors text-sm">From the Editor</Link></li>
              <li><Link href="/sponsors#become" className="text-white/60 hover:text-pine-400 transition-colors text-sm">Become a Sponsor</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-pine-400 transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contest Schedule */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Weekly Schedule</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-pine-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/90">Thu–Sun</p>
                  <p className="text-xs text-white/50">Submissions Open</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="w-4 h-4 text-sunset-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/90">Monday</p>
                  <p className="text-xs text-white/50">Winners Announced</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-lake-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">hello@contentcontest.ca</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-lake-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Georgina, Ontario</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} ContentContest.ca. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Made with ❤️ for the Georgina community
          </p>
        </div>
      </div>
    </footer>
  )
}





