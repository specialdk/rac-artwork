// Individual Artwork Page JavaScript

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('main-nav').classList.toggle('active');
});

// Get artwork ID from URL
function getArtworkId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load artwork page
async function loadArtworkPage() {
    const artworkId = getArtworkId();
    
    if (!artworkId) {
        showError('artwork-container', 'No artwork specified. Please select an artwork from the gallery.');
        return;
    }

    try {
        showLoading('artwork-container');

        // Load complete artwork data
        const artwork = await sheetsAPI.getCompleteArtwork(artworkId);
        
        if (!artwork) {
            showError('artwork-container', 'Artwork not found.');
            return;
        }

        // Display artwork
        displayArtwork(artwork);

        // Update page title
        document.title = `${artwork.Title} - Indigenous Art Gallery`;

    } catch (error) {
        console.error('Error loading artwork:', error);
        showError('artwork-container', 'Error loading artwork. Please try again.');
    }
}

// Display artwork details
function displayArtwork(artwork) {
    const container = document.getElementById('artwork-container');
    
    const detailedStory = artwork.details.Detailed_Story || artwork.Brief_Story;
    const culturalSignificance = artwork.details.Cultural_Significance || '';
    const creationDate = artwork.details.Creation_Date || 'N/A';
    
    container.innerHTML = `
        <div class="artwork-detail">
            <!-- Image Section -->
            <div class="artwork-image-container">
                <img src="${artwork.Image_URL}" 
                     alt="${artwork.Title}" 
                     class="artwork-image-main"
                     onerror="this.src='https://via.placeholder.com/600x800?text=Image+Not+Available'">
            </div>

            <!-- Info Section -->
            <div class="artwork-info">
                <div class="artwork-header">
                    <h1 class="artwork-title">${artwork.Title}</h1>
                    <p class="artwork-artist-link">
                        by <a href="artist.html?id=${artwork.Artist_ID}">${artwork.artist.Name || 'Unknown Artist'}</a>
                    </p>
                </div>

                <div class="artwork-price-section">
                    <p style="margin: 0; color: var(--color-medium-gray); font-size: 0.9rem;">Price</p>
                    <div class="artwork-price-large">${formatPrice(artwork.Price)}</div>
                    ${parseFloat(artwork.Price) >= CONFIG.FREE_SHIPPING_THRESHOLD ? 
                        '<p style="margin-top: 8px; color: var(--color-accent); font-size: 0.9rem;">✓ Free shipping</p>' :
                        `<p style="margin-top: 8px; color: var(--color-medium-gray); font-size: 0.9rem;">+ ${formatPrice(CONFIG.SHIPPING_FLAT_RATE)} shipping</p>`
                    }
                    <button id="add-to-cart-btn" class="btn btn-primary btn-block mt-md" onclick="handleAddToCart()">
                        Add to Cart
                    </button>
                </div>

                <div class="artwork-description">
                    <h3>About This Artwork</h3>
                    <p>${detailedStory}</p>
                </div>

                ${culturalSignificance ? `
                    <div class="cultural-significance">
                        <h3>Cultural Significance</h3>
                        <p>${culturalSignificance}</p>
                    </div>
                ` : ''}

                <div>
                    <h3>Details</h3>
                    <ul class="artwork-details-list">
                        <li>
                            <span class="detail-label">Medium</span>
                            <span class="detail-value">${artwork.Medium || 'N/A'}</span>
                        </li>
                        <li>
                            <span class="detail-label">Dimensions</span>
                            <span class="detail-value">${artwork.Dimensions || 'N/A'}</span>
                        </li>
                        <li>
                            <span class="detail-label">Created</span>
                            <span class="detail-value">${creationDate}</span>
                        </li>
                        <li>
                            <span class="detail-label">Artist</span>
                            <span class="detail-value">
                                <a href="artist.html?id=${artwork.Artist_ID}">${artwork.artist.Name || 'Unknown'}</a>
                            </span>
                        </li>
                        <li>
                            <span class="detail-label">Availability</span>
                            <span class="detail-value" style="color: var(--color-accent); font-weight: 600;">
                                ${artwork.Available ? 'Available' : 'Sold'}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Update button state if already in cart
    updateAddToCartButton(artwork.Artwork_ID);
}

// Handle add to cart button click
function handleAddToCart() {
    const artworkId = getArtworkId();
    
    // Get artwork data
    sheetsAPI.getCompleteArtwork(artworkId).then(artwork => {
        if (artwork) {
            addToCart(artwork);
        }
    });
}

// Load page on DOM ready
document.addEventListener('DOMContentLoaded', loadArtworkPage);
