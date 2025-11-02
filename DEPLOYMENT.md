# Deployment Configuration Guide

This project includes server configuration files to fix MIME type errors and ensure static assets are served correctly.

## The Problem

When deploying React apps with client-side routing, requests for static assets (JS/CSS files in `/static/`) can return HTML instead of the actual files, causing MIME type errors:
- `text/html` instead of `application/javascript` for `.js` files
- `text/html` instead of `text/css` for `.css` files

## Solution

Configuration files have been created for different hosting platforms. Use the appropriate one for your deployment:

### Apache / cPanel / Traditional Hosting

**File:** `public/.htaccess`

This file is automatically copied to the `build` directory during `npm run build`. 

**To use:**
1. Run `npm run build`
2. Upload the `build` folder to your server
3. The `.htaccess` file will be in the build directory and will automatically configure Apache

**What it does:**
- Serves static files (JS, CSS, images) directly with correct MIME types
- Only rewrites non-file requests to `index.html` for client-side routing

### Netlify

**File:** `public/_redirects`

This file is automatically copied to the `build` directory during `npm run build`.

**To use:**
1. Run `npm run build`
2. Deploy the `build` folder to Netlify
3. Netlify will automatically use the `_redirects` file

**What it does:**
- Serves static assets from `/static/` directly
- Redirects all other routes to `index.html` for client-side routing

### Vercel

**File:** `vercel.json` (in project root)

**To use:**
1. Deploy to Vercel
2. Vercel will automatically detect and use `vercel.json`

**What it does:**
- Configures routes to serve static files correctly
- Sets proper MIME types for JS and CSS files
- Handles client-side routing

### Nginx

**File:** `nginx.conf` (in project root)

**To use:**
1. Copy the configuration to your nginx server configuration
2. Update the paths in the file to match your build directory
3. Restart nginx

**What it does:**
- Serves static files with correct MIME types
- Handles client-side routing by falling back to `index.html`

### Windows Server / IIS

**File:** `public/web.config`

This file is automatically copied to the `build` directory during `npm run build`.

**To use:**
1. Run `npm run build`
2. Upload the `build` folder to IIS
3. The `web.config` file will configure IIS

**What it does:**
- Serves static files with correct MIME types
- Rewrites routes to `index.html` for client-side routing

## Testing After Deployment

After deploying with the appropriate configuration:

1. Check the browser console - MIME type errors should be gone
2. Verify that static assets load correctly:
   - JavaScript files should have `Content-Type: application/javascript`
   - CSS files should have `Content-Type: text/css`
3. Test client-side routing - navigation should work without page refreshes

## Additional Notes

- All configuration files ensure that static assets are served directly
- Only non-file requests are redirected to `index.html` for client-side routing
- Proper MIME types are set for JavaScript and CSS files
- Caching headers are configured for optimal performance

