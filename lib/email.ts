// Email notification system with Gmail integration
export const sendOrderNotification = async (orderData: any, adminEmail: string): Promise<boolean> => {
  try {
    // Get EmailJS configuration from localStorage
    const emailJSConfig = JSON.parse(localStorage.getItem("emailJSConfig") || "{}")

    if (!emailJSConfig.serviceId || !emailJSConfig.templateId || !emailJSConfig.publicKey) {
      console.warn("EmailJS not configured. Notification saved locally only.")
      // Still save notification locally
      const notifications = JSON.parse(localStorage.getItem("orderNotifications") || "[]")
      notifications.unshift({
        id: Date.now(),
        type: "order",
        data: orderData,
        timestamp: new Date().toISOString(),
        read: false,
        title: "New Order Placed",
        message: `Order #${orderData.id} from ${orderData.customer.name}`,
      })
      localStorage.setItem("orderNotifications", JSON.stringify(notifications))
      return true
    }

    const emailData = {
      to_email: emailJSConfig.adminEmail || adminEmail,
      subject: "🛒 New Order Placed - The Century Scents",
      message: `
        A new order has been placed!
        
        Order ID: #${orderData.id}
        Customer: ${orderData.customer.name}
        Phone: ${orderData.customer.phone}
        Email: ${orderData.customer.email || "Not provided"}
        Total Amount: Rs ${orderData.total.toLocaleString()}
        Items: ${orderData.totalItems}
        
        Click to view order details: ${window.location.origin}/secret-admin-portal-2024/dashboard?order=${orderData.id}
        
        Order Items:
        ${orderData.items.map((item) => `- ${item.name} x ${item.quantity} = Rs ${(item.price * item.quantity).toLocaleString()}`).join("\n")}
        
        Customer Details:
        Address: ${orderData.customer.address || "Not provided"}
        City: ${orderData.customer.city || "Not provided"}
        Notes: ${orderData.customer.notes || "None"}
        
        Please process this order as soon as possible.
        
        Best regards,
        The Century Scents System
      `,
      order_link: `${window.location.origin}/secret-admin-portal-2024/dashboard?order=${orderData.id}`,
    }

    // Store notification in localStorage for admin dashboard
    const notifications = JSON.parse(localStorage.getItem("orderNotifications") || "[]")
    notifications.unshift({
      id: Date.now(),
      type: "order",
      data: orderData,
      timestamp: new Date().toISOString(),
      read: false,
      title: "New Order Placed",
      message: `Order #${orderData.id} from ${orderData.customer.name}`,
    })
    localStorage.setItem("orderNotifications", JSON.stringify(notifications))

    // Send email using EmailJS
    if (typeof window !== "undefined" && window.emailjs) {
      await window.emailjs.send(emailJSConfig.serviceId, emailJSConfig.templateId, emailData, emailJSConfig.publicKey)
    }

    return true
  } catch (error) {
    console.error("Failed to send notification:", error)
    return false
  }
}

export const getNotifications = (): any[] => {
  try {
    return JSON.parse(localStorage.getItem("orderNotifications") || "[]")
  } catch (error) {
    console.error("Failed to get notifications:", error)
    return []
  }
}

export const markNotificationAsRead = (id: number): boolean => {
  try {
    const notifications = getNotifications()
    const updatedNotifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    localStorage.setItem("orderNotifications", JSON.stringify(updatedNotifications))
    return true
  } catch (error) {
    console.error("Failed to mark notification as read:", error)
    return false
  }
}

export const getUnreadNotificationsCount = (): number => {
  try {
    const notifications = getNotifications()
    return notifications.filter((n) => !n.read).length
  } catch (error) {
    return 0
  }
}
