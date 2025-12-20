'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Trophy, Newspaper, Users, Info, Heart } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home', icon: Trophy },
  { href: '/contest', label: 'Contest & Rules', icon: Info },
  { href: '/blog/contest', label: 'Contest Gallery', icon: Newspaper },
  { href: '/blog/personal', label: 'From the Editor', icon: Heart },
  { href: '/submit', label: 'Submit Entry', icon: Trophy },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <nav className="card-glass px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pine-600 to-lake-600 flex items-center justify-center shadow-lg group-hover:shadow-pine-500/30 transition-shadow">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-charcoal tracking-tight">ContentContest</span>
              <span className="text-[10px] text-charcoal/50 -mt-1 tracking-widest uppercase">Georgina</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-charcoal/70 hover:text-pine-700 hover:bg-pine-50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/sponsors" className="btn-secondary text-sm py-2 px-4">
              Become a Sponsor
            </Link>
            <Link href="/submit" className="btn-primary text-sm py-2 px-4">
              Enter Contest
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-charcoal/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden card-glass mt-2 p-4 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-charcoal/70 hover:text-pine-700 hover:bg-pine-50 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
              <hr className="my-2 border-charcoal/10" />
              <Link href="/sponsors" className="btn-secondary text-center" onClick={() => setIsOpen(false)}>
                Become a Sponsor
              </Link>
              <Link href="/submit" className="btn-primary text-center" onClick={() => setIsOpen(false)}>
                Enter Contest
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}





