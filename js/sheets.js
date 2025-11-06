// Google Sheets API Integration
// This file handles all data fetching from Google Sheets

class SheetsAPI {
    constructor() {
        this.baseUrl = 'https://docs.google.com/spreadsheets/d/';
        this.sheetId = CONFIG.GOOGLE_SHEET_ID;
        this.cache = {}; // Simple cache to avoid repeated requests
    }

    // Build the URL to fetch sheet data as JSON
    getSheetUrl(sheetName) {
        return `${this.baseUrl}${this.sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
    }

    // Fetch data from a specific sheet
    async fetchSheet(sheetName) {
        // Check cache first
        if (this.cache[sheetName]) {
            console.log(`Using cached data for ${sheetName}`);
            return this.cache[sheetName];
        }

        try {
            const url = this.getSheetUrl(sheetName);
            const response = await fetch(url);
            const text = await response.text();
            
            // Google Sheets returns JSONP, we need to extract the JSON
            const json = this.parseGoogleSheetsResponse(text);
            
            // Convert to a more usable format
            const data = this.convertToObjects(json);
            
            // Cache the result
            this.cache[sheetName] = data;
            
            console.log(`Fetched ${data.length} rows from ${sheetName}`);
            return data;
        } catch (error) {
            console.error(`Error fetching sheet ${sheetName}:`, error);
            throw new Error(`Failed to load data from ${sheetName}. Please check your Google Sheet ID and make sure the sheet is public.`);
        }
    }

    // Parse Google Sheets JSONP response
    parseGoogleSheetsResponse(text) {
        // Remove the JSONP wrapper
        const jsonString = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1];
        return JSON.parse(jsonString);
    }

    // Convert Google Sheets format to array of objects
    convertToObjects(json) {
        const rows = json.table.rows;
        const cols = json.table.cols;
        
        // Get column headers
        const headers = cols.map(col => col.label || col.id);
        
        // Convert each row to an object
        return rows.map(row => {
            const obj = {};
            row.c.forEach((cell, index) => {
                const header = headers[index];
                obj[header] = cell ? cell.v : null;
            });
            return obj;
        });
    }

    // Get site content (Intro, Mission, etc.)
    async getSiteContent() {
        const data = await this.fetchSheet(CONFIG.SHEETS.SITE_CONTENT);
        // Convert array to object for easier access
        const content = {};
        data.forEach(row => {
            if (row.Section && row.Content) {
                content[row.Section] = row.Content;
            }
        });
        return content;
    }

    // Get all artists
    async getArtists() {
        return await this.fetchSheet(CONFIG.SHEETS.ARTISTS);
    }

    // Get specific artist by ID
    async getArtist(artistId) {
        const artists = await this.getArtists();
        return artists.find(artist => artist.Artist_ID == artistId);
    }

    // Get all artworks
    async getArtworks() {
        return await this.fetchSheet(CONFIG.SHEETS.ARTWORKS);
    }

    // Get available artworks only
    async getAvailableArtworks() {
        const artworks = await this.getArtworks();
        return artworks.filter(artwork => 
            artwork.Available === true || 
            artwork.Available === 'TRUE' || 
            artwork.Available === 'true'
        );
    }

    // Get specific artwork by ID
    async getArtwork(artworkId) {
        const artworks = await this.getArtworks();
        return artworks.find(artwork => artwork.Artwork_ID == artworkId);
    }

    // Get artwork details (detailed story, cultural significance)
    async getArtworkDetails(artworkId) {
        const details = await this.fetchSheet(CONFIG.SHEETS.ARTWORK_DETAILS);
        return details.find(detail => detail.Artwork_ID == artworkId);
    }

    // Get complete artwork info (combines artwork + details + artist)
    async getCompleteArtwork(artworkId) {
        try {
            const artwork = await this.getArtwork(artworkId);
            if (!artwork) return null;

            const details = await this.getArtworkDetails(artworkId);
            const artist = await this.getArtist(artwork.Artist_ID);

            return {
                ...artwork,
                details: details || {},
                artist: artist || {}
            };
        } catch (error) {
            console.error('Error getting complete artwork:', error);
            return null;
        }
    }

    // Get artworks by artist
    async getArtworksByArtist(artistId) {
        const artworks = await this.getArtworks();
        return artworks.filter(artwork => artwork.Artist_ID == artistId);
    }

    // Clear cache (useful for refresh)
    clearCache() {
        this.cache = {};
        console.log('Cache cleared');
    }
}

// Create a global instance
const sheetsAPI = new SheetsAPI();

// Helper function to format price
function formatPrice(price) {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return CONFIG.CURRENCY_SYMBOL + '0.00';
    return CONFIG.CURRENCY_SYMBOL + numPrice.toFixed(2);
}

// Helper function to display loading state
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }
}

// Helper function to display error
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="error-message">${message}</div>`;
    }
}

// Test function to verify Google Sheets connection
async function testSheetsConnection() {
    try {
        console.log('Testing Google Sheets connection...');
        console.log('Sheet ID:', CONFIG.GOOGLE_SHEET_ID);
        
        const content = await sheetsAPI.getSiteContent();
        console.log('✅ Successfully connected to Google Sheets!');
        console.log('Site content:', content);
        
        return true;
    } catch (error) {
        console.error('❌ Failed to connect to Google Sheets:', error);
        alert('Failed to connect to Google Sheets. Please check:\n1. Your Sheet ID in config.js\n2. The sheet is set to "Anyone with link can view"\n3. Sheet tab names match exactly');
        return false;
    }
}
