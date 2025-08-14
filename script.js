// Website Settings
let websiteSettings = {
  siteName: "THE CENTURY SCENTS",
  heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
  heroSubtitle: "Experience our exclusive collection of premium chemical solutions and fragrances",
  heroAnimation: "fadeIn",
  heroImage:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2004&q=80",
}

// Products Data
let products = [
  {
    id: 1,
    name: "Henyle Acetate Premium",
    price: 2800,
    originalPrice: 3500,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    description: "High-grade henyle acetate for premium fragrance formulations",
    rating: 4.8,
    reviews: 124,
    badge: "PREMIUM",
    quantity: 15,
  },
  {
    id: 2,
    name: "Benzyl Benzoate Pure",
    price: 2200,
    originalPrice: 2750,
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031d8eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Pure benzyl benzoate compound for chemical synthesis",
    rating: 4.7,
    reviews: 89,
    badge: "PURE",
    quantity: 8,
  },
  {
    id: 3,
    name: "Aldehyde C-12 MNA",
    price: 3200,
    originalPrice: 4000,
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Aldehyde C-12 MNA for sophisticated fragrance notes",
    rating: 4.9,
    reviews: 156,
    badge: "TOP GRADE",
    quantity: 12,
  },
  {
    id: 4,
    name: "Essential Oil Base",
    price: 1800,
    originalPrice: 2250,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Premium essential oil base for natural fragrances",
    rating: 4.6,
    reviews: 67,
    badge: "NATURAL",
    quantity: 20,
  },
  {
    id: 5,
    name: "Aromatic Compound Mix",
    price: 2500,
    originalPrice: 3125,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    description: "Complex aromatic compound mixture for advanced formulations",
    rating: 4.5,
    reviews: 78,
    badge: "COMPLEX",
    quantity: 10,
  },
  {
    id: 6,
    name: "Synthetic Musk Base",
    price: 3500,
    originalPrice: 4375,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    description: "High-quality synthetic musk for long-lasting fragrances",
    rating: 4.9,
    reviews: 203,
    badge: "EXCLUSIVE",
    quantity: 6,
  },
]

// Cart Data
let cart = []

// Initialize Website
document.addEventListener("DOMContentLoaded", () => {
  loadWebsiteSettings()
  loadProducts()
  loadCart()
  updateCartCount()
})

// Load Website Settings
function loadWebsiteSettings() {
  const savedSettings = localStorage.getItem("websiteSettings")
  if (savedSettings) {
    websiteSettings = { ...websiteSettings, ...JSON.parse(savedSettings) }
  }

  // Apply settings to website
  document.getElementById("siteName").textContent = websiteSettings.siteName
  document.getElementById("heroTitle").textContent = websiteSettings.heroTitle
  document.getElementById("heroSubtitle").textContent = websiteSettings.heroSubtitle

  // Apply hero animation
  const heroElement = document.getElementById("hero")
  heroElement.className = `hero animate-${websiteSettings.heroAnimation}`

  // Apply hero background image
  if (websiteSettings.heroImage) {
    heroElement.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${websiteSettings.heroImage})`
  }
}

// Load Products
function loadProducts() {
  const savedProducts = localStorage.getItem("adminProducts")
  if (savedProducts) {
    products = JSON.parse(savedProducts)
  }

  renderProducts()
}

// Render Products
function renderProducts() {
  const productsGrid = document.getElementById("productsGrid")
  productsGrid.innerHTML = ""

  products.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })
}

// Create Product Card
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0
  const savings = product.originalPrice ? product.originalPrice - product.price : 0

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
            ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ""}
            ${product.quantity === 0 ? '<div class="out-of-stock">OUT OF STOCK</div>' : ""}
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
            </div>
            <div class="product-price">
                <span class="current-price">Rs ${product.price.toLocaleString()}</span>
                ${product.originalPrice ? `<span class="original-price">Rs ${product.originalPrice.toLocaleString()}</span>` : ""}
                ${savings > 0 ? `<div class="savings">Save Rs ${savings.toLocaleString()}</div>` : ""}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.quantity === 0 ? "disabled" : ""}>
                <i class="fas fa-shopping-cart"></i>
                ${product.quantity === 0 ? "OUT OF STOCK" : "ADD TO CART"}
            </button>
        </div>
    `

  return card
}

// Generate Stars
function generateStars(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star star"></i>'
    } else {
      stars += '<i class="fas fa-star star empty"></i>'
    }
  }
  return stars
}

// Add to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product || product.quantity === 0) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  saveCart()
  updateCartCount()
  renderCartItems()

  // Show success message
  showNotification("Product added to cart!")
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  updateCartCount()
  renderCartItems()
}

// Update Cart Quantity
function updateCartQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      saveCart()
      updateCartCount()
      renderCartItems()
    }
  }
}

// Save Cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Load Cart
function loadCart() {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
  }
}

// Update Cart Count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0)
  document.getElementById("cartCount").textContent = count
}

// Render Cart Items
function renderCartItems() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>'
    cartTotal.textContent = "0"
    return
  }

  cartItems.innerHTML = ""
  let total = 0

  cart.forEach((item) => {
    total += item.price * item.quantity

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">Rs ${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #ef4444; color: white;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `

    cartItems.appendChild(cartItem)
  })

  cartTotal.textContent = total.toLocaleString()
}

// Toggle Cart
function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar")
  const cartOverlay = document.getElementById("cartOverlay")

  cartSidebar.classList.toggle("open")
  cartOverlay.classList.toggle("show")

  if (cartSidebar.classList.contains("open")) {
    renderCartItems()
  }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex"
}

// Scroll to Products
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" })
}

// Subscribe to Newsletter
function subscribe() {
  const email = document.getElementById("emailInput").value
  if (email) {
    showNotification("Thank you for subscribing!")
    document.getElementById("emailInput").value = ""
  } else {
    showNotification("Please enter a valid email address.")
  }
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!")
    return
  }

  // Here you would typically integrate with a payment processor
  showNotification("Checkout functionality would be implemented here.")
}

// Show Notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Add slide in animation for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`
document.head.appendChild(style)

// Listen for storage changes (for admin panel updates)
window.addEventListener("storage", (e) => {
  if (e.key === "websiteSettings") {
    loadWebsiteSettings()
  } else if (e.key === "adminProducts") {
    loadProducts()
  }
})
