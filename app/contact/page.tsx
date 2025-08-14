"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [content, setContent] = useState({
    pageTitle: "Contact",
    breadcrumbHome: "Home",
    faqTitle: "INFORMATION QUESTIONS",
    faqSubtitle: "FREQUENTLY ASKED QUESTIONS",
    contactTitle: "INFORMATION ABOUT US",
    contactSubtitle: "CONTACT US FOR ANY QUESTIONS",
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    phoneLabel: "Phone Number",
    companyLabel: "Company",
    messageLabel: "Your Message",
    submitButtonText: "SUBMIT",
    sendingText: "SENDING...",
    faq1Question: "What are your shipping options?",
    faq1Answer: "We offer free shipping across Pakistan with cash on delivery option.",
    faq2Question: "How long do the fragrances last?",
    faq2Answer: "Our perfumes are long-lasting with 6-8 hours of longevity.",
    faq3Question: "Do you offer exchanges?",
    faq3Answer: "Yes, we have a 7-day return policy for unopened products.",
    phone1: "03300062483",
    phone2: "03335498761",
    email: "info@thecenturyscents.com",
  })

  const [contactInfo, setContactInfo] = useState({
    phone1: "03300062483",
    phone2: "03335408761",
    whatsapp: "03300062483",
    email: "info@thecenturyscents.com",
    address: "Karachi, Pakistan",
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("pageContent")
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent)
      if (parsedContent.contact) {
        setContent(parsedContent.contact)
      }
    }

    const savedContactInfo = localStorage.getItem("contactInfo")
    if (savedContactInfo) {
      setContactInfo(JSON.parse(savedContactInfo))
    }

    // Listen for updates
    const handleContentUpdate = () => {
      const savedContent = localStorage.getItem("pageContent")
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent)
        if (parsedContent.contact) {
          setContent(parsedContent.contact)
        }
      }
      const savedContactInfo = localStorage.getItem("contactInfo")
      if (savedContactInfo) {
        setContactInfo(JSON.parse(savedContactInfo))
      }
    }

    window.addEventListener("websiteSettingsUpdated", handleContentUpdate)
    return () => window.removeEventListener("websiteSettingsUpdated", handleContentUpdate)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("✅ Message sent successfully! We will contact you soon.")
    setFormData({ name: "", email: "", phone: "", company: "", message: "" })
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <nav className="text-sm mb-4">
              <span className="text-blue-200">{content.breadcrumbHome}</span>
              <span className="mx-2">/</span>
              <span>{content.pageTitle}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold">{content.pageTitle}</h1>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FAQ Section */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{content.faqTitle}</h2>
                <h3 className="text-3xl font-bold text-blue-600">{content.faqSubtitle}</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                  <h4 className="font-bold text-lg mb-3 text-gray-800">{content.faq1Question}</h4>
                  <p className="text-gray-600">{content.faq1Answer}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                  <h4 className="font-bold text-lg mb-3 text-gray-800">{content.faq2Question}</h4>
                  <p className="text-gray-600">{content.faq2Answer}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                  <h4 className="font-bold text-lg mb-3 text-gray-800">{content.faq3Question}</h4>
                  <p className="text-gray-600">{content.faq3Answer}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>{contactInfo.phone1}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>{contactInfo.phone2}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <span>WhatsApp: {contactInfo.whatsapp}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-red-600" />
                    <span>{contactInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span>{contactInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{content.contactTitle}</h2>
                <h3 className="text-3xl font-bold text-blue-600">{content.contactSubtitle}</h3>
              </div>

              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name">{content.nameLabel}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{content.emailLabel}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="phone">{content.phoneLabel}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">{content.companyLabel}</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="message">{content.messageLabel}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? content.sendingText : content.submitButtonText}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
