# Deployment Guide: GitHub → Netlify

This guide will walk you through deploying your Indigenous Art Gallery website.

## Prerequisites
- Git installed on your computer
- GitHub account
- Netlify account (free tier is fine)
- Google Sheet set up with your data

---

## Step 1: Set Up Google Sheets

### 1.1 Create Your Google Sheet
1. Go to Google Sheets: https://sheets.google.com
2. Create a new blank spreadsheet
3. Name it "Indigenous Art Gallery Data"

### 1.2 Create the Four Required Sheets

**Sheet 1: Site_Content**
- Column A: Section
- Column B: Content
- Add rows:
  - Intro | Discover authentic Indigenous artwork directly from talented artists
  - Mission | Our mission is to support Indigenous artists and preserve cultural stories through art...

**Sheet 2: Artists**
- Artist_ID | Name | Bio | Photo_URL | Country_Connection
- Example: 1 | Wanyubi Marika | Bio text here... | https://url-to-photo.jpg | Yolŋu, North East Arnhem Land

**Sheet 3: Artworks**
- Artwork_ID | Artist_ID | Title | Image_URL | Price | Brief_Story | Medium | Dimensions | Available
- Example: 1 | 1 | Artwork Title | https://url-to-image.jpg | 450 | Brief story... | Acrylic on canvas | 60x90cm | TRUE

**Sheet 4: Artwork_Details**
- Artwork_ID | Detailed_Story | Cultural_Significance | Creation_Date
- Example: 1 | Full detailed story here... | Cultural significance... | 2024

### 1.3 Make the Sheet Public
1. Click "Share" (top right)
2. Change from "Restricted" to "Anyone with the link"
3. Make sure it says "Viewer"
4. Click "Copy link"
5. From the URL, copy the Sheet ID (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 1.4 Update Config File
Open `js/config.js` and replace `YOUR_SHEET_ID_HERE` with your Sheet ID.

---

## Step 2: Test Locally

### 2.1 Open in Browser
1. Open `index.html` in your web browser
2. Check if data loads from your Google Sheet
3. Test navigation between pages
4. Add items to cart and test cart functionality

**OR use VS Code Live Server:**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### 2.2 Troubleshooting
- If data doesn't load, check:
  - Sheet ID is correct in `config.js`
  - Sheet is set to "Anyone with link can view"
  - Sheet tab names match exactly (case-sensitive)
  - Browser console (F12) for error messages

---

## Step 3: Push to GitHub

### 3.1 Initialize Git Repository
Open terminal/command prompt in your project folder:

```bash
git init
git add .
git commit -m "Initial commit - Indigenous Art Gallery"
```

### 3.2 Create GitHub Repository
1. Go to GitHub: https://github.com
2. Click "+" → "New repository"
3. Name: `indigenous-art-gallery`
4. Keep it Public (or Private if preferred)
5. **Don't** initialize with README
6. Click "Create repository"

### 3.3 Push Your Code
Copy the commands from GitHub (they'll look like this):

```bash
git remote add origin https://github.com/YOUR_USERNAME/indigenous-art-gallery.git
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy to Netlify

### 4.1 Sign Up for Netlify
1. Go to: https://www.netlify.com
2. Sign up with your GitHub account (easiest option)

### 4.2 Deploy from GitHub
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize Netlify to access your GitHub
4. Select your `indigenous-art-gallery` repository
5. Configure build settings:
   - **Base directory:** (leave empty)
   - **Build command:** (leave empty)
   - **Publish directory:** `/` or `.`
6. Click "Deploy site"

### 4.3 Wait for Deployment
- Netlify will build and deploy your site (takes ~1 minute)
- You'll get a random URL like: `https://random-name-12345.netlify.app`

### 4.4 Custom Domain (Optional)
1. Go to "Domain settings"
2. Add a custom domain you own
3. Follow Netlify's DNS configuration instructions

---

## Step 5: Configure Stripe (When Ready)

### 5.1 Create Stripe Account
1. Go to: https://stripe.com
2. Sign up for an account
3. Go through business verification

### 5.2 Get API Keys
1. In Stripe Dashboard, go to "Developers" → "API keys"
2. Copy your **Publishable key** (starts with `pk_test_...` for testing)
3. Open `js/config.js`
4. Replace `YOUR_STRIPE_KEY_HERE` with your key

### 5.3 Push Update
```bash
git add .
git commit -m "Add Stripe configuration"
git push
```
Netlify will auto-deploy the update!

### 5.4 Backend Required
- For full Stripe Checkout to work, you need a backend server
- Options:
  1. **Netlify Functions** (serverless, integrated)
  2. **Railway** (full backend server)
  3. **Vercel Functions** (serverless alternative)
- See `js/checkout.js` for backend code example

---

## Step 6: Update Content

### 6.1 Update via Google Sheets
- Simply edit your Google Sheet
- Changes appear on your site within ~1 minute (Google Sheets caches data)
- No need to redeploy!

### 6.2 Update Code
When you make code changes:
```bash
git add .
git commit -m "Description of changes"
git push
```
Netlify auto-deploys within 1-2 minutes.

---

## Troubleshooting

### Site Not Loading Data
1. Check Google Sheet is public
2. Verify Sheet ID in config.js
3. Check browser console (F12) for errors
4. Test locally first before debugging on Netlify

### Cart Not Working
- Check browser localStorage is enabled
- Try a different browser
- Clear browser cache and cookies

### Stripe Errors
- Make sure you're using Test mode keys during development
- Backend server is required for actual payments
- See checkout.js for implementation notes

### Netlify Build Fails
- This is a static site, builds should never fail
- If they do, contact Netlify support

---

## Ongoing Maintenance

### Adding New Artwork
1. Add row to "Artworks" sheet
2. Add matching row to "Artwork_Details" sheet
3. Upload images to a hosting service (Google Drive, Imgur, Cloudinary)
4. Use the image URLs in your sheet

### Adding New Artists
1. Add row to "Artists" sheet
2. Upload artist photo and use URL

### Monitoring Sales
- Stripe Dashboard shows all transactions
- Set up email notifications in Stripe
- Consider adding Google Sheets logging via webhook

---

## Need Help?

- **Google Sheets:** Check your sheet is public and IDs are correct
- **GitHub:** https://docs.github.com
- **Netlify:** https://docs.netlify.com
- **Stripe:** https://stripe.com/docs

---

## Your Site URLs

After deployment, save these:

- **Site URL:** https://your-site.netlify.app
- **GitHub Repo:** https://github.com/YOUR_USERNAME/indigenous-art-gallery
- **Google Sheet:** [Your sheet URL]
- **Netlify Dashboard:** https://app.netlify.com

---

Congratulations! Your Indigenous Art Gallery is now live! 🎨
