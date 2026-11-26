# Deploy to Vercel - Setup Guide

This guide will help you deploy Salon HR to Vercel.

## Prerequisites

1. **GitHub Account** — [Create one](https://github.com/signup) if you don't have one
2. **Vercel Account** — [Sign up for free](https://vercel.com/signup)
3. **Git** — [Install Git](https://git-scm.com/download/win) on your machine

## Steps to Deploy

### 1. Initialize Git Repository

```bash
cd "D:\Salon HR"
git init
git add .
git commit -m "Initial commit: Salon HR platform"
```

### 2. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository `salon-hr` (or any name you prefer)
3. **Do NOT** initialize with README, .gitignore, or license (you already have these)
4. Click **Create repository**

### 3. Push to GitHub

```bash
cd "D:\Salon HR"
git remote add origin https://github.com/YOUR-USERNAME/salon-hr.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

### 4. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Paste your GitHub repository URL: `https://github.com/YOUR-USERNAME/salon-hr`
4. Click **Continue**
5. Configure the project:
   - **Framework Preset:** Other
   - **Build Command:** `cd source && python3 build.py && cd ..`
   - **Output Directory:** (leave blank)
   - **Install Command:** (leave blank)
6. Click **Deploy**

#### Option B: Using Vercel CLI

```bash
npm install -g vercel
cd "D:\Salon HR"
vercel --prod
```

Follow the prompts to link your project and deploy.

### 5. Set Up Automatic Deployments

After deploying, Vercel will automatically deploy new commits pushed to `main` branch.

## Configuration Files Added

- **`vercel.json`** — Vercel project configuration
- **`package.json`** — Project metadata and build scripts
- **`.gitignore`** — Files to exclude from Git
- **`.github/workflows/deploy.yml`** — Optional GitHub Actions workflow for CI/CD

## Important Notes

### Before Going Live

Update these settings in `source/website/content.js` → `CONFIG`:
- `phone` — Your contact number for "Talk To Your HR"
- `formEndpoint` + `formKey` — Email form endpoint (e.g., Formspree)
- `linkedin`, `instagram` — Social media links
- Replace demo testimonials with real client feedback

### Environment Setup

If you need environment variables:
1. Go to your Vercel project settings
2. Click **Environment Variables**
3. Add your variables
4. Redeploy the project

### Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add your custom domain
3. Update DNS settings as instructed

## Troubleshooting

### Build Fails
- Ensure Python 3.9+ is available
- Check that all source files exist in `source/` directory
- Review Vercel build logs for detailed errors

### Python Not Available on Vercel
If the build fails due to Python, modify `vercel.json`:
```json
{
  "buildCommand": "pip install -r requirements.txt && python3 source/build.py"
}
```

### File Size Too Large
The built `index.html` is ~450KB. This is normal for a full-featured app bundled into one file.

## Support

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Help:** https://docs.github.com
- For issues with this setup, check the error logs in Vercel dashboard

---

**Happy deploying! 🚀**
