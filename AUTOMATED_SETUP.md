# 🚀 Automated Firebase Setup

This guide uses automated scripts to make Firebase setup as easy as possible!

## Quick Start

### Option 1: Interactive Setup (Recommended)

```bash
npm run setup-firebase
```

This will:
- ✅ Check if `.env.local` exists
- ✅ Guide you through entering Firebase config values
- ✅ Create `.env.local` automatically
- ✅ Show you next steps

### Option 2: Manual Setup

1. Copy the example file:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and fill in your Firebase config values from:
   https://console.firebase.google.com/project/_/settings/general

3. Validate your setup:
   ```bash
   npm run validate-firebase
   ```

## Complete Setup Steps

### 1. Run Setup Script

```bash
npm run setup-firebase
```

Follow the prompts to enter your Firebase configuration values.

### 2. Create Firebase Project (Manual - Browser Required)

👉 **Direct Link:** https://console.firebase.google.com/

1. Click **"Add project"**
2. Enter project name: `contentcontest`
3. Follow the prompts to create the project

### 3. Enable Authentication

👉 **Direct Link:** https://console.firebase.google.com/project/_/authentication

1. Click **"Get started"**
2. Go to **"Sign-in method"** tab
3. Enable **"Email/Password"**
4. Click **"Save"**

### 4. Create Firestore Database

👉 **Direct Link:** https://console.firebase.google.com/project/_/firestore

1. Click **"Create database"**
2. Choose **"Start in test mode"**
3. Select location (e.g., `us-central` for North America)
4. Click **"Enable"**

### 5. Enable Storage

👉 **Direct Link:** https://console.firebase.google.com/project/_/storage

1. Click **"Get started"**
2. Choose same location as Firestore
3. Click **"Done"**

### 6. Create Admin User

👉 **Direct Link:** https://console.firebase.google.com/project/_/authentication/users

1. Click **"Add user"**
2. Enter email: `admin@contentcontest.ca`
3. Enter a strong password
4. Click **"Add user"**

### 7. Deploy Security Rules (Automated!)

**Option A: Using Firebase CLI (Recommended)**

First, install Firebase CLI if you haven't:
```bash
npm install -g firebase-tools
```

Then login and initialize:
```bash
firebase login
firebase use --add
# Select your project when prompted
```

Deploy the rules:
```bash
npm run firebase:deploy-rules
```

**Option B: Manual (Copy & Paste)**

👉 **Firestore Rules:** https://console.firebase.google.com/project/_/firestore/rules
- Copy contents from `firestore.rules`
- Paste into Firestore Rules editor
- Click **"Publish"**

👉 **Storage Rules:** https://console.firebase.google.com/project/_/storage/rules
- Copy contents from `storage.rules`
- Paste into Storage Rules editor
- Click **"Publish"**

### 8. Validate Configuration

```bash
npm run validate-firebase
```

This checks that all environment variables are properly set.

### 9. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000/admin/login

## Available Scripts

- `npm run setup-firebase` - Interactive setup wizard
- `npm run validate-firebase` - Validate Firebase configuration
- `npm run firebase:deploy-rules` - Deploy security rules to Firebase
- `npm run firebase:init` - Initialize Firebase CLI in project

## Files Created

- `firestore.rules` - Firestore security rules
- `storage.rules` - Storage security rules
- `firebase.json` - Firebase CLI configuration
- `.env.local` - Your Firebase config (created by setup script)

## Troubleshooting

### "Firebase not configured" error

Run the validator:
```bash
npm run validate-firebase
```

This will tell you exactly what's missing.

### Can't deploy rules

Make sure Firebase CLI is installed and you're logged in:
```bash
npm install -g firebase-tools
firebase login
```

### Environment variables not loading

1. Make sure file is named `.env.local` (not `.env`)
2. Restart your dev server after creating/updating `.env.local`
3. Check for typos in variable names

## What's Automated vs Manual

### ✅ Automated
- Creating `.env.local` file
- Validating configuration
- Deploying security rules (with Firebase CLI)
- Checking setup status

### ⚠️ Manual (Browser Required)
- Creating Firebase project
- Enabling Authentication
- Creating Firestore database
- Enabling Storage
- Creating admin user
- Getting Firebase config values

The manual steps require browser interaction with Firebase Console, but the scripts guide you through everything!

## Next Steps

After setup is complete:

1. ✅ Test admin login at `/admin/login`
2. ✅ Submit a test entry at `/submit`
3. ✅ Create a test blog post at `/admin/blog`
4. ✅ Add a test sponsor at `/admin/sponsors`

Everything should work now! 🎉
