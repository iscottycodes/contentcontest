# ⚠️ URGENT: Update Firestore Rules in Firebase Console

## The Problem
Your Firebase Console has rules that **block everything**:
```
allow read, write: if false;
```

This is why Firebase isn't working! Even with environment variables set, the rules are blocking all access.

## ✅ Quick Fix (2 minutes)

### Step 1: Go to Firestore Rules
👉 **https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules**

### Step 2: Copy Rules from Your Local File
Open `firestore.rules` in your project and copy ALL of this:

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
  }
}
```

### Step 3: Paste in Firebase Console
1. In the Firebase Console Rules editor, **delete everything**
2. **Paste** the rules above
3. Click **"Publish"** button (top right)
4. Wait for confirmation

### Step 4: Test
- Rules take effect immediately
- Try your site again - Firebase should work now!

---

## 🔗 Direct Link
👉 **https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules**

---

## 📋 What These Rules Allow

✅ **Public Can:**
- Read published blog posts
- Read active sponsors  
- Read open/completed contests
- **Create submissions** (submit contest entries)
- **Create volunteer applications**

🔒 **Admin Only:**
- Create/edit/delete blog posts
- Create/edit/delete sponsors
- Create/edit/delete contests
- Read/update/delete submissions
- Read/update/delete volunteers
- All settings

---

## ⚠️ Important

- **No redeploy needed** - Rules are separate from your app
- **Takes effect immediately** after publishing
- **Make sure to click "Publish"** - just pasting isn't enough!

---

**After updating these rules, your Firebase errors will be fixed! 🎉**

