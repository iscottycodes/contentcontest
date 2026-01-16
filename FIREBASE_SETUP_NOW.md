# 🚀 Firebase Setup - Quick Start

## What You Need to Do

### 1. **Create Firebase Project** (5 minutes)
👉 https://console.firebase.google.com/
- Click "Add project"
- Name it: `contentcontest`
- Follow the wizard

### 2. **Enable Services** (5 minutes)

**Authentication:**
👉 https://console.firebase.google.com/project/_/authentication/providers
- Enable "Email/Password"

**Firestore:**
👉 https://console.firebase.google.com/project/_/firestore
- Click "Create database"
- Choose "Start in test mode"
- Select location (e.g., `us-central`)

**Storage:**
👉 https://console.firebase.google.com/project/_/storage
- Click "Get started"
- Select same location as Firestore

### 3. **Get Config Values** (2 minutes)
👉 https://console.firebase.google.com/project/_/settings/general
- Scroll to "Your apps"
- Click "Add app" → Web icon `</>`
- Register app
- **Copy the 6 config values**

### 4. **Create .env.local File**

After you get your config values, I'll help you create the `.env.local` file.

**Template:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 5. **Create Admin User** (1 minute)
👉 https://console.firebase.google.com/project/_/authentication/users
- Click "Add user"
- Email: `admin@contentcontest.ca`
- Password: (create strong password)

### 6. **Deploy Security Rules** (2 minutes)

**Firestore Rules:**
👉 https://console.firebase.google.com/project/_/firestore/rules
- Copy rules from `firestore.rules` file
- Paste and click "Publish"

**Storage Rules:**
👉 https://console.firebase.google.com/project/_/storage/rules
- Copy rules from `storage.rules` file
- Paste and click "Publish"

### 7. **Restart Dev Server**
```bash
npm run dev
```

---

## ✅ After Setup

1. Test login: http://localhost:3000/admin/login
2. Validate config: `npm run validate-firebase`

---

## 📖 Full Guide

See `FIREBASE_CONFIGURATION_GUIDE.md` for detailed instructions.

