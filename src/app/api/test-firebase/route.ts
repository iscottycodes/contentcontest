import { NextResponse } from 'next/server'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function GET() {
  try {
    // Test 1: Write a test document
    const testCollection = collection(db, 'test')
    const testDoc = await addDoc(testCollection, {
      message: 'Firebase is working!',
      timestamp: new Date().toISOString(),
    })
    
    // Test 2: Read it back
    const snapshot = await getDocs(testCollection)
    const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    
    // Test 3: Delete the test document
    await deleteDoc(doc(db, 'test', testDoc.id))
    
    return NextResponse.json({
      success: true,
      message: '✅ Firebase Firestore is connected and working!',
      testResults: {
        write: 'Success - Created test document',
        read: `Success - Found ${docs.length} documents`,
        delete: 'Success - Cleaned up test document',
      },
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
  } catch (error: any) {
    console.error('Firebase test error:', error)
    return NextResponse.json({
      success: false,
      message: '❌ Firebase connection failed',
      error: error.message,
      code: error.code,
      hint: error.code === 'permission-denied' 
        ? 'Firestore security rules are blocking access. Enable test mode in Firebase Console.'
        : 'Check your Firebase configuration and ensure Firestore is enabled.',
    }, { status: 500 })
  }
}





