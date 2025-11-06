// Gallery Page JavaScript

let allArtworks = [];
let allArtists = [];
let filteredArtworks = [];

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('main-nav').classList.toggle('active');
});

// Load gallery page
async function loadGalleryPage() {
    try {
        showLoading('gallery-grid');

        // Load all data
        allArtworks = await sheetsAPI.getAvailableArtworks();
        allArtists = await sheetsAPI.getArtists();
        
        // Populate artist filter
        populateArtistFilter();
        
        // Display all artworks initially
        filteredArtworks = [...allArtworks];
        displayArtworks();

        // Set up event listeners
        setupEventListeners();

    } catch (error) {
        console.error('Error loading gallery:', error);
        showError('gallery-grid', 'Error loading gallery. Please refresh the page.');
    }
}

// Populate artist filter dropdown
function populateArtistFilter() {
    const filterSelect = document.getElementById('artist-filter');
    
    allArtists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist.Artist_ID;
        option.textContent = artist.Name;
        filterSelect.appendChild(option);
    });
}

// Display artworks
async function displayArtworks() {
    const grid = document.getElementById('gallery-grid');
    const resultsCount = document.getElementById('results-count');
    
    if (filteredArtworks.length === 0) {
        grid.innerHTML = '<div class="empty-cart"><p>No artworks found matching your criteria.</p></div>';
        resultsCount.textContent = '';
        return;
    }

    // Update results count
    resultsCount.textContent = `Showing ${filteredArtworks.length} artwork${filteredArtworks.length !== 1 ? 's' : ''}`;

    // Create artwork cards
    let html = '';
    for (const artwork of filteredArtworks) {
        const artist = allArtists.find(a => a.Artist_ID == artwork.Artist_ID);
        html += createArtworkCard(artwork, artist);
    }
    
    grid.innerHTML = html;
}

// Create artwork card HTML
function createArtworkCard(artwork, artist) {
    return `
        <div class="artwork-card">
            <img src="${artwork.Image_URL}" alt="${artwork.Title}" class="artwork-card-image">
            <div class="artwork-card-content">
                <h3 class="artwork-card-title">${artwork.Title}</h3>
                <p class="artwork-card-artist">by ${artist ? artist.Name : 'Unknown Artist'}</p>
                <p class="artwork-card-story">${artwork.Brief_Story}</p>
                <div class="artwork-card-footer">
                    <span class="artwork-card-price">${formatPrice(artwork.Price)}</span>
                    <a href="artwork.html?id=${artwork.Artwork_ID}" class="artwork-card-details">View Details →</a>
                </div>
            </div>
        </div>
    `;
}

// Filter artworks
function filterArtworks() {
    const artistFilter = document.getElementById('artist-filter').value;
    const searchText = document.getElementById('search-box').value.toLowerCase();

    filteredArtworks = allArtworks.filter(artwork => {
        // Artist filter
        if (artistFilter !== 'all' && artwork.Artist_ID != artistFilter) {
            return false;
        }

        // Search filter
        if (searchText) {
            const artist = allArtists.find(a => a.Artist_ID == artwork.Artist_ID);
            const searchableText = `
                ${artwork.Title} 
                ${artwork.Brief_Story} 
                ${artist ? artist.Name : ''}
            `.toLowerCase();
            
            if (!searchableText.includes(searchText)) {
                return false;
            }
        }

        return true;
    });

    // Apply sorting
    sortArtworks();
    
    // Display filtered results
    displayArtworks();
}

// Sort artworks
function sortArtworks() {
    const sortBy = document.getElementById('sort-filter').value;

    switch (sortBy) {
        case 'price-low':
            filteredArtworks.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
            break;
        case 'price-high':
            filteredArtworks.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
            break;
        case 'title':
            filteredArtworks.sort((a, b) => a.Title.localeCompare(b.Title));
            break;
        case 'newest':
        default:
            // Assume artworks are already in newest-first order from sheet
            break;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Artist filter
    document.getElementById('artist-filter').addEventListener('change', filterArtworks);
    
    // Sort filter
    document.getElementById('sort-filter').addEventListener('change', () => {
        sortArtworks();
        displayArtworks();
    });
    
    // Search box with debounce
    let searchTimeout;
    document.getElementById('search-box').addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterArtworks, 300);
    });
}

// Load page on DOM ready
document.addEventListener('DOMContentLoaded', loadGalleryPage);
