# 🔥 Complete Firebase Setup Guide with Direct Links

This guide will walk you through setting up **everything** in Firebase for ContentContest.ca.

## 📋 What You Need to Set Up

1. **Firebase Project** - Create a new project
2. **Authentication** - Enable Email/Password login for admin
3. **Firestore Database** - Database for submissions, sponsors, volunteers, blog posts
4. **Storage** - File storage for contest submissions (photos, videos, etc.)
5. **Security Rules** - Protect your data
6. **Admin User** - Create your admin account

---

## Step 1: Create Firebase Project

**Direct Link:** https://console.firebase.google.com/

1. Click **"Add project"** or **"Create a project"**
2. Enter project name: `contentcontest` (or your preferred name)
3. Click **"Continue"**
4. **Google Analytics** (optional):
   - You can enable or disable this
   - If enabled, select or create an Analytics account
5. Click **"Create project"**
6. Wait for project to be created, then click **"Continue"**

---

## Step 2: Enable Authentication

**Direct Link:** https://console.firebase.google.com/project/_/authentication

1. Click **"Get started"** (if you see this button)
2. Click the **"Sign-in method"** tab at the top
3. Find **"Email/Password"** in the list
4. Click on **"Email/Password"**
5. Toggle **"Enable"** to ON
6. Leave **"Email link (passwordless sign-in)"** OFF (unless you want it)
7. Click **"Save"**

✅ **Done!** Authentication is now enabled.

---

## Step 3: Create Firestore Database

**Direct Link:** https://console.firebase.google.com/project/_/firestore

1. Click **"Create database"** button
2. Choose **"Start in test mode"** (we'll add security rules in Step 6)
   - ⚠️ **Important:** Test mode allows anyone to read/write for 30 days. We'll secure it later.
3. Click **"Next"**
4. **Select location:**
   - Choose the closest location to your users (e.g., `us-central` for North America, `europe-west` for Europe)
   - For Canada, `us-central` or `northamerica-northeast1` works well
5. Click **"Enable"**
6. Wait for database to be created (takes ~30 seconds)

✅ **Done!** Firestore is now created. The collections will be created automatically when your app runs.

**Collections that will be created automatically:**
- `submissions` - Contest entries
- `sponsors` - Sponsor information
- `volunteers` - Volunteer applications
- `blog_posts` - Blog posts
- `settings` - Site settings

---

## Step 4: Enable Storage

**Direct Link:** https://console.firebase.google.com/project/_/storage

1. Click **"Get started"** button
2. Review the security rules (we'll update these in Step 6)
3. Click **"Next"**
4. **Select location:**
   - Choose the same location as your Firestore database
5. Click **"Done"**

✅ **Done!** Storage is now enabled for file uploads.

---

## Step 5: Get Your Firebase Config (Environment Variables)

**Direct Link:** https://console.firebase.google.com/project/_/settings/general

1. Scroll down to **"Your apps"** section
2. If you don't see a web app, click **"Add app"** → Select the **Web icon** (`</>`)
3. Register your app:
   - **App nickname:** `ContentContest Web`
   - **Firebase Hosting:** (optional, leave unchecked for now)
4. Click **"Register app"**
5. You'll see a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

6. **Copy these values** - you'll need them in the next step

---

## Step 6: Create .env.local File

1. In your project root folder, create a file named `.env.local`
2. Open it in a text editor
3. Paste this template and fill in your values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

**Replace each value** with the actual values from Step 5.

**Example:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC1234567890abcdef
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=contentcontest-abc123.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=contentcontest-abc123
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=contentcontest-abc123.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=987654321
NEXT_PUBLIC_FIREBASE_APP_ID=1:987654321:web:abc123def456ghi789
```

4. **Save the file**

---

## Step 7: Create Admin User

**Direct Link:** https://console.firebase.google.com/project/_/authentication/users

1. Click **"Add user"** button
2. Enter:
   - **Email:** `admin@contentcontest.ca` (or your preferred admin email)
   - **Password:** Create a strong password (save this somewhere safe!)
3. Click **"Add user"**

✅ **Done!** You can now log in to `/admin/login` with these credentials.

---

## Step 8: Set Up Security Rules

### Firestore Security Rules

**Direct Link:** https://console.firebase.google.com/project/_/firestore/rules

1. Click on the **"Rules"** tab
2. Delete the existing test mode rules
3. Copy and paste these rules:

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

4. Click **"Publish"**

✅ **Done!** Your database is now secured.

---

### Storage Security Rules

**Direct Link:** https://console.firebase.google.com/project/_/storage/rules

1. Click on the **"Rules"** tab
2. Delete the existing rules
3. Copy and paste these rules:

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

4. Click **"Publish"**

✅ **Done!** Your storage is now secured.

---

## Step 9: Restart Your Development Server

1. Stop your current dev server (press `Ctrl+C` in terminal)
2. Start it again:
   ```bash
   npm run dev
   ```
3. Go to http://localhost:3000/admin/login
4. Log in with your admin credentials from Step 7

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `.env.local` file exists with all 6 variables
- [ ] Firebase Authentication is enabled (Email/Password)
- [ ] Firestore Database is created
- [ ] Storage is enabled
- [ ] Admin user exists in Authentication
- [ ] Firestore security rules are published
- [ ] Storage security rules are published
- [ ] Dev server restarted after creating `.env.local`
- [ ] Can log in at `/admin/login`

---

## 🔗 Quick Links Reference

- **Firebase Console:** https://console.firebase.google.com/
- **Project Settings:** https://console.firebase.google.com/project/_/settings/general
- **Authentication:** https://console.firebase.google.com/project/_/authentication
- **Firestore Database:** https://console.firebase.google.com/project/_/firestore
- **Storage:** https://console.firebase.google.com/project/_/storage
- **Firestore Rules:** https://console.firebase.google.com/project/_/firestore/rules
- **Storage Rules:** https://console.firebase.google.com/project/_/storage/rules

---

## 🆘 Troubleshooting

### "Firebase not configured" error
- Make sure `.env.local` exists (not `.env` or `.env.example`)
- Restart dev server after creating `.env.local`
- Check all 6 environment variables are set correctly
- Make sure there are no spaces around the `=` sign in `.env.local`

### "Invalid email or password"
- Verify admin user exists: https://console.firebase.google.com/project/_/authentication/users
- Check email/password are correct (case-sensitive)
- Make sure Email/Password auth is enabled: https://console.firebase.google.com/project/_/authentication/providers

### "Permission denied" errors
- Check Firestore rules are published: https://console.firebase.google.com/project/_/firestore/rules
- Check Storage rules are published: https://console.firebase.google.com/project/_/storage/rules
- Make sure you're logged in as admin

### Can't see collections in Firestore
- Collections are created automatically when your app runs
- Try submitting a contest entry or creating a blog post
- Check Firestore console: https://console.firebase.google.com/project/_/firestore/data

---

## 📝 Next Steps

Once Firebase is set up:

1. **Test the submission form** - Submit a test entry at `/submit`
2. **Test admin login** - Log in at `/admin/login`
3. **Create a test blog post** - Go to `/admin/blog`
4. **Add a test sponsor** - Go to `/admin/sponsors`

Everything should work now! 🎉
