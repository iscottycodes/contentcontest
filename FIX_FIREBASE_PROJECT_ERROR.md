# 🔧 Fix "Project does not exist" Error

## The Error
```
The project does not exist or you do not have permission to list apps in the project
```

## Possible Causes

1. **Wrong Project ID** - The project ID in your config doesn't match your actual Firebase project
2. **No Access** - You're not logged into the correct Google account
3. **Project Deleted** - The Firebase project was deleted or renamed
4. **Wrong Account** - You're using a different Google account than the one that owns the project

---

## ✅ Solution Steps

### Step 1: Verify Your Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Make sure you're logged into the **correct Google account**

2. **Check Your Project**
   - Look for a project named `content-contest-e86c7` or similar
   - If you don't see it, you might need to:
     - Switch Google accounts
     - Create a new project
     - Get access from the project owner

3. **Get the Correct Project ID**
   - Click on your project
   - Go to **Settings** (gear icon) → **Project settings**
   - Look for **"Project ID"** - this is what you need

### Step 2: Verify Project ID in Your Config

Your current config uses:
- Project ID: `content-contest-e86c7`

**Check if this matches:**
1. Go to: https://console.firebase.google.com/project/content-contest-e86c7/settings/general
2. If you get an error, the project ID is wrong
3. If it loads, check the Project ID shown there

### Step 3: Update Environment Variables

If the Project ID is different, update it in:

**Local (.env.local):**
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-actual-project-id
```

**Vercel:**
- Go to Vercel → Your Project → Settings → Environment Variables
- Update `NEXT_PUBLIC_FIREBASE_PROJECT_ID` with the correct value
- Redeploy

### Step 4: Get All Config Values Again

If the project ID is wrong, you need to get ALL config values from Firebase:

1. Go to: https://console.firebase.google.com/
2. Select your **correct** Firebase project
3. Go to **Settings** (gear icon) → **Project settings**
4. Scroll to **"Your apps"** section
5. If no web app exists, click **"Add app"** → Web icon `</>`
6. Copy all 6 config values:
   - `apiKey`
   - `authDomain`
   - `projectId` ← **This is the one that's probably wrong**
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### Step 5: Update All Config

Update these in both places:

**1. Local (.env.local):**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**2. Vercel:**
- Go to Vercel → Your Project → Settings → Environment Variables
- Update all 6 variables with correct values
- Make sure ✅ Production is checked for each
- Redeploy

---

## 🔍 How to Find Your Correct Project

### Option 1: Check Firebase Console
1. Go to: https://console.firebase.google.com/
2. Look at the list of projects
3. Find the one you want to use
4. Click on it to see the Project ID

### Option 2: Check Project Settings
1. In Firebase Console, click on a project
2. Click **Settings** (gear icon) → **Project settings**
3. The **Project ID** is shown at the top

### Option 3: Create New Project (If Needed)
If you don't have access to the project:

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"** or **"Create a project"**
3. Name it: `contentcontest` (or your preferred name)
4. Follow the setup wizard
5. Get the new config values
6. Update your environment variables

---

## ✅ Quick Checklist

- [ ] Logged into correct Google account in Firebase Console
- [ ] Project exists and is accessible
- [ ] Project ID matches in all config files
- [ ] All 6 environment variables are correct
- [ ] Updated both `.env.local` AND Vercel
- [ ] Redeployed after updating Vercel variables

---

## 🔗 Direct Links to Check

- **Firebase Console:** https://console.firebase.google.com/
- **Project Settings:** https://console.firebase.google.com/project/_/settings/general
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 🆘 Still Not Working?

1. **Try a different browser** - Sometimes cache issues
2. **Log out and log back into Firebase** - Make sure you're on the right account
3. **Check if project was deleted** - Look in Firebase Console for all projects
4. **Create a new project** - If you can't access the old one, create a new Firebase project

---

**Once you have the correct Project ID and update all config, the error will be fixed! 🎉**

