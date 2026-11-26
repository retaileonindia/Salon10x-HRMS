# 🚀 Deploy Now - Direct Steps for retaileonindia

Your GitHub repository is ready. Follow these steps to deploy **right now**:

## Step 1: Install Git (if you haven't)

**Download Git for Windows:**
- Visit: https://git-scm.com/download/win
- Run the installer
- Accept all defaults

## Step 2: Run Deployment Script

After installing Git, run this batch file:
```
DEPLOY-NOW.bat
```

This will:
1. ✓ Initialize Git repository
2. ✓ Create initial commit
3. ✓ Push to GitHub (retaileonindia/salon-hr)
4. ✓ Show you what to do next

## Step 3: Deploy to Vercel (5 minutes)

After the script completes:

1. **Go to:** https://vercel.com/new
2. **Click:** "Import Git Repository"
3. **Search:** `salon-hr` (or type the full URL)
4. **Select:** `retaileonindia/salon-hr`
5. **Configure:**
   - Framework Preset: `Other`
   - Build Command: `cd source && python3 build.py && cd ..`
   - Install Command: (leave blank)
   - Output Directory: (leave blank)
6. **Click:** Deploy

## Step 4: Wait for Build

Vercel will:
- Clone your repository ✓
- Run the Python build script ✓
- Generate index.html ✓
- Deploy worldwide ✓

Takes about 1-2 minutes.

## Step 5: Visit Your Live Site! 🎉

Your site will be available at:
```
https://salon-hr.vercel.app
```

(Or a custom URL if you configured one)

---

## 🎯 Commands if You Prefer Manual

If the batch script doesn't work, run these commands manually in PowerShell or Command Prompt:

```bash
cd "D:\Salon HR"

# Configure Git
git config --global user.email "noreply@salon-hr.local"
git config --global user.name "Salon HR"

# Initialize repository
git init
git add .
git commit -m "Initial commit: Salon HR platform"

# Add GitHub remote
git remote add origin https://github.com/retaileonindia/salon-hr.git
git branch -M main

# Push to GitHub
git push -u origin main
```

Then go to https://vercel.com/new and import your repository.

---

## ✅ Verification

After deployment, test:
- [ ] Homepage loads
- [ ] Admin login works (OTP: 123456)
- [ ] Staff app accessible
- [ ] Console opens
- [ ] Mobile responsive
- [ ] No console errors (F12)

---

## 📝 Before Going Live

Update `source/website/content.js`:
```javascript
const CONFIG = {
  phone: "98200 00000",           // ← Your actual number
  formEndpoint: "...",            // ← Your form endpoint
  formKey: "...",                 // ← Your form key
  linkedin: "...",
  instagram: "...",
};
```

Then:
```bash
git add source/website/content.js
git commit -m "Update contact info"
git push
```

Vercel will auto-redeploy! 🚀

---

**Questions?** See DEPLOY.md or DEPLOY-VISUAL-GUIDE.md

**Let's go live!** 🎉
