# Deployment Guide

## Vercel Deployment

1. **Push to GitHub:**
   \`\`\`bash
   git add .
   git commit -m "Fix project structure for Vercel"
   git push origin main
   \`\`\`

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Click "Deploy"

## Environment Variables

Add these environment variables in Vercel dashboard:

\`\`\`
GOOGLE_DRIVE_CLIENT_ID=your_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret
GOOGLE_DRIVE_REFRESH_TOKEN=your_refresh_token
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
\`\`\`

## Features

- ✅ Next.js 15 with App Router
- ✅ Responsive design
- ✅ Admin panel
- ✅ Product management
- ✅ Order system
- ✅ Mobile optimized
- ✅ Hero animations
- ✅ Content management

## Admin Access

Visit: `https://your-domain.vercel.app/secret-admin-portal-2024`

Default credentials:
- Username: admin
- Password: admin123 (change this!)
