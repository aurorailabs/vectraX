# Hostinger Deployment Guide

This guide will help you deploy your vectraX Technologies app to Hostinger hosting.

## Prerequisites

1. A Hostinger account with hosting plan
2. Node.js and npm installed on your local machine
3. FTP/SFTP access to your Hostinger account (or File Manager access)
4. Domain name configured: https://vectrax.in/

## Step 1: Build Your React App

Build your React application for production:

```bash
npm install
npm run build:hostinger
```

This command will:
- Create an optimized production build in the `build` folder
- Copy the `.htaccess` file to the build folder (for React Router support)
- Copy the `sitemap.xml` to the build folder

## Step 2: Access Your Hostinger File Manager

1. Log in to your Hostinger account
2. Go to **hPanel** (Hostinger Control Panel)
3. Navigate to **Files** → **File Manager**
4. Open your domain's root directory (usually `public_html`)

## Step 3: Upload Files to Hostinger

### Option A: Using File Manager (Recommended for first-time setup)

1. In File Manager, navigate to your domain's root directory (`public_html`)
2. **Delete or backup** any existing files (if this is a fresh deployment)
3. Select all files from your local `build` folder
4. Upload them to the `public_html` directory
5. Make sure `.htaccess` file is uploaded (it might be hidden - enable "Show hidden files" in File Manager)

### Option B: Using FTP/SFTP Client

1. Get your FTP credentials from Hostinger hPanel:
   - Go to **Files** → **FTP Accounts**
   - Note your FTP host, username, and password

2. Connect using an FTP client (FileZilla, Cyberduck, etc.):
   - **Host**: Your FTP host (e.g., `ftp.yourdomain.com`)
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: 21 (FTP) or 22 (SFTP)

3. Navigate to `public_html` directory
4. Upload all files from your local `build` folder to `public_html`

## Step 4: Verify File Structure

After uploading, your `public_html` directory should contain:
```
public_html/
├── .htaccess
├── index.html
├── sitemap.xml
├── robots.txt
├── favicon.ico
├── manifest.json
├── static/
│   ├── css/
│   └── js/
└── [other assets]
```

## Step 5: Verify Your Website

1. Visit https://vectrax.in/ in your browser
2. Test all pages and navigation
3. Check that React Router is working (try navigating to different sections)
4. Verify that `https://vectrax.in/sitemap.xml` is accessible
5. Verify that `https://vectrax.in/robots.txt` is accessible

## Future Deployments

For future updates:

1. Make your changes to the code
2. Run:  `npm run build:hostinger`
3. Upload only the changed files, or upload everything from the `build` folder to replace existing files
4. Clear browser cache if needed

## Important Configuration Notes

### .htaccess File
The `.htaccess` file is crucial for:
- React Router to work properly (handles client-side routing)
- GZIP compression (faster page loads)
- Browser caching (better performance)
- Security headers

**Make sure the `.htaccess` file is uploaded!** If it's missing, React Router won't work correctly.

### SSL/HTTPS
Hostinger typically provides free SSL certificates. Make sure:
1. SSL is enabled in your Hostinger hPanel
2. Your site is accessible via `https://vectrax.in/`
3. Force HTTPS redirects (can be configured in hPanel)

## Troubleshooting

### Issue: 404 errors when navigating to routes
**Solution**: Make sure `.htaccess` file is uploaded to `public_html` root directory

### Issue: Website shows blank page
**Solution**: 
- Check browser console for errors
- Verify all files from `build` folder are uploaded
- Check file permissions (should be 644 for files, 755 for directories)

### Issue: CSS/JS files not loading
**Solution**:
- Check that `static` folder and its contents are uploaded
- Verify file paths in browser console
- Clear browser cache

### Issue: Sitemap.xml not accessible
**Solution**:
- Verify `sitemap.xml` is in `public_html` root
- Check file permissions (should be 644)
- Try accessing directly: `https://vectrax.in/sitemap.xml`

### Issue: .htaccess not working
**Solution**:
- Verify mod_rewrite is enabled on Hostinger (contact support if needed)
- Check `.htaccess` file syntax
- Ensure file is named exactly `.htaccess` (with the dot at the beginning)

## Performance Optimization

### Enable GZIP Compression
The `.htaccess` file already includes GZIP compression. Verify it's working:
- Use tools like https://www.giftofspeed.com/gzip-test/ to check

### Enable Browser Caching
Already configured in `.htaccess` file.

### CDN (Optional)
Consider using a CDN for static assets:
- Cloudflare (free tier available)
- Hostinger CDN (if available in your plan)

## Security Checklist

✅ SSL/HTTPS enabled
✅ Security headers configured (in `.htaccess`)
✅ File permissions set correctly
✅ Regular backups enabled in Hostinger

## Support

- Hostinger Support: https://www.hostinger.com/contact
- Hostinger Knowledge Base: https://support.hostinger.com/

## Additional Resources

- React Router Documentation: https://reactrouter.com/
- Apache .htaccess Guide: https://httpd.apache.org/docs/current/howto/htaccess.html
