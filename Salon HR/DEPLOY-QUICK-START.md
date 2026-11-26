# Salon HR - Vercel Deployment Ready ✅

Your project has been configured for deployment to Vercel. Here's what was added:

## Files Created

1. **`vercel.json`** — Vercel project configuration for static hosting
2. **`package.json`** — Project metadata and build scripts  
3. **`.gitignore`** — Excludes build outputs and dependencies from Git
4. **`.github/workflows/deploy.yml`** — Optional GitHub Actions CI/CD (for future use)
5. **`DEPLOY.md`** — Complete deployment guide
6. **`setup-deploy.bat`** — Windows script to initialize Git

## Quick Start (Windows)

### Option 1: Automated Setup
```bash
setup-deploy.bat
```

Then follow the on-screen instructions.

### Option 2: Manual Steps

1. **Initialize Git** (if not done already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Salon HR platform"
   ```

2. **Create GitHub Repository**:
   - Visit: https://github.com/new
   - Name: `salon-hr`
   - Create repository without README/gitignore

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/salon-hr.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy to Vercel**:
   - Visit: https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Build Command: `cd source && python3 build.py && cd ..`
   - Click "Deploy"

## Your Live URL

After deployment, your Salon HR platform will be live at:
```
https://salon-hr-YOUR-NAME.vercel.app
```

(Or a custom domain if you add one)

## Automatic Deployments

Every time you push to the `main` branch on GitHub, Vercel will automatically rebuild and deploy your changes.

## Before Going Live

**Update these in `source/website/content.js`:**
- `CONFIG.phone` — Your contact number
- `CONFIG.formEndpoint` + `CONFIG.formKey` — Lead form endpoint
- Social media links
- Replace demo testimonials with real feedback

## Support

- **Deployment issues?** See `DEPLOY.md` for troubleshooting
- **Vercel docs:** https://vercel.com/docs
- **GitHub help:** https://docs.github.com

---

**Ready to go live? 🚀**
