# ContentContest.ca

A modern web platform for Georgina's weekly creative content contest, showcasing local artists and creators with cash prizes.

## Features

### Public Website
- **Landing Page** - Beautiful hero section with contest info, sponsor showcase, and call-to-actions
- **Contest & Rules** - Complete information about eligibility, submission guidelines, prizes, and schedule
- **Submit Entry** - User-friendly submission form for contest entries (photo, writing, video, audio)
- **Contest Gallery Blog** - Showcase of all submissions and winners from weekly contests
- **Personal Blog (From the Editor)** - Editor's personal blog for community thoughts and updates
- **Sponsors Page** - Sponsor showcase with tiered packages (Gold, Silver, Bronze) and inquiry form
- **Contact Page** - General contact form with multiple inquiry types

### Georgina Help Hub (Unlinked Landing Page)
- Separate volunteer matching service at `/help-hub`
- Long-form volunteer application inspired by viq.ca
- Different branding (emerald/teal color scheme)
- Collects interests, availability, skills, and motivation

### Admin Dashboard (`/admin`)
- **Dashboard Overview** - Stats, recent submissions, volunteer applications, quick actions
- **Contest Submissions** - Review, approve, reject, and select winners
- **Volunteer Applications** - View and manage Help Hub applications, schedule interviews
- **Sponsors Management** - Add, edit, and track sponsors by tier
- **Blog Management** - Create and edit posts for both blogs
- **Settings** - Profile, site settings, notifications, security
- **Authentication** - Firebase Auth protected admin area

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Backend**: Firebase (Authentication, Firestore, Storage)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable the following services:
   - **Authentication** → Sign-in method → Enable Email/Password
   - **Firestore Database** → Create database (start in test mode for development)
   - **Storage** → Get started (start in test mode for development)

4. Get your Firebase config:
   - Go to Project Settings → General → Your apps → Web app
   - If you don't have a web app, click "Add app" and select Web
   - Copy the config object

5. Create `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

6. Create an admin user:
   - Go to Firebase Console → Authentication → Users
   - Click "Add user"
   - Enter email and password for your admin account

7. Set up Firestore security rules (Production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for blog posts (published only)
    match /blog_posts/{document=**} {
      allow read: if resource.data.status == 'published';
      allow write: if request.auth != null;
    }
    
    // Public read for active sponsors
    match /sponsors/{document=**} {
      allow read: if resource.data.status == 'active';
      allow write: if request.auth != null;
    }
    
    // Public write for submissions and volunteers
    match /submissions/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /volunteers/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Admin only for settings
    match /settings/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

8. Set up Storage security rules (Production):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public uploads for submissions (max 500MB)
    match /submissions/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 500 * 1024 * 1024;
    }
    
    // Admin only for sponsor logos and blog images
    match /sponsors/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /blog/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Admin Access
1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Sign in with the admin email/password you created in Firebase
3. Access the dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)

### Help Hub
Navigate to [http://localhost:3000/help-hub](http://localhost:3000/help-hub) for the volunteer signup page.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with Navbar/Footer
│   ├── globals.css           # Global styles
│   ├── contest/              # Contest rules page
│   ├── submit/               # Entry submission form
│   ├── sponsors/             # Sponsor info and signup
│   ├── contact/              # Contact form
│   ├── help-hub/             # Georgina Help Hub (unlinked)
│   ├── blog/
│   │   ├── contest/          # Contest gallery blog
│   │   └── personal/         # Editor's personal blog
│   └── admin/
│       ├── login/            # Admin login page
│       ├── page.tsx          # Dashboard overview
│       ├── layout.tsx        # Admin layout (protected)
│       ├── submissions/      # Manage contest entries
│       ├── volunteers/       # Manage Help Hub applications
│       ├── sponsors/         # Manage sponsors
│       ├── blog/             # Blog post editor
│       └── settings/         # Site settings
├── components/
│   ├── Navbar.tsx            # Main navigation
│   ├── Footer.tsx            # Site footer
│   ├── SponsorShowcase.tsx   # Sponsor display component
│   └── ProtectedRoute.tsx    # Auth protection wrapper
└── lib/
    ├── firebase.ts           # Firebase initialization
    ├── firebase-admin.ts     # Firestore operations
    ├── auth-context.tsx      # Auth context provider
    └── storage.ts            # Firebase Storage operations
```

## Firebase Collections

### submissions
```typescript
{
  title: string
  author: string
  email: string
  type: 'photo' | 'writing' | 'video' | 'audio'
  description: string
  fileUrl?: string
  fileName?: string
  status: 'pending' | 'reviewed' | 'winner' | 'rejected'
  place?: 1 | 2 | 3
  week: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### volunteers
```typescript
{
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  age: string
  occupation?: string
  interests: string[]
  availability: string[]
  commitmentLevel: string
  experience?: string
  skills?: string
  motivation: string
  hasVehicle?: string
  referralSource?: string
  status: 'new' | 'contacted' | 'interviewed' | 'approved' | 'declined'
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### sponsors
```typescript
{
  name: string
  tier: 'gold' | 'silver' | 'bronze'
  contact: string
  email: string
  phone?: string
  logoUrl?: string
  website?: string
  status: 'active' | 'pending' | 'inactive'
  startDate: Timestamp
  createdAt: Timestamp
}
```

### blog_posts
```typescript
{
  title: string
  slug: string
  content: string
  excerpt?: string
  type: 'contest' | 'personal'
  status: 'draft' | 'published'
  featuredImage?: string
  author: string
  views: number
  publishedAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## Contest Schedule

- **Thursday 12:00 AM**: Contest opens
- **Sunday 11:59 PM**: Submissions close
- **Monday 12:00 PM**: Winners announced
- **Tuesday-Wednesday**: Judging period

## Sponsor Tiers

| Tier | Price | Benefits |
|------|-------|----------|
| Gold | $500/mo | Premium homepage placement, all announcements, large ads, weekly social media |
| Silver | $250/mo | Homepage placement, announcements, medium ads, bi-weekly social |
| Bronze | $100/mo | Sponsor page listing, small ads, monthly social mention |

## Email Addresses (Suggested Setup)

- `hello@contentcontest.ca` - General inquiries
- `submit@contentcontest.ca` - Contest submissions
- `sponsors@contentcontest.ca` - Sponsorship inquiries
- `volunteers@georginahelphub.ca` - Help Hub applications

## Next Steps for Production

1. ✅ **Database**: Firebase Firestore configured
2. ✅ **Authentication**: Firebase Auth implemented
3. ✅ **File Storage**: Firebase Storage for submissions
4. **Email**: Set up transactional emails (Resend, SendGrid)
5. **Payments**: Add Stripe for sponsor payments
6. **Analytics**: Add site analytics (Vercel Analytics, Google Analytics)
7. **Domain**: Configure custom domain (contentcontest.ca)
8. **Deploy**: Deploy to Vercel or Firebase Hosting

## Design Notes

- Modern, clean aesthetic with nature-inspired colors (pine green, lake blue)
- Sunset orange for accents and calls-to-action
- Playfair Display for headings, DM Sans for body text
- Smooth animations and transitions
- Mobile-responsive throughout
- Glass morphism effects for navigation

---

Built with ❤️ for the Georgina community
