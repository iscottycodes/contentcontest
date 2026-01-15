# 🔥 Firebase Setup Guide - Fix Sign-In Issue

## Problem
The sign-in is failing because Firebase is not configured. You need to set up Firebase and create a `.env.local` file.

## Quick Fix Steps

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Follow the setup wizard:
   - Enter project name (e.g., "contentcontest")
   - Enable Google Analytics (optional)
   - Click **"Create project"**

### Step 2: Enable Firebase Services

#### Enable Authentication:
1. In Firebase Console, click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Enable **"Email/Password"** toggle
6. Click **"Save"**

#### Enable Firestore Database:
1. Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for now - you'll add security rules later)
4. Select a location (choose closest to your users)
5. Click **"Enable"**

#### Enable Storage:
1. Click **"Storage"** in left sidebar
2. Click **"Get started"**
3. Choose **"Start in test mode"** (for now)
4. Click **"Next"** then **"Done"**

### Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. If you don't have a web app, click **"Add app"** → Select **Web** (</> icon)
5. Register your app (nickname: "ContentContest Web")
6. Copy the **config object** that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 4: Create .env.local File

1. In your project root, create a file named `.env.local`
2. Copy the values from the Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Replace the values with your actual Firebase config values!**

### Step 5: Create Admin User

1. In Firebase Console, go to **"Authentication"** → **"Users"**
2. Click **"Add user"**
3. Enter:
   - **Email:** admin@contentcontest.ca (or your preferred email)
   - **Password:** Create a strong password
4. Click **"Add user"**
5. **Save these credentials** - you'll use them to log in!

### Step 6: Restart Development Server

After creating `.env.local`:

1. Stop the current dev server (Ctrl+C in terminal)
2. Restart it:
   ```bash
   npm run dev
   ```
3. Try logging in again at http://localhost:3000/admin/login

## Verify Setup

After setup, check:
- [ ] `.env.local` file exists with all 6 variables
- [ ] Firebase Authentication is enabled
- [ ] Firestore Database is created
- [ ] Storage is enabled
- [ ] Admin user exists in Firebase Authentication
- [ ] Dev server restarted after creating `.env.local`

## Common Issues

### "Firebase not configured" error
- Make sure `.env.local` exists (not `.env` or `.env.example`)
- Restart dev server after creating `.env.local`
- Check all 6 environment variables are set

### "Invalid email or password"
- Verify admin user exists in Firebase Console → Authentication → Users
- Check email/password are correct (case-sensitive)
- Make sure Email/Password auth is enabled

### "Failed to sign in"
- Check browser console for errors (F12)
- Verify Firebase project is active
- Check network tab for Firebase API calls

## Security Rules (After Testing)

Once everything works, update your security rules:

### Firestore Rules:
Go to Firestore → Rules and paste:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blog_posts/{document=**} {
      allow read: if resource.data.status == 'published';
      allow write: if request.auth != null;
    }
    match /sponsors/{document=**} {
      allow read: if resource.data.status == 'active';
      allow write: if request.auth != null;
    }
    match /submissions/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /volunteers/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /settings/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules:
Go to Storage → Rules and paste:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /submissions/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 500 * 1024 * 1024;
    }
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

---

**Need help?** Check the browser console (F12) for specific error messages!
