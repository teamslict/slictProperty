# ✅ SERVER CONFIRMED RUNNING - CORS FIX ONLY

## Good News! 🎉

Your ERP server **IS RUNNING** and returning property data:
- ✅ 2 properties in database
- ✅ Images, prices, descriptions all present
- ✅ API endpoint working perfectly

## The ONLY Problem

The CORS headers are blocking `http://localhost:63342` from accessing the API.

---

## THE FIX (3 Minutes)

### Step 1: Open Your ERP Route File

Navigate to your ERP project and open:
```
app/api/public/real-estate/properties/route.ts
```

### Step 2: Find This Function

Scroll down and find:
```typescript
const createCorsHeaders = (origin?: string | null) => {
  const allowedOrigin = origin === 'https://properties.slict.lk' ? origin : '*';

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  } as Record<string, string>;
};
```

### Step 3: Replace With This

**DELETE the entire function above** and **PASTE this instead:**

```typescript
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
```

### Step 4: Save the File

Press `Ctrl+S` to save.

### Step 5: Restart the Server (CRITICAL!)

**In the terminal where Next.js is running:**

1. Press `Ctrl+C` to stop the server
2. Wait for it to fully stop (you'll see the command prompt)
3. Type: `npm run dev`
4. Press Enter
5. **WAIT** for the "✓ Ready in X.Xs" message

⚠️ **THE SERVER MUST BE RESTARTED FOR CHANGES TO TAKE EFFECT!**

### Step 6: Test

1. Go back to `test-api.html` in your browser
2. Click "Run Connection Test"
3. You should now see **ALL GREEN** ✅ checkmarks

### Step 7: Test the Real Page

1. Open `slict-property.html` in browser
2. Press `F12` to open DevTools
3. Click "Console" tab
4. Refresh the page
5. You should see **2 property cards** appear!

---

## Expected Result After Fix

### In test-api.html:
```
✅ Server responded with status: 200
✅ CORS header present: http://localhost:63342
✅ Valid JSON array received with 2 items
✅ All tests passed! API is working correctly.

Sample data:
{
  "id": "cmiy8ki6m0001amt8fbsprdfu",
  "title": "Penthouse Apartment for sale",
  "price": 18000000,
  ...
}
```

### In slict-property.html:

You should see **2 property cards**:

1. **Penthouse Apartment for sale**
   - Colombo 4
   - LKR 18,000,000
   - 3 Bedrooms, 3 Bathrooms

2. **House for sale in residential area**
   - Colombo 15
   - LKR 40,000,000
   - 3 Bedrooms, 2 Bathrooms

---

## Troubleshooting

### Still getting CORS error?

**Did you restart the server?**
- Stopping and starting is MANDATORY
- Changes don't take effect until restart

**Did you save the file?**
- Press Ctrl+S
- Check file modification timestamp

**Try clearing browser cache:**
- Press Ctrl+Shift+Delete
- Select "Cached images and files"
- Click Clear

**Try Incognito mode:**
- Right-click browser icon → New Incognito Window
- Open test-api.html in Incognito

### Second property has no images

That's normal - the database has an empty images array for that property. The HTML will show the fallback image.

---

## Summary

✅ Your server is running  
✅ Your API returns data  
✅ Your database has 2 properties  
⚠️ ONLY the CORS headers need updating  

**Time to fix: 3 minutes**

**Follow Steps 1-7 above and you'll be done!** 🚀

