# Pre-Launch Checklist

Use this checklist before deploying to production.

## Deployment Setup ✓

- [x] `vercel.json` configured for static hosting
- [x] `package.json` created with build scripts
- [x] `.gitignore` configured to exclude build outputs
- [x] GitHub Actions workflow prepared (optional)
- [x] Deployment documentation created

## Before Pushing to GitHub

- [ ] Read `DEPLOY.md` for complete instructions
- [ ] Install Git if you haven't already
- [ ] Create GitHub account (free)
- [ ] Run `setup-deploy.bat` to initialize Git

## Code Configuration

Before deploying, update `source/website/content.js`:

```javascript
const CONFIG = {
  phone: "98200 00000",           // ← CHANGE: Your actual phone number
  formEndpoint: "...",            // ← CHANGE: Your form-to-email endpoint
  formKey: "...",                 // ← CHANGE: Your form key
  linkedin: "linkedin-link",      // ← CHANGE: Your LinkedIn URL
  instagram: "instagram-link",    // ← CHANGE: Your Instagram URL
};
```

Checklist:
- [ ] Phone number updated
- [ ] Form endpoint configured (Formspree, Basin, etc.)
- [ ] Social media links updated
- [ ] Demo testimonials replaced with real feedback
- [ ] All text verified for correctness and tone

## Vercel Account Setup

- [ ] Sign up at https://vercel.com (free)
- [ ] Link GitHub account to Vercel
- [ ] Enable automatic deployments

## Deployment

- [ ] All changes committed to Git
- [ ] Code pushed to GitHub
- [ ] Vercel deployment initiated
- [ ] Build completed successfully
- [ ] Live URL verified and working

## Post-Deployment Testing

- [ ] Website homepage loads correctly
- [ ] All navigation links work
- [ ] Forms are functional
- [ ] Admin login works with demo OTP (123456)
- [ ] Staff app accessible
- [ ] Console admin panel opens
- [ ] Responsive on mobile devices
- [ ] No console errors (F12)

## Going Beyond Demo

For production use, implement:

- [ ] Real OTP system (Twillio, AWS SNS, etc.)
- [ ] Backend database (PostgreSQL, MongoDB, etc.)
- [ ] Real payment processing (Razorpay, PayU, etc.)
- [ ] Email integration (SendGrid, AWS SES, etc.)
- [ ] File storage (AWS S3, Firebase Storage, etc.)
- [ ] User authentication & sessions
- [ ] Data encryption
- [ ] Regular backups
- [ ] Logging & monitoring
- [ ] Security audit

## Domain & Branding

- [ ] Custom domain purchased (optional)
- [ ] Domain connected to Vercel
- [ ] Email forwarding configured
- [ ] Favicon updated
- [ ] Meta tags optimized for social sharing

## Support & Documentation

- [ ] Team trained on deployment process
- [ ] Contact info posted for support
- [ ] Documentation stored safely
- [ ] Backup of source code maintained

## Legal & Compliance (India)

Before going live, verify with your CA and labour lawyer:
- [ ] Labour law rules applicable in your state
- [ ] PT slabs and calculations correct
- [ ] Leave policies compliant with state laws
- [ ] Privacy policy reviewed
- [ ] Terms of service reviewed
- [ ] Data protection compliance (GDPR/DPDP Act)

## Monitoring After Launch

- [ ] Monitor Vercel analytics dashboard
- [ ] Track user feedback and issues
- [ ] Review performance metrics
- [ ] Plan for feature updates
- [ ] Prepare for scaling

## Success Indicators 🎉

You're ready to celebrate when:
- ✅ Site is live and accessible
- ✅ Your team is using the platform
- ✅ Demo data is working as expected
- ✅ Users are registering for the HR service
- ✅ You're receiving inquiries

---

**Questions?** Check:
1. `DEPLOY.md` — Complete setup guide
2. `DEPLOYMENT-ARCHITECTURE.md` — How it all works
3. Vercel docs — https://vercel.com/docs
4. GitHub docs — https://docs.github.com

**Ready to launch? 🚀**
