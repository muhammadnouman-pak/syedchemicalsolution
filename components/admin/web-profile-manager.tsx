"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, Play, Save } from "lucide-react"

export default function WebProfileManager() {
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg?height=60&width=200&text=THE+CENTURY+SCENTS+LOGO")
  const [heroImage, setHeroImage] = useState("/hero-perfumes.png")
  const [selectedAnimation, setSelectedAnimation] = useState("fadeIn")

  const animations = [
    { id: "fadeIn", name: "Fade In", description: "Smooth fade in effect" },
    { id: "slideUp", name: "Slide Up", description: "Slides up from bottom" },
    { id: "slideLeft", name: "Slide Left", description: "Slides in from right" },
    { id: "zoomIn", name: "Zoom In", description: "Zooms in with scale effect" },
    { id: "bounce", name: "Bounce", description: "Bouncy entrance effect" },
  ]

  const saveLogo = () => {
    localStorage.setItem("websiteLogo", logoUrl)
    alert("✅ Logo updated successfully!")
  }

  const saveHeroImage = () => {
    localStorage.setItem("heroImage", heroImage)
    localStorage.setItem("heroAnimation", selectedAnimation)
    alert("✅ Hero image and animation updated successfully!")
  }

  const previewAnimation = () => {
    const preview = document.getElementById("hero-preview")
    if (preview) {
      preview.className = "w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
      setTimeout(() => {
        preview.className = `w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300 animate-${selectedAnimation}`
      }, 100)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="w-5 h-5" />
            <span>Website Profile Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">Manage your website's visual identity including logo and hero images.</p>

          {/* Logo Management */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Website Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="Enter logo URL"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload your logo to a hosting service and paste the URL here
                  </p>
                  <Button onClick={saveLogo} className="mt-3 bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Logo
                  </Button>
                </div>
                <div>
                  <Label>Logo Preview</Label>
                  <div className="mt-1 p-4 border rounded-lg bg-gray-50">
                    <img
                      src={logoUrl || "/placeholder.svg"}
                      alt="Logo Preview"
                      className="max-h-16 mx-auto"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=60&width=200&text=Logo+Error"
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hero Image Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hero Section Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="heroUrl">Hero Image URL</Label>
                    <Input
                      id="heroUrl"
                      value={heroImage}
                      onChange={(e) => setHeroImage(e.target.value)}
                      placeholder="Enter hero image URL"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Animation Style</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {animations.map((animation) => (
                        <label
                          key={animation.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="animation"
                            value={animation.id}
                            checked={selectedAnimation === animation.id}
                            onChange={(e) => setSelectedAnimation(e.target.value)}
                            className="text-amber-600"
                          />
                          <div>
                            <p className="font-medium">{animation.name}</p>
                            <p className="text-sm text-gray-500">{animation.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button onClick={previewAnimation} variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Preview Animation
                    </Button>
                    <Button onClick={saveHeroImage} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Hero Image Preview</Label>
                  <div className="mt-1">
                    <img
                      id="hero-preview"
                      src={heroImage || "/placeholder.svg"}
                      alt="Hero Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=300&width=600&text=Hero+Image+Error"
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">This is how your hero image will appear on the homepage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

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
