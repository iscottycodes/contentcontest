# 🚀 Quick Start Guide - Launch Preparation

This guide will help you get ContentContest.ca ready for launch in 2 days.

## Day 1: Setup & Configuration

### Morning (2-3 hours)

1. **Firebase Production Setup**
   ```bash
   # 1. Go to Firebase Console: https://console.firebase.google.com
   # 2. Create a NEW project for production (or use existing)
   # 3. Enable these services:
   #    - Authentication → Email/Password
   #    - Firestore Database → Create in production mode
   #    - Storage → Get started
   # 4. Copy your Firebase config
   ```

2. **Environment Variables**
   ```bash
   # Create .env.local file
   cp env.example .env.local
   
   # Edit .env.local and add your Firebase credentials
   # Get these from: Firebase Console > Project Settings > General > Your apps
   ```

3. **Firebase Security Rules**
   - Go to Firestore Database → Rules
   - Copy rules from README.md (lines 91-123)
   - Go to Storage → Rules  
   - Copy rules from README.md (lines 128-149)

4. **Create Admin User**
   ```bash
   # In Firebase Console:
   # Authentication → Users → Add user
   # Create your admin account email/password
   ```

### Afternoon (2-3 hours)

5. **Test Locally**
   ```bash
   # Install dependencies (if not done)
   npm install
   
   # Run development server
   npm run dev
   
   # Test these critical paths:
   # - http://localhost:3000 (homepage)
   # - http://localhost:3000/submit (submission form)
   # - http://localhost:3000/admin/login (admin login)
   ```

6. **Production Build Test**
   ```bash
   # Test production build
   npm run build
   
   # If build succeeds, test locally
   npm start
   
   # Visit http://localhost:3000 and test everything
   ```

7. **Fix Any Build Errors**
   ```bash
   # Check for TypeScript errors
   npm run type-check
   
   # Check for linting errors
   npm run lint
   
   # Fix any issues found
   ```

## Day 2: Deployment & Launch

### Morning (2-3 hours)

8. **Choose Hosting Platform** (Recommended: Vercel)

   **Option A: Vercel (Recommended)**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   
   # Follow prompts:
   # - Link to existing project or create new
   # - Add environment variables
   # - Deploy
   ```

   **Option B: Other Platforms**
   - Follow platform-specific deployment guides
   - Make sure to set all environment variables
   - Configure custom domain

9. **Configure Domain**
   - Point DNS to your hosting provider
   - Wait for DNS propagation (can take up to 24 hours)
   - SSL certificate will be auto-generated

10. **Set Environment Variables in Hosting**
    - Add all `NEXT_PUBLIC_FIREBASE_*` variables
    - Redeploy after adding variables

### Afternoon (2-3 hours)

11. **Final Testing**
    ```bash
    # Test production site:
    # - All pages load correctly
    # - Forms submit successfully
    # - File uploads work
    # - Admin login works
    # - Mobile responsiveness
    ```

12. **SEO Setup**
    - Verify sitemap: `https://yourdomain.com/sitemap.xml`
    - Verify robots.txt: `https://yourdomain.com/robots.txt`
    - Create Open Graph image (1200x630px) → save as `public/og-image.jpg`
    - Submit sitemap to Google Search Console

13. **Go Live Checklist**
    - [ ] Production site accessible
    - [ ] All forms working
    - [ ] Admin dashboard accessible
    - [ ] Test submission end-to-end
    - [ ] Mobile site works
    - [ ] No console errors
    - [ ] SSL certificate active

## Critical Pre-Launch Tests

Run these before going live:

```bash
# 1. Build verification
npm run check-build

# 2. Type checking
npm run type-check

# 3. Linting
npm run lint

# 4. Production build
npm run build

# 5. Test production build locally
npm start
```

## Common Issues & Solutions

### Build Fails
- Check for TypeScript errors: `npm run type-check`
- Check for missing dependencies: `npm install`
- Verify environment variables are set

### Firebase Connection Errors
- Verify all environment variables in `.env.local`
- Check Firebase project is active
- Verify security rules are set correctly

### Admin Login Not Working
- Verify admin user exists in Firebase Authentication
- Check email/password are correct
- Verify Firebase Auth is enabled

### File Uploads Not Working
- Check Firebase Storage is enabled
- Verify Storage security rules allow uploads
- Check file size limits (configured in code)

## Post-Launch Monitoring

### First 24 Hours
- Monitor error logs in hosting dashboard
- Check Firebase Console for errors
- Test user submissions
- Verify admin functions work

### First Week
- Daily check of error logs
- Review submissions
- Monitor Firebase usage/quota
- Check site performance

## Need Help?

1. Check `LAUNCH_CHECKLIST.md` for detailed checklist
2. Review `README.md` for setup instructions
3. Check Firebase Console for errors
4. Review hosting platform logs

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server locally

# Quality Checks
npm run lint             # Check code quality
npm run type-check       # Check TypeScript
npm run check-build      # Verify build readiness

# Deployment (Vercel)
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production
```

---

**Remember:** Take your time with testing. It's better to delay launch by a few hours than to launch with critical bugs!
