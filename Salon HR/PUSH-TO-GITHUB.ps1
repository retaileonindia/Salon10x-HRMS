#!/usr/bin/env pwsh
# Salon HR - Push to GitHub Script
# Run this script to push your code to GitHub

$ErrorActionPreference = "Continue"

Write-Host "`n"
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Salon HR - Pushing to GitHub" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

cd "D:\Salon HR"

# Check if git is available
$gitPath = "C:\Program Files\Git\bin\git.exe"
if (-not (Test-Path $gitPath)) {
    Write-Host "✗ Git not found at: $gitPath" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

$git = $gitPath
$token = "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"
$repoUrl = "https://$($token)@github.com/retaileonindia/Salon10x-HRMS.git"

Write-Host "Repository: https://github.com/retaileonindia/Salon10x-HRMS" -ForegroundColor Cyan
Write-Host "Branch: main" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pushing code..." -ForegroundColor Yellow
Write-Host ""

# Configure git
& $git config credential.helper ""

# Push
$output = & $git push "$repoUrl" main --force 2>&1
Write-Host $output

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "✓ Code pushed to GitHub successfully!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Step: Deploy to Vercel" -ForegroundColor Cyan
    Write-Host "1. Go to: https://vercel.com/new" -ForegroundColor White
    Write-Host "2. Click: `"Import Git Repository`"" -ForegroundColor White
    Write-Host "3. Find: retaileonindia/Salon10x-HRMS" -ForegroundColor White
    Write-Host "4. Build Command: cd source && python3 build.py && cd .." -ForegroundColor White
    Write-Host "5. Click: Deploy" -ForegroundColor White
    Write-Host ""
    Write-Host "Your site will be live at:" -ForegroundColor Cyan
    Write-Host "https://salon10x-hrms.vercel.app" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "✗ Push failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try these alternatives:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option A: Use GitHub CLI" -ForegroundColor White
    Write-Host "  1. Install from: https://cli.github.com/" -ForegroundColor Gray
    Write-Host "  2. Run: gh auth login" -ForegroundColor Gray
    Write-Host "  3. Run: cd 'D:\Salon HR' && git push -u origin main --force" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option B: Windows Credential Manager" -ForegroundColor White
    Write-Host "  1. Control Panel > Credential Manager > Windows Credentials" -ForegroundColor Gray
    Write-Host "  2. Add Generic Credential for github.com" -ForegroundColor Gray
    Write-Host "  3. Username: retaileonindia" -ForegroundColor Gray
    Write-Host "  4. Password: (your GitHub token)" -ForegroundColor Gray
    Write-Host "  5. Try running this script again" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option C: Web Upload" -ForegroundColor White
    Write-Host "  1. Go to: https://github.com/retaileonindia/Salon10x-HRMS" -ForegroundColor Gray
    Write-Host "  2. Click: Add file > Upload files" -ForegroundColor Gray
    Write-Host "  3. Upload contents of: D:\Salon HR\" -ForegroundColor Gray
    Write-Host ""
}

Read-Host "`nPress Enter to exit"
