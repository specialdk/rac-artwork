# Indigenous Art Gallery Website

A platform for showcasing and selling Indigenous artwork, starting with Wanyubi Marika's collection.

## Setup Instructions

### 1. Google Sheets Setup

Create a Google Sheet with 4 tabs:

**Sheet 1: "Site_Content"**
| Section | Content |
|---------|---------|
| Intro | Your intro text |
| Mission | Your mission statement |

**Sheet 2: "Artists"**
| Artist_ID | Name | Bio | Photo_URL | Country_Connection |

**Sheet 3: "Artworks"**
| Artwork_ID | Artist_ID | Title | Image_URL | Price | Brief_Story | Medium | Dimensions | Available |

**Sheet 4: "Artwork_Details"**
| Artwork_ID | Detailed_Story | Cultural_Significance | Creation_Date |

### 2. Make Google Sheet Public
1. Click "Share" in your Google Sheet
2. Change to "Anyone with the link can view"
3. Copy the Sheet ID from the URL (between /d/ and /edit)

### 3. Configure the Site
Edit `js/config.js` and add:
- Your Google Sheet ID
- Your Stripe Publishable Key (when ready)

### 4. Local Testing
- Open `index.html` in a browser, or
- Use VS Code Live Server extension

### 5. Deploy to Netlify
1. Push code to GitHub
2. Go to Netlify.com
3. "New site from Git"
4. Connect your GitHub repo
5. Deploy!

### 6. Stripe Setup (Phase 2)
1. Create Stripe account at stripe.com
2. Get your Publishable Key from Dashboard
3. Add to `js/config.js`
4. Test with Stripe test cards

## Project Structure
```
indigenous-art-site/
├── index.html          # Home page
├── gallery.html        # All artworks
├── artwork.html        # Individual artwork
├── artist.html         # Artist bio
├── about.html          # About/Mission
├── cart.html           # Shopping cart
├── checkout.html       # Stripe checkout
├── css/
│   ├── main.css       # Main styles
│   └── components.css # Reusable components
├── js/
│   ├── config.js      # Configuration
│   ├── sheets.js      # Google Sheets connection
│   ├── gallery.js     # Gallery functionality
│   ├── artwork.js     # Individual artwork
│   ├── cart.js        # Shopping cart logic
│   └── checkout.js    # Stripe checkout
└── images/
    └── placeholder/   # Placeholder images
```

## Features
- ✅ Google Sheets as CMS
- ✅ Responsive design
- ✅ Shopping cart
- ✅ Stripe integration ready
- ✅ Indigenous-inspired design
- ✅ SEO friendly

## Support
Built for RAC by vibe coding with AI!
