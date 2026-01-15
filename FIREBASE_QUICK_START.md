# 🚀 Firebase Quick Start - Copy & Paste Links

## Step-by-Step with Direct Links

### 1️⃣ Create Project
👉 https://console.firebase.google.com/
- Click "Add project"
- Name: `contentcontest`
- Click through setup

---

### 2️⃣ Enable Authentication
👉 https://console.firebase.google.com/project/_/authentication/providers
- Click "Email/Password"
- Toggle "Enable" ON
- Click "Save"

---

### 3️⃣ Create Firestore Database
👉 https://console.firebase.google.com/project/_/firestore
- Click "Create database"
- Choose "Start in test mode"
- Select location (e.g., `us-central`)
- Click "Enable"

---

### 4️⃣ Enable Storage
👉 https://console.firebase.google.com/project/_/storage
- Click "Get started"
- Click "Next"
- Select location (same as Firestore)
- Click "Done"

---

### 5️⃣ Get Config Values
👉 https://console.firebase.google.com/project/_/settings/general
- Scroll to "Your apps"
- Click "Add app" → Web icon `</>`
- Register app
- Copy the 6 config values

---

### 6️⃣ Create .env.local File

In your project root, create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=PASTE_YOUR_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=PASTE_YOUR_AUTH_DOMAIN_HERE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=PASTE_YOUR_PROJECT_ID_HERE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=PASTE_YOUR_STORAGE_BUCKET_HERE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=PASTE_YOUR_SENDER_ID_HERE
NEXT_PUBLIC_FIREBASE_APP_ID=PASTE_YOUR_APP_ID_HERE
```

---

### 7️⃣ Create Admin User
👉 https://console.firebase.google.com/project/_/authentication/users
- Click "Add user"
- Email: `admin@contentcontest.ca`
- Password: (create strong password)
- Click "Add user"

---

### 8️⃣ Set Firestore Rules
👉 https://console.firebase.google.com/project/_/firestore/rules

**Copy & paste these rules:**

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

Click **"Publish"**

---

### 9️⃣ Set Storage Rules
👉 https://console.firebase.google.com/project/_/storage/rules

**Copy & paste these rules:**

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

Click **"Publish"**

---

### 🔟 Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

Then test: http://localhost:3000/admin/login

---

## ✅ Done!

Your Firebase is now fully set up! The database collections will be created automatically when you:
- Submit a contest entry
- Create a blog post
- Add a sponsor
- etc.

No need to manually create collections - they're created on first use!
