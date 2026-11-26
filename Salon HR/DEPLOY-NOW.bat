@echo off
REM Quick deployment script for Salon HR to Vercel
REM Run this after installing Git: https://git-scm.com/download/win

cd /d "D:\Salon HR"

echo.
echo =========================================================
echo Salon HR - Vercel Deployment Script
echo =========================================================
echo.

REM Configure Git
echo Setting up Git...
git config --global user.email "noreply@salon-hr.local"
git config --global user.name "Salon HR CI"

REM Initialize repository
echo Initializing repository...
git init
git add .
git commit -m "Initial commit: Salon HR platform

- Configured for Vercel deployment
- Website, admin/staff app, and HR console
- Demo data included
- Python build script integrated"

echo.
echo =========================================================
echo Adding GitHub remote...
echo =========================================================
echo.

REM Add remote
git remote add origin https://github.com/retaileonindia/salon-hr.git
git branch -M main

echo.
echo =========================================================
echo Pushing to GitHub...
echo =========================================================
echo.

REM Push to GitHub
git push -u origin main

echo.
echo =========================================================
echo ✓ Code pushed to GitHub!
echo =========================================================
echo.
echo Next step: Deploy to Vercel
echo 1. Go to: https://vercel.com/new
echo 2. Click "Import Git Repository"
echo 3. Select: retaileonindia/salon-hr
echo 4. Build Command: cd source ^&^& python3 build.py ^&^& cd ..
echo 5. Click "Deploy"
echo.
echo Your site will be live at:
echo https://salon-hr-YOUR-NAME.vercel.app
echo.
pause
