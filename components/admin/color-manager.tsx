"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, ShoppingBag, Info, Phone, Save } from "lucide-react"

export default function ColorManager() {
  const [selectedPage, setSelectedPage] = useState("")
  const [colors, setColors] = useState({
    home: {
      background: "#ffffff",
      header: "#f59e0b",
      footer: "#374151",
      text: "#1f2937",
    },
    about: {
      background: "#ffffff",
      header: "#f59e0b",
      footer: "#374151",
      text: "#1f2937",
    },
    shop: {
      background: "#ffffff",
      header: "#f59e0b",
      footer: "#374151",
      text: "#1f2937",
    },
    contact: {
      background: "#ffffff",
      header: "#f59e0b",
      footer: "#374151",
      text: "#1f2937",
    },
  })

  const pages = [
    { id: "home", name: "Home Page", icon: Home },
    { id: "about", name: "About Page", icon: Info },
    { id: "shop", name: "Shop Page", icon: ShoppingBag },
    { id: "contact", name: "Contact Page", icon: Phone },
  ]

  const handleColorChange = (colorType, value) => {
    if (selectedPage) {
      setColors((prev) => ({
        ...prev,
        [selectedPage]: {
          ...prev[selectedPage],
          [colorType]: value,
        },
      }))
    }
  }

  const saveColors = () => {
    localStorage.setItem("websiteColors", JSON.stringify(colors))
    alert("✅ Colors saved successfully!")
  }

  const resetColors = () => {
    const defaultColors = {
      background: "#ffffff",
      header: "#f59e0b",
      footer: "#374151",
      text: "#1f2937",
    }
    if (selectedPage) {
      setColors((prev) => ({
        ...prev,
        [selectedPage]: defaultColors,
      }))
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎨</span>
            <span>Website Color Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Select a page to customize its colors. Changes will be applied across the website.
          </p>

          {/* Page Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {pages.map((page) => {
              const IconComponent = page.icon
              return (
                <Button
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  variant={selectedPage === page.id ? "default" : "outline"}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <IconComponent className="w-6 h-6" />
                  <span>{page.name}</span>
                </Button>
              )
            })}
          </div>

          {/* Color Controls */}
          {selectedPage && (
            <Card className="border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg">
                  Customize {pages.find((p) => p.id === selectedPage)?.name} Colors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="background">Background Color</Label>
                      <div className="flex items-center space-x-3 mt-1">
                        <Input
                          id="background"
                          type="color"
                          value={colors[selectedPage].background}
                          onChange={(e) => handleColorChange("background", e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          type="text"
                          value={colors[selectedPage].background}
                          onChange={(e) => handleColorChange("background", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="header">Header Color</Label>
                      <div className="flex items-center space-x-3 mt-1">
                        <Input
                          id="header"
                          type="color"
                          value={colors[selectedPage].header}
                          onChange={(e) => handleColorChange("header", e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          type="text"
                          value={colors[selectedPage].header}
                          onChange={(e) => handleColorChange("header", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="footer">Footer Color</Label>
                      <div className="flex items-center space-x-3 mt-1">
                        <Input
                          id="footer"
                          type="color"
                          value={colors[selectedPage].footer}
                          onChange={(e) => handleColorChange("footer", e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          type="text"
                          value={colors[selectedPage].footer}
                          onChange={(e) => handleColorChange("footer", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="text">Text Color</Label>
                      <div className="flex items-center space-x-3 mt-1">
                        <Input
                          id="text"
                          type="color"
                          value={colors[selectedPage].text}
                          onChange={(e) => handleColorChange("text", e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          type="text"
                          value={colors[selectedPage].text}
                          onChange={(e) => handleColorChange("text", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div
                  className="mt-6 p-4 border rounded-lg"
                  style={{ backgroundColor: colors[selectedPage].background }}
                >
                  <div className="p-3 rounded mb-3" style={{ backgroundColor: colors[selectedPage].header }}>
                    <p className="text-white font-semibold">Header Preview</p>
                  </div>
                  <div className="p-3 mb-3" style={{ color: colors[selectedPage].text }}>
                    <p>This is how your text will look on the page.</p>
                  </div>
                  <div className="p-3 rounded" style={{ backgroundColor: colors[selectedPage].footer }}>
                    <p className="text-white font-semibold">Footer Preview</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Button onClick={saveColors} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Colors
                  </Button>
                  <Button onClick={resetColors} variant="outline">
                    Reset to Default
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
