// Shop specific functionality
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  renderProducts()
  updateCartCount()
})

let products = [] // Declare products variable
let filteredProducts = [...products]

// Function to load products
function loadProducts() {
  // Implementation to load products from storage or API
  products = JSON.parse(localStorage.getItem("adminProducts")) || []
}

// Render Products
function renderProducts() {
  const productsGrid = document.getElementById("productsGrid")
  const noProducts = document.getElementById("noProducts")

  if (!productsGrid) return

  productsGrid.innerHTML = ""

  if (filteredProducts.length === 0) {
    productsGrid.style.display = "none"
    noProducts.style.display = "block"
    return
  }

  productsGrid.style.display = "grid"
  noProducts.style.display = "none"

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })
}

// Function to create a product card
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"
  card.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Rating: ${product.rating}</p>
    `
  return card
}

// Search Products
function searchProducts() {
  const searchInput = document.getElementById("searchInput")
  const searchTerm = searchInput.value.toLowerCase()

  filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
  )

  renderProducts()
}

// Sort Products
function sortProducts() {
  const sortSelect = document.getElementById("sortSelect")
  const sortValue = sortSelect.value

  switch (sortValue) {
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    default:
      filteredProducts = [...products]
  }

  renderProducts()
}

// Function to update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  if (cartCount) {
    cartCount.textContent = localStorage.getItem("cartCount") || "0"
  }
}

// Listen for storage changes (for admin panel updates)
window.addEventListener("storage", (e) => {
  if (e.key === "adminProducts") {
    loadProducts()
    filteredProducts = [...products]
    renderProducts()
  }
  if (e.key === "cartCount") {
    updateCartCount()
  }
})
