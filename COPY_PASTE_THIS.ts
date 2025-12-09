// ========================================================
// COPY THIS ENTIRE FUNCTION
// Paste it into: app/api/public/real-estate/properties/route.ts
// Replace the existing createCorsHeaders function
// ========================================================

const createCorsHeaders = (origin?: string | null) => {
  // Allow specific production domains and all localhost during development
  const allowedOrigins = [
    'https://properties.slict.lk',
    'https://property.slict.lk',
    'http://localhost:63342',  // JetBrains IDE server
    'http://localhost:3000',
    'http://127.0.0.1:63342',
    'http://127.0.0.1:3000',
  ];

  // Check if origin is in allowed list
  const isAllowed = origin && allowedOrigins.includes(origin);

  // In development, be more permissive with localhost
  const isDev = process.env.NODE_ENV === 'development';
  const isLocalhost = origin?.includes('localhost') || origin?.includes('127.0.0.1');

  let allowedOrigin = '*';

  if (isAllowed) {
    allowedOrigin = origin!;
  } else if (isDev && isLocalhost) {
    allowedOrigin = origin!;
  } else if (isDev) {
    allowedOrigin = '*';
  }

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  } as Record<string, string>;
};

// ========================================================
// AFTER PASTING:
// 1. Save the file (Ctrl+S)
// 2. Go to terminal where Next.js is running
// 3. Press Ctrl+C to stop
// 4. Type: npm run dev
// 5. Wait for "Ready" message
// 6. Test again in test-api.html
// ========================================================

