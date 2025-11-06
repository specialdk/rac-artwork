// Shopping Cart Management
// Uses localStorage to persist cart across sessions

class ShoppingCart {
    constructor() {
        this.storageKey = 'indigenous_art_cart';
        this.items = this.loadCart();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            this.updateCartCount();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Add item to cart
    addItem(artwork) {
        // Check if item already exists
        const existingIndex = this.items.findIndex(item => item.Artwork_ID === artwork.Artwork_ID);
        
        if (existingIndex > -1) {
            // Item already in cart
            alert('This artwork is already in your cart!');
            return false;
        }

        // Add new item
        this.items.push({
            Artwork_ID: artwork.Artwork_ID,
            Title: artwork.Title,
            Artist_Name: artwork.artist ? artwork.artist.Name : 'Unknown Artist',
            Price: parseFloat(artwork.Price),
            Image_URL: artwork.Image_URL,
            addedAt: new Date().toISOString()
        });

        this.saveCart();
        console.log('Added to cart:', artwork.Title);
        return true;
    }

    // Remove item from cart
    removeItem(artworkId) {
        const index = this.items.findIndex(item => item.Artwork_ID == artworkId);
        if (index > -1) {
            const removed = this.items.splice(index, 1);
            this.saveCart();
            console.log('Removed from cart:', removed[0].Title);
            return true;
        }
        return false;
    }

    // Get all items in cart
    getItems() {
        return this.items;
    }

    // Get cart count
    getCount() {
        return this.items.length;
    }

    // Check if item is in cart
    hasItem(artworkId) {
        return this.items.some(item => item.Artwork_ID == artworkId);
    }

    // Calculate subtotal
    getSubtotal() {
        return this.items.reduce((total, item) => total + item.Price, 0);
    }

    // Calculate shipping
    getShipping() {
        const subtotal = this.getSubtotal();
        if (subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD) {
            return 0;
        }
        return CONFIG.SHIPPING_FLAT_RATE;
    }

    // Calculate total
    getTotal() {
        return this.getSubtotal() + this.getShipping();
    }

    // Clear cart
    clear() {
        this.items = [];
        this.saveCart();
        console.log('Cart cleared');
    }

    // Update cart count badge in header
    updateCartCount() {
        const countElement = document.getElementById('cart-count');
        const count = this.getCount();
        
        if (countElement) {
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // Get cart data formatted for Stripe
    getStripeLineItems() {
        return this.items.map(item => ({
            price_data: {
                currency: CONFIG.CURRENCY.toLowerCase(),
                product_data: {
                    name: item.Title,
                    description: `By ${item.Artist_Name}`,
                    images: [item.Image_URL]
                },
                unit_amount: Math.round(item.Price * 100) // Stripe uses cents
            },
            quantity: 1
        }));
    }
}

// Create global cart instance
const cart = new ShoppingCart();

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCount();
});

// Function to add to cart from product page
function addToCart(artwork) {
    const success = cart.addItem(artwork);
    
    if (success) {
        // Show success message
        showSuccessMessage('Added to cart!');
        
        // Update button state if on artwork page
        updateAddToCartButton(artwork.Artwork_ID);
    }
}

// Function to remove from cart
function removeFromCart(artworkId) {
    if (confirm('Remove this item from your cart?')) {
        cart.removeItem(artworkId);
        
        // Reload cart page if we're on it
        if (window.location.pathname.includes('cart.html')) {
            loadCartPage();
        }
    }
}

// Update "Add to Cart" button state
function updateAddToCartButton(artworkId) {
    const button = document.getElementById('add-to-cart-btn');
    if (button) {
        if (cart.hasItem(artworkId)) {
            button.textContent = 'In Cart ✓';
            button.disabled = true;
            button.style.opacity = '0.6';
        } else {
            button.textContent = 'Add to Cart';
            button.disabled = false;
            button.style.opacity = '1';
        }
    }
}

// Show success message
function showSuccessMessage(message) {
    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = 'success-message';
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '20px';
    msgDiv.style.right = '20px';
    msgDiv.style.zIndex = '10000';
    msgDiv.style.animation = 'slideIn 0.3s ease';
    msgDiv.textContent = message;
    
    document.body.appendChild(msgDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        msgDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => msgDiv.remove(), 300);
    }, 3000);
}

// Add CSS animation for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
