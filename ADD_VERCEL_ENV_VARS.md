# 🚀 Add Firebase Environment Variables to Vercel

## Quick Steps:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Find your project: `contentcontest`

2. **Go to Settings → Environment Variables**
   - Click on your project
   - Click **Settings** in the top menu
   - Click **Environment Variables** in the left sidebar

3. **Add All 6 Variables** (Click "Add New" for each one):

   **Variable 1:**
   - Key: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Value: `AIzaSyBw9efeWISHdYnu03Y-LS0LUYFgcI3xVSk`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

   **Variable 2:**
   - Key: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - Value: `content-contest-e86c7.firebaseapp.com`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

   **Variable 3:**
   - Key: `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - Value: `content-contest-e86c7`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

   **Variable 4:**
   - Key: `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - Value: `content-contest-e86c7.firebasestorage.app`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

   **Variable 5:**
   - Key: `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - Value: `655967534424`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

   **Variable 6:**
   - Key: `NEXT_PUBLIC_FIREBASE_APP_ID`
   - Value: `1:655967534424:web:2d34af7929b9f10d00392d`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

4. **Redeploy Your Site**
   - Go to **Deployments** tab
   - Find the latest deployment
   - Click the **"..."** menu (three dots)
   - Click **"Redeploy"**
   - Or just push a new commit to trigger redeploy

## ✅ After Adding Variables

Wait for the redeploy to complete, then:
- Visit your site: https://contentcontest.vercel.app
- Try logging in at `/admin/login`
- Check browser console (F12) - should see no "Firebase not configured" errors

## 🔗 Direct Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Project Settings:** https://vercel.com/dashboard (then select your project → Settings → Environment Variables)

