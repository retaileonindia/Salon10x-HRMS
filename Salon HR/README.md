# Salon HR — platform prototype

**Open `index.html` in any browser.** Everything runs from that single file: website, salon admin, staff app and Salon HR console.

## Logins (demo OTP for all: 123456)
Go to **Login** on the website, then pick:
- **Salon owner / manager** → owner Neha Kapoor (98200 00000) or managers Ritu Shah / Arjun Rao
- **Salon staff** → tap any staff member on the login screen (e.g. Priya, Sneha)
- **Salon HR team** → Super Admin, or an HR partner (e.g. Pooja Menon)

Demo data is saved in the browser. Use Settings → Reset demo (salon admin) or Audit log → Reset demo data (console) to start again.

## Before going live — settings to fill in
In `source/website/content.js` → `CONFIG`:
- `phone` — your number for "Talk To Your HR"
- `formEndpoint` + `formKey` — form-to-email service so leads reach partners@salon10x.in
- `linkedin`, `instagram` — your real social links
- Replace the sample testimonials with verified client feedback

## Source layout
- `source/website/` — public website (shell.html = styles, content.js = text/services/blogs/policies, app.js = pages, login, lead form)
- `source/salon-admin-and-staff/` — owner/manager admin and staff app (one codebase; files are joined in order: core, docs, owner, rest, emp, ext, retain, vwh, init)
- `source/console/` — Salon HR super admin + HR partner console
- `source/build.py` — rebuilds `index.html` from the three parts. Copy the source files into one folder with the names build.py expects (site_shell.html, site_content.js, site_app.js, hrms_shell.html, the HRMS .js files, console_shell.html, console.js) and run `python3 build.py`.

## Prototype limits
This is a clickable prototype for demos and as a functional spec for developers. It has no server: OTPs, SMS/WhatsApp, email, payments, e-sign and BGV are simulated, and data does not sync between devices. The production build needs a backend (database per salon account, real OTP, file storage in India, PDF generation, payment and verification integrations).

Labour-law rules, PT slabs, letters and policies were drafted with care but must be reviewed by your CA and a labour lawyer before use.
