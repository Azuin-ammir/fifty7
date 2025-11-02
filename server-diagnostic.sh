#!/bin/bash
# Server Diagnostic Script for MIME Type Issues
# Run this on your server: bash server-diagnostic.sh

echo "========================================="
echo "Apache Configuration Diagnostic"
echo "========================================="
echo ""

BUILD_DIR="/var/www/html/fifty7/build"

echo "1. Checking build directory exists..."
if [ -d "$BUILD_DIR" ]; then
    echo "   ✓ Build directory exists: $BUILD_DIR"
else
    echo "   ✗ Build directory NOT FOUND: $BUILD_DIR"
    exit 1
fi

echo ""
echo "2. Checking .htaccess file..."
if [ -f "$BUILD_DIR/.htaccess" ]; then
    echo "   ✓ .htaccess exists"
    echo "   File permissions:"
    ls -la "$BUILD_DIR/.htaccess"
    echo ""
    echo "   Contents:"
    cat "$BUILD_DIR/.htaccess"
else
    echo "   ✗ .htaccess NOT FOUND in $BUILD_DIR"
fi

echo ""
echo "3. Checking static files..."
JS_FILE="$BUILD_DIR/static/js/main.5663811c.js"
CSS_FILE="$BUILD_DIR/static/css/main.ccde9a76.css"

if [ -f "$JS_FILE" ]; then
    echo "   ✓ JavaScript file exists: $JS_FILE"
    echo "   Size: $(du -h "$JS_FILE" | cut -f1)"
else
    echo "   ✗ JavaScript file NOT FOUND: $JS_FILE"
    echo "   Available JS files:"
    ls -la "$BUILD_DIR/static/js/" 2>/dev/null || echo "   static/js/ directory doesn't exist"
fi

if [ -f "$CSS_FILE" ]; then
    echo "   ✓ CSS file exists: $CSS_FILE"
    echo "   Size: $(du -h "$CSS_FILE" | cut -f1)"
else
    echo "   ✗ CSS file NOT FOUND: $CSS_FILE"
    echo "   Available CSS files:"
    ls -la "$BUILD_DIR/static/css/" 2>/dev/null || echo "   static/css/ directory doesn't exist"
fi

echo ""
echo "4. Checking Apache modules..."
echo "   mod_rewrite:"
apache2ctl -M 2>/dev/null | grep rewrite && echo "     ✓ mod_rewrite is loaded" || echo "     ✗ mod_rewrite NOT loaded (run: sudo a2enmod rewrite)"

echo "   mod_mime:"
apache2ctl -M 2>/dev/null | grep mime && echo "     ✓ mod_mime is loaded" || echo "     ✗ mod_mime NOT loaded"

echo ""
echo "5. Checking file permissions..."
echo "   Build directory ownership:"
ls -ld "$BUILD_DIR" | awk '{print "   " $3":"$4 " ("$1")"}'

echo ""
echo "6. Testing file access..."
if [ -f "$JS_FILE" ]; then
    echo "   Testing JS file MIME type detection:"
    file -b --mime-type "$JS_FILE"
fi

if [ -f "$CSS_FILE" ]; then
    echo "   Testing CSS file MIME type detection:"
    file -b --mime-type "$CSS_FILE"
fi

echo ""
echo "7. Checking Apache VirtualHost configuration..."
if [ -f "/etc/apache2/sites-available/57.fiftysevensg.com.conf" ]; then
    echo "   VirtualHost file found. Checking for AllowOverride:"
    grep -i "AllowOverride" /etc/apache2/sites-available/57.fiftysevensg.com.conf || echo "   ✗ AllowOverride not found in config"
elif [ -f "/etc/apache2/sites-enabled/57.fiftysevensg.com.conf" ]; then
    echo "   VirtualHost file found. Checking for AllowOverride:"
    grep -i "AllowOverride" /etc/apache2/sites-enabled/57.fiftysevensg.com.conf || echo "   ✗ AllowOverride not found in config"
else
    echo "   VirtualHost config file not found in standard locations"
fi

echo ""
echo "========================================="
echo "Diagnostic Complete"
echo "========================================="
echo ""
echo "If files exist but MIME errors persist, check:"
echo "1. Apache error log: sudo tail -f /var/log/apache2/error.log"
echo "2. Site-specific error log: sudo tail -f /var/log/apache2/57.fiftysevensg.com-error.log"
echo "3. Test direct file access: curl -I https://57.fiftysevensg.com/static/js/main.5663811c.js"

