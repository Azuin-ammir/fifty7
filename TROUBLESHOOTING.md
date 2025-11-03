# Troubleshooting MIME Type Errors

The MIME type errors indicate that Apache is serving HTML instead of the actual JS/CSS files. Let's check the following:

## Step 1: Verify .htaccess is on the server

On your server, run:
```bash
cd /var/www/html/fifty7/build
ls -la .htaccess
cat .htaccess
```

The `.htaccess` file should exist and contain the rewrite rules and MIME type settings.

## Step 2: Check if Apache modules are enabled

```bash
# Check if mod_rewrite is enabled
sudo a2enmod rewrite
sudo a2enmod mime

# Check status
apache2ctl -M | grep rewrite
apache2ctl -M | grep mime

# Reload Apache
sudo systemctl reload apache2
```

## Step 3: Verify file paths exist

```bash
# Check if the actual files exist
ls -la /var/www/html/fifty7/build/static/js/main.5663811c.js
ls -la /var/www/html/fifty7/build/static/css/main.ccde9a76.css

# Check file permissions
ls -la /var/www/html/fifty7/build/static/
```

Files should be readable by Apache (typically owned by www-data or have 644 permissions).

## Step 4: Check Apache error logs

```bash
# Check for .htaccess errors
sudo tail -f /var/log/apache2/57.fiftysevensg.com-error.log

# Or check main error log
sudo tail -f /var/log/apache2/error.log
```

Look for errors like:
- "Invalid command 'RewriteEngine'"
- ".htaccess: RewriteRule: bad flag delimiters"
- Permission denied errors

## Step 5: Test direct file access

In your browser, try accessing:
- `https://57.fiftysevensg.com/static/js/main.5663811c.js`
- `https://57.fiftysevensg.com/static/css/main.ccde9a76.css`

These should return the actual files, not HTML. If they return HTML, the files don't exist at that path.

## Step 6: Verify VirtualHost configuration

Make sure your VirtualHost doesn't have conflicting rewrite rules:

```apache
<Directory /var/www/html/fifty7/build>
    AllowOverride All  # This must be present
    Options -Indexes +FollowSymLinks
    Require all granted
</Directory>
```

## Step 7: Test .htaccess is being read

Add a simple test to .htaccess to verify it's working:

```apache
# Test - this should give a 500 error if .htaccess is being read
# Uncomment temporarily to test:
# <IfModule mod_rewrite.c>
#   RewriteEngine On
#   RewriteRule ^test$ - [F]
# </IfModule>
```

## Step 8: Check SELinux (if applicable)

```bash
# Check if SELinux is blocking .htaccess
sudo getenforce

# If Enforcing, check context
ls -Z /var/www/html/fifty7/build/.htaccess
```

## Common Issues and Solutions

### Issue: .htaccess file not found in build folder
**Solution:** Rebuild and ensure .htaccess is copied:
```bash
npm run build
# Verify .htaccess exists in build/
```

### Issue: AllowOverride None
**Solution:** Change to `AllowOverride All` in VirtualHost

### Issue: Files return 404
**Solution:** Check DocumentRoot path matches actual build location

### Issue: Permission denied
**Solution:** Fix file ownership:
```bash
sudo chown -R www-data:www-data /var/www/html/fifty7/build
sudo chmod 644 /var/www/html/fifty7/build/.htaccess
```

### Issue: mod_rewrite not enabled
**Solution:**
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

