// Firebase Admin types for server-side operations
// Note: For full server-side Firebase Admin SDK, you'd need to set up
// a separate admin configuration with service account credentials

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore'
import { db } from './firebase'

// Collection names
export const COLLECTIONS = {
  SUBMISSIONS: 'submissions',
  SPONSORS: 'sponsors',
  VOLUNTEERS: 'volunteers',
  BLOG_POSTS: 'blog_posts',
  SETTINGS: 'settings',
  USERS: 'users',
} as const

// Types
export interface Submission {
  id?: string
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

export interface Sponsor {
  id?: string
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

export interface Volunteer {
  id?: string
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

export interface BlogPost {
  id?: string
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

// Helper to get current week string
export function getCurrentWeek(): string {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7)
  return `Week ${weekNumber}, ${now.getFullYear()}`
}

// Submissions
export async function getSubmissions(statusFilter?: string) {
  const submissionsRef = collection(db, COLLECTIONS.SUBMISSIONS)
  let q = query(submissionsRef, orderBy('createdAt', 'desc'))
  
  if (statusFilter && statusFilter !== 'all') {
    q = query(submissionsRef, where('status', '==', statusFilter), orderBy('createdAt', 'desc'))
  }
  
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission))
}

export async function addSubmission(data: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>) {
  const submissionsRef = collection(db, COLLECTIONS.SUBMISSIONS)
  return addDoc(submissionsRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateSubmission(id: string, data: Partial<Submission>) {
  const docRef = doc(db, COLLECTIONS.SUBMISSIONS, id)
  return updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// Sponsors
export async function getSponsors(tierFilter?: string) {
  const sponsorsRef = collection(db, COLLECTIONS.SPONSORS)
  let q = query(sponsorsRef, orderBy('tier'), orderBy('name'))
  
  if (tierFilter && tierFilter !== 'all') {
    q = query(sponsorsRef, where('tier', '==', tierFilter), orderBy('name'))
  }
  
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sponsor))
}

export async function getActiveSponsors() {
  const sponsorsRef = collection(db, COLLECTIONS.SPONSORS)
  const q = query(sponsorsRef, where('status', '==', 'active'), orderBy('tier'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sponsor))
}

export async function addSponsor(data: Omit<Sponsor, 'id' | 'createdAt'>) {
  const sponsorsRef = collection(db, COLLECTIONS.SPONSORS)
  return addDoc(sponsorsRef, {
    ...data,
    createdAt: serverTimestamp(),
  })
}

export async function updateSponsor(id: string, data: Partial<Sponsor>) {
  const docRef = doc(db, COLLECTIONS.SPONSORS, id)
  return updateDoc(docRef, data)
}

export async function deleteSponsor(id: string) {
  const docRef = doc(db, COLLECTIONS.SPONSORS, id)
  return deleteDoc(docRef)
}

// Volunteers
export async function getVolunteers(statusFilter?: string) {
  const volunteersRef = collection(db, COLLECTIONS.VOLUNTEERS)
  let q = query(volunteersRef, orderBy('createdAt', 'desc'))
  
  if (statusFilter && statusFilter !== 'all') {
    q = query(volunteersRef, where('status', '==', statusFilter), orderBy('createdAt', 'desc'))
  }
  
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Volunteer))
}

export async function addVolunteer(data: Omit<Volunteer, 'id' | 'createdAt' | 'updatedAt' | 'status'>) {
  const volunteersRef = collection(db, COLLECTIONS.VOLUNTEERS)
  return addDoc(volunteersRef, {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateVolunteer(id: string, data: Partial<Volunteer>) {
  const docRef = doc(db, COLLECTIONS.VOLUNTEERS, id)
  return updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// Blog Posts
export async function getBlogPosts(type?: 'contest' | 'personal', publishedOnly = false) {
  const postsRef = collection(db, COLLECTIONS.BLOG_POSTS)
  let q = query(postsRef, orderBy('createdAt', 'desc'))
  
  if (type) {
    q = query(postsRef, where('type', '==', type), orderBy('createdAt', 'desc'))
  }
  
  if (publishedOnly) {
    q = query(postsRef, where('status', '==', 'published'), orderBy('publishedAt', 'desc'))
  }
  
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
}

export async function getBlogPost(id: string) {
  const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as BlogPost
  }
  return null
}

export async function addBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) {
  const postsRef = collection(db, COLLECTIONS.BLOG_POSTS)
  return addDoc(postsRef, {
    ...data,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
  const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id)
  return updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteBlogPost(id: string) {
  const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id)
  return deleteDoc(docRef)
}

// Increment blog post views
export async function incrementBlogViews(id: string) {
  const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    const currentViews = snapshot.data().views || 0
    return updateDoc(docRef, { views: currentViews + 1 })
  }
}





