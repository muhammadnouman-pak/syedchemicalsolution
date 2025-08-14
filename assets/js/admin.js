// Admin Panel JavaScript

let products = []
let websiteSettings = {}
let editingProductId = null
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
}

// Function to handle product form submission
function handleProductSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const newProduct = {
    id: Date.now(),
    name: formData.get("productName"),
    price: Number.parseInt(formData.get("productPrice")),
    originalPrice: formData.get("originalPrice") ? Number.parseInt(formData.get("originalPrice")) : null,
    image: formData.get("productImage"),
    description: formData.get("productDescription"),
    rating: Number.parseFloat(formData.get("productRating")),
    reviews: Number.parseInt(formData.get("productReviews")),
    badge: formData.get("productBadge"),
    quantity: Number.parseInt(formData.get("productQuantity")),
  }

  products.push(newProduct)
  saveProducts()
  renderProducts()
  closeModal("addProductModal")
  event.target.reset()

  showNotification("Product added successfully!")
}

// Initialize Admin Panel
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("adminLoggedIn")
  if (isLoggedIn === "true") {
    showDashboard()
  }
  loadAdminData()
})

// Setup Event Listeners
function setupEventListeners() {
  const productForm = document.getElementById("product-form")
  if (productForm) {
    productForm.addEventListener("submit", handleProductSubmit)
  }
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
  const siteNameInput = document.getElementById("siteName")
  const heroTitleInput = document.getElementById("heroTitle")
  const heroSubtitleInput = document.getElementById("heroSubtitle")
  const heroAnimationSelect = document.getElementById("heroAnimation")
  const heroImageInput = document.getElementById("heroImage")

  if (siteNameInput) siteNameInput.value = websiteSettings.siteName || ""
  if (heroTitleInput) heroTitleInput.value = websiteSettings.heroTitle || ""
  if (heroSubtitleInput) heroSubtitleInput.value = websiteSettings.heroSubtitle || ""
  if (heroAnimationSelect) heroAnimationSelect.value = websiteSettings.heroAnimation || "fadeIn"
  if (heroImageInput) heroImageInput.value = websiteSettings.heroImage || ""
}

// Save Website Settings
function saveWebsiteSettings() {
  const siteNameInput = document.getElementById("siteName")
  const heroTitleInput = document.getElementById("heroTitle")
  const heroSubtitleInput = document.getElementById("heroSubtitle")
  const heroAnimationSelect = document.getElementById("heroAnimation")
  const heroImageInput = document.getElementById("heroImage")

  websiteSettings = {
    siteName: siteNameInput?.value || "",
    heroTitle: heroTitleInput?.value || "",
    heroSubtitle: heroSubtitleInput?.value || "",
    heroAnimation: heroAnimationSelect?.value || "fadeIn",
    heroImage: heroImageInput?.value || "",
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
  if (!productsList) return

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

  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected tab
  const targetTab = document.getElementById(tabName)
  if (targetTab) {
    targetTab.classList.add("active")
  }

  // Add active class to clicked nav tab
  event.target.classList.add("active")

  // Load tab-specific data
  if (tabName === "products") {
    loadProductsTable()
  } else if (tabName === "settings") {
    loadSettings()
  } else if (tabName === "analytics") {
    loadAnalytics()
  }
}

// Load Admin Data
function loadAdminData() {
  loadProductsTable()
  loadSettings()
  loadAnalytics()
}

// Login function
function login(event) {
  event.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem("adminLoggedIn", "true")
    showDashboard()
  } else {
    alert("Invalid credentials!")
  }
}

// Logout function
function logout() {
  localStorage.removeItem("adminLoggedIn")
  document.getElementById("loginScreen").style.display = "flex"
  document.getElementById("adminDashboard").style.display = "none"
}

// Show dashboard
function showDashboard() {
  document.getElementById("loginScreen").style.display = "none"
  document.getElementById("adminDashboard").style.display = "flex"
  loadAdminData()
}

// Products management
let adminProducts = [
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
]

// Load products table
function loadProductsTable() {
  const savedProducts = localStorage.getItem("adminProducts")
  if (savedProducts) {
    adminProducts = JSON.parse(savedProducts)
  }

  const tableBody = document.getElementById("productsTableBody")
  if (!tableBody) return

  tableBody.innerHTML = ""

  adminProducts.forEach((product) => {
    const row = document.createElement("tr")
    row.innerHTML = `
        <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
        <td>${product.name}</td>
        <td>Rs ${product.price.toLocaleString()}</td>
        <td>${product.quantity}</td>
        <td>
            <span class="status-badge ${product.quantity > 0 ? "status-in-stock" : "status-out-of-stock"}">
                ${product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
        </td>
        <td>
            <button class="action-btn edit-btn" onclick="editProduct(${product.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `
    tableBody.appendChild(row)
  })
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

// Edit Product
function editProduct(productId) {
  const product = adminProducts.find((p) => p.id === productId)
  if (product) {
    // Fill the add product form with existing data
    document.getElementById("productName").value = product.name
    document.getElementById("productPrice").value = product.price
    document.getElementById("originalPrice").value = product.originalPrice || ""
    document.getElementById("productQuantity").value = product.quantity
    document.getElementById("productImage").value = product.image
    document.getElementById("productDescription").value = product.description
    document.getElementById("productBadge").value = product.badge || ""
    document.getElementById("productRating").value = product.rating
    document.getElementById("productReviews").value = product.reviews

    showModal("addProductModal")

    // Remove the product so it gets replaced when form is submitted
    adminProducts = adminProducts.filter((p) => p.id !== productId)
  }
}

// Settings management
function loadSettings() {
  const savedSettings = localStorage.getItem("websiteSettings")
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)
    document.getElementById("siteName").value = settings.siteName || "THE CENTURY SCENTS"
    document.getElementById("heroTitle").value = settings.heroTitle || "DISCOVER THE ESSENCE OF LUXURY"
    document.getElementById("heroSubtitle").value =
      settings.heroSubtitle || "Experience our exclusive collection of premium chemical solutions and fragrances"
    document.getElementById("heroAnimation").value = settings.heroAnimation || "fadeIn"
    document.getElementById("heroImage").value = settings.heroImage || ""
  }
}

function saveSettings() {
  const settings = {
    siteName: document.getElementById("siteName").value,
    heroTitle: document.getElementById("heroTitle").value,
    heroSubtitle: document.getElementById("heroSubtitle").value,
    heroAnimation: document.getElementById("heroAnimation").value,
    heroImage: document.getElementById("heroImage").value,
  }

  localStorage.setItem("websiteSettings", JSON.stringify(settings))
  showAdminNotification("Settings saved successfully!")
}

// Analytics
function loadAnalytics() {
  const products = JSON.parse(localStorage.getItem("adminProducts") || "[]")
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")

  document.getElementById("totalProducts").textContent = products.length
  document.getElementById("totalOrders").textContent = orders.length

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
  document.getElementById("totalRevenue").textContent = `Rs ${totalRevenue.toLocaleString()}`

  // Simulate page views
  const pageViews = localStorage.getItem("pageViews") || Math.floor(Math.random() * 10000)
  document.getElementById("pageViews").textContent = pageViews
  localStorage.setItem("pageViews", pageViews)
}

// Orders management
function resetOrders() {
  if (confirm("Are you sure you want to reset all orders? This action cannot be undone.")) {
    localStorage.removeItem("orders")
    localStorage.removeItem("cart")
    showAdminNotification("Orders reset successfully!")
    loadAnalytics()
  }
}

// Modal functions
function showModal(modalId) {
  document.getElementById(modalId).classList.add("show")
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("show")
}

function showAddProductModal() {
  showModal("addProductModal")
}

// Admin notification
function showAdminNotification(message) {
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
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Initialize products in localStorage if not exists
if (!localStorage.getItem("adminProducts")) {
  localStorage.setItem("adminProducts", JSON.stringify(adminProducts))
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

// Close Product Modal
function closeProductModal() {
  const productModal = document.getElementById("product-modal")
  if (productModal) productModal.classList.remove("show")
  editingProductId = null
}
