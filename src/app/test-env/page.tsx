'use client'

/**
 * Temporary page to test if environment variables are being read
 * Remove this file after verifying Firebase works
 */

export default function TestEnvPage() {
  const envVars = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing',
  }

  const allSet = Object.values(envVars).every(v => v === '✅ Set')

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="font-mono text-sm">NEXT_PUBLIC_FIREBASE_API_KEY</span>
            <span className={envVars.apiKey.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {envVars.apiKey}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-sm">NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</span>
            <span className={envVars.authDomain.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {envVars.authDomain}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-sm">NEXT_PUBLIC_FIREBASE_PROJECT_ID</span>
            <span className={envVars.projectId.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {envVars.projectId}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-sm">NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</span>
            <span className={envVars.storageBucket.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {envVars.storageBucket}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-sm">NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</span>
            <span className={envVars.messagingSenderId.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {envVars.messagingSenderId}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-sm">NEXT_PUBLIC_FIREBASE_APP_ID</span>
            <span className={envVars.appId.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {envVars.appId}
            </span>
          </div>
        </div>

        <div className={`p-4 rounded ${allSet ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-bold ${allSet ? 'text-green-800' : 'text-red-800'}`}>
            {allSet ? '✅ All environment variables are set!' : '❌ Some environment variables are missing'}
          </p>
          {!allSet && (
            <p className="text-sm text-red-700 mt-2">
              Go to Vercel → Settings → Environment Variables and add the missing variables.
              Then redeploy your site.
            </p>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Note:</strong> This is a test page. Remove it after verifying Firebase works.</p>
        </div>
      </div>
    </div>
  )
}

