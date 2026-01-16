# 🔧 Fix Deployment Issues

You're seeing two errors on your deployed site:

## Issue 1: Firebase Not Configured ❌

**Error:** `Login error: Error: Firebase not configured`

**Solution:** Add environment variables to Vercel

👉 **See: `ADD_VERCEL_ENV_VARS.md`** for step-by-step instructions

**Quick Steps:**
1. Go to: https://vercel.com/dashboard
2. Select your project → Settings → Environment Variables
3. Add all 6 Firebase variables (see ADD_VERCEL_ENV_VARS.md)
4. Redeploy your site

---

## Issue 2: Missing Icon Files ❌

**Error:** `Failed to load resource: the server responded with a status of 404 () /icon-192.png`

**Solution:** Create icon files in the `public` folder

### Option 1: Quick Fix (Temporary)
Create simple placeholder icons:

1. Create two PNG files:
   - `public/icon-192.png` (192x192 pixels)
   - `public/icon-512.png` (512x512 pixels)

2. You can use:
   - Any image editor (even Paint)
   - Online tool: https://realfavicongenerator.net/
   - Canva or similar design tool

3. Use your brand colors:
   - Background: #166534 (pine green)
   - Or any simple colored square for now

### Option 2: Professional Icons
Use a favicon generator:
- https://realfavicongenerator.net/
- Upload your logo
- Download all sizes
- Place in `public` folder

### Option 3: Remove Icons (Temporary)
If you want to remove the errors temporarily, edit `src/app/manifest.ts` and comment out the icons section:

```typescript
icons: [
  // Temporarily disabled - add icons later
  // {
  //   src: '/icon-192.png',
  //   sizes: '192x192',
  //   type: 'image/png',
  // },
  // {
  //   src: '/icon-512.png',
  //   sizes: '512x512',
  //   type: 'image/png',
  // },
],
```

---

## Priority Fix Order

1. **FIRST:** Add Firebase environment variables to Vercel (critical - breaks login)
2. **SECOND:** Add icon files (cosmetic - doesn't break functionality)

---

## After Fixing

1. Commit and push changes:
   ```bash
   git add .
   git commit -m "Add icon placeholders and deployment fixes"
   git push
   ```

2. Wait for Vercel to redeploy

3. Test your site:
   - Visit: https://contentcontest.vercel.app
   - Try admin login
   - Check browser console (F12) for errors

---

## Need Help?

- **Firebase setup:** See `ADD_VERCEL_ENV_VARS.md`
- **Icon creation:** See `public/README.md`

