# Deployment Guide for Render

## Issues Fixed

1. ✅ Frontend environment configuration now uses environment variables
2. ✅ Socket.io connection now properly detects HTTPS and uses secure connections
3. ✅ Backend CORS configuration updated for production

## Environment Variables Setup on Render

### Frontend (React App) Environment Variables

In your Render frontend service, add the following environment variable:

```
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL.

**How to set in Render:**
1. Go to your frontend service dashboard on Render
2. Navigate to "Environment" tab
3. Add new environment variable:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: Your backend URL (e.g., `https://zoom-video-app.onrender.com`)
4. Save and redeploy

### Backend (Node.js) Environment Variables

In your Render backend service, you can optionally set:

```
FRONTEND_URL=https://your-frontend-url.onrender.com
```

This is optional - if not set, CORS will allow all origins.

**How to set in Render:**
1. Go to your backend service dashboard on Render
2. Navigate to "Environment" tab
3. Add new environment variable:
   - Key: `FRONTEND_URL`
   - Value: Your frontend URL (optional)
4. Save and redeploy

## Important Notes

1. **After setting environment variables, you MUST redeploy both services** for changes to take effect.

2. **Frontend Build**: The frontend will automatically detect production mode when built with `npm run build`. Make sure your Render frontend service is configured to:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start` (or serve the build folder)

3. **Backend URL**: Make sure your backend URL in `REACT_APP_BACKEND_URL` uses `https://` (not `http://`)

4. **Socket.io**: The socket connection will automatically use secure connections when connecting to HTTPS URLs.

## Testing

After deployment:
1. Test login/registration - should work with backend API
2. Test joining a meeting - socket connection should work
3. Check browser console for any CORS or connection errors

## Troubleshooting

### Error: `ERR_CONNECTION_REFUSED` or `localhost:8000` errors

**If you see errors like:**
- `localhost:8000/api/v1/users/login:1 Failed to load resource: net::ERR_CONNECTION_REFUSED`
- `Cannot read properties of undefined (reading 'data')`

**This means:**
1. **If testing locally**: This is normal - make sure your backend is running locally on port 8000
2. **If testing on Render (deployed frontend)**: The environment variable `REACT_APP_BACKEND_URL` is not set or the app wasn't rebuilt after setting it

**Solution for Render deployment:**
1. Go to your **Frontend** service on Render
2. Navigate to **Environment** tab
3. Add environment variable:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: Your actual backend URL (e.g., `https://your-backend-name.onrender.com`)
4. **IMPORTANT**: After adding the variable, you MUST click **"Manual Deploy"** or **"Redeploy"** for the changes to take effect
5. Wait for the deployment to complete

**To verify:**
- Open browser console (F12) on your deployed frontend
- You should see logs showing the Backend URL (it should NOT be localhost:8000)
- If it still shows localhost, the environment variable wasn't set correctly or the app wasn't rebuilt

### Other Common Issues

1. **Check browser console (F12)** for errors
2. **Verify environment variables** are set correctly in Render dashboard
3. **Make sure both services** are deployed and running
4. **Check that URLs use `https://`** not `http://`
5. **Verify backend is accessible** by visiting the backend URL directly in your browser
6. **Check backend logs** on Render to ensure it's running properly

