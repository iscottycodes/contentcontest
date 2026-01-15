import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ContentContest.ca - Celebrating Georgina\'s Best Creators',
    short_name: 'ContentContest',
    description: 'Weekly content contests showcasing local artists and creators in Georgina with cash prizes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f6',
    theme_color: '#166534',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
