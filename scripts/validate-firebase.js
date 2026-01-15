#!/usr/bin/env node

/**
 * Firebase Configuration Validator
 * 
 * Validates that all Firebase environment variables are properly set.
 */

const fs = require('fs');
const path = require('path');

const ENV_LOCAL_PATH = path.join(process.cwd(), '.env.local');

const REQUIRED_VARS = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

function validateFirebaseConfig() {
  console.log('\n🔍 Validating Firebase Configuration...\n');

  if (!fs.existsSync(ENV_LOCAL_PATH)) {
    console.error('❌ .env.local file not found!');
    console.log('\n💡 Run: npm run setup-firebase');
    console.log('   Or create .env.local manually from env.example\n');
    process.exit(1);
  }

  const envContent = fs.readFileSync(ENV_LOCAL_PATH, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  const missing = [];
  const incomplete = [];

  REQUIRED_VARS.forEach(varName => {
    const value = envVars[varName];
    if (!value) {
      missing.push(varName);
    } else if (value.includes('your-') || value === '') {
      incomplete.push(varName);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.log('\n💡 Update .env.local with your Firebase config values\n');
    process.exit(1);
  }

  if (incomplete.length > 0) {
    console.error('⚠️  Incomplete environment variables (still have placeholder values):');
    incomplete.forEach(v => console.error(`   - ${v}`));
    console.log('\n💡 Replace placeholder values in .env.local with your actual Firebase config\n');
    process.exit(1);
  }

  console.log('✅ All Firebase environment variables are set!');
  console.log('\n📋 Configuration Summary:');
  REQUIRED_VARS.forEach(varName => {
    const value = envVars[varName];
    const displayValue = varName.includes('KEY') || varName.includes('ID') 
      ? `${value.substring(0, 20)}...` 
      : value;
    console.log(`   ✓ ${varName}: ${displayValue}`);
  });
  console.log('\n');
}

validateFirebaseConfig();
