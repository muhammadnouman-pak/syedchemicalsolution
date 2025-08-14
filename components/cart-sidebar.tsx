"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Minus, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { OrderForm } from "@/components/order-form"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()
  const [showOrderForm, setShowOrderForm] = useState(false)

  if (!isOpen) return null

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!")
      return
    }
    setShowOrderForm(true)
  }

  const handleOrderSuccess = () => {
    clearCart()
    setShowOrderForm(false)
    onClose()
  }

  if (showOrderForm) {
    return (
      <OrderForm
        isOpen={true}
        onClose={() => setShowOrderForm(false)}
        cartItems={items}
        totalAmount={getTotalPrice()}
        onOrderSuccess={handleOrderSuccess}
      />
    )
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shopping Cart
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
              <p className="text-sm">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-amber-600 font-bold">Rs {item.price.toLocaleString()}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Badge variant="secondary" className="px-3">
                        {item.quantity}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)} className="ml-2">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Rs {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-amber-600">Rs {getTotalPrice().toLocaleString()}</span>
            </div>
            <Button onClick={handleProceedToCheckout} className="w-full bg-amber-600 hover:bg-amber-700">
              Proceed to Checkout
            </Button>
            <Button onClick={clearCart} variant="outline" className="w-full bg-transparent">
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
