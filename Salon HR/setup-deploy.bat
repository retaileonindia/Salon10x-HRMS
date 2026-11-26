@echo off
REM Salon HR - Vercel Deployment Setup Script
REM This script initializes Git and prepares the project for Vercel deployment

echo.
echo ========================================
echo Salon HR - Vercel Deployment Setup
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

REM Check if already a git repo
if exist .git (
    echo Git repository already initialized
) else (
    echo Initializing Git repository...
    git init
    if errorlevel 1 goto error
)

REM Add all files
echo Adding files to Git...
git add .
if errorlevel 1 goto error

REM Create initial commit
echo Creating initial commit...
git commit -m "Initial commit: Salon HR platform" -q
if errorlevel 1 (
    echo Commit already exists or no changes to commit
)

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Create a GitHub Repository:
echo    - Go to https://github.com/new
echo    - Name it: salon-hr
echo    - DO NOT initialize with README or .gitignore
echo    - Click "Create repository"
echo.
echo 2. Add GitHub as remote and push:
echo    git remote add origin https://github.com/YOUR-USERNAME/salon-hr.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Deploy to Vercel:
echo    - Go to https://vercel.com/new
echo    - Import your GitHub repository
echo    - Build Command: cd source ^&^& python3 build.py ^&^& cd ..
echo    - Click "Deploy"
echo.
echo For detailed instructions, see: DEPLOY.md
echo.
pause
exit /b 0

:error
echo ERROR: Failed to initialize Git repository
pause
exit /b 1
