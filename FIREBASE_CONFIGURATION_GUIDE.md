# 🔥 Firebase Configuration Guide

Follow these steps to configure Firebase for ContentContest.ca.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `contentcontest` (or your preferred name)
4. Click **"Continue"**
5. (Optional) Enable Google Analytics
6. Click **"Create project"**
7. Wait for project creation, then click **"Continue"**

---

## Step 2: Enable Authentication

1. Go to: https://console.firebase.google.com/project/_/authentication
2. Click **"Get started"** (if you see this button)
3. Click the **"Sign-in method"** tab
4. Find **"Email/Password"** in the list
5. Click on **"Email/Password"**
6. Toggle **"Enable"** to ON
7. Leave **"Email link (passwordless sign-in)"** OFF (unless you want it)
8. Click **"Save"**

✅ Authentication is now enabled!

---

## Step 3: Create Firestore Database

1. Go to: https://console.firebase.google.com/project/_/firestore
2. Click **"Create database"** button
3. Choose **"Start in test mode"** (we'll add security rules in Step 7)
   - ⚠️ **Note:** Test mode allows anyone to read/write for 30 days. We'll secure it later.
4. Click **"Next"**
5. **Select location:**
   - Choose the closest location to your users
   - For Canada: `us-central` or `northamerica-northeast1` works well
6. Click **"Enable"**
7. Wait for database to be created (~30 seconds)

✅ Firestore is now created!

**Collections will be created automatically when your app runs:**
- `submissions` - Contest entries
- `sponsors` - Sponsor information
- `volunteers` - Volunteer applications
- `blog_posts` - Blog posts
- `contests` - Contest information
- `settings` - Site settings

---

## Step 4: Enable Storage

1. Go to: https://console.firebase.google.com/project/_/storage
2. Click **"Get started"** button
3. Review the security rules (we'll update these in Step 7)
4. Click **"Next"**
5. **Select location:**
   - Choose the same location as your Firestore database
6. Click **"Done"**

✅ Storage is now enabled for file uploads!

---

## Step 5: Get Your Firebase Config Values

1. Go to: https://console.firebase.google.com/project/_/settings/general
2. Scroll down to **"Your apps"** section
3. If you don't see a web app, click **"Add app"** → Select the **Web icon** (`</>`)
4. Register your app:
   - **App nickname:** `ContentContest Web`
   - **Firebase Hosting:** (optional, leave unchecked for now)
5. Click **"Register app"**
6. You'll see a config object like this:

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

7. **Copy these 6 values** - you'll need them in the next step!

---

## Step 6: Create .env.local File

1. In your project root folder, create a file named `.env.local`
2. Open it in a text editor
3. Paste this template and fill in your values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
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

1. Go to: https://console.firebase.google.com/project/_/authentication/users
2. Click **"Add user"** button
3. Enter:
   - **Email:** `admin@contentcontest.ca` (or your preferred admin email)
   - **Password:** Create a strong password (save this somewhere safe!)
4. Click **"Add user"**

✅ You can now log in to `/admin/login` with these credentials!

---

## Step 8: Set Up Security Rules

### Firestore Security Rules

1. Go to: https://console.firebase.google.com/project/_/firestore/rules
2. Click on the **"Rules"** tab
3. Delete the existing test mode rules
4. Copy and paste the rules from `firestore.rules` file in your project
5. Click **"Publish"**

✅ Your database is now secured!

### Storage Security Rules

1. Go to: https://console.firebase.google.com/project/_/storage/rules
2. Click on the **"Rules"** tab
3. Delete the existing rules
4. Copy and paste the rules from `storage.rules` file in your project
5. Click **"Publish"**

✅ Your storage is now secured!

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

