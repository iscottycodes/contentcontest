# 🔥 Add Firebase Variables to Vercel - Step by Step

## ⚠️ Your Error
```
Error: Firebase not configured
```

This means Vercel doesn't have your Firebase environment variables.

---

## 📋 Step-by-Step Instructions

### Step 1: Open Vercel Dashboard
1. Go to: **https://vercel.com/dashboard**
2. Sign in if needed

### Step 2: Find Your Project
- Look for a project named `contentcontest` or similar
- **Click on the project name** (not the settings icon, click the project itself)

### Step 3: Go to Settings
- Look at the **top menu bar** (under your project name)
- Click **"Settings"**

### Step 4: Open Environment Variables
- In the **left sidebar**, look for **"Environment Variables"**
- Click it

### Step 5: Add First Variable
1. Click the **"Add New"** button (usually top right)
2. You'll see a form with:
   - **Key** (text input)
   - **Value** (text input)
   - **Environments** (checkboxes)

3. Fill in:
   - **Key:** `NEXT_PUBLIC_FIREBASE_API_KEY`
   - **Value:** `AIzaSyBw9efeWISHdYnu03Y-LS0LUYFgcI3xVSk`
   - **Environments:** Check ✅ **Production**, ✅ **Preview**, ✅ **Development**

4. Click **"Save"**

### Step 6: Add Remaining 5 Variables
Repeat Step 5 for each of these:

**Variable 2:**
- Key: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- Value: `content-contest-e86c7.firebaseapp.com`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**Variable 3:**
- Key: `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- Value: `content-contest-e86c7`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**Variable 4:**
- Key: `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- Value: `content-contest-e86c7.firebasestorage.app`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**Variable 5:**
- Key: `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- Value: `655967534424`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**Variable 6:**
- Key: `NEXT_PUBLIC_FIREBASE_APP_ID`
- Value: `1:655967534424:web:2d34af7929b9f10d00392d`
- Environments: ✅ Production, ✅ Preview, ✅ Development

### Step 7: Verify All Variables Are Added
You should see **6 variables** in the list:
- ✅ NEXT_PUBLIC_FIREBASE_API_KEY
- ✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- ✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
- ✅ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- ✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- ✅ NEXT_PUBLIC_FIREBASE_APP_ID

### Step 8: Redeploy (CRITICAL!)
**This is the most important step!**

1. Click **"Deployments"** tab (top menu)
2. Find the **latest deployment** (top of the list)
3. Click the **"..."** (three dots) menu on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again
6. **Wait 2-3 minutes** for it to finish

### Step 9: Test
1. Visit your site
2. Open browser console (F12)
3. Should see **NO** "Firebase not configured" errors
4. Try logging in at `/admin/login`

---

## ✅ Checklist

Before redeploying, verify:
- [ ] All 6 variables are in the list
- [ ] Each variable has ✅ Production checked
- [ ] Values are correct (no typos)
- [ ] No extra spaces in Key or Value fields

---

## 🐛 Common Mistakes

1. **Forgot to check "Production"** - Variables won't be available in production
2. **Typos in Key name** - Must be exact: `NEXT_PUBLIC_FIREBASE_API_KEY`
3. **Extra spaces** - Make sure no spaces before/after values
4. **Didn't redeploy** - Variables only apply to NEW deployments
5. **Added to wrong project** - Make sure you're in the right Vercel project

---

## 🔍 How to Verify Variables Are Set

After redeploying, you can check:
1. Go to your deployment
2. Click on it
3. Look for "Environment Variables" section
4. Should show all 6 variables

---

## 📞 Still Not Working?

If you've added variables and redeployed but still see errors:

1. **Double-check variable names** - They must be EXACT:
   - `NEXT_PUBLIC_FIREBASE_API_KEY` (not `FIREBASE_API_KEY`)
   - All start with `NEXT_PUBLIC_`

2. **Check Production checkbox** - Must be checked ✅

3. **Verify redeploy completed** - Look for green checkmark

4. **Clear browser cache** - Hard refresh (Ctrl+Shift+R)

5. **Check deployment logs** - Look for any errors during build

---

## 🎯 Quick Reference

**Direct path in Vercel:**
```
Dashboard → Your Project → Settings → Environment Variables → Add New
```

**After adding:**
```
Deployments → Latest → ... → Redeploy
```

---

**Once you complete these steps, Firebase will work! 🚀**

