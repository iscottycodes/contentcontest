# ⚠️ URGENT: Add Firebase Environment Variables to Vercel

## The Problem
Your site is showing: **"Firebase is not configured. Please add environment variables."**

This is because `.env.local` only works locally. Production needs environment variables set in Vercel.

---

## 🚀 Quick Fix (5 minutes)

### Step 1: Go to Vercel
👉 **https://vercel.com/dashboard**

### Step 2: Find Your Project
- Look for `contentcontest` or `content-contest`
- Click on it

### Step 3: Go to Environment Variables
- Click **"Settings"** (top menu)
- Click **"Environment Variables"** (left sidebar)

### Step 4: Add These 6 Variables

Click **"Add New"** for each one:

#### Variable 1:
- **Key:** `NEXT_PUBLIC_FIREBASE_API_KEY`
- **Value:** `AIzaSyBw9efeWISHdYnu03Y-LS0LUYFgcI3xVSk`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 2:
- **Key:** `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- **Value:** `content-contest-e86c7.firebaseapp.com`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 3:
- **Key:** `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- **Value:** `content-contest-e86c7`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 4:
- **Key:** `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- **Value:** `content-contest-e86c7.firebasestorage.app`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 5:
- **Key:** `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- **Value:** `655967534424`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 6:
- **Key:** `NEXT_PUBLIC_FIREBASE_APP_ID`
- **Value:** `1:655967534424:web:2d34af7929b9f10d00392d`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

### Step 5: Redeploy
- Go to **"Deployments"** tab
- Find the latest deployment
- Click **"..."** (three dots menu)
- Click **"Redeploy"**
- Wait for it to finish (2-3 minutes)

---

## ✅ Verify It Works

After redeploy:
1. Visit your site
2. Check browser console (F12) - should see NO "Firebase not configured" errors
3. Try logging in at `/admin/login`

---

## 📸 Visual Guide

**Where to find it in Vercel:**
```
Dashboard → Your Project → Settings → Environment Variables
```

**What it looks like:**
- You'll see a list of environment variables (probably empty)
- Click "Add New" button
- Fill in Key and Value
- Select which environments (Production, Preview, Development)
- Click "Save"

---

## 🔗 Direct Link (if you're logged in)
👉 https://vercel.com/dashboard

Then: Your Project → Settings → Environment Variables

---

## ⚡ Quick Copy-Paste

If you want to add them all quickly, here's the format:

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyBw9efeWISHdYnu03Y-LS0LUYFgcI3xVSk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = content-contest-e86c7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = content-contest-e86c7
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = content-contest-e86c7.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 655967534424
NEXT_PUBLIC_FIREBASE_APP_ID = 1:655967534424:web:2d34af7929b9f10d00392d
```

Copy each line, paste into Vercel (Key = left side, Value = right side)

---

**This will fix the Firebase errors! 🎉**

