# ERP CORS Fix - Step by Step Checklist

## Before You Start
- [ ] I have the ERP project open in my code editor
- [ ] I know where the ERP project folder is located

---

## Part 1: Verify Server is Running (2 minutes)

### Step 1.1: Open Browser
- [ ] Open a new browser tab

### Step 1.2: Navigate to API
- [ ] Go to: `http://localhost:3000/api/public/real-estate/properties`

### Step 1.3: Check What You See
What do you see? (Check ONE box)

- [ ] **I see JSON data** (like `[]` or `[{...}]`)
  → ✅ Server is running! Go to Part 2

- [ ] **I see "This site can't be reached"** or **"Unable to connect"**
  → ❌ Server is NOT running! Do this:
  ```bash
  cd C:\path\to\your\erp\project
  npm run dev
  ```
  Then wait for "Ready" message and check again

- [ ] **I see "404 | This page could not be found"**
  → ❌ Route doesn't exist! Check file location:
  `app/api/public/real-estate/properties/route.ts`

---

## Part 2: Update CORS Settings (3 minutes)

### Step 2.1: Open Route File
- [ ] Open file: `app/api/public/real-estate/properties/route.ts`

### Step 2.2: Find the Function
- [ ] Scroll down and find the line that says:
  ```typescript
  const createCorsHeaders = (origin?: string | null) => {
  ```

### Step 2.3: Select and Delete
- [ ] Click at the start of `const createCorsHeaders`
- [ ] Hold Shift and press Down Arrow until you reach the closing `};`
- [ ] Press Delete

### Step 2.4: Paste New Code
- [ ] Copy this ENTIRE block:

```typescript
const createCorsHeaders = (origin?: string | null) => {
  const allowedOrigins = [
    'https://properties.slict.lk',
    'https://property.slict.lk',
    'http://localhost:63342',
    'http://localhost:3000',
    'http://127.0.0.1:63342',
    'http://127.0.0.1:3000',
  ];

  const isDev = process.env.NODE_ENV === 'development';
  const isLocalhost = origin?.includes('localhost') || origin?.includes('127.0.0.1');
  
  let allowedOrigin = '*';
  
  if (allowedOrigins.includes(origin || '')) {
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

- [ ] Paste it where you deleted the old function

### Step 2.5: Save File
- [ ] Press `Ctrl+S` to save
- [ ] Check that the file saved (look for save indicator in your editor)

---

## Part 3: Restart Server (1 minute)

### Step 3.1: Find Terminal
- [ ] Find the terminal window where Next.js is running
  (You should see something like "✓ Ready" or "Compiled")

### Step 3.2: Stop Server
- [ ] Click in the terminal window
- [ ] Press `Ctrl+C`
- [ ] Wait until you see the command prompt again

### Step 3.3: Start Server
- [ ] Type: `npm run dev`
- [ ] Press Enter
- [ ] WAIT until you see: `✓ Ready in X.Xs`

**IMPORTANT:** Wait for the "Ready" message before continuing!

---

## Part 4: Test the Fix (30 seconds)

### Step 4.1: Open Test Page
- [ ] Go to browser with `test-api.html` open

### Step 4.2: Run Test
- [ ] Click the blue button "Run Connection Test"

### Step 4.3: Check Results
What do you see? (Check ONE box)

- [ ] **All green ✅ messages** 
  → SUCCESS! Go to Part 5

- [ ] **Red ❌ "Connection failed"**
  → Something went wrong. Options:
  - Server didn't restart? Go back to Part 3
  - File didn't save? Go back to Step 2.5
  - Still stuck? Check terminal for errors

---

## Part 5: Test Real Page (30 seconds)

### Step 5.1: Open Property Page
- [ ] Open `slict-property.html` in browser

### Step 5.2: Open DevTools
- [ ] Press `F12`
- [ ] Click on "Console" tab

### Step 5.3: Check Results
What do you see? (Check ONE box)

- [ ] **No CORS errors** and properties loaded
  → 🎉 COMPLETE SUCCESS!

- [ ] **"No properties available right now"**
  → ✅ API works! You just have no data yet

- [ ] **Red CORS errors still showing**
  → Go back to Part 3 - server might not have restarted

---

## Success Criteria

You're done when:
- ✅ `test-api.html` shows all green checkmarks
- ✅ `slict-property.html` shows NO CORS errors in console
- ✅ Either properties display OR "No properties available" message shows

---

## If Still Not Working

1. **Check terminal where Next.js runs** - Any red errors?
2. **Check which file you edited** - Is it the right route.ts file?
3. **Try clearing browser cache** - Ctrl+Shift+Delete
4. **Try Incognito mode** - Right-click browser → New Incognito Window

---

## Time Estimate
- Part 1: 2 minutes
- Part 2: 3 minutes
- Part 3: 1 minute
- Part 4: 30 seconds
- Part 5: 30 seconds

**Total: ~7 minutes**

---

## After Success

Next steps:
1. Add test properties to your database
2. They will automatically appear on the page!
3. For production, update API endpoint in `slict-property.html` line 843

