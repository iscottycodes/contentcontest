# 🔧 Add Firebase Environment Variables to Production

Your Firebase config works locally but needs to be added to your hosting platform for production.

## Your Firebase Config Values

Use these values (from your `.env.local`):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBw9efeWISHdYnu03Y-LS0LUYFgcI3xVSk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=content-contest-e86c7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=content-contest-e86c7
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=content-contest-e86c7.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=655967534424
NEXT_PUBLIC_FIREBASE_APP_ID=1:655967534424:web:2d34af7929b9f10d00392d
```

---

## Option 1: Vercel (Most Common for Next.js)

### Steps:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Find your project: `contentcontest`

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** → **Environment Variables**

3. **Add Each Variable**
   - Click **"Add New"**
   - Add each variable one by one:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBw9efeWISHdYnu03Y-LS0LUYFgcI3xVSk` |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `content-contest-e86c7.firebaseapp.com` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `content-contest-e86c7` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `content-contest-e86c7.firebasestorage.app` |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `655967534424` |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:655967534424:web:2d34af7929b9f10d00392d` |

4. **Set Environment**
   - For each variable, select:
     - ✅ **Production**
     - ✅ **Preview** (optional, for pull requests)
     - ✅ **Development** (optional)

5. **Redeploy**
   - After adding all variables, go to **Deployments**
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger a new deployment

---

## Option 2: Netlify

1. Go to: https://app.netlify.com/
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Add all 6 variables (same as above)
5. Click **"Save"**
6. Trigger a new deploy

---

## Option 3: Firebase Hosting

If using Firebase Hosting:

1. Go to: https://console.firebase.google.com/project/content-contest-e86c7/hosting
2. Use Firebase CLI to set environment variables
3. Or configure in `firebase.json`

---

## Option 4: Other Platforms

For any other hosting platform:
1. Find the **Environment Variables** or **Config Vars** section
2. Add all 6 `NEXT_PUBLIC_FIREBASE_*` variables
3. Redeploy your application

---

## ✅ Verify It's Working

After adding variables and redeploying:

1. **Check the deployed site**
   - Try logging in at `/admin/login`
   - Check browser console (F12) for errors
   - Look for "Firebase not configured" errors

2. **Test Firebase Features**
   - Submit a test entry
   - Try admin login
   - Check if data appears in Firestore

3. **Common Issues**
   - **Still not working?** Make sure you redeployed after adding variables
   - **Variables not showing?** Check spelling (must be exact: `NEXT_PUBLIC_FIREBASE_API_KEY`)
   - **Build fails?** Check that all 6 variables are set

---

## 🔗 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **Your Firebase Project:** https://console.firebase.google.com/project/content-contest-e86c7

---

## 📝 Quick Copy-Paste for Vercel

If you're using Vercel, you can add these all at once:

1. Go to: **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Copy and paste each:

```
NEXT_PUBLIC_FIREBASE_API_KEY
AIzaSyBw9efeWISHdYnu03Y-LS0LUYFgcI3xVSk

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
content-contest-e86c7.firebaseapp.com

NEXT_PUBLIC_FIREBASE_PROJECT_ID
content-contest-e86c7

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
content-contest-e86c7.firebasestorage.app

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
655967534424

NEXT_PUBLIC_FIREBASE_APP_ID
1:655967534424:web:2d34af7929b9f10d00392d
```

4. Make sure to select **Production**, **Preview**, and **Development** for each
5. Click **"Save"** after each one
6. **Redeploy** your site

---

**After adding these, your Firebase will work in production! 🎉**

