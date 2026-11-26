@echo off
REM Salon HR - Push to GitHub Script
REM This script pushes your code to your GitHub repository

setlocal enabledelayedexpansion

cd /d "D:\Salon HR"

echo.
echo ================================================
echo Salon HR - Pushing to GitHub
echo ================================================
echo.

REM Set token (replace with your actual token if needed)
set GIT_TOKEN=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
set REPO_URL=https://!GIT_TOKEN!@github.com/retaileonindia/Salon10x-HRMS.git

echo Pushing code to GitHub...
echo.

git push "!REPO_URL!" main --force

if errorlevel 1 (
    echo.
    echo ✗ Push failed. Try these alternatives:
    echo.
    echo Option A: Use GitHub CLI (if installed)
    echo   gh auth login
    echo   cd "D:\Salon HR"
    echo   git push -u origin main --force
    echo.
    echo Option B: Configure Git credentials in Windows
    echo   1. Open: Control Panel ^> Credential Manager
    echo   2. Click: Windows Credentials
    echo   3. Add Generic Credential for github.com
    echo   4. Username: retaileonindia
    echo   5. Password: (your GitHub personal access token)
    echo   6. Try pushing again
    echo.
    echo Option C: Use web interface
    echo   1. Go to: https://github.com/retaileonindia/Salon10x-HRMS
    echo   2. Click: "Add file" ^> "Upload files"
    echo   3. Upload all files from D:\Salon HR\
    echo.
) else (
    echo.
    echo ================================================
    echo ✓ Code pushed to GitHub successfully!
    echo ================================================
    echo.
    echo Next Step: Deploy to Vercel
    echo 1. Go to: https://vercel.com/new
    echo 2. Click: "Import Git Repository"
    echo 3. Find: retaileonindia/Salon10x-HRMS
    echo 4. Build Command: cd source ^&^& python3 build.py ^&^& cd ..
    echo 5. Click: Deploy
    echo.
    echo Your site will be live at:
    echo https://salon10x-hrms.vercel.app
    echo.
)

pause
