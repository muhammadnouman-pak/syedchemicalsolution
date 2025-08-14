"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Search, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-context"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem("adminProducts")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(
        (product: any) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, products])

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    alert(`✅ ${product.name} added to cart!`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Search Header */}
          <div className="flex items-center space-x-4 p-4 border-b">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 focus:ring-0"
              autoFocus
            />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() === "" ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start typing to search products...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No products found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {searchResults.map((product: any) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-bold text-amber-600">Rs {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            Rs {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        {product.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.quantity === 0}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
