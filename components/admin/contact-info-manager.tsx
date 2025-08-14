"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, MessageSquare, Save } from "lucide-react"

export default function ContactInfoManager() {
  const [contactInfo, setContactInfo] = useState({
    phone1: "03300062483",
    phone2: "03335408761",
    whatsapp: "03300062483",
    email: "info@thecenturyscents.com",
    adminEmail: "admin@thecenturyscents.com",
    address: "Karachi, Pakistan",
    businessHours: "Mon-Sat: 9:00 AM - 8:00 PM",
  })

  const handleInputChange = (field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveContactInfo = () => {
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo))
    alert("✅ Contact information updated successfully!")
  }

  const resetToDefault = () => {
    setContactInfo({
      phone1: "03300062483",
      phone2: "03335408761",
      whatsapp: "03300062483",
      email: "info@thecenturyscents.com",
      adminEmail: "admin@thecenturyscents.com",
      address: "Karachi, Pakistan",
      businessHours: "Mon-Sat: 9:00 AM - 8:00 PM",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Contact Information Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Update your business contact information. These details will appear across your website.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Phone Numbers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Numbers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone1">Primary Phone</Label>
                  <Input
                    id="phone1"
                    value={contactInfo.phone1}
                    onChange={(e) => handleInputChange("phone1", e.target.value)}
                    placeholder="03xxxxxxxxx"
                  />
                </div>
                <div>
                  <Label htmlFor="phone2">Secondary Phone</Label>
                  <Input
                    id="phone2"
                    value={contactInfo.phone2}
                    onChange={(e) => handleInputChange("phone2", e.target.value)}
                    placeholder="03xxxxxxxxx"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={contactInfo.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    placeholder="03xxxxxxxxx"
                  />
                  <p className="text-sm text-gray-500 mt-1">This will be used for WhatsApp contact button</p>
                </div>
              </CardContent>
            </Card>

            {/* Email Addresses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Addresses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="info@thecenturyscents.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">Public email for customer inquiries</p>
                </div>
                <div>
                  <Label htmlFor="adminEmail">Admin Notification Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={contactInfo.adminEmail}
                    onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                    placeholder="admin@thecenturyscents.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">Email where order notifications will be sent</p>
                </div>
              </CardContent>
            </Card>

            {/* Address & Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location & Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <Label htmlFor="businessHours">Business Hours</Label>
                  <Input
                    id="businessHours"
                    value={contactInfo.businessHours}
                    onChange={(e) => handleInputChange("businessHours", e.target.value)}
                    placeholder="Mon-Sat: 9:00 AM - 8:00 PM"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Info Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>{contactInfo.phone1}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>{contactInfo.phone2}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span>WhatsApp: {contactInfo.whatsapp}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>{contactInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{contactInfo.address}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Hours:</strong> {contactInfo.businessHours}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <Button onClick={saveContactInfo} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Contact Info
            </Button>
            <Button onClick={resetToDefault} variant="outline">
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
