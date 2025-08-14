"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Settings } from "lucide-react"
import { testEmailConfiguration } from "@/lib/emailjs"
import { useRouter, useSearchParams } from "next/navigation"
import {
  LogOut,
  TrendingUpIcon,
  PackageIcon,
  ShoppingCart,
  DollarSignIcon,
  SettingsIcon,
  Edit,
  Plus,
  Trash2,
  Save,
  Palette,
  ImageIcon,
  User,
  MessageSquare,
  RotateCcw,
  Lock,
  Eye,
  EyeOff,
  Play,
  Home,
  Info,
  Phone,
  Bell,
  Clock,
  Filter,
  Search,
  Download,
  Trash,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Check for order parameter in URL
  const orderIdFromUrl = searchParams.get("order")

  // Orders state
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderFilter, setOrderFilter] = useState("all")
  const [orderSearch, setOrderSearch] = useState("")

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    lowStockProducts: 0,
  })

  // Admin credentials state
  const [adminCredentials, setAdminCredentials] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Website Settings State
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "SYED CHEMICAL SOLUTION",
    logo: "",
    heroImage: "/hero-perfumes.png",
    heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
    heroSubtitle: "Experience our exclusive collection of premium chemical solutions and fragrances",
    heroAnimation: "fadeIn",
    contactInfo: {
      phone1: "03300062483",
      phone2: "03335408761",
      email: "info@syedchemicalsolution.com",
      whatsapp: "03300062483",
      adminEmail: "noumantahir505@gmail.com",
    },
    colors: {
      background: "#ffffff",
      headerBg: "#ffffff",
      headerText: "#374151",
      topBarBg: "#b45309",
      footerBg: "#f9fafb",
      footerText: "#374151",
      heroText: "#ffffff",
    },
  })

  // Comprehensive Content Management State - ALL website content
  const [selectedContentPage, setSelectedContentPage] = useState("")
  const [pageContent, setPageContent] = useState({
    home: {
      // Hero Section
      heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
      heroSubtitle: "Experience our exclusive collection of premium chemical solutions and fragrances",
      heroButtonText: "SHOP NOW",

      // Features Section
      feature1Title: "Free Shipping",
      feature1Subtitle: "On orders over Rs 2000",
      feature2Title: "Authentic Products",
      feature2Subtitle: "100% genuine chemical solutions",
      feature3Title: "24/7 Support",
      feature3Subtitle: "Technical support available",
      feature4Title: "Quality Guarantee",
      feature4Subtitle: "Premium chemical standards",

      // Products Section
      productsTitle: "FEATURED CHEMICAL SOLUTIONS",
      productsSubtitle: "Discover our most popular chemical compounds and solutions",
      viewAllButtonText: "VIEW ALL PRODUCTS",
      addToCartText: "ADD TO CART",
      outOfStockText: "OUT OF STOCK",
      saveText: "Save Rs",

      // Newsletter Section
      newsletterTitle: "STAY UPDATED",
      newsletterSubtitle:
        "Subscribe to our newsletter and be the first to know about new chemical solutions, exclusive offers, and technical updates.",
      newsletterPlaceholder: "Enter your email",
      subscribeButtonText: "SUBSCRIBE",
    },
    about: {
      // Hero Section
      pageTitle: "About us",
      breadcrumbHome: "Home",

      // Main Content
      historyTitle: "HISTORY OF CHEMICAL INDUSTRY",
      mainTitle: "About Syed Chemical Solution",
      paragraph1:
        "The chemical industry has been the backbone of modern civilization, providing essential compounds and solutions for various industries. From pharmaceuticals to fragrances, chemicals play a crucial role in our daily lives.",
      paragraph2:
        "Today, the chemical industry combines traditional knowledge with cutting-edge technology to deliver high-quality solutions at competitive prices.",
      slogan: "Syed Chemical Solution's slogan: Quality Chemicals for Every Need.",
      paragraph3:
        "Led by experienced professionals, Syed Chemical Solution is more than just a supplier—it's a trusted partner. Our commitment to quality and customer satisfaction has made us a reliable source in the chemical industry.",
      paragraph4:
        "Syed Chemical Solution has established itself in the market by offering exceptional quality chemicals at competitive prices. Built on the belief that every business deserves access to premium chemicals without premium prices, we are a trusted name for those seeking reliable, pure, and affordable chemical solutions.",
      paragraph5:
        "What truly sets Syed Chemical Solution apart is our expertise in sourcing and supplying high-quality chemical compounds—delivering the same professional experience at competitive rates. Every product reflects our dedication to quality, attention to detail, and unwavering commitment to customer satisfaction.",
      paragraph6:
        "With Syed Chemical Solution, you don't just buy chemicals—you invest in quality, reliability, and excellence that speaks volumes.",

      // History Cards
      historyCard1Title: "Our company history and facts",
      historyCard1Text:
        "Founded with a vision to provide quality chemical solutions to industries across Pakistan, we have grown to become a trusted name in the chemical supply industry.",
      historyCard2Title: "Our commitment to excellence",
      historyCard2Text:
        "We believe in maintaining the highest standards of quality and purity in all our chemical products, ensuring customer satisfaction and safety.",
    },
    shop: {
      // Hero Section
      pageTitle: "Shop",
      breadcrumbHome: "Home",
      subtitle: "CHEMICAL SOLUTIONS",

      // Safety Notice
      safetyTitle: "⚠️ Chemical Safety Notice",
      safetyText:
        "All chemical products are intended for professional use only. Please ensure proper handling, storage, and safety measures are followed according to industry standards.",

      // Filter Section
      filterTitle: "FILTER BY PRICE",
      filterButton: "Filter",
      stockTitle: "STOCK STATUS",
      inStockText: "In Stock",
      outOfStockText: "Out of Stock",
      topRatedTitle: "TOP RATED PRODUCTS",

      // Product Actions
      addToCartText: "ADD TO CART",
      quickViewText: "Quick View",
      compareText: "Compare",
      wishlistText: "Add to Wishlist",

      // Sorting
      sortByText: "Sort by:",
      sortDefault: "Default",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      sortName: "Name A-Z",
      sortRating: "Rating",
    },
    contact: {
      // Hero Section
      pageTitle: "Contact",
      breadcrumbHome: "Home",

      // FAQ Section
      faqTitle: "INFORMATION QUESTIONS",
      faqSubtitle: "FREQUENTLY ASKED QUESTIONS",

      // Contact Form Section
      contactTitle: "INFORMATION ABOUT US",
      contactSubtitle: "CONTACT US FOR ANY QUESTIONS",

      // Form Fields
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      phoneLabel: "Phone Number",
      companyLabel: "Company",
      messageLabel: "Your Message",
      submitButtonText: "SUBMIT",
      sendingText: "SENDING...",

      // FAQ Items
      faq1Question: "What are your shipping options?",
      faq1Answer: "We offer free shipping across Pakistan with cash on delivery option.",
      faq2Question: "How do you ensure chemical purity?",
      faq2Answer: "All our chemicals undergo rigorous quality testing and come with purity certificates.",
      faq3Question: "Do you offer bulk discounts?",
      faq3Answer: "Yes, we provide competitive bulk pricing for large orders and regular customers.",

      // Contact Info
      phone1: "03300062483",
      phone2: "03335498761",
      email: "info@syedchemicalsolution.com",
    },
    header: {
      // Top Bar
      topBarText: "Free shipping on orders over Rs 2000 | Call: 03300062483",

      // Navigation
      homeText: "Home",
      aboutText: "About",
      shopText: "Shop",
      contactText: "Contact",

      // Search
      searchPlaceholder: "Search products...",
      searchButtonText: "Search",

      // Cart
      cartText: "Cart",
      cartEmptyText: "Your cart is empty",
      viewCartText: "View Cart",
      checkoutText: "Checkout",
    },
    footer: {
      // Company Info
      companyTitle: "SYED CHEMICAL SOLUTION",
      companyDescription:
        "Your trusted source for premium chemical solutions and compounds. Quality, purity, and customer satisfaction are our top priorities.",

      // Quick Links
      quickLinksTitle: "Quick Links",
      homeLink: "Home",
      aboutLink: "About Us",
      shopLink: "Shop",
      contactLink: "Contact",
      privacyLink: "Privacy Policy",
      termsLink: "Terms of Service",

      // Contact Info
      contactTitle: "Contact Info",
      addressText: "Karachi, Pakistan",
      phoneText: "Phone:",
      emailText: "Email:",

      // Follow Us
      followTitle: "Follow Us",
      facebookText: "Facebook",
      instagramText: "Instagram",
      twitterText: "Twitter",
      whatsappText: "WhatsApp",

      // Copyright
      copyrightText: "© 2024 Syed Chemical Solution. All rights reserved.",
      developedText: "Developed with ❤️ for premium chemical solutions",
    },
  })

  // Image Management State
  const [selectedImagePage, setSelectedImagePage] = useState("")
  const [pageImages, setPageImages] = useState({
    home: {
      heroImage: "/hero-perfumes.png",
      featureIcon1: "/placeholder.svg?height=64&width=64&text=Truck",
      featureIcon2: "/placeholder.svg?height=64&width=64&text=Shield",
      featureIcon3: "/placeholder.svg?height=64&width=64&text=Headphones",
      featureIcon4: "/placeholder.svg?height=64&width=64&text=Return",
    },
    about: {
      heroImage: "/placeholder.svg?height=300&width=1200&text=About+Background",
      processImage: "/placeholder.svg?height=400&width=500&text=Chemical+Process",
      collectionImage: "/placeholder.svg?height=400&width=500&text=Chemical+Collection",
      historyImage: "/placeholder.svg?height=300&width=400&text=Our+Company+History",
      animationImage: "/placeholder.svg?height=300&width=400&text=Chemical+Animation",
    },
    shop: {
      heroImage: "/placeholder.svg?height=400&width=1200&text=Chemical+Solutions",
    },
    contact: {
      heroImage: "/placeholder.svg?height=300&width=1200&text=Contact+Background",
    },
  })

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Henyle Acetate Premium",
      price: 2800,
      originalPrice: 3500,
      image: "/placeholder.svg?height=300&width=200&text=Henyle+Acetate",
      description: "High-grade henyle acetate for premium fragrance formulations",
      quantity: 15,
      rating: 4.8,
      reviews: 124,
      badge: "PREMIUM",
    },
    {
      id: 2,
      name: "Benzyl Benzoate Pure",
      price: 2200,
      originalPrice: 2750,
      image: "/placeholder.svg?height=300&width=200&text=Benzyl+Benzoate",
      description: "Pure benzyl benzoate compound for chemical synthesis",
      quantity: 8,
      rating: 4.7,
      reviews: 89,
      badge: "PURE",
    },
    {
      id: 3,
      name: "Aldehyde C-12 MNA",
      price: 3200,
      originalPrice: 4000,
      image: "/placeholder.svg?height=300&width=200&text=Aldehyde+C12",
      description: "Aldehyde C-12 MNA for sophisticated fragrance notes",
      quantity: 12,
      rating: 4.9,
      reviews: 156,
      badge: "TOP GRADE",
    },
    {
      id: 4,
      name: "Essential Oil Base",
      price: 1800,
      originalPrice: 2250,
      image: "/placeholder.svg?height=300&width=200&text=Essential+Oil",
      description: "Premium essential oil base for natural fragrances",
      quantity: 20,
      rating: 4.6,
      reviews: 67,
      badge: "NATURAL",
    },
  ])

  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    quantity: "",
    badge: "",
  })

  // Animation options
  const animations = [
    { id: "fadeIn", name: "Fade In", description: "Smooth fade in effect" },
    { id: "slideUp", name: "Slide Up", description: "Slides up from bottom" },
    { id: "slideLeft", name: "Slide Left", description: "Slides in from right" },
    { id: "zoomIn", name: "Zoom In", description: "Zooms in with scale effect" },
    { id: "bounce", name: "Bounce", description: "Bouncy entrance effect" },
  ]

  const contentPages = [
    { id: "home", name: "Home Page", icon: Home },
    { id: "about", name: "About Page", icon: Info },
    { id: "shop", name: "Shop Page", icon: ShoppingCart },
    { id: "contact", name: "Contact Page", icon: Phone },
    { id: "header", name: "Header", icon: Settings },
    { id: "footer", name: "Footer", icon: Settings },
  ]

  const [isTestingEmail, setIsTestingEmail] = useState(false)
  const [emailTestResult, setEmailTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [emailJSConfig, setEmailJSConfig] = useState({
    serviceId: "",
    templateId: "",
    publicKey: "",
    adminEmail: "",
  })

  const handleEmailConfigChange = (field: string, value: string) => {
    setEmailJSConfig((prev) => ({ ...prev, [field]: value }))
  }

  const saveEmailJSConfig = () => {
    localStorage.setItem("emailJSConfig", JSON.stringify(emailJSConfig))
    alert("✅ EmailJS configuration saved successfully!")
    setEmailTestResult(null) // Clear previous test results
  }

  const handleTestEmail = async () => {
    setIsTestingEmail(true)
    setEmailTestResult(null)

    try {
      const result = await testEmailConfiguration()
      setEmailTestResult(result)
    } catch (error) {
      setEmailTestResult({
        success: false,
        message: `Test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsTestingEmail(false)
    }
  }

  const isEmailConfigComplete =
    emailJSConfig.serviceId && emailJSConfig.templateId && emailJSConfig.publicKey && emailJSConfig.adminEmail

  // Load EmailJS config on component mount
  useEffect(() => {
    // Check if user is logged in
    if (localStorage.getItem("adminLoggedIn") !== "true") {
      router.push("/admin/login")
      return
    }

    const savedConfig = localStorage.getItem("emailJSConfig")
    if (savedConfig) {
      setEmailJSConfig(JSON.parse(savedConfig))
    }

    // Load data from storage
    loadDataFromStorage()

    // If there's an order ID in URL, show that order
    if (orderIdFromUrl) {
      setActiveTab("orders")
      // Find and select the order
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      const order = savedOrders.find((o) => o.id.toString() === orderIdFromUrl)
      if (order) {
        setSelectedOrder(order)
      }
    }

    // Load orders from localStorage
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }

    // Load EmailJS configuration
    const savedEmailConfig = localStorage.getItem("emailJSConfig")
    if (savedEmailConfig) {
      setEmailJSConfig(JSON.parse(savedEmailConfig))
    }
  }, [router, orderIdFromUrl])

  const loadDataFromStorage = async () => {
    setIsLoading(true)

    try {
      // Load website settings
      const savedSettings = localStorage.getItem("websiteSettings")
      if (savedSettings) {
        setWebsiteSettings(JSON.parse(savedSettings))
      }

      // Load products
      const savedProducts = localStorage.getItem("adminProducts")
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts))
      }

      // Load orders
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      setOrders(savedOrders)

      // Calculate stats
      const totalOrders = savedOrders.length
      const pendingOrders = savedOrders.filter((o) => o.status === "Pending").length
      const completedOrders = savedOrders.filter((o) => o.status === "Completed").length
      const totalRevenue = savedOrders.reduce((sum, order) => sum + order.total, 0)

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue,
        totalProducts: savedProducts ? JSON.parse(savedProducts).length : products.length,
        lowStockProducts: (savedProducts ? JSON.parse(savedProducts) : products).filter((p) => p.quantity <= 5).length,
      })

      // Load content
      const savedContent = localStorage.getItem("pageContent")
      if (savedContent) {
        setPageContent(JSON.parse(savedContent))
      }

      // Load images
      const savedImages = localStorage.getItem("pageImages")
      if (savedImages) {
        setPageImages(JSON.parse(savedImages))
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminLoginTime")
    router.push("/admin/login")
  }

  // Reset orders history
  const resetOrdersHistory = async () => {
    if (confirm("⚠️ Are you sure you want to delete all orders history? This action cannot be undone.")) {
      setOrders([])
      localStorage.setItem("orders", JSON.stringify([]))
      setStats((prev) => ({
        ...prev,
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalRevenue: 0,
      }))
      alert("✅ Orders history has been reset successfully!")
    }
  }

  // Change admin password
  const changeAdminPassword = () => {
    if (!adminCredentials.currentPassword || !adminCredentials.newPassword || !adminCredentials.confirmPassword) {
      alert("❌ Please fill in all password fields!")
      return
    }

    // Get current credentials
    const storedCredentials = JSON.parse(localStorage.getItem("adminCredentials") || '{"password": "admin123"}')

    if (adminCredentials.currentPassword !== storedCredentials.password) {
      alert("❌ Current password is incorrect!")
      return
    }

    if (adminCredentials.newPassword !== adminCredentials.confirmPassword) {
      alert("❌ New passwords don't match!")
      return
    }

    if (adminCredentials.newPassword.length < 6) {
      alert("❌ New password must be at least 6 characters long!")
      return
    }

    // Update password
    const updatedCredentials = {
      ...storedCredentials,
      password: adminCredentials.newPassword,
    }

    localStorage.setItem("adminCredentials", JSON.stringify(updatedCredentials))

    // Clear form
    setAdminCredentials({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    alert("✅ Admin password changed successfully!")
  }

  // Save website settings
  const saveWebsiteSettings = async () => {
    setIsLoading(true)
    localStorage.setItem("websiteSettings", JSON.stringify(websiteSettings))
    // Trigger custom event to update other components
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
    alert("✅ Website settings saved successfully! Changes will be visible on all pages.")
    setIsLoading(false)
  }

  // Save content
  const savePageContent = async () => {
    setIsLoading(true)
    localStorage.setItem("pageContent", JSON.stringify(pageContent))
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
    alert("✅ Page content saved successfully!")
    setIsLoading(false)
  }

  // Save images
  const savePageImages = async () => {
    setIsLoading(true)
    localStorage.setItem("pageImages", JSON.stringify(pageImages))
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
    alert("✅ Page images saved successfully!")
    setIsLoading(false)
  }

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: Number.parseInt(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number.parseInt(newProduct.originalPrice) : null,
        image: newProduct.image || `/placeholder.svg?height=300&width=200&text=${newProduct.name.replace(" ", "+")}`,
        description: newProduct.description,
        quantity: Number.parseInt(newProduct.quantity),
        badge: newProduct.badge,
        rating: 4.5,
        reviews: 0,
      }

      const updatedProducts = [...products, product]
      setProducts(updatedProducts)

      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
      window.dispatchEvent(new Event("websiteSettingsUpdated"))
      setNewProduct({
        name: "",
        price: "",
        originalPrice: "",
        image: "",
        description: "",
        quantity: "",
        badge: "",
      })
      alert("✅ Product added successfully!")
    } else {
      alert("❌ Please fill in all required fields!")
    }
  }

  const handleUpdateProduct = async (id, updatedProduct) => {
    const updatedProducts = products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    setProducts(updatedProducts)

    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
    setEditingProduct(null)
    alert("✅ Product updated successfully!")
  }

  const handleDeleteProduct = async (id) => {
    if (confirm("⚠️ Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== id)
      setProducts(updatedProducts)

      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
      window.dispatchEvent(new Event("websiteSettingsUpdated"))
      alert("✅ Product deleted successfully!")
    }
  }

  const previewAnimation = () => {
    const preview = document.getElementById("hero-preview")
    if (preview) {
      preview.className = "w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
      setTimeout(() => {
        preview.className = `w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300 animate-${websiteSettings.heroAnimation}`
      }, 100)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Order management functions
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    // Update selected order if it's the one being updated
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }

    // Recalculate stats
    const pendingOrders = updatedOrders.filter((o) => o.status === "Pending").length
    const completedOrders = updatedOrders.filter((o) => o.status === "Completed").length
    setStats((prev) => ({ ...prev, pendingOrders, completedOrders }))
  }

  const deleteOrder = (orderId) => {
    if (confirm("⚠️ Are you sure you want to delete this order?")) {
      const updatedOrders = orders.filter((order) => order.id !== orderId)
      setOrders(updatedOrders)
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
      setSelectedOrder(null)
      alert("✅ Order deleted successfully!")
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = orderFilter === "all" || order.status.toLowerCase() === orderFilter
    const matchesSearch =
      order.customer.name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customer.phone.includes(orderSearch) ||
      order.id.toString().includes(orderSearch)
    return matchesFilter && matchesSearch
  })

  // Calculate stats
  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0)
  const pendingOrders = orders.filter((order: any) => order.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">{websiteSettings.siteName} Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("notifications")} className="relative">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </div>

              <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
            <span>Loading...</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-10 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUpIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
              {stats.pendingOrders > 0 && (
                <Badge className="bg-red-500 text-white text-xs px-1 ml-1">{stats.pendingOrders}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
              {unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs px-1 ml-1">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="website" className="flex items-center space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Website</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <PackageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Orders</p>
                      <p className="text-3xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <ShoppingCart className="w-10 h-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Pending Orders</p>
                      <p className="text-3xl font-bold">{stats.pendingOrders}</p>
                    </div>
                    <Clock className="w-10 h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Products</p>
                      <p className="text-3xl font-bold">{products.length}</p>
                    </div>
                    <PackageIcon className="w-10 h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold">Rs {stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSignIcon className="w-10 h-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab("orders")}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span>View Orders</span>
                      {stats.pendingOrders > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">{stats.pendingOrders} pending</Badge>
                      )}
                    </Button>
                    <Button
                      onClick={() => setActiveTab("products")}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <PackageIcon className="w-6 h-6" />
                      <span>Manage Products</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("content")}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>Edit Content</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("website")}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <SettingsIcon className="w-6 h-6" />
                      <span>Website Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Orders</span>
                    <Button onClick={() => setActiveTab("orders")} variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">#{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Rs {order.total.toLocaleString()}</p>
                          <Badge
                            variant={order.status === "Pending" ? "secondary" : "default"}
                            className={
                              order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && <p className="text-gray-500 text-center py-4">No orders yet</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Orders Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">Total: {orders.length}</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending: {stats.pendingOrders}</Badge>
                    <Badge className="bg-green-100 text-green-800">Completed: {stats.completedOrders}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <select
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="all">All Orders</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <Search className="w-4 h-4" />
                    <Input
                      placeholder="Search by customer name, phone, or order ID..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Orders List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Orders List */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Orders List</h3>
                    <div className="max-h-96 overflow-y-auto space-y-3">
                      {filteredOrders.map((order) => (
                        <Card
                          key={order.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedOrder?.id === order.id ? "ring-2 ring-amber-500" : ""
                          }`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold">#{order.id}</span>
                                <Badge
                                  variant={order.status === "Pending" ? "secondary" : "default"}
                                  className={
                                    order.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : order.status === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <span className="font-bold text-amber-600">Rs {order.total.toLocaleString()}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p className="font-semibold">{order.customer.name}</p>
                              <p>{order.customer.phone}</p>
                              <p>{order.totalItems} items</p>
                              <p>{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {filteredOrders.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No orders found</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Order Details</h3>
                    {selectedOrder ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>Order #{selectedOrder.id}</span>
                            <div className="flex items-center space-x-2">
                              <select
                                value={selectedOrder.status}
                                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                              <Button onClick={() => deleteOrder(selectedOrder.id)} variant="destructive" size="sm">
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Customer Information */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              Customer Information
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                              <p>
                                <strong>Name:</strong> {selectedOrder.customer.name}
                              </p>
                              <p>
                                <strong>Phone:</strong> {selectedOrder.customer.phone}
                              </p>
                              <p>
                                <strong>Email:</strong> {selectedOrder.customer.email || "Not provided"}
                              </p>
                              <p>
                                <strong>Address:</strong> {selectedOrder.customer.address}
                              </p>
                              <p>
                                <strong>City:</strong> {selectedOrder.customer.city}
                              </p>
                              {selectedOrder.customer.notes && (
                                <p>
                                  <strong>Notes:</strong> {selectedOrder.customer.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Order Items */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <PackageIcon className="w-4 h-4 mr-2" />
                              Order Items
                            </h4>
                            <div className="space-y-3">
                              {selectedOrder.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div>
                                      <p className="font-semibold">{item.name}</p>
                                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold">Rs {(item.price * item.quantity).toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">Rs {item.price.toLocaleString()} each</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <DollarSignIcon className="w-4 h-4 mr-2" />
                              Order Summary
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                              <div className="flex justify-between">
                                <span>Total Items:</span>
                                <span>{selectedOrder.totalItems}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Order Date:</span>
                                <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <Badge
                                  variant={selectedOrder.status === "Pending" ? "secondary" : "default"}
                                  className={
                                    selectedOrder.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : selectedOrder.status === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {selectedOrder.status}
                                </Badge>
                              </div>
                              <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-bold text-lg">
                                  <span>Total Amount:</span>
                                  <span className="text-amber-600">Rs {selectedOrder.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-3">
                            <Button onClick={() => window.print()} variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-2" />
                              Print Order
                            </Button>
                            <Button
                              onClick={() => {
                                const whatsappMessage = `Hello ${selectedOrder.customer.name}, your order #${selectedOrder.id} status has been updated to: ${selectedOrder.status}. Total: Rs ${selectedOrder.total.toLocaleString()}`
                                window.open(
                                  `https://wa.me/${selectedOrder.customer.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`,
                                  "_blank",
                                )
                              }}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              WhatsApp Customer
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center text-gray-500">
                          <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Select an order to view details</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{notifications.length} total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          !notification.read ? "border-l-4 border-l-amber-500 bg-amber-50" : ""
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-amber-500" : "bg-gray-300"}`}
                              />
                              <div>
                                <h4 className="font-semibold">{notification.title}</h4>
                                <p className="text-gray-600">{notification.message}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(notification.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            {notification.type === "order" && (
                              <Badge className="bg-green-100 text-green-800">Order</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Website Settings Tab */}
          <TabsContent value="website" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="w-5 h-5" />
                  <span>Website Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Website Name *</Label>
                    <Input
                      id="siteName"
                      value={websiteSettings.siteName}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, siteName: e.target.value })}
                      placeholder="Enter website name"
                    />
                    <p className="text-sm text-gray-500 mt-1">This will appear in header and footer</p>
                  </div>
                  <div>
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={websiteSettings.logo}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, logo: e.target.value })}
                      placeholder="Enter logo URL"
                    />
                    <p className="text-sm text-gray-500 mt-1">Leave empty to use default logo</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={websiteSettings.heroTitle}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroTitle: e.target.value })}
                        placeholder="Enter hero title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                      <Textarea
                        id="heroSubtitle"
                        value={websiteSettings.heroSubtitle}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroSubtitle: e.target.value })}
                        placeholder="Enter hero subtitle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroImage">Hero Background Image URL</Label>
                      <Input
                        id="heroImage"
                        value={websiteSettings.heroImage}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroImage: e.target.value })}
                        placeholder="Enter hero image URL"
                      />
                    </div>

                    {/* Hero Animation */}
                    <div>
                      <Label>Hero Animation Style</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {animations.map((animation) => (
                          <label
                            key={animation.id}
                            className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name="heroAnimation"
                              value={animation.id}
                              checked={websiteSettings.heroAnimation === animation.id}
                              onChange={(e) =>
                                setWebsiteSettings({ ...websiteSettings, heroAnimation: e.target.value })
                              }
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

                    {/* Animation Preview */}
                    <div>
                      <Label>Animation Preview</Label>
                      <div className="mt-1 mb-3">
                        <img
                          id="hero-preview"
                          src={websiteSettings.heroImage || "/placeholder.svg"}
                          alt="Hero Preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=300&width=600&text=Hero+Image+Error"
                          }}
                        />
                      </div>
                      <Button onClick={previewAnimation} variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Preview Animation
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={saveWebsiteSettings} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Website Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Website Colors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Header Colors</h3>
                    <div>
                      <Label htmlFor="headerBg">Header Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="headerBg"
                          type="color"
                          value={websiteSettings.colors.headerBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, headerBg: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.headerBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, headerBg: e.target.value },
                            })
                          }
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="headerText">Header Text</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="headerText"
                          type="color"
                          value={websiteSettings.colors.headerText}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, headerText: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.headerText}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, headerText: e.target.value },
                            })
                          }
                          placeholder="#374151"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="topBarBg">Top Bar Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="topBarBg"
                          type="color"
                          value={websiteSettings.colors.topBarBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, topBarBg: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.topBarBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, topBarBg: e.target.value },
                            })
                          }
                          placeholder="#b45309"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Footer Colors</h3>
                    <div>
                      <Label htmlFor="footerBg">Footer Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="footerBg"
                          type="color"
                          value={websiteSettings.colors.footerBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, footerBg: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.footerBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, footerBg: e.target.value },
                            })
                          }
                          placeholder="#f9fafb"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="footerText">Footer Text</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="footerText"
                          type="color"
                          value={websiteSettings.colors.footerText}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, footerText: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.footerText}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, footerText: e.target.value },
                            })
                          }
                          placeholder="#374151"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="background">Page Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="background"
                          type="color"
                          value={websiteSettings.colors.background}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, background: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.background}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, background: e.target.value },
                            })
                          }
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={saveWebsiteSettings} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Colors"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone1">Phone 1</Label>
                    <Input
                      id="phone1"
                      value={websiteSettings.contactInfo.phone1}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, phone1: e.target.value },
                        })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone2">Phone 2</Label>
                    <Input
                      id="phone2"
                      value={websiteSettings.contactInfo.phone2}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, phone2: e.target.value },
                        })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={websiteSettings.contactInfo.email}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, email: e.target.value },
                        })
                      }
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      value={websiteSettings.contactInfo.whatsapp}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, whatsapp: e.target.value },
                        })
                      }
                      placeholder="Enter WhatsApp number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="adminEmail">Admin Email (for order notifications) *</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={websiteSettings.contactInfo.adminEmail}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, adminEmail: e.target.value },
                        })
                      }
                      placeholder="Enter admin email for order notifications"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      All order notifications will be sent to this email address
                    </p>
                  </div>
                </div>

                <Button onClick={saveWebsiteSettings} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Contact Info"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Complete Website Content Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Edit ALL text content from your website. Every single word that appears on the website can be edited
                  here.
                </p>

                {/* Page Selection */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
                  {contentPages.map((page) => {
                    const IconComponent = page.icon
                    return (
                      <Button
                        key={page.id}
                        onClick={() => setSelectedContentPage(page.id)}
                        variant={selectedContentPage === page.id ? "default" : "outline"}
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <IconComponent className="w-6 h-6" />
                        <span>{page.name}</span>
                      </Button>
                    )
                  })}
                </div>

                {/* Content Editor */}
                {selectedContentPage && (
                  <Card className="border-2 border-amber-200">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Edit {contentPages.find((p) => p.id === selectedContentPage)?.name} Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                      {Object.entries(pageContent[selectedContentPage] || {}).map(([key, value]) => (
                        <div key={key}>
                          <Label htmlFor={key} className="capitalize font-semibold">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </Label>
                          {key.includes("paragraph") ||
                          key.includes("subtitle") ||
                          key.includes("Text") ||
                          key.includes("Description") ? (
                            <Textarea
                              id={key}
                              value={value}
                              onChange={(e) =>
                                setPageContent({
                                  ...pageContent,
                                  [selectedContentPage]: {
                                    ...pageContent[selectedContentPage],
                                    [key]: e.target.value,
                                  },
                                })
                              }
                              rows={3}
                              className="mt-1"
                            />
                          ) : (
                            <Input
                              id={key}
                              value={value}
                              onChange={(e) =>
                                setPageContent({
                                  ...pageContent,
                                  [selectedContentPage]: {
                                    ...pageContent[selectedContentPage],
                                    [key]: e.target.value,
                                  },
                                })
                              }
                              className="mt-1"
                            />
                          )}
                        </div>
                      ))}

                      <Button
                        onClick={savePageContent}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 w-full"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? "Saving..." : "Save Content"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Management Tab */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5" />
                  <span>Images Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Select a page to manage its images. Upload new images or update existing ones.
                </p>

                {/* Page Selection */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {contentPages.slice(0, 4).map((page) => {
                    const IconComponent = page.icon
                    return (
                      <Button
                        key={page.id}
                        onClick={() => setSelectedImagePage(page.id)}
                        variant={selectedImagePage === page.id ? "default" : "outline"}
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <IconComponent className="w-6 h-6" />
                        <span>{page.name}</span>
                      </Button>
                    )
                  })}
                </div>

                {/* Image Editor */}
                {selectedImagePage && (
                  <Card className="border-2 border-amber-200">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Manage {contentPages.find((p) => p.id === selectedImagePage)?.name} Images
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {Object.entries(pageImages[selectedImagePage] || {}).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={key} className="capitalize">
                              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </Label>
                            <Input
                              id={key}
                              value={value}
                              onChange={(e) =>
                                setPageImages({
                                  ...pageImages,
                                  [selectedImagePage]: {
                                    ...pageImages[selectedImagePage],
                                    [key]: e.target.value,
                                  },
                                })
                              }
                              placeholder="Enter image URL"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Preview</Label>
                            <div className="mt-1 p-2 border rounded-lg bg-gray-50">
                              <img
                                src={value || "/placeholder.svg"}
                                alt={key}
                                className="w-full h-32 object-cover rounded"
                                onError={(e) => {
                                  e.target.src = "/placeholder.svg?height=200&width=300&text=Image+Error"
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button onClick={savePageImages} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? "Saving..." : "Save Images"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Product</span>
                </CardTitle>
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
                    <Label htmlFor="newBadge">Badge (Optional)</Label>
                    <Input
                      id="newBadge"
                      value={newProduct.badge}
                      onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                      placeholder="e.g., PREMIUM, PURE, TOP GRADE"
                    />
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
                <Button
                  onClick={handleAddProduct}
                  disabled={isLoading}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isLoading ? "Adding..." : "Add Product"}
                </Button>
              </CardContent>
            </Card>

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
                      {product.badge && (
                        <div className="absolute top-2 right-2 bg-amber-600 text-white px-2 py-1 rounded text-xs">
                          {product.badge}
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
                      <Badge
                        variant={
                          product.quantity === 0 ? "destructive" : product.quantity <= 5 ? "secondary" : "default"
                        }
                      >
                        {product.quantity === 0
                          ? "Out of Stock"
                          : product.quantity <= 5
                            ? `Low Stock: ${product.quantity}`
                            : `In Stock: ${product.quantity}`}
                      </Badge>
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
          </TabsContent>

          {/* Admin Tools Tab */}
          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Admin Tools & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Reset Orders */}
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Reset Orders History</h4>
                  <p className="text-sm text-red-600 mb-3">This will permanently delete all order records.</p>
                  <Button
                    onClick={resetOrdersHistory}
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Orders
                  </Button>
                </div>

                {/* Change Password */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Change Admin Password</h4>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        type={showPasswords.current ? "text" : "password"}
                        placeholder="Current Password"
                        value={adminCredentials.currentPassword}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, currentPassword: e.target.value })}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPasswords.new ? "text" : "password"}
                        placeholder="New Password"
                        value={adminCredentials.newPassword}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, newPassword: e.target.value })}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPasswords.confirm ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={adminCredentials.confirmPassword}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, confirmPassword: e.target.value })}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button onClick={changeAdminPassword} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>

                {/* EmailJS Configuration */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    EmailJS Configuration for Order Notifications
                  </h4>
                  <p className="text-sm text-green-600 mb-4">
                    Configure EmailJS to receive order notifications in your Gmail. Get these details from your EmailJS
                    dashboard.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <Label>Service ID</Label>
                      <Input
                        placeholder="Your EmailJS Service ID (e.g., service_dv3jsnr)"
                        value={emailJSConfig.serviceId}
                        onChange={(e) => setEmailJSConfig({ ...emailJSConfig, serviceId: e.target.value })}
                      />
                      <p className="text-xs text-green-600 mt-1">Found in EmailJS dashboard under Email Services</p>
                    </div>
                    <div>
                      <Label>Template ID</Label>
                      <Input
                        placeholder="Your EmailJS Template ID (e.g., template_t83jgmu)"
                        value={emailJSConfig.templateId}
                        onChange={(e) => setEmailJSConfig({ ...emailJSConfig, templateId: e.target.value })}
                      />
                      <p className="text-xs text-green-600 mt-1">Found in EmailJS dashboard under Email Templates</p>
                    </div>
                    <div>
                      <Label>Public Key</Label>
                      <Input
                        placeholder="Your EmailJS Public Key (e.g., e0nmYBXYotXUAx_Eu)"
                        value={emailJSConfig.publicKey}
                        onChange={(e) => setEmailJSConfig({ ...emailJSConfig, publicKey: e.target.value })}
                      />
                      <p className="text-xs text-green-600 mt-1">
                        Found in EmailJS dashboard under Account &gt; API Keys
                      </p>
                    </div>
                    <div>
                      <Label>Admin Email (where notifications will be sent)</Label>
                      <Input
                        type="email"
                        placeholder="your-email@gmail.com"
                        value={emailJSConfig.adminEmail}
                        onChange={(e) => setEmailJSConfig({ ...emailJSConfig, adminEmail: e.target.value })}
                      />
                    </div>
                    <Button onClick={saveEmailJSConfig} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save EmailJS Configuration
                    </Button>
                    <Button onClick={handleTestEmail} size="sm" variant="outline" className="ml-2 bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      Test Email Notification
                    </Button>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded border">
                    <h5 className="font-semibold text-sm mb-2">Setup Instructions:</h5>
                    <ol className="text-xs text-gray-600 space-y-1">
                      <li>
                        1. Go to{" "}
                        <a
                          href="https://www.emailjs.com/"
                          target="_blank"
                          className="text-blue-600 underline"
                          rel="noreferrer"
                        >
                          EmailJS.com
                        </a>{" "}
                        and create account
                      </li>
                      <li>2. Add Gmail service in Email Services section</li>
                      <li>3. Create email template with variables: to_email, subject, message, order_link</li>
                      <li>4. Copy Service ID, Template ID, and Public Key here</li>
                      <li>5. Test the configuration using the test button</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

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
                  <Label>Badge</Label>
                  <Input
                    value={editingProduct.badge || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    placeholder="e.g., PREMIUM, PURE"
                  />
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
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Updating..." : "Update Product"}
                </Button>
                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
