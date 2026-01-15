/**
 * Validates that all required environment variables are set
 * Call this at the start of your application
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const

export function validateEnv() {
  const missing: string[] = []
  
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  })

  if (missing.length > 0) {
    const errorMessage = `
⚠️  Missing required environment variables:
${missing.map(v => `  - ${v}`).join('\n')}

Please create a .env.local file with these variables.
See env.example for reference.
    `.trim()
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(errorMessage)
    } else {
      console.warn(errorMessage)
    }
  }
}

// Validate on import in production
if (process.env.NODE_ENV === 'production') {
  validateEnv()
}
