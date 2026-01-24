# 🚨 URGENT: Fix Firestore Timeout Issue

## The Problem
You're getting timeouts when trying to create collections. This means **Firestore security rules are blocking writes**.

## ✅ Step-by-Step Fix

### Step 1: Verify Which Database You're Using

1. Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/databases
2. You should see **TWO databases**:
   - `(default)` 
   - `contentcontest`

3. **Check which one has data:**
   - Click on each database
   - Look at the Collections tab
   - Which one has collections? (or which one is empty?)

### Step 2: Update Rules for the CORRECT Database

**IMPORTANT:** You need to update rules for the database your app is using!

#### Option A: If using "(default)" database
1. Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules
2. Make sure it says **"(default)"** at the top
3. Replace ALL rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for blog posts (published only)
    match /blog_posts/{document=**} {
      allow read: if resource.data.status == 'published';
      allow write: if request.auth != null;
    }
    // Public read for active sponsors
    match /sponsors/{document=**} {
      allow read: if resource.data.status == 'active';
      allow write: if request.auth != null;
    }
    // Public read for contests (open or completed)
    match /contests/{document=**} {
      allow read: if resource.data.status == 'open' || resource.data.status == 'completed';
      allow write: if request.auth != null;
    }
    // Public write for submissions and volunteers
    match /submissions/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /volunteers/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    // Admin only for settings
    match /settings/{document=**} {
      allow read, write: if request.auth != null;
    }
    // Allow test collection
    match /test_collection/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Click **"Publish"** button
5. Wait for "Rules published successfully" message

#### Option B: If using "contentcontest" database
1. Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/databases
2. Click on **"contentcontest"** database
3. Go to **"Rules"** tab
4. Replace ALL rules with the same rules above
5. Click **"Publish"**

### Step 3: Verify Rules Are Published

1. After publishing, you should see:
   - ✅ "Rules published successfully"
   - ✅ A timestamp showing when rules were last published
   - ✅ The rules you just pasted

2. **If you see an error:**
   - Check for syntax errors (missing commas, brackets, etc.)
   - Make sure you copied the ENTIRE rules block

### Step 4: Test Again

1. Go to: `/admin/test-firebase`
2. Click **"Test Firebase Write"**
3. Check the console for:
   - ✅ Success message with document ID
   - ❌ Error message (if still failing)

### Step 5: Check Network Tab (If Still Failing)

1. Open DevTools (F12)
2. Go to **Network** tab
3. Filter by: `firestore`
4. Try creating a collection again
5. Look for a request with status:
   - **403** = Permission denied (rules still blocking)
   - **200** = Success!
   - **404** = Database not found

## 🔍 Common Issues

### Issue 1: Rules Not Published
**Symptom:** Rules look correct but writes still fail
**Fix:** Make sure you clicked "Publish" and see "Rules published successfully"

### Issue 2: Wrong Database
**Symptom:** Rules updated but app still can't write
**Fix:** Check which database your app uses (check `src/lib/firebase.ts`) and update rules for THAT database

### Issue 3: Database Not Created
**Symptom:** 404 errors
**Fix:** Go to Firestore Console and create the database if it doesn't exist

## 🎯 Quick Check

**Answer these questions:**
1. Which database are you updating rules for? `(default)` or `contentcontest`?
2. Did you click "Publish" after updating rules?
3. Do you see "Rules published successfully" message?
4. What status code do you see in Network tab? (403, 200, 404)

**Share your answers and I'll help you fix it!**

