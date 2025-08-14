"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const [content, setContent] = useState({
    pageTitle: "About us",
    breadcrumbHome: "Home",
    historyTitle: "HISTORY OF PERFUME INDUSTRY",
    mainTitle: "About The Century Scents",
    paragraph1:
      "The art of perfumery dates back thousands of years, with ancient civilizations like the Egyptians, Persians, and Greeks using fragrances in rituals, medicine, and personal grooming. As time progressed, perfumery flourished in the Islamic Golden Age and later in Renaissance Europe, especially in France, which became the global hub of luxury fragrance.",
    paragraph2:
      "Today, the perfume industry blends centuries of tradition with cutting-edge technology, and luxury fragrance often comes at a high cost—until now.",
    slogan: "The Century Scents' slogan: Everyone Deserves to Smell Amazing.",
    paragraph3:
      "Led by Syed Bilal bin Amir and Syed Talha bin Amir, two highly motivated and committed individuals, The Century Scents is more than just a brand—it's a mission. Their passion for excellence and drive to make premium fragrance accessible to all has made The Century Scents a reliable and respected source in the perfume world.",
    paragraph4:
      "The Century Scents has revolutionized the market by offering exceptional quality perfumes at very cheap prices. Built on the belief that everyone deserves to experience luxury without paying luxury prices, Century Scents is a trusted name for those seeking long-lasting, elegant, and affordable fragrances.",
    paragraph5:
      "What truly sets The Century Scents apart is its expertise in crafting high-quality impressions of world-famous perfume brands—delivering the same luxurious experience at a fraction of the cost. Every bottle reflects dedication to quality, attention to detail, and an unwavering commitment to customer satisfaction.",
    paragraph6:
      "With The Century Scents, you don't just wear a perfume you wear confidence, class, and quality that speaks volumes.",
    historyCard1Title: "Our company history and facts",
    historyCard1Text:
      "Founded as incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.",
    historyCard2Title: "Our company history and facts Lorem ipsum",
    historyCard2Text:
      "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.",
  })

  useEffect(() => {
    // Load content from localStorage (admin settings)
    const savedContent = localStorage.getItem("pageContent")
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent)
      if (parsedContent.about) {
        setContent(parsedContent.about)
      }
    }

    // Listen for content updates
    const handleContentUpdate = () => {
      const savedContent = localStorage.getItem("pageContent")
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent)
        if (parsedContent.about) {
          setContent(parsedContent.about)
        }
      }
    }

    window.addEventListener("websiteSettingsUpdated", handleContentUpdate)
    return () => window.removeEventListener("websiteSettingsUpdated", handleContentUpdate)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <nav className="text-sm mb-4">
              <span className="text-amber-200">{content.breadcrumbHome}</span>
              <span className="mx-2">/</span>
              <span>{content.pageTitle}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold">{content.pageTitle}</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-4">{content.historyTitle}</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-8">{content.mainTitle}</h3>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6 leading-relaxed">{content.paragraph1}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{content.paragraph2}</p>

              <div className="bg-amber-50 p-6 rounded-lg my-8">
                <p className="text-amber-800 font-semibold text-xl text-center">{content.slogan}</p>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{content.paragraph3}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{content.paragraph4}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{content.paragraph5}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{content.paragraph6}</p>
            </div>

            {/* History Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h4 className="text-xl font-bold mb-4 text-gray-800">{content.historyCard1Title}</h4>
                <p className="text-gray-600">{content.historyCard1Text}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h4 className="text-xl font-bold mb-4 text-gray-800">{content.historyCard2Title}</h4>
                <p className="text-gray-600">{content.historyCard2Text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
