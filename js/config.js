// Configuration file - Update these values with your actual credentials

const CONFIG = {
  // Google Sheets Configuration
  // 1. Create your Google Sheet with the 4 tabs as described in README
  // 2. Make it public (Share > Anyone with link can view)
  // 3. Copy the Sheet ID from URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
  GOOGLE_SHEET_ID: "1WupqF-K8EOAEoFEKR38B0AvrmOLZpLZwwxtDVGs3d8I",

  // Sheet tab names (must match exactly)
  SHEETS: {
    SITE_CONTENT: "Site_Content",
    ARTISTS: "Artists",
    ARTWORKS: "Artworks",
    ARTWORK_DETAILS: "Artwork_Details",
  },

  // Stripe Configuration
  // Get your publishable key from: https://dashboard.stripe.com/apikeys
  // Use test key (starts with pk_test_) for testing
  STRIPE_PUBLISHABLE_KEY: "YOUR_STRIPE_KEY_HERE",

  // Site Configuration
  SITE_NAME: "Indigenous Art Gallery",
  CURRENCY: "AUD",
  CURRENCY_SYMBOL: "$",

  // Shipping (you can adjust this later)
  SHIPPING_FLAT_RATE: 15.0,
  FREE_SHIPPING_THRESHOLD: 200.0,
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
