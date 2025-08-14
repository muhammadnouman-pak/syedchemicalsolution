"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import { sendOrderNotification } from "@/lib/emailjs"

interface OrderFormProps {
  onClose: () => void
}

export function OrderForm({ onClose }: OrderFormProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        items: items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: getTotalPrice(),
        orderDate: new Date().toLocaleString(),
        notes: formData.notes,
      }

      // Save order to localStorage (for admin to view)
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      const newOrder = {
        id: Date.now(),
        ...orderData,
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      existingOrders.push(newOrder)
      localStorage.setItem("orders", JSON.stringify(existingOrders))

      // Send email notification to admin
      const emailResult = await sendOrderNotification(orderData)

      if (emailResult.success) {
        alert(`✅ Order placed successfully! 

Order Details:
- Order ID: #${newOrder.id}
- Total: Rs ${getTotalPrice().toLocaleString()}
- Items: ${items.length} products

📧 Admin has been notified via email.
You will be contacted soon for confirmation.

Thank you for choosing Syed Chemical Solution! 🧪`)
      } else {
        alert(`✅ Order placed successfully! 

Order Details:
- Order ID: #${newOrder.id}
- Total: Rs ${getTotalPrice().toLocaleString()}
- Items: ${items.length} products

⚠️ Note: ${emailResult.message}
Your order has been saved and admin will be notified.

Thank you for choosing Syed Chemical Solution! 🧪`)
      }

      // Clear cart and close form
      clearCart()
      onClose()
    } catch (error) {
      console.error("Order submission error:", error)
      alert("❌ There was an error placing your order. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = getTotalPrice()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-amber-600">Complete Your Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Total:</span>
                <span className="text-amber-600">Rs {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Enter your complete delivery address"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions or requirements"
                rows={2}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700" disabled={isSubmitting}>
                {isSubmitting ? "Placing Order..." : `Place Order - Rs ${totalPrice.toLocaleString()}`}
              </Button>
            </div>
          </form>

          {/* Payment Info */}
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <h4 className="font-semibold text-blue-800 mb-2">📞 Payment & Delivery Information</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Cash on Delivery (COD) available</li>
              <li>• Bank transfer details will be shared after order confirmation</li>
              <li>• Free delivery on orders above Rs 2,000</li>
              <li>• Our team will contact you within 24 hours</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
