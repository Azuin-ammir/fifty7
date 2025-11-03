# Apache Deployment Guide

This guide will help you deploy your React app to Apache and fix the MIME type errors.

## Quick Fix Steps

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Upload the `build` folder contents to your Apache server**
   - Upload everything inside the `build` folder to your web root (usually `public_html`, `www`, or `htdocs`)
   - Make sure the `.htaccess` file is included (it will be in the build folder)

3. **Verify the `.htaccess` file is in place**
   - The `.htaccess` file should be in the same directory as `index.html`
   - File permissions should allow Apache to read it (typically 644)

4. **Test your deployment**
   - Visit `https://57.fiftysevensg.com`
   - Check browser console - MIME type errors should be gone
   - Verify static assets load correctly

## What the `.htaccess` File Does

The `.htaccess` file in your `public/` folder automatically:
- ✅ Serves static files (JS, CSS, images) with correct MIME types
- ✅ Fixes the `text/html` MIME type error for JS and CSS files
- ✅ Handles client-side routing (redirects non-existent paths to `index.html`)
- ✅ Enables compression for better performance
- ✅ Sets caching headers for static assets

## File Structure After Build

After running `npm run build`, your `build` folder will contain:
```
build/
├── index.html
├── .htaccess          ← This file fixes your MIME type issues
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   └── main.[hash].js
│   └── media/
│       └── ...
└── ...
```

## Important Notes

1. **File Permissions**: Ensure `.htaccess` has proper permissions (644 or 755)
2. **Apache Modules**: Your server should have these modules enabled:
   - `mod_rewrite` (for routing)
   - `mod_mime` (for MIME types)
   - `mod_deflate` (optional, for compression)
   - `mod_expires` (optional, for caching)
3. **AllowOverride**: Make sure your Apache configuration allows `.htaccess` files:
   ```apache
   <Directory "/path/to/your/web/root">
       AllowOverride All
   </Directory>
   ```

## Troubleshooting

### If MIME type errors persist:

1. **Check if `.htaccess` is uploaded**
   - Verify the file exists in your web root
   - Check file permissions (should be readable by Apache)

2. **Check Apache error logs**
   - Look for any `.htaccess` related errors
   - Common location: `/var/log/apache2/error.log` or cPanel error logs

3. **Verify `mod_rewrite` is enabled**
   - On some servers, you may need to enable it via cPanel or server config

4. **Test the rewrite rules**
   - Try accessing a static file directly: `https://57.fiftysevensg.com/static/js/main.[hash].js`
   - It should serve the JavaScript file, not HTML

### If client-side routing doesn't work:

- Verify `mod_rewrite` is enabled
- Check that `AllowOverride All` is set in your Apache config
- Ensure `.htaccess` file is in the correct directory (same as `index.html`)

## cPanel Specific Instructions

If you're using cPanel:

1. Build your app: `npm run build`
2. Go to **File Manager** in cPanel
3. Navigate to `public_html` (or your domain's root directory)
4. Upload all files from the `build` folder
5. Make sure `.htaccess` is uploaded (hidden files might not show - use "Show Hidden Files" option)
6. Set file permissions on `.htaccess` to 644

## Need Help?

If you continue to experience issues:
- Check your Apache error logs
- Verify all Apache modules are enabled
- Contact your hosting provider if `mod_rewrite` is not available
- Test with a simple `.htaccess` file to verify it's being read

