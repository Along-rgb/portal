# Static Deployment Guide

This project is configured for static export. After running `npm run build`, the `out/` directory contains all static files ready for deployment.

## Quick Start

```bash
npm run build
# Upload contents of 'out/' directory to your hosting service
```

## Deployment Options

### Netlify

1. Connect your Git repository to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
3. Deploy automatically on push

### Vercel

1. Connect your Git repository to Vercel
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `out`
3. Deploy automatically on push

### GitHub Pages

1. Build the project: `npm run build`
2. Push the `out/` directory to your repository's `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Nginx (Static File Server)

```nginx
server {
    listen 80;
    server_name portal.edl.com.la;
    root /var/www/allsoftware-svc/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache (Static File Server)

```apache
<VirtualHost *:80>
    ServerName portal.edl.com.la
    DocumentRoot /var/www/allsoftware-svc/out

    <Directory /var/www/allsoftware-svc/out>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### AWS S3 + CloudFront

1. Upload `out/` contents to S3 bucket
2. Configure S3 bucket for static website hosting
3. Set up CloudFront distribution with custom error pages pointing to `/index.html`

## Advantages of Static Deployment

- **No server required** - No Node.js, PM2, or server maintenance
- **Faster performance** - Static files are served directly
- **Lower cost** - No server hosting costs
- **Better reliability** - No server processes to fail
- **Easy deployment** - Simple file upload or CI/CD integration
