"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Save, Eye, EyeOff } from "lucide-react"

export default function AdminProfileManager() {
  const [adminProfile, setAdminProfile] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  useEffect(() => {
    // Load current admin credentials
    const credentials = JSON.parse(localStorage.getItem("adminCredentials") || "{}")
    setAdminProfile((prev) => ({
      ...prev,
      username: credentials.username || "",
      email: credentials.email || "",
    }))
  }, [])

  const handleInputChange = (field, value) => {
    setAdminProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const updateProfile = () => {
    const credentials = JSON.parse(localStorage.getItem("adminCredentials") || "{}")

    // Verify current password
    if (adminProfile.currentPassword !== credentials.password) {
      alert("❌ Current password is incorrect!")
      return
    }

    // Validate new password if provided
    if (adminProfile.newPassword) {
      if (adminProfile.newPassword !== adminProfile.confirmPassword) {
        alert("❌ New passwords don't match!")
        return
      }
      if (adminProfile.newPassword.length < 6) {
        alert("❌ New password must be at least 6 characters long!")
        return
      }
    }

    // Update credentials
    const updatedCredentials = {
      username: adminProfile.username,
      email: adminProfile.email,
      password: adminProfile.newPassword || credentials.password,
    }

    localStorage.setItem("adminCredentials", JSON.stringify(updatedCredentials))

    // Clear password fields
    setAdminProfile((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))

    alert("✅ Admin profile updated successfully!")
  }

  const resetToDefault = () => {
    if (confirm("⚠️ This will reset your admin credentials to default. Are you sure?")) {
      const defaultCredentials = {
        username: "admin",
        password: "admin123",
        email: "admin@thecenturyscents.com",
      }
      localStorage.setItem("adminCredentials", JSON.stringify(defaultCredentials))
      setAdminProfile({
        username: "admin",
        email: "admin@thecenturyscents.com",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      alert("✅ Admin credentials reset to default!")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Admin Profile Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">Update your admin login credentials and profile information.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username">Admin Username</Label>
                  <Input
                    id="username"
                    value={adminProfile.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Enter admin username"
                  />
                  <p className="text-sm text-gray-500 mt-1">This will be used to login to the admin panel</p>
                </div>
                <div>
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={adminProfile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter admin email"
                  />
                  <p className="text-sm text-gray-500 mt-1">Used for notifications and account recovery</p>
                </div>
              </CardContent>
            </Card>

            {/* Password Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={adminProfile.currentPassword}
                      onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                      placeholder="Enter current password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password (Optional)</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={adminProfile.newPassword}
                      onChange={(e) => handleInputChange("newPassword", e.target.value)}
                      placeholder="Enter new password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Leave blank to keep current password</p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={adminProfile.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm new password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Security Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-800">Last Login</p>
                  <p className="text-blue-600">
                    {localStorage.getItem("adminLoginTime")
                      ? new Date(localStorage.getItem("adminLoginTime")).toLocaleString()
                      : "Never"}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-800">Account Status</p>
                  <p className="text-green-600">Active</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-semibold text-purple-800">Role</p>
                  <p className="text-purple-600">Super Administrator</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <Button onClick={updateProfile} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
            <Button onClick={resetToDefault} variant="destructive">
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
