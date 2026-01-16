# ⚠️ DO THIS NOW - Fix Firebase Error

## The Error
```
Error: Firebase not configured
```

## The Problem
Environment variables are NOT set in Vercel.

## ✅ SOLUTION (5 minutes)

### Step 1: Open Vercel
👉 **https://vercel.com/dashboard**

### Step 2: Click Your Project
- Find `contentcontest` or similar
- **Click on the project name**

### Step 3: Go to Settings → Environment Variables
- Click **"Settings"** (top menu)
- Click **"Environment Variables"** (left sidebar)

### Step 4: Add These 6 Variables

Click **"Add New"** for EACH one:

**1.**
- Key: `NEXT_PUBLIC_FIREBASE_API_KEY`
- Value: `AIzaSyBw9efeWISHdYnu03Y-LS0LUYFgcI3xVSk`
- Check: ✅ Production ✅ Preview ✅ Development
- Click **Save**

**2.**
- Key: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- Value: `content-contest-e86c7.firebaseapp.com`
- Check: ✅ Production ✅ Preview ✅ Development
- Click **Save**

**3.**
- Key: `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- Value: `content-contest-e86c7`
- Check: ✅ Production ✅ Preview ✅ Development
- Click **Save**

**4.**
- Key: `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- Value: `content-contest-e86c7.firebasestorage.app`
- Check: ✅ Production ✅ Preview ✅ Development
- Click **Save**

**5.**
- Key: `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- Value: `655967534424`
- Check: ✅ Production ✅ Preview ✅ Development
- Click **Save**

**6.**
- Key: `NEXT_PUBLIC_FIREBASE_APP_ID`
- Value: `1:655967534424:web:2d34af7929b9f10d00392d`
- Check: ✅ Production ✅ Preview ✅ Development
- Click **Save**

### Step 5: REDEPLOY (CRITICAL!)
1. Click **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

### Step 6: Test
- Visit your site
- Error should be gone!

---

## ✅ Checklist

Before redeploying, verify:
- [ ] All 6 variables added
- [ ] Each has ✅ Production checked
- [ ] No typos in Key names
- [ ] Values are correct
- [ ] Clicked "Save" for each

---

## 🔗 Direct Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **After clicking project:** Settings → Environment Variables

---

## 🐛 Still Not Working?

1. **Verify variables are there:**
   - Go to Deployments → Latest → Should show env vars

2. **Check Production checkbox:**
   - Must be ✅ for Production

3. **Make sure you redeployed:**
   - Variables only apply to NEW deployments

4. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R

---

**This will fix it! 🚀**

