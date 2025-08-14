"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"

export default function ShopPage() {
  const { addToCart } = useCart()
  const [content, setContent] = useState({
    pageTitle: "Shop",
    breadcrumbHome: "Home",
    subtitle: "PERFUME",
    safetyTitle: "⚠️ Chemical Safety Notice",
    safetyText:
      "All chemical products are intended for professional use only. Please ensure proper handling, storage, and safety measures are followed according to industry standards.",
    filterTitle: "FILTER BY PRICE",
    filterButton: "Filter",
    stockTitle: "STOCK STATUS",
    inStockText: "In Stock",
    outOfStockText: "Out of Stock",
    topRatedTitle: "TOP RATED PRODUCTS",
    addToCartText: "ADD TO CART",
    quickViewText: "Quick View",
    compareText: "Compare",
    wishlistText: "Add to Wishlist",
    sortByText: "Sort by:",
    sortDefault: "Default",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    sortName: "Name A-Z",
    sortRating: "Rating",
  })

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Henyle Acetate Premium",
      price: 2800,
      originalPrice: 3500,
      image: "/placeholder.svg?height=300&width=200&text=Henyle+Acetate",
      description: "High-grade henyle acetate for premium fragrance formulations",
      quantity: 15,
      rating: 4.8,
      reviews: 124,
      badge: "PREMIUM",
    },
    {
      id: 2,
      name: "Benzyl Benzoate Pure",
      price: 2200,
      originalPrice: 2750,
      image: "/placeholder.svg?height=300&width=200&text=Benzyl+Benzoate",
      description: "Pure benzyl benzoate compound for chemical synthesis",
      quantity: 8,
      rating: 4.7,
      reviews: 89,
      badge: "PURE",
    },
    {
      id: 3,
      name: "Aldehyde C-12 MNA",
      price: 3200,
      originalPrice: 4000,
      image: "/placeholder.svg?height=300&width=200&text=Aldehyde+C12",
      description: "Aldehyde C-12 MNA for sophisticated fragrance notes",
      quantity: 12,
      rating: 4.9,
      reviews: 156,
      badge: "TOP GRADE",
    },
    {
      id: 4,
      name: "Essential Oil Base",
      price: 1800,
      originalPrice: 2250,
      image: "/placeholder.svg?height=300&width=200&text=Essential+Oil",
      description: "Premium essential oil base for natural fragrances",
      quantity: 20,
      rating: 4.6,
      reviews: 67,
      badge: "NATURAL",
    },
  ])

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })
  const [sortBy, setSortBy] = useState("default")

  useEffect(() => {
    // Load content and products from localStorage
    const savedContent = localStorage.getItem("pageContent")
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent)
      if (parsedContent.shop) {
        setContent(parsedContent.shop)
      }
    }

    const savedProducts = localStorage.getItem("websiteProducts")
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts)
      setProducts(parsedProducts)
      setFilteredProducts(parsedProducts)
    }

    // Listen for updates
    const handleContentUpdate = () => {
      const savedContent = localStorage.getItem("pageContent")
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent)
        if (parsedContent.shop) {
          setContent(parsedContent.shop)
        }
      }
      const savedProducts = localStorage.getItem("websiteProducts")
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts)
        setProducts(parsedProducts)
        setFilteredProducts(parsedProducts)
      }
    }

    window.addEventListener("websiteSettingsUpdated", handleContentUpdate)
    return () => window.removeEventListener("websiteSettingsUpdated", handleContentUpdate)
  }, [])

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const applyFilters = () => {
    const filtered = products.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)

    // Apply sorting
    switch (sortBy) {
      case "priceLow":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "priceHigh":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <nav className="text-sm mb-4">
              <span className="text-green-200">{content.breadcrumbHome}</span>
              <span className="mx-2">/</span>
              <span>{content.pageTitle}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{content.pageTitle}</h1>
            <p className="text-xl text-green-100">{content.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-8 bg-yellow-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-bold text-yellow-800 mb-2">{content.safetyTitle}</h3>
            <p className="text-yellow-700">{content.safetyText}</p>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Price Filter */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-4">{content.filterTitle}</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm">Min Price</label>
                        <Input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-sm">Max Price</label>
                        <Input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        />
                      </div>
                      <Button onClick={applyFilters} className="w-full">
                        <Filter className="w-4 h-4 mr-2" />
                        {content.filterButton}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Stock Status */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-4">{content.stockTitle}</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">{content.inStockText}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">{content.outOfStockText}</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Rated */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-4">{content.topRatedTitle}</h3>
                    <div className="space-y-3">
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center space-x-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-semibold">{product.name}</p>
                            <p className="text-xs text-amber-600">Rs {product.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort Options */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">Showing {filteredProducts.length} products</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{content.sortByText}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  >
                    <option value="default">{content.sortDefault}</option>
                    <option value="priceLow">{content.sortPriceLow}</option>
                    <option value="priceHigh">{content.sortPriceHigh}</option>
                    <option value="name">{content.sortName}</option>
                    <option value="rating">{content.sortRating}</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2" variant="secondary">
                            {product.badge}
                          </Badge>
                        )}
                        {product.originalPrice && (
                          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">Rs {product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              Rs {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                          {product.quantity > 0 ? content.inStockText : content.outOfStockText}
                        </Badge>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full"
                        size="sm"
                        disabled={product.quantity === 0}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {content.addToCartText}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
