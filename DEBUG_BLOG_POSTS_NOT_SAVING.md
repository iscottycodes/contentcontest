# 🔍 Debug: Blog Posts Not Saving to Firestore

## The Problem
You're creating blog posts but they're not appearing in the `blog_posts` collection in Firebase.

## ✅ Step-by-Step Debugging

### Step 1: Check Collection Name
The collection should be named: **`blog_posts`** (with underscore)

👉 **Check in Firebase Console:**
- Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/data
- Look for collection: **`blog_posts`** (not `blogPosts` or `blog-posts`)

### Step 2: Verify You're Logged In
**CRITICAL:** You MUST be logged in to create blog posts!

- Check top right of admin panel - should show your email
- If not logged in, go to `/admin/login` and sign in
- Firestore rules require: `allow write: if request.auth != null;`

### Step 3: Check Browser Console
1. Open browser console (F12)
2. Try to create a blog post
3. Look for these messages:
   - ✅ "Form submitted!"
   - ✅ "Saving blog post..."
   - ❌ Any error messages

**Common Errors:**
- `Firebase not configured` → Environment variables not set
- `Permission denied` → Not logged in OR Firestore rules blocking
- `Missing or insufficient permissions` → Firestore rules issue

### Step 4: Check Firestore Rules
Your rules should allow authenticated writes:

```javascript
match /blog_posts/{document=**} {
  allow read: if resource.data.status == 'published';
  allow write: if request.auth != null;  // ← This allows logged-in users to write
}
```

👉 **Verify in Firebase Console:**
- Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules
- Make sure rules match above
- Click **"Publish"** if you made changes

### Step 5: Check Firebase Configuration
Make sure environment variables are set:

1. **Local:** Check `.env.local` file exists
2. **Production:** Check Vercel environment variables

👉 **Test:** Visit `/test-env` or `/setup-status` to see if variables are set

### Step 6: Try Creating a Post with Console Open
1. Open browser console (F12)
2. Go to `/admin/blog`
3. Click "New Post"
4. Fill in the form
5. Click "Publish"
6. Watch the console for:
   - "Form submitted!"
   - "Form data: ..."
   - "Saving blog post..."
   - Any error messages

### Step 7: Check Network Tab
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Filter by "firestore" or "googleapis"
4. Try creating a blog post
5. Look for:
   - ✅ POST requests to Firestore (should be green/200)
   - ❌ Failed requests (red/4xx or 5xx)

---

## 🔧 Quick Fixes

### Fix 1: Make Sure You're Logged In
```bash
# Go to /admin/login
# Sign in with your admin credentials
# Then try creating a post again
```

### Fix 2: Update Firestore Rules
If rules are blocking, update them:

1. Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules
2. Make sure you have:
   ```javascript
   match /blog_posts/{document=**} {
     allow read: if resource.data.status == 'published';
     allow write: if request.auth != null;
   }
   ```
3. Click **"Publish"**

### Fix 3: Check Environment Variables
Make sure all 6 Firebase variables are set in Vercel:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

---

## 🐛 Common Issues

### Issue 1: "Permission denied"
**Cause:** Not logged in OR Firestore rules blocking
**Fix:** 
- Make sure you're logged in at `/admin/login`
- Check Firestore rules allow `request.auth != null`

### Issue 2: "Firebase not configured"
**Cause:** Environment variables not set
**Fix:** Add variables to Vercel and redeploy

### Issue 3: Posts save but don't appear
**Cause:** Looking at wrong collection or wrong project
**Fix:** 
- Check collection name: `blog_posts` (with underscore)
- Make sure you're in the correct Firebase project

### Issue 4: No errors but nothing saves
**Cause:** Form submission not working
**Fix:** 
- Check browser console for errors
- Make sure form has `onSubmit={handleSubmit}`
- Check that `addBlogPost` function is being called

---

## 📋 Checklist

Before creating a post, verify:
- [ ] You're logged in (check top right of admin panel)
- [ ] Firebase environment variables are set
- [ ] Firestore rules allow authenticated writes
- [ ] Browser console shows no errors
- [ ] You're looking at the correct collection: `blog_posts`
- [ ] You're in the correct Firebase project

---

## 🔗 Direct Links

- **Firestore Data:** https://console.firebase.google.com/project/content-contest-e86c7/firestore/data
- **Firestore Rules:** https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules
- **Authentication Users:** https://console.firebase.google.com/project/content-contest-e86c7/authentication/users
- **Setup Status:** `/setup-status` (on your site)

---

**After checking these, try creating a post again and let me know what errors you see in the console!**

