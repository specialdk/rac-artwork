// Checkout Page JavaScript with Stripe Integration

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('main-nav').classList.toggle('active');
});

// Initialize Stripe
let stripe = null;

// Load checkout page
function loadCheckoutPage() {
    const items = cart.getItems();
    
    // Redirect if cart is empty
    if (items.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // Check if Stripe is configured
    if (!CONFIG.STRIPE_PUBLISHABLE_KEY || CONFIG.STRIPE_PUBLISHABLE_KEY === 'YOUR_STRIPE_KEY_HERE') {
        showCheckoutError('Stripe is not yet configured. Please contact the site administrator.');
        document.getElementById('checkout-button').disabled = true;
        return;
    }

    // Initialize Stripe
    try {
        stripe = Stripe(CONFIG.STRIPE_PUBLISHABLE_KEY);
    } catch (error) {
        console.error('Error initializing Stripe:', error);
        showCheckoutError('Error loading payment system. Please check your Stripe configuration.');
        return;
    }

    // Display order summary
    displayOrderSummary(items);
    
    // Set up checkout button
    setupCheckoutButton();
}

// Display order summary
function displayOrderSummary(items) {
    const itemsContainer = document.getElementById('checkout-items');
    const summaryContainer = document.getElementById('payment-summary');
    
    // Display items
    let itemsHtml = '<div class="cart-items">';
    items.forEach(item => {
        itemsHtml += `
            <div class="cart-item">
                <img src="${item.Image_URL}" alt="${item.Title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.Title}</h4>
                    <p class="cart-item-artist">by ${item.Artist_Name}</p>
                    <p class="cart-item-price">${formatPrice(item.Price)}</p>
                </div>
            </div>
        `;
    });
    itemsHtml += '</div>';
    itemsContainer.innerHTML = itemsHtml;

    // Display payment summary
    const subtotal = cart.getSubtotal();
    const shipping = cart.getShipping();
    const total = cart.getTotal();

    summaryContainer.innerHTML = `
        <div class="cart-summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        
        <div class="cart-summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        
        <div class="cart-summary-row cart-summary-total">
            <span class="label">Total</span>
            <span class="value">${formatPrice(total)}</span>
        </div>
    `;
}

// Set up checkout button
function setupCheckoutButton() {
    const button = document.getElementById('checkout-button');
    
    button.addEventListener('click', async function() {
        button.disabled = true;
        button.textContent = 'Processing...';
        
        try {
            // Note: For a real implementation, you need a backend to create Stripe Checkout sessions
            // This is a simplified example showing the frontend part
            
            showCheckoutError('Backend integration required: To complete Stripe checkout, you need to create a server endpoint that creates a Stripe Checkout session. See documentation at https://stripe.com/docs/checkout/quickstart');
            
            // Example of what the backend call would look like:
            /*
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.getStripeLineItems(),
                    shipping: cart.getShipping()
                })
            });
            
            const session = await response.json();
            
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
            
            if (result.error) {
                showCheckoutError(result.error.message);
            }
            */

        } catch (error) {
            console.error('Checkout error:', error);
            showCheckoutError('An error occurred during checkout. Please try again.');
        } finally {
            button.disabled = false;
            button.textContent = 'Pay with Stripe';
        }
    });
}

// Show checkout error
function showCheckoutError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Handle successful payment (called from success page)
function handleSuccessfulPayment() {
    // Clear cart
    cart.clear();
    
    // Show success message
    alert('Thank you for your purchase! You will receive a confirmation email shortly.');
    
    // Redirect to home
    window.location.href = 'index.html';
}

// Load page on DOM ready
document.addEventListener('DOMContentLoaded', loadCheckoutPage);

/* 
BACKEND IMPLEMENTATION NOTES:
=========================================

To complete Stripe integration, you need a backend server. Here's a basic example using Node.js/Express:

1. Install Stripe SDK:
   npm install stripe express

2. Create server endpoint (example: server.js):

const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const app = express();

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const { items, shipping } = req.body;
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: 'payment',
            success_url: 'https://yoursite.com/success.html?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://yoursite.com/cart.html',
            shipping_options: [{
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: Math.round(shipping * 100),
                        currency: 'aud',
                    },
                    display_name: 'Standard Shipping',
                }
            }]
        });
        
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000);

3. Deploy your backend to Railway or similar service

4. Update the fetch URL in this file to point to your backend

For Netlify deployment, you can use Netlify Functions:
https://docs.netlify.com/functions/overview/
*/
