"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Home, Info, ShoppingBag, Phone, Save, Edit } from "lucide-react"

export default function ParagraphManager() {
  const [selectedPage, setSelectedPage] = useState("")
  const [content, setContent] = useState({
    home: {
      heroTitle: "Bloom with elegance.",
      heroSubtitle: "Experience our exclusive collection of premium fragrances",
      sectionTitle: "Bestseller Perfumes",
      sectionSubtitle: "Experience our most loved fragrances",
    },
    about: {
      pageTitle: "About us",
      historyTitle: "HISTORY OF PERFUME INDUSTRY",
      mainTitle: "About The Century Scents",
      paragraph1:
        "The art of perfumery dates back thousands of years, with ancient civilizations like the Egyptians, Persians, and Greeks using fragrances in rituals, medicine, and personal grooming. As time progressed, perfumery flourished in the Islamic Golden Age and later in Renaissance Europe, especially in France, which became the global hub of luxury fragrance.",
      paragraph2:
        "Today, the perfume industry blends centuries of tradition with cutting-edge technology, and luxury fragrance often comes at a high cost—until now.",
      slogan: "The Century Scents' slogan: Everyone Deserves to Smell Amazing.",
      paragraph3:
        "Led by Syed Bilal bin Amir and Syed Talha bin Amir, two highly motivated and committed individuals, The Century Scents is more than just a brand—it's a mission. Their passion for excellence and drive to make premium fragrance accessible to all has made The Century Scents a reliable and respected source in the perfume world.",
    },
    shop: {
      pageTitle: "Shop",
      subtitle: "PERFUME",
      filterTitle: "FILTER BY PRICE",
      stockTitle: "STOCK STATUS",
      topRatedTitle: "TOP RATED PRODUCTS",
    },
    contact: {
      pageTitle: "Contact",
      faqTitle: "INFORMATION QUESTIONS",
      faqSubtitle: "FREQUENTLY ASKED QUESTIONS",
      contactTitle: "INFORMATION ABOUT US",
      contactSubtitle: "CONTACT US FOR ANY QUESTIONS",
    },
  })

  const pages = [
    { id: "home", name: "Home Page", icon: Home },
    { id: "about", name: "About Page", icon: Info },
    { id: "shop", name: "Shop Page", icon: ShoppingBag },
    { id: "contact", name: "Contact Page", icon: Phone },
  ]

  const handleContentChange = (field, value) => {
    if (selectedPage) {
      setContent((prev) => ({
        ...prev,
        [selectedPage]: {
          ...prev[selectedPage],
          [field]: value,
        },
      }))
    }
  }

  const saveContent = () => {
    localStorage.setItem("websiteContent", JSON.stringify(content))
    alert("✅ Content saved successfully!")
  }

  const resetContent = () => {
    if (selectedPage && confirm("Are you sure you want to reset this page's content to default?")) {
      // Reset to default content for the selected page
      const defaultContent = {
        home: {
          heroTitle: "Bloom with elegance.",
          heroSubtitle: "Experience our exclusive collection of premium fragrances",
          sectionTitle: "Bestseller Perfumes",
          sectionSubtitle: "Experience our most loved fragrances",
        },
        about: {
          pageTitle: "About us",
          historyTitle: "HISTORY OF PERFUME INDUSTRY",
          mainTitle: "About The Century Scents",
          paragraph1: "The art of perfumery dates back thousands of years...",
          paragraph2: "Today, the perfume industry blends centuries of tradition...",
          slogan: "The Century Scents' slogan: Everyone Deserves to Smell Amazing.",
          paragraph3: "Led by Syed Bilal bin Amir and Syed Talha bin Amir...",
        },
        shop: {
          pageTitle: "Shop",
          subtitle: "PERFUME",
          filterTitle: "FILTER BY PRICE",
          stockTitle: "STOCK STATUS",
          topRatedTitle: "TOP RATED PRODUCTS",
        },
        contact: {
          pageTitle: "Contact",
          faqTitle: "INFORMATION QUESTIONS",
          faqSubtitle: "FREQUENTLY ASKED QUESTIONS",
          contactTitle: "INFORMATION ABOUT US",
          contactSubtitle: "CONTACT US FOR ANY QUESTIONS",
        },
      }

      setContent((prev) => ({
        ...prev,
        [selectedPage]: defaultContent[selectedPage],
      }))
    }
  }

  const renderContentFields = () => {
    if (!selectedPage) return null

    const pageContent = content[selectedPage]
    const fields = Object.keys(pageContent)

    return (
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field}>
            <Label htmlFor={field} className="capitalize">
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </Label>
            {field.includes("paragraph") || field.includes("subtitle") ? (
              <Textarea
                id={field}
                value={pageContent[field]}
                onChange={(e) => handleContentChange(field, e.target.value)}
                rows={3}
                className="mt-1"
              />
            ) : (
              <Input
                id={field}
                value={pageContent[field]}
                onChange={(e) => handleContentChange(field, e.target.value)}
                className="mt-1"
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Edit className="w-5 h-5" />
            <span>Website Content Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Edit text content, headings, and paragraphs for each page of your website.
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

          {/* Content Editor */}
          {selectedPage && (
            <Card className="border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg">Edit {pages.find((p) => p.id === selectedPage)?.name} Content</CardTitle>
              </CardHeader>
              <CardContent>
                {renderContentFields()}

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Button onClick={saveContent} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Content
                  </Button>
                  <Button onClick={resetContent} variant="outline">
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
