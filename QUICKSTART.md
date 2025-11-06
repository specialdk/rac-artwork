# Quick Start Guide 🚀

Get your Indigenous Art Gallery up and running in 30 minutes!

## What You're Building
A professional art gallery website with:
- ✅ Beautiful Indigenous-inspired design
- ✅ Gallery with filtering and search
- ✅ Shopping cart
- ✅ Stripe payment integration (ready)
- ✅ Google Sheets as your CMS (no coding needed to add art!)
- ✅ Free hosting on Netlify

---

## 30-Minute Setup

### ⏱️ 5 Minutes: Set Up Google Sheets
1. Create new Google Sheet
2. Create 4 tabs: `Site_Content`, `Artists`, `Artworks`, `Artwork_Details`
3. Copy headers from `GOOGLE_SHEETS_TEMPLATE.md`
4. Add at least 1 artist and 3 artworks
5. Share → "Anyone with link can view"
6. Copy Sheet ID from URL

📖 **Detailed guide:** See `GOOGLE_SHEETS_TEMPLATE.md`

### ⏱️ 5 Minutes: Configure Your Site
1. Open `js/config.js`
2. Replace `YOUR_SHEET_ID_HERE` with your Sheet ID
3. (Optional) Update site name and branding
4. Save!

### ⏱️ 5 Minutes: Test Locally
1. Open `index.html` in your browser
   - OR use VS Code Live Server extension
2. Check if your data loads
3. Test navigation, cart, filters
4. Fix any issues before deploying

### ⏱️ 10 Minutes: Deploy to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/indigenous-art-gallery.git
git push -u origin main
```

### ⏱️ 5 Minutes: Deploy to Netlify
1. Sign up at netlify.com (use GitHub login)
2. "Add new site" → "Import from GitHub"
3. Select your repository
4. Click "Deploy site"
5. Done! Your site is live!

---

## What's Next?

### Add More Content
- Edit your Google Sheet to add more artworks
- Changes appear automatically (no redeployment needed!)
- Add artist photos and real artwork images

### Set Up Stripe (When Ready)
1. Create Stripe account
2. Get Publishable Key
3. Add to `config.js`
4. Set up backend for payments (see `DEPLOYMENT.md`)

### Customize Design
- Edit `css/main.css` for colors/fonts
- Update hero text in Google Sheets
- Add your logo and favicon

### Custom Domain
- Buy domain (Namecheap, Google Domains, etc.)
- Add to Netlify: Settings → Domain management
- Follow DNS setup instructions

---

## File Structure

```
indigenous-art-site/
├── index.html              ← Home page
├── gallery.html           ← All artworks
├── artwork.html           ← Individual artwork
├── artist.html            ← Artist profiles
├── about.html             ← About/Mission page
├── cart.html              ← Shopping cart
├── checkout.html          ← Stripe checkout
│
├── css/
│   ├── main.css          ← Main styles
│   └── components.css    ← Component styles
│
├── js/
│   ├── config.js         ← ⚙️ YOUR SETTINGS HERE
│   ├── sheets.js         ← Google Sheets integration
│   ├── cart.js           ← Shopping cart logic
│   ├── gallery.js        ← Gallery page logic
│   ├── artwork.js        ← Individual artwork page
│   └── checkout.js       ← Stripe checkout
│
├── images/               ← Your images go here (optional)
│
└── Documentation:
    ├── README.md                    ← Overview
    ├── DEPLOYMENT.md                ← Full deployment guide
    ├── GOOGLE_SHEETS_TEMPLATE.md    ← Sheet setup guide
    └── QUICKSTART.md                ← This file!
```

---

## Key Files to Edit

### 1. `js/config.js` ⚙️
**MUST EDIT** - Add your Google Sheet ID and Stripe key

### 2. Google Sheets 📊
Your content management system - edit anytime!

### 3. `css/main.css` 🎨
Change colors, fonts, styling

### 4. Footer Content 📝
Edit footer in each HTML file (same footer on all pages)

---

## Troubleshooting

### "Data not loading"
- ✅ Is Google Sheet public?
- ✅ Is Sheet ID correct in config.js?
- ✅ Are sheet tab names exactly: `Site_Content`, `Artists`, `Artworks`, `Artwork_Details`?
- ✅ Check browser console (F12) for errors

### "Images not showing"
- ✅ Image URLs must be direct links (end in .jpg, .png)
- ✅ Test image URL in new browser tab
- ✅ Make sure Google Drive links are public
- ✅ Use placeholder images for testing: `https://via.placeholder.com/600x800`

### "Cart not working"
- ✅ Check browser allows localStorage
- ✅ Try different browser
- ✅ Clear cache and cookies

### "Stripe errors"
- ✅ Need backend server for actual payments
- ✅ See `js/checkout.js` for instructions
- ✅ Frontend setup is complete, just need backend

---

## Pro Tips 💡

### Images
- Use high quality (1000px+ width)
- Consider professional photography
- Compress for web (use TinyPNG.com)
- Use consistent aspect ratios

### Content
- Write compelling artwork stories
- Include cultural context
- Add artist background and connection to country
- Use authentic language and terminology

### Performance
- Google Sheets caches for ~1 min
- Site loads fast (static files)
- Images are biggest performance factor
- Use image CDN for large galleries (Cloudinary)

### SEO
- Update page titles in each HTML file
- Add meta descriptions
- Use descriptive alt text for images
- Submit to Google Search Console

---

## Common Customizations

### Change Colors
Edit `css/main.css` → `:root` section:
```css
--color-ochre: #CC6B2C;      /* Main accent */
--color-deep-red: #8B2635;   /* Hover state */
--color-earth-brown: #6B4423; /* Borders */
```

### Change Site Name
Search and replace "Indigenous Art Gallery" in all HTML files

### Add Your Logo
1. Add logo image to `images/` folder
2. Update `.site-logo` in each HTML file
3. Use `<img>` instead of text

### Change Fonts
Edit `css/main.css` → `:root` section:
```css
--font-primary: 'Georgia', serif;  /* Headers */
--font-secondary: 'Arial', sans-serif; /* Body text */
```

### Adjust Shipping
Edit `js/config.js`:
```javascript
SHIPPING_FLAT_RATE: 15.00,
FREE_SHIPPING_THRESHOLD: 200.00,
```

---

## Getting Help

### Documentation
- 📖 `README.md` - Project overview
- 🚀 `DEPLOYMENT.md` - Detailed deployment steps
- 📊 `GOOGLE_SHEETS_TEMPLATE.md` - Sheet setup
- ⚡ `QUICKSTART.md` - This guide!

### Resources
- **Netlify Docs:** https://docs.netlify.com
- **Stripe Docs:** https://stripe.com/docs
- **Google Sheets API:** https://developers.google.com/sheets/api

### Test Environment
- Always test locally before deploying
- Use browser dev tools (F12) to debug
- Check console for JavaScript errors
- Test on mobile devices

---

## Launch Checklist ✅

Before going live:
- [ ] Real content in Google Sheets
- [ ] Professional artwork photos
- [ ] Artist permissions obtained
- [ ] Prices finalized
- [ ] Stripe account set up
- [ ] Test purchases completed
- [ ] Mobile responsive checked
- [ ] All links work
- [ ] Contact email updated
- [ ] Legal pages added (if needed)
- [ ] Privacy policy (if collecting emails)

---

## You're Ready! 🎉

Your site is now live and ready to showcase beautiful Indigenous art!

**Next steps:**
1. Share your site URL with artists
2. Promote on social media
3. Add more artworks over time
4. Gather feedback and improve

**Your site:** https://your-site.netlify.app

---

Need more help? Check the other documentation files or open an issue on GitHub!
