"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageSquare } from "lucide-react"

export function Footer() {
  // Editable content from admin
  const [content, setContent] = useState({
    companyTitle: "THE CENTURY SCENTS",
    companyDescription:
      "Your trusted source for premium chemical solutions and fragrances. Quality, authenticity, and customer satisfaction are our top priorities.",
    quickLinksTitle: "Quick Links",
    homeLink: "Home",
    aboutLink: "About Us",
    shopLink: "Shop",
    contactLink: "Contact",
    privacyLink: "Privacy Policy",
    termsLink: "Terms of Service",
    contactTitle: "Contact Info",
    addressText: "Karachi, Pakistan",
    phoneText: "Phone:",
    emailText: "Email:",
    followTitle: "Follow Us",
    facebookText: "Facebook",
    instagramText: "Instagram",
    twitterText: "Twitter",
    whatsappText: "WhatsApp",
    copyrightText: "© 2024 The Century Scents. All rights reserved.",
    developedText: "Developed with ❤️ for premium fragrances",
  })

  const [contactInfo, setContactInfo] = useState({
    phone1: "03300062483",
    phone2: "03335408761",
    email: "info@thecenturyscents.com",
    whatsapp: "03300062483",
  })

  const [websiteSettings, setWebsiteSettings] = useState({
    colors: {
      footerBg: "#1f2937",
      footerText: "#d1d5db",
    },
  })

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("pageContent")
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent)
      if (parsedContent.footer) {
        setContent(parsedContent.footer)
      }
    }

    const savedSettings = localStorage.getItem("websiteSettings")
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      if (parsed.contactInfo) {
        setContactInfo(parsed.contactInfo)
      }
      if (parsed.colors) {
        setWebsiteSettings((prev) => ({ ...prev, colors: parsed.colors }))
      }
    }

    // Listen for updates
    const handleContentUpdate = () => {
      const savedContent = localStorage.getItem("pageContent")
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent)
        if (parsedContent.footer) {
          setContent(parsedContent.footer)
        }
      }
      const savedSettings = localStorage.getItem("websiteSettings")
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        if (parsed.contactInfo) {
          setContactInfo(parsed.contactInfo)
        }
        if (parsed.colors) {
          setWebsiteSettings((prev) => ({ ...prev, colors: parsed.colors }))
        }
      }
    }

    window.addEventListener("websiteSettingsUpdated", handleContentUpdate)
    return () => window.removeEventListener("websiteSettingsUpdated", handleContentUpdate)
  }, [])

  return (
    <footer
      className="text-white"
      style={{
        backgroundColor: websiteSettings.colors.footerBg,
        color: websiteSettings.colors.footerText,
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-xl">{content.companyTitle}</span>
            </div>
            <p className="text-gray-400 mb-4">{content.companyDescription}</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <MessageSquare className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{content.quickLinksTitle}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  {content.homeLink}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  {content.aboutLink}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  {content.shopLink}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {content.contactLink}
                </Link>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-white">{content.privacyLink}</span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-white">{content.termsLink}</span>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Chemical Solutions</span>
              </li>
              <li>
                <span className="text-gray-400">Fragrances</span>
              </li>
              <li>
                <span className="text-gray-400">Industrial Solvents</span>
              </li>
              <li>
                <span className="text-gray-400">Specialty Chemicals</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{content.contactTitle}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400" />
                <span className="text-gray-400">{contactInfo.phone1}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400" />
                <span className="text-gray-400">{contactInfo.phone2}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">WhatsApp: {contactInfo.whatsapp}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <span className="text-gray-400">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">{content.addressText}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-2">{content.copyrightText}</p>
          <p className="text-gray-500 text-sm">{content.developedText}</p>
        </div>
      </div>
    </footer>
  )
}
