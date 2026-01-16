# 🔥 Deploy Firestore Security Rules

## The Problem
Your Firestore rules are currently set to block everything:
```
allow read, write: if false;
```

This is why Firebase isn't working even if environment variables are set!

## ✅ Solution: Deploy New Rules

### Option 1: Using Firebase Console (Easiest)

1. **Go to Firestore Rules**
   - Visit: https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules

2. **Copy the Rules**
   - Open `firestore.rules` file in your project
   - Copy ALL the contents

3. **Paste in Firebase Console**
   - Delete the old rules (the `allow read, write: if false;` part)
   - Paste the new rules from `firestore.rules`
   - Click **"Publish"** button

4. **Verify**
   - Rules should show as "Published"
   - Wait a few seconds for them to take effect

### Option 2: Using Firebase CLI (If Installed)

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy rules
firebase deploy --only firestore:rules
```

---

## 📋 What the New Rules Do

The updated rules allow:

✅ **Public Access:**
- Read published blog posts
- Read active sponsors
- Read open/completed contests
- Create submissions (anyone can submit)
- Create volunteer applications (anyone can apply)

🔒 **Admin Only:**
- Write to blog posts (create/edit/delete)
- Write to sponsors (add/edit/delete)
- Write to contests (create/edit/delete)
- Read/update/delete submissions (admin review)
- Read/update/delete volunteers (admin review)
- All settings (admin only)

---

## 🚀 After Deploying Rules

1. **Test your site** - Firebase should work now!
2. **Try submitting** - Public can create submissions
3. **Try admin login** - Admin can manage everything

---

## 🔗 Direct Link

👉 **Firestore Rules:** https://console.firebase.google.com/project/content-contest-e86c7/firestore/rules

---

## ⚠️ Important Notes

- Rules take effect immediately after publishing
- No redeploy needed - rules are separate from your app code
- Make sure you're logged in as admin to test admin features

---

**After deploying these rules, your Firebase will work! 🎉**

