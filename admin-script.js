// Admin Panel JavaScript

let products = []
let websiteSettings = {}
let editingProductId = null

// Initialize Admin Panel
document.addEventListener("DOMContentLoaded", () => {
  loadWebsiteSettings()
  loadProducts()
  setupEventListeners()
})

// Setup Event Listeners
function setupEventListeners() {
  document.getElementById("product-form").addEventListener("submit", handleProductSubmit)
}

// Load Website Settings
function loadWebsiteSettings() {
  const savedSettings = localStorage.getItem("websiteSettings")
  if (savedSettings) {
    websiteSettings = JSON.parse(savedSettings)
  } else {
    websiteSettings = {
      siteName: "THE CENTURY SCENTS",
      heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
      heroSubtitle: "Experience our exclusive collection of premium chemical solutions and fragrances",
      heroAnimation: "fadeIn",
      heroImage:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2004&q=80",
    }
  }

  // Populate form fields
  document.getElementById("siteName").value = websiteSettings.siteName || ""
  document.getElementById("heroTitle").value = websiteSettings.heroTitle || ""
  document.getElementById("heroSubtitle").value = websiteSettings.heroSubtitle || ""
  document.getElementById("heroAnimation").value = websiteSettings.heroAnimation || "fadeIn"
  document.getElementById("heroImage").value = websiteSettings.heroImage || ""
}

// Save Website Settings
function saveWebsiteSettings() {
  websiteSettings = {
    siteName: document.getElementById("siteName").value,
    heroTitle: document.getElementById("heroTitle").value,
    heroSubtitle: document.getElementById("heroSubtitle").value,
    heroAnimation: document.getElementById("heroAnimation").value,
    heroImage: document.getElementById("heroImage").value,
  }

  localStorage.setItem("websiteSettings", JSON.stringify(websiteSettings))
  showNotification("Website settings saved successfully!")

  // Trigger storage event for main website
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "websiteSettings",
      newValue: JSON.stringify(websiteSettings),
    }),
  )
}

// Load Products
function loadProducts() {
  const savedProducts = localStorage.getItem("adminProducts")
  if (savedProducts) {
    products = JSON.parse(savedProducts)
  } else {
    // Default products
    products = [
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
    ]
  }

  renderProducts()
}

// Render Products
function renderProducts() {
  const productsList = document.getElementById("products-list")
  productsList.innerHTML = ""

  products.forEach((product) => {
    const productItem = createProductItem(product)
    productsList.appendChild(productItem)
  })
}

// Create Product Item
function createProductItem(product) {
  const item = document.createElement("div")
  item.className = "product-item"

  item.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">Rs ${product.price.toLocaleString()}</div>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        ${product.badge ? `<p><strong>Badge:</strong> ${product.badge}</p>` : ""}
        <div class="product-actions">
            <button class="edit-btn" onclick="editProduct(${product.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `

  return item
}

// Show Tab
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active")
  })

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab
  document.getElementById(tabName + "-tab").classList.add("active")
  event.target.classList.add("active")
}

// Show Add Product Form
function showAddProductForm() {
  editingProductId = null
  document.getElementById("modal-title").textContent = "Add Product"
  document.getElementById("product-form").reset()
  document.getElementById("product-id").value = ""
  document.getElementById("product-modal").classList.add("show")
}

// Edit Product
function editProduct(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  editingProductId = productId
  document.getElementById("modal-title").textContent = "Edit Product"

  // Populate form
  document.getElementById("product-id").value = product.id
  document.getElementById("product-name").value = product.name
  document.getElementById("product-description").value = product.description
  document.getElementById("product-price").value = product.price
  document.getElementById("product-original-price").value = product.originalPrice || ""
  document.getElementById("product-quantity").value = product.quantity
  document.getElementById("product-rating").value = product.rating || ""
  document.getElementById("product-reviews").value = product.reviews || ""
  document.getElementById("product-badge").value = product.badge || ""
  document.getElementById("product-image").value = product.image

  document.getElementById("product-modal").classList.add("show")
}

// Delete Product
function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter((p) => p.id !== productId)
    saveProducts()
    renderProducts()
    showNotification("Product deleted successfully!")
  }
}

// Handle Product Submit
function handleProductSubmit(e) {
  e.preventDefault()

  const formData = {
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    price: Number.parseInt(document.getElementById("product-price").value),
    originalPrice: Number.parseInt(document.getElementById("product-original-price").value) || null,
    quantity: Number.parseInt(document.getElementById("product-quantity").value),
    rating: Number.parseFloat(document.getElementById("product-rating").value) || null,
    reviews: Number.parseInt(document.getElementById("product-reviews").value) || 0,
    badge: document.getElementById("product-badge").value || null,
    image: document.getElementById("product-image").value,
  }

  if (editingProductId) {
    // Update existing product
    const productIndex = products.findIndex((p) => p.id === editingProductId)
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...formData }
      showNotification("Product updated successfully!")
    }
  } else {
    // Add new product
    const newId = Math.max(...products.map((p) => p.id), 0) + 1
    products.push({ id: newId, ...formData })
    showNotification("Product added successfully!")
  }

  saveProducts()
  renderProducts()
  closeProductModal()
}

// Close Product Modal
function closeProductModal() {
  document.getElementById("product-modal").classList.remove("show")
  editingProductId = null
}

// Save Products
function saveProducts() {
  localStorage.setItem("adminProducts", JSON.stringify(products))

  // Trigger storage event for main website
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "adminProducts",
      newValue: JSON.stringify(products),
    }),
  )
}

// Show Notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
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

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("product-modal")
  if (e.target === modal) {
    closeProductModal()
  }
})
