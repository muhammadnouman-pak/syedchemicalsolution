"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Star, Truck, Shield, Award, Phone, Beaker } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"

export default function HomePage() {
  const { addToCart } = useCart()

  // Content state - all editable from admin
  const [content, setContent] = useState({
    heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
    heroSubtitle: "Experience our exclusive collection of premium chemical solutions and fragrances",
    heroButtonText: "SHOP NOW",
    feature1Title: "Free Shipping",
    feature1Subtitle: "On orders over Rs 2000",
    feature2Title: "Authentic Products",
    feature2Subtitle: "100% genuine chemical solutions",
    feature3Title: "24/7 Support",
    feature3Subtitle: "Technical support available",
    feature4Title: "Quality Guarantee",
    feature4Subtitle: "Premium chemical standards",
    productsTitle: "FEATURED CHEMICAL SOLUTIONS",
    productsSubtitle: "Discover our most popular chemical compounds and solutions",
    viewAllButtonText: "VIEW ALL PRODUCTS",
    addToCartText: "ADD TO CART",
    outOfStockText: "OUT OF STOCK",
    saveText: "Save Rs",
    newsletterTitle: "STAY UPDATED",
    newsletterSubtitle:
      "Subscribe to our newsletter and be the first to know about new chemical solutions, exclusive offers, and technical updates.",
    newsletterPlaceholder: "Enter your email",
    subscribeButtonText: "SUBSCRIBE",
  })

  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "THE CENTURY SCENTS",
    heroAnimation: "fadeIn",
    heroImage: "/hero-perfumes.png",
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

  const [email, setEmail] = useState("")

  useEffect(() => {
    // Load content from localStorage (admin settings)
    const savedContent = localStorage.getItem("pageContent")
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent)
      if (parsedContent.home) {
        setContent(parsedContent.home)
      }
    }

    const savedSettings = localStorage.getItem("websiteSettings")
    if (savedSettings) {
      setWebsiteSettings(JSON.parse(savedSettings))
    }

    const savedProducts = localStorage.getItem("adminProducts")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }

    // Listen for content updates
    const handleContentUpdate = () => {
      const savedContent = localStorage.getItem("pageContent")
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent)
        if (parsedContent.home) {
          setContent(parsedContent.home)
        }
      }
      const savedSettings = localStorage.getItem("websiteSettings")
      if (savedSettings) {
        setWebsiteSettings(JSON.parse(savedSettings))
      }
      const savedProducts = localStorage.getItem("adminProducts")
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts))
      }
    }

    window.addEventListener("websiteSettingsUpdated", handleContentUpdate)
    return () => window.removeEventListener("websiteSettingsUpdated", handleContentUpdate)
  }, [])

  const handleAddToCart = (product: any) => {
    if (product.quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      alert(`✅ ${product.name} added to cart!`)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert(`✅ Thank you for subscribing with ${email}!`)
      setEmail("")
    }
  }

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className={`relative bg-gradient-to-r from-amber-600 to-orange-700 text-white py-20 animate-${websiteSettings.heroAnimation}`}
        style={{
          backgroundImage: websiteSettings.heroImage
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${websiteSettings.heroImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Beaker className="w-8 h-8 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold">{websiteSettings.siteName}</h1>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{content.heroTitle}</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{content.heroSubtitle}</p>
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            {content.heroButtonText}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.feature1Title}</h3>
              <p className="text-gray-600">{content.feature1Subtitle}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.feature2Title}</h3>
              <p className="text-gray-600">{content.feature2Subtitle}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.feature3Title}</h3>
              <p className="text-gray-600">{content.feature3Subtitle}</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.feature4Title}</h3>
              <p className="text-gray-600">{content.feature4Subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-600">{content.productsTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{content.productsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow border">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-amber-600 text-white">{product.badge}</Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    {product.quantity === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-lg px-4 py-2">
                          {content.outOfStockText}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{product.description}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-amber-600">Rs {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          Rs {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {product.originalPrice && (
                    <div className="mb-3">
                      <Badge variant="secondary" className="text-green-600">
                        {content.saveText} {(product.originalPrice - product.price).toLocaleString()}
                      </Badge>
                    </div>
                  )}

                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity === 0}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white disabled:bg-gray-400"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.quantity === 0 ? content.outOfStockText : content.addToCartText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => (window.location.href = "/shop")}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 px-8 py-4"
            >
              {content.viewAllButtonText}
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.newsletterTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{content.newsletterSubtitle}</p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={content.newsletterPlaceholder}
              required
              className="flex-1 text-gray-900"
            />
            <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100 px-6">
              {content.subscribeButtonText}
            </Button>
          </form>
        </div>
      </section>

      <Footer />

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0, -30px, 0); }
          70% { transform: translate3d(0, -15px, 0); }
          90% { transform: translate3d(0, -4px, 0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        .animate-slideUp { animation: slideUp 1s ease-out; }
        .animate-slideLeft { animation: slideLeft 1s ease-out; }
        .animate-zoomIn { animation: zoomIn 1s ease-out; }
        .animate-bounce { animation: bounce 2s ease-in-out; }
      `}</style>
    </div>
  )
}
