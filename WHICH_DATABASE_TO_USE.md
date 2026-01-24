# 🔍 Which Firestore Database Should You Use?

## You Have Two Databases

From your Firebase Console, you have:
1. **(default)** - The standard default database
2. **contentcontest** - A custom named database

## Which One Should You Use?

### Option 1: Use "(default)" Database (Recommended)
- This is the standard database that most apps use
- The app is currently configured to use this
- **Best if:** You want to keep it simple and standard

### Option 2: Use "contentcontest" Database
- This is a custom named database you created
- You'd need to update the code to use this
- **Best if:** You specifically created this database for this project

## How to Check Which Database Has Your Data

1. **Check "(default)" database:**
   - Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/data
   - Click on "(default)" database
   - See if it has any collections

2. **Check "contentcontest" database:**
   - Go to: https://console.firebase.google.com/project/content-contest-e86c7/firestore/data
   - Click on "contentcontest" database
   - See if it has any collections

## How to Switch Databases

If you want to use the "contentcontest" database instead:

1. Edit `src/lib/firebase.ts`
2. Change this line:
   ```typescript
   db = getFirestore(app)
   ```
   To:
   ```typescript
   db = getFirestore(app, 'contentcontest')
   ```

## Recommendation

**Use the "(default)" database** unless you have a specific reason to use the "contentcontest" one. The default is simpler and more standard.

If both databases are empty, it doesn't matter which one you use - just pick one and stick with it!

---

**After choosing, make sure to:**
1. Update Firestore rules for the database you're using
2. Create collections in that database
3. Make sure your app connects to the right one

