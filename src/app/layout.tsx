import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  metadataBase: new URL('https://contentcontest.ca'),
  title: {
    default: 'ContentContest.ca | Celebrating Georgina\'s Best Creators',
    template: '%s | ContentContest.ca'
  },
  description: 'Weekly content contests showcasing local artists and creators in Georgina with cash prizes. Submit your work Thursday-Sunday, winners announced Monday.',
  keywords: ['Georgina', 'content contest', 'local artists', 'creators', 'Ontario', 'community', 'photography', 'writing', 'video', 'music'],
  authors: [{ name: 'ContentContest Team' }],
  creator: 'ContentContest',
  publisher: 'ContentContest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://contentcontest.ca',
    siteName: 'ContentContest.ca',
    title: 'ContentContest.ca | Celebrating Georgina\'s Best Creators',
    description: 'Weekly content contests showcasing local artists and creators in Georgina with cash prizes.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ContentContest.ca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContentContest.ca | Celebrating Georgina\'s Best Creators',
    description: 'Weekly content contests showcasing local artists and creators in Georgina with cash prizes.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
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
