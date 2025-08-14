"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search, Menu, X, Phone } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { SearchModal } from "@/components/search-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { getTotalItems } = useCart()

  // Editable content from admin
  const [content, setContent] = useState({
    topBarText: "Free shipping on orders over Rs 2000 | Call: 03300062483",
    homeText: "Home",
    aboutText: "About",
    shopText: "Shop",
    contactText: "Contact",
    searchPlaceholder: "Search products...",
    searchButtonText: "Search",
    cartText: "Cart",
    cartEmptyText: "Your cart is empty",
    viewCartText: "View Cart",
    checkoutText: "Checkout",
  })

  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "SYED CHEMICAL SOLUTION",
    contactInfo: {
      phone1: "03300062483",
    },
    colors: {
      headerBg: "#ffffff",
      headerText: "#374151",
      topBarBg: "#b45309",
    },
  })

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("pageContent")
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent)
      if (parsedContent.header) {
        setContent(parsedContent.header)
      }
    }

    const savedSettings = localStorage.getItem("websiteSettings")
    if (savedSettings) {
      setWebsiteSettings(JSON.parse(savedSettings))
    }

    // Listen for updates
    const handleContentUpdate = () => {
      const savedContent = localStorage.getItem("pageContent")
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent)
        if (parsedContent.header) {
          setContent(parsedContent.header)
        }
      }
      const savedSettings = localStorage.getItem("websiteSettings")
      if (savedSettings) {
        setWebsiteSettings(JSON.parse(savedSettings))
      }
    }

    window.addEventListener("websiteSettingsUpdated", handleContentUpdate)
    return () => window.removeEventListener("websiteSettingsUpdated", handleContentUpdate)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div
        className="text-white text-sm py-2 px-4 text-center"
        style={{ backgroundColor: websiteSettings.colors.topBarBg }}
      >
        <div className="flex items-center justify-center space-x-4">
          <Phone className="w-4 h-4" />
          <span>{content.topBarText}</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className="shadow-sm border-b sticky top-0 z-40"
        style={{
          backgroundColor: websiteSettings.colors.headerBg,
          color: websiteSettings.colors.headerText,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="font-bold text-xl">{websiteSettings.siteName}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-amber-600 transition-colors">
                {content.homeText}
              </Link>
              <Link href="/about" className="hover:text-amber-600 transition-colors">
                {content.aboutText}
              </Link>
              <Link href="/shop" className="hover:text-amber-600 transition-colors">
                {content.shopText}
              </Link>
              <Link href="/contact" className="hover:text-amber-600 transition-colors">
                {content.contactText}
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button - Desktop */}
              <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)} className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-amber-600">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="hover:text-amber-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {content.homeText}
                </Link>
                <Link
                  href="/about"
                  className="hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {content.aboutText}
                </Link>
                <Link
                  href="/shop"
                  className="hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {content.shopText}
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {content.contactText}
                </Link>

                {/* Mobile Search */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="justify-start"
                >
                  <Search className="h-5 w-5 mr-2" />
                  {content.searchButtonText}
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
