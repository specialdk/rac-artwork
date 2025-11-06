# Google Sheets Template Guide

This guide shows you exactly what data to put in your Google Sheet.

## Quick Setup Checklist
- [ ] Create new Google Sheet
- [ ] Create 4 tabs (exact names below)
- [ ] Add column headers (case-sensitive!)
- [ ] Add your data
- [ ] Set to "Anyone with link can view"
- [ ] Copy Sheet ID
- [ ] Update config.js

---

## Sheet 1: Site_Content

### Column Headers (Row 1):
| Section | Content |

### Sample Data:
| Section | Content |
|---------|---------|
| Intro | Discover authentic Indigenous artwork created by talented artists, each piece telling a unique story of culture and connection to country |
| Mission | Our mission is to support Indigenous artists by providing a platform to share their work with the world. Every purchase directly supports the artist and helps preserve important cultural stories and traditions through art |

**Notes:**
- You can add more sections if needed
- Keep Intro brief (1-2 sentences)
- Mission can be longer (2-3 paragraphs)

---

## Sheet 2: Artists

### Column Headers (Row 1):
| Artist_ID | Name | Bio | Photo_URL | Country_Connection |

### Sample Data for Wanyubi Marika:
| Artist_ID | Name | Bio | Photo_URL | Country_Connection |
|-----------|------|-----|-----------|-------------------|
| 1 | Wanyubi Marika | [Your bio text about Wanyubi - his background, artistic journey, connection to culture, etc. Can be several paragraphs.] | https://example.com/wanyubi-photo.jpg | Yolŋu, North East Arnhem Land |

**Important:**
- `Artist_ID` must be unique numbers (1, 2, 3, etc.)
- `Name` - Full name of the artist
- `Bio` - Can be long, tell their story
- `Photo_URL` - Direct link to artist's photo
- `Country_Connection` - Their connection to country/land

**Getting Image URLs:**
1. Upload to Google Drive → Share → "Anyone with link can view" → Get link
2. Or use free image hosting: Imgur, Cloudinary
3. Must be direct image URL (ends in .jpg, .png, etc.)

---

## Sheet 3: Artworks

### Column Headers (Row 1):
| Artwork_ID | Artist_ID | Title | Image_URL | Price | Brief_Story | Medium | Dimensions | Available |

### Sample Data:
| Artwork_ID | Artist_ID | Title | Image_URL | Price | Brief_Story | Medium | Dimensions | Available |
|------------|-----------|-------|-----------|-------|-------------|---------|------------|-----------|
| 1 | 1 | Gapu (Water) | https://example.com/artwork1.jpg | 850 | This painting depicts the sacred water cycles and their importance to Yolŋu culture | Acrylic on canvas | 90cm x 60cm | TRUE |
| 2 | 1 | Madayin | https://example.com/artwork2.jpg | 1200 | A representation of sacred ceremonies and the connection between land and spirit | Ochre on bark | 120cm x 80cm | TRUE |

**Important:**
- `Artwork_ID` - Unique number for each artwork
- `Artist_ID` - Must match an ID from Artists sheet
- `Title` - Artwork title
- `Image_URL` - Direct link to artwork image (high quality!)
- `Price` - Number only, no dollar sign (e.g., 850 not $850)
- `Brief_Story` - Short description (2-3 sentences) for gallery view
- `Medium` - What the artwork is made with
- `Dimensions` - Size of the artwork
- `Available` - Must be `TRUE` or `FALSE` (all caps)

**Placeholder Images:**
If you don't have real artwork photos yet, use:
- https://via.placeholder.com/600x800?text=Artwork+1
- https://via.placeholder.com/600x800?text=Artwork+2
- Etc.

---

## Sheet 4: Artwork_Details

### Column Headers (Row 1):
| Artwork_ID | Detailed_Story | Cultural_Significance | Creation_Date |

### Sample Data:
| Artwork_ID | Detailed_Story | Cultural_Significance | Creation_Date |
|------------|----------------|----------------------|---------------|
| 1 | This artwork explores the deep connection between water and life in Yolŋu culture. The flowing patterns represent the movement of water across the land, bringing life and sustenance. The artist uses traditional designs passed down through generations, each element holding specific meaning and connection to ancestral stories. | Water (Gapu) is central to Yolŋu cosmology, representing the life force that connects all things. This piece follows traditional design protocols and tells a story that has been shared for thousands of years. | 2024 |
| 2 | [Longer, more detailed description of the artwork, the creation process, the meaning behind specific elements, and the artist's personal connection to the work. Can be several paragraphs.] | This artwork relates to [specific ceremonies, cultural practices, or spiritual beliefs]. The designs follow strict cultural protocols and represent [specific elements of culture]. | 2023 |

**Important:**
- `Artwork_ID` - Must match IDs from Artworks sheet
- `Detailed_Story` - Full, rich description of the artwork (can be multiple paragraphs)
- `Cultural_Significance` - Explain the cultural meaning and importance
- `Creation_Date` - Year created (e.g., 2024)

---

## Tips for Getting Started

### Start Small
1. Create 1 artist (Wanyubi Marika)
2. Add 5-10 artworks to start
3. Test everything works
4. Add more over time

### Image Quality
- Use high-resolution images (at least 1000px wide)
- Images should be well-lit and clear
- Consider professional photography for best results
- JPEG or PNG format

### Placeholder Content
If you don't have real content yet:
- Use Lorem Ipsum for bio/stories
- Use placeholder images
- Use test prices like $100, $200, etc.
- Replace with real content before going live

### Price Strategy
- Research similar artwork prices
- Consider:
  - Size of artwork
  - Medium used
  - Artist experience
  - Cultural significance
  - Time to create

### Free Shipping Threshold
- Set in config.js (default: $200)
- Encourages larger purchases
- Calculate based on your shipping costs

---

## Common Mistakes to Avoid

❌ **DON'T:**
- Use dollar signs in Price column ($850) - just numbers (850)
- Spell Available as "true" - must be "TRUE" or "FALSE"
- Change column header names or spelling
- Use private/restricted image URLs
- Forget to match Artist_ID between sheets

✅ **DO:**
- Use all caps for TRUE/FALSE
- Use numbers only for prices
- Match IDs exactly between sheets
- Test that images load
- Set sheet to public

---

## Testing Your Sheet

### Quick Test Checklist
1. Open your sheet in Incognito/Private browser
2. Can you view it without logging in? ✓
3. Are all 4 tabs present? ✓
4. Do all columns match the template exactly? ✓
5. Copy your Sheet ID from the URL ✓
6. Paste it into config.js ✓
7. Open index.html - does data load? ✓

---

## Need More Artists/Artworks?

Just add more rows! The template supports unlimited:
- Artists (just increment Artist_ID: 1, 2, 3...)
- Artworks (increment Artwork_ID: 1, 2, 3...)
- Artwork Details (match existing Artwork_IDs)

---

## Example Sheet ID Location

From this URL:
```
https://docs.google.com/spreadsheets/d/1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P/edit#gid=0
```

Your Sheet ID is:
```
1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P
```

Put it in config.js:
```javascript
GOOGLE_SHEET_ID: '1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P',
```

---

## Ready to Start?

1. Create your Google Sheet using this template
2. Add your data
3. Set to public
4. Update config.js with your Sheet ID
5. Test locally
6. Deploy to Netlify!

---

Need help? Check the DEPLOYMENT.md guide!
