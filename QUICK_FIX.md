# Quick Fix Guide

## You're Still Getting `localhost:8000` Errors

This means the app is still trying to connect to `localhost:8000` instead of your Render backend.

## Immediate Solution (For Testing)

### Option 1: Set Backend URL in Browser Console (Quick Test)

1. Open your deployed frontend in browser
2. Open browser console (F12)
3. Run this command (replace with your actual backend URL):
   ```javascript
   localStorage.setItem('BACKEND_URL_OVERRIDE', 'https://your-backend-url.onrender.com');
   ```
4. Refresh the page
5. Check console - you should see the new Backend URL

### Option 2: Set Environment Variable on Render (Permanent Fix)

1. Go to your **Frontend** service on Render
2. Click on **Environment** tab
3. Click **Add Environment Variable**
4. Add:
   - **Key**: `REACT_APP_BACKEND_URL`
   - **Value**: `https://your-actual-backend-url.onrender.com`
5. **IMPORTANT**: Click **"Save Changes"**
6. **CRITICAL**: Click **"Manual Deploy"** or wait for auto-deploy
7. Wait for deployment to complete (usually 2-5 minutes)

## Verify It's Working

After setting the environment variable and redeploying:

1. Open your deployed frontend
2. Open browser console (F12)
3. Look for logs that say:
   ```
   === Backend Configuration ===
   Backend URL: https://your-backend-url.onrender.com
   ```
4. If it still shows `localhost:8000`, the environment variable wasn't set correctly or the app wasn't rebuilt

## Common Mistakes

❌ **Setting the variable but not redeploying** - Environment variables only take effect after rebuild
❌ **Using wrong variable name** - Must be exactly `REACT_APP_BACKEND_URL`
❌ **Using http:// instead of https://** - Render uses HTTPS
❌ **Testing locally** - If you're testing on localhost, it will use localhost:8000 (this is normal)

## Still Not Working?

1. Check Render deployment logs - look for build errors
2. Verify the environment variable is actually set in Render dashboard
3. Make sure you're testing the deployed version, not localhost
4. Check browser console for the Backend URL logs
5. Try the localStorage override method above to test if it's an environment variable issue

