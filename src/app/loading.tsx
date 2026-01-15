import { Trophy } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pine-500 to-lake-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <p className="text-charcoal/60">Loading...</p>
      </div>
    </div>
  )
}
