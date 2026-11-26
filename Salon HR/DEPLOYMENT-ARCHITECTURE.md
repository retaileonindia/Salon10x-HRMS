# Salon HR Deployment Architecture

## What's Happening

Your Salon HR project is a **single-page application (SPA)** that:
- Runs entirely in the browser (no backend server needed for the demo)
- Bundles all code into a single `index.html` file (~450KB)
- Uses hash routing for navigation (`#app-admin`, `#app-staff`, `#app-console`)
- Stores data locally in browser (localStorage, not synced)

## Deployment to Vercel

Vercel is a serverless platform perfect for static sites and SPAs.

### How It Works

```
Your Computer
     ↓
   Git Repository (GitHub)
     ↓
   Vercel Deployment Platform
     ↓
   Live URL: salon-hr-xxx.vercel.app
```

### Build Process

```
Push to GitHub
     ↓
Vercel detects push
     ↓
Runs: cd source && python3 build.py && cd ..
     ↓
Generates: salonhr-platform.html / index.html
     ↓
Deploys to CDN (worldwide)
     ↓
Instant live update
```

## File Structure After Deployment

```
vercel.json              ← Vercel configuration
package.json             ← Project metadata
index.html               ← Generated main file (after build)
salonhr-platform.html    ← Alternative build output name
source/
  ├── build.py           ← Python build script
  ├── website/           ← Public website
  ├── salon-admin-and-staff/  ← Admin & staff app
  └── console/           ← HR console
.github/
  └── workflows/
      └── deploy.yml     ← GitHub Actions (optional CI/CD)
```

## Key Configuration Files

### `vercel.json`
Tells Vercel:
- How to build the project
- Which files to serve
- Where to route requests

### `package.json`
Vercel uses this to:
- Identify the project type
- Manage build scripts
- Track dependencies

### `.gitignore`
Prevents committing:
- Build outputs
- Dependencies
- Temporary files

## Security Considerations

✅ **Included:**
- All code is on GitHub (public or private - your choice)
- HTTPS by default on Vercel
- No sensitive data in code (OTPs/payments are simulated)

⚠️ **For Production:**
- Replace simulated OTP with real SMS/WhatsApp service
- Add backend for data persistence and security
- Implement real payment processing
- Use secure file storage for documents

## Performance

- **Global CDN** — Served from servers near your users
- **Instant Deployments** — Completed in <1 minute
- **Auto-Scaling** — Handles traffic spikes automatically
- **Caching** — Static assets cached worldwide

## Monitoring & Analytics

After deployment, in Vercel dashboard you can see:
- **Analytics** — Page views, visitors, bounce rate
- **Build Logs** — What happens when you deploy
- **Performance** — Page load times, response sizes
- **Traffic** — Geographic distribution of visitors

## Rollback & History

- Every deployment is automatically saved
- Easy rollback to previous versions
- Full deployment history in Vercel dashboard

## Cost

- **Free Tier** — Includes everything for small projects
- **Pro Tier** — $20/month for teams and advanced features
- **Enterprise** — Custom pricing

This project uses only free-tier features.

## Next Steps

1. ✅ Files configured (you're here!)
2. → Initialize Git (`setup-deploy.bat`)
3. → Create GitHub repository
4. → Push code to GitHub
5. → Connect to Vercel
6. → Go live! 🚀

See `DEPLOY.md` for detailed instructions.
