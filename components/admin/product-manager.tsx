"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, Package } from "lucide-react"

export default function ProductManager() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fancy Leather",
      price: 1800,
      originalPrice: 2250,
      image: "/placeholder.svg?height=300&width=200&text=Fancy+Leather",
      description: "Premium leather fragrance",
      quantity: 10,
      category: "Men",
    },
    {
      id: 2,
      name: "Grey Leather",
      price: 1800,
      originalPrice: 2250,
      image: "/placeholder.svg?height=300&width=200&text=Grey+Leather",
      description: "Sophisticated grey leather scent",
      quantity: 8,
      category: "Men",
    },
    {
      id: 3,
      name: "Florenza",
      price: 1650,
      originalPrice: 2062,
      image: "/placeholder.svg?height=300&width=200&text=Florenza",
      description: "Floral fragrance for women",
      quantity: 15,
      category: "Women",
    },
  ])

  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    quantity: "",
    category: "Men",
  })

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: Number.parseInt(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number.parseInt(newProduct.originalPrice) : null,
        image: newProduct.image || `/placeholder.svg?height=300&width=200&text=${newProduct.name.replace(" ", "+")}`,
        description: newProduct.description,
        quantity: Number.parseInt(newProduct.quantity),
        category: newProduct.category,
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        price: "",
        originalPrice: "",
        image: "",
        description: "",
        quantity: "",
        category: "Men",
      })
      setShowAddForm(false)
      alert("✅ Product added successfully!")
    } else {
      alert("❌ Please fill in all required fields!")
    }
  }

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)))
    setEditingProduct(null)
    alert("✅ Product updated successfully!")
  }

  const handleDeleteProduct = (id) => {
    if (confirm("⚠️ Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
      alert("✅ Product deleted successfully!")
    }
  }

  const saveProducts = () => {
    localStorage.setItem("websiteProducts", JSON.stringify(products))
    alert("✅ All products saved successfully!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Product Management</span>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Manage your product catalog. Add, edit, or remove products from your website.
          </p>

          {/* Add Product Form */}
          {showAddForm && (
            <Card className="mb-6 border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-700">Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newName">Product Name *</Label>
                    <Input
                      id="newName"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPrice">Price (Rs) *</Label>
                    <Input
                      id="newPrice"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newOriginalPrice">Original Price (Rs)</Label>
                    <Input
                      id="newOriginalPrice"
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                      placeholder="For discount badge"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newQuantity">Quantity *</Label>
                    <Input
                      id="newQuantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newCategory">Category *</Label>
                    <select
                      id="newCategory"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="newImage">Image URL</Label>
                    <Input
                      id="newImage"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="newDescription">Description</Label>
                    <Textarea
                      id="newDescription"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Enter product description"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-4">
                  <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                  <Button onClick={() => setShowAddForm(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg bg-gray-100"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-amber-600 text-lg">Rs {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        Rs {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        product.quantity === 0
                          ? "bg-red-100 text-red-800"
                          : product.quantity <= 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.quantity === 0
                        ? "Out of Stock"
                        : product.quantity <= 5
                          ? `Low Stock: ${product.quantity}`
                          : `In Stock: ${product.quantity}`}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)} className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Save All Button */}
          <div className="mt-6 text-center">
            <Button onClick={saveProducts} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save All Products
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Product: {editingProduct.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Price (Rs)</Label>
                  <Input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Original Price (Rs)</Label>
                  <Input
                    type="number"
                    value={editingProduct.originalPrice || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: e.target.value ? Number.parseInt(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, quantity: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleUpdateProduct(editingProduct.id, editingProduct)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Product
                </Button>
                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
