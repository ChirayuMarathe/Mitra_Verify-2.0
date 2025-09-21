# Netlify 404 Troubleshooting Guide

## 🚨 **Issue**: Getting 404 "Page not found" on Netlify

This happens when Netlify can't find the specific route and doesn't know to serve the main React app.

## ✅ **Solutions Applied**

### 1. **Updated netlify.toml Configuration**
The redirect rules are now properly ordered:
```toml
# Static assets first
[[redirects]]
  from = "/_next/static/*"
  to = "/_next/static/:splat"
  status = 200

# Handle trailing slashes
[[redirects]]
  from = "/*/"
  to = "/:splat/index.html"
  status = 200

# SPA fallback (MUST BE LAST)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. **Added _redirects File**
Backup redirect configuration in `public/_redirects`:
```
/_next/static/*  /_next/static/:splat  200
/*/  /:splat/index.html  200
/*  /index.html  200
```

### 3. **Custom 404 Page**
Created `src/app/not-found.tsx` for better user experience when pages aren't found.

## 🔧 **Manual Fix Steps (if still having issues)**

### Option 1: Check Netlify Dashboard
1. Go to your Netlify site dashboard
2. Click **"Deploys"** tab
3. Wait for the latest deploy to complete
4. Click **"Preview deploy"** to test

### Option 2: Force Rebuild
1. In Netlify dashboard, go to **"Deploys"**
2. Click **"Trigger deploy" > "Clear cache and redeploy"**
3. Wait for completion

### Option 3: Manual Deploy
If automatic deploy isn't working:
1. **Build locally:**
   ```bash
   cd mitraverify-frontend
   npm run build
   ```
2. **Drag the `out/` folder** to Netlify dashboard

### Option 4: Check Build Settings
In Netlify dashboard > **Site settings** > **Build & deploy**:
- **Base directory**: `mitraverify-frontend`
- **Build command**: `npm run build`
- **Publish directory**: `mitraverify-frontend/out`

## 🔍 **Debug Checklist**

- [ ] Latest commit pushed to GitHub
- [ ] Netlify auto-deploy triggered
- [ ] Build completed successfully (check build logs)
- [ ] `netlify.toml` file in root of published directory
- [ ] `_redirects` file in published directory
- [ ] No errors in Netlify function logs

## 📋 **Test Routes**

After deploy, these should all work:
- `https://your-site.netlify.app/` (homepage)
- `https://your-site.netlify.app/api-playground/` (playground)
- `https://your-site.netlify.app/results/` (results)
- `https://your-site.netlify.app/nonexistent-page` (should show custom 404)

## 🆘 **Still Having Issues?**

### Check Build Logs
1. Netlify Dashboard > **Deploys** > Latest deploy
2. Click **"View logs"** 
3. Look for errors in build process

### Common Issues:
- **Build fails**: Check Node.js version is 18.x
- **Environment variables**: Ensure `NEXT_PUBLIC_API_URL` is set
- **File paths**: Verify publish directory is `mitraverify-frontend/out`

### Contact Support
If none of the above works:
1. **Netlify Support**: Check their status page
2. **GitHub Issues**: Report at `ChirayuMarathe/Mitra_Verify-2.0/issues`
3. **Build locally**: Ensure `npm run build` works without errors

## 🎯 **Expected Result**

After applying these fixes:
- ✅ All routes should work correctly
- ✅ Direct URL access (like `/api-playground`) should work
- ✅ Custom 404 page for invalid routes
- ✅ Proper caching for static assets
- ✅ SEO-friendly URLs with trailing slashes

---

**Last Updated**: September 21, 2025  
**Status**: Fixes applied and pushed to GitHub