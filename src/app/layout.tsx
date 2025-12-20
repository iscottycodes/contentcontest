import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'ContentContest.ca | Celebrating Georgina\'s Best Creators',
  description: 'Weekly content contests showcasing local artists and creators in Georgina with cash prizes. Submit your work Thursday-Sunday, winners announced Monday.',
  keywords: ['Georgina', 'content contest', 'local artists', 'creators', 'Ontario', 'community'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
