# ⚡ Quick Setup Reference

## One-Command Setup

```bash
npm run setup-firebase
```

This interactive script will:
- ✅ Guide you through creating `.env.local`
- ✅ Validate your configuration
- ✅ Show you all next steps

## Validate Your Setup

```bash
npm run validate-firebase
```

## Deploy Security Rules

```bash
# First time: Install Firebase CLI
npm install -g firebase-tools
firebase login
firebase use --add

# Then deploy rules
npm run firebase:deploy-rules
```

## Manual Steps (Browser Required)

1. **Create Project:** https://console.firebase.google.com/
2. **Enable Auth:** https://console.firebase.google.com/project/_/authentication
3. **Create Firestore:** https://console.firebase.google.com/project/_/firestore
4. **Enable Storage:** https://console.firebase.google.com/project/_/storage
5. **Get Config:** https://console.firebase.google.com/project/_/settings/general
6. **Create Admin:** https://console.firebase.google.com/project/_/authentication/users

## Files You Need

- ✅ `firestore.rules` - Already created!
- ✅ `storage.rules` - Already created!
- ✅ `firebase.json` - Already created!
- ⚠️ `.env.local` - Run `npm run setup-firebase` to create

## Full Guide

See `AUTOMATED_SETUP.md` for complete instructions.
