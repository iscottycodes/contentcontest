#!/usr/bin/env node

/**
 * Production Build Verification Script
 * Run this before deploying to ensure everything builds correctly
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔍 Running production build verification...\n')

const errors = []
const warnings = []

// Check if .env.local exists
if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
  warnings.push('⚠️  .env.local file not found. Make sure to set environment variables in your hosting platform.')
}

// Check Node version
const nodeVersion = process.version
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
if (majorVersion < 18) {
  errors.push(`❌ Node.js version ${nodeVersion} is too old. Please use Node.js 18 or higher.`)
}

// Try to build
console.log('📦 Building production bundle...\n')
try {
  execSync('npm run build', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })
  console.log('\n✅ Build successful!\n')
} catch (error) {
  errors.push('❌ Production build failed. Please fix errors before deploying.')
  process.exit(1)
}

// Check build output
const buildDir = path.join(process.cwd(), '.next')
if (!fs.existsSync(buildDir)) {
  errors.push('❌ Build output directory (.next) not found.')
} else {
  console.log('✅ Build output directory exists')
}

// Check for common issues
const publicDir = path.join(process.cwd(), 'public')
if (!fs.existsSync(publicDir)) {
  warnings.push('⚠️  Public directory not found. Some assets may be missing.')
}

// Summary
console.log('\n' + '='.repeat(50))
console.log('📊 Build Verification Summary')
console.log('='.repeat(50) + '\n')

if (errors.length > 0) {
  console.log('❌ ERRORS:')
  errors.forEach(err => console.log(`  ${err}`))
  console.log('\n')
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:')
  warnings.forEach(warn => console.log(`  ${warn}`))
  console.log('\n')
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All checks passed! Ready for deployment.\n')
  process.exit(0)
} else if (errors.length > 0) {
  console.log('❌ Please fix errors before deploying.\n')
  process.exit(1)
} else {
  console.log('⚠️  Build completed with warnings. Review before deploying.\n')
  process.exit(0)
}
