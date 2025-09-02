const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Function to increase quantity
function increaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
}

// Function to decrease quantity
function decreaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
    }
}

// Function to show the order form
function showOrderForm() {
    const orderedItems = document.querySelectorAll('.ordered-item');
    if (orderedItems.length === 0) {
        alert("Silakan memilih menu yang akan dipesan terlebih dahulu");
        return;
    }
    document.getElementById('order').classList.remove('hidden');
    document.getElementById('payment').classList.add('hidden');
}

// Function to show the payment form
function showPaymentForm() {
    const orderedItems = document.querySelectorAll('.ordered-item');
    if (orderedItems.length === 0) {
        alert("Ajukan pesanan dan lakukan pembayaran");
        return;
    }

    const orderedItemsList = document.getElementById('orderedItemsList');
    orderedItemsList.innerHTML = ''; // Clear previous items

    orderedItems.forEach(item => {
        const itemName = item.querySelector('h4').innerText;
        const itemQuantity = item.querySelector('.quantity').innerText;
        const listItem = document.createElement('li');
        listItem.innerText = `${itemName} - Quantity: ${itemQuantity}`;
        orderedItemsList.appendChild(listItem);
    });

    document.getElementById('order').classList.add('hidden');
    document.getElementById('payment').classList.remove('hidden');
}

// Function to submit payment
function submitPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;

    if (paymentMethod) {
        alert(`Thank you, ${customerName}! Your order will be delivered to ${customerAddress}. Payment Method: ${paymentMethod.value}`);
        // Logic to process the payment and order
    } else {
        alert("Please select a payment method.");
    }
}

// Function to show more menu items (placeholder)
function showMore() {
    // Menampilkan item menu yang tersembunyi
    const hiddenItems = document.querySelectorAll('#menu .hidden');
    hiddenItems.forEach(item => {
        item.classList.remove('hidden');
    });

    // Menyembunyikan tombol "Show More" setelah semua item ditampilkan
    const showMoreButton = document.querySelector('#menu button');
    showMoreButton.classList.add('hidden');
}

// Rating functionality
const starElements = document.querySelectorAll('.rating-star');
let selectedRating = 0;

// Add event listeners to each star
starElements.forEach((star, index) => {
    star.addEventListener('click', () => {
        selectedRating = index + 1; // Set the selected rating based on the star clicked
        updateStars();
    });
});

// Function to update the star display based on the selected rating
function updateStars() {
    starElements.forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.add('text-yellow-500'); // Highlight selected stars
        } else {
            star.classList.remove('text-yellow-500'); // Remove highlight from unselected stars
        }
    });
}

// Function to submit the review
function submitReview() {
    const reviewText = document.querySelector('#review-text').value;
    if (selectedRating > 0 && reviewText) {
        alert(`Thank you for your review! Rating: ${selectedRating} stars. Review: ${reviewText}`);
        // Logic to send the review to the server or process it further
    } else {
        alert("Please select a rating and write a review.");
    }
}

// Show bank options based on payment method selection
document.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
    input.addEventListener('change', () => {
        const bankOptions = document.getElementById('bankOptions');
        if (input.value === 'Debit' || input.value === 'E-Wallet') {
            bankOptions.classList.remove('hidden');
        } else {
            bankOptions.classList.add('hidden');
        }
    });
});

// Function to handle the order button click
function order() {
    const selectedVariant = document.querySelector('input[name="pastel-variant"]:checked');
    const quantityElement = document.querySelector('.quantity');
    const quantity = parseInt(quantityElement.textContent);

    if (!selectedVariant || quantity <= 0) {
        alert("Silakan memilih variant dan quantity terlebih dahulu");
        return;
    }

    // Define prices for each menu item
    const prices = {
        "Pastel": 2500, 
        "Arem-arem": 3500, 
        "Pie": 2000,
        "lumpia": 2000,
        "Risol mayo": 3000,
        "lemper": 5000,
        "Onde-onde": 2500,
        "Serabi": 2000,
        "Bolu Kukus": 3000,
        "Kue ku": 1500,
        "Nagasari": 1500,
        "Kue lumpur": 1500,
    };

    // Calculate total price
    const price = prices[selectedVariant.value] || 0;
    const totalPrice = price * quantity;

    // Add the ordered item to the ordered items list
    const orderedItemsList = document.getElementById('orderedItemsList');
    const listItem = document.createElement('li');
    listItem.innerText = `${selectedVariant.value} - Quantity: ${quantity} - Harga: Rp ${totalPrice}`;
    orderedItemsList.appendChild(listItem);

    // Update total price display
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerText = `Rp ${totalPrice}`;

    // Show the order form
    showOrderForm();
}

// Function to show the order form
function showOrderForm() {
    document.getElementById('order').classList.remove('hidden');
    document.getElementById('payment').classList.add('hidden'); // Ensure payment form is hidden
}