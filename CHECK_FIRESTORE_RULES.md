# 🔍 Check Your Firestore Rules - Step by Step

## The Problem
You're still getting timeouts even after updating rules. Let's verify everything is correct.

## ✅ Step-by-Step Verification

### Step 1: Check Which Database You're Using
The app is currently using the **(default)** database.

### Step 2: Go to Rules for Default Database
👉 **https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules**

**Make sure you see:**
- Database name shows "(default)" at the top
- If you see "contentcontest", click on "(default)" first

### Step 3: Check Current Rules
Look at what's in the rules editor. It should match this EXACTLY:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blog_posts/{document=**} {
      allow read: if resource.data.status == 'published';
      allow write: if request.auth != null;
    }
    match /sponsors/{document=**} {
      allow read: if resource.data.status == 'active';
      allow write: if request.auth != null;
    }
    match /contests/{document=**} {
      allow read: if resource.data.status == 'open' || resource.data.status == 'completed';
      allow write: if request.auth != null;
    }
    match /submissions/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /volunteers/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /settings/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /test_collection/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Step 4: Verify Rules Are Published
- Look for "Published" status (usually green checkmark)
- Check the timestamp - should be recent (within last few minutes)
- If it says "Not published" or shows old timestamp, click "Publish" again

### Step 5: Check Both Databases
Since you have two databases, check rules for BOTH:

1. **(default) database rules:**
   - https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules
   - Should have the rules above

2. **contentcontest database rules:**
   - Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/data
   - Click on "contentcontest" database
   - Then go to Rules tab
   - Should also have the rules above

---

## 🔧 Alternative: Use contentcontest Database

If the default database isn't working, we can switch to the "contentcontest" database:

1. I'll update the code to use "contentcontest" database
2. You update rules for "contentcontest" database
3. Test again

---

## 🐛 Debug Steps

1. **Open browser console (F12)**
2. **Go to Network tab**
3. **Filter by "firestore"**
4. **Try creating a collection**
5. **Look for the Firestore request:**
   - Should see a POST request
   - Check the response - what status code?
   - Check the response body - what error message?

6. **Check Firebase Console:**
   - Go to Firestore → Data
   - Do you see any collections?
   - Which database are you looking at?

---

## ⚠️ Common Issues

### Issue 1: Rules Not Published
**Symptom:** Rules look correct but still timing out
**Fix:** Click "Publish" button again

### Issue 2: Wrong Database
**Symptom:** Updated rules but app still can't write
**Fix:** Make sure you're updating rules for "(default)" database

### Issue 3: Rules Have Syntax Error
**Symptom:** Can't publish rules
**Fix:** Check for typos, make sure all brackets match

---

**Please check:**
1. Which database the rules page shows (should be "(default)")
2. If rules are published (green checkmark)
3. What the Network tab shows when you try to create a collection

Share what you find!

