declare global {
  interface Window {
    emailjs: any
  }
}

export async function sendOrderNotification(orderData: {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
  totalAmount: number
  orderDate: string
}) {
  try {
    // Get EmailJS configuration from localStorage
    const emailJSConfig = JSON.parse(localStorage.getItem("emailJSConfig") || "{}")

    if (
      !emailJSConfig.serviceId ||
      !emailJSConfig.templateId ||
      !emailJSConfig.publicKey ||
      !emailJSConfig.adminEmail
    ) {
      throw new Error("EmailJS configuration is incomplete. Please configure it in the admin panel.")
    }

    // Wait for EmailJS to be available
    if (typeof window === "undefined" || !window.emailjs) {
      // Load EmailJS if not available
      await new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    // Initialize EmailJS
    window.emailjs.init(emailJSConfig.publicKey)

    // Prepare email template parameters
    const templateParams = {
      to_email: emailJSConfig.adminEmail,
      subject: `New Order from ${orderData.customerName}`,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      customer_address: orderData.customerAddress,
      order_date: orderData.orderDate,
      total_amount: `Rs ${orderData.totalAmount.toLocaleString()}`,
      order_items: orderData.items
        .map((item) => `${item.name} - Qty: ${item.quantity} - Rs ${(item.price * item.quantity).toLocaleString()}`)
        .join("\n"),
      admin_link: `${window.location.origin}/secret-admin-portal-2024/dashboard`,
      message: `
New order received from ${orderData.customerName}!

Customer Details:
- Name: ${orderData.customerName}
- Email: ${orderData.customerEmail}
- Phone: ${orderData.customerPhone}
- Address: ${orderData.customerAddress}

Order Items:
${orderData.items
  .map((item) => `• ${item.name} - Qty: ${item.quantity} - Rs ${(item.price * item.quantity).toLocaleString()}`)
  .join("\n")}

Total Amount: Rs ${orderData.totalAmount.toLocaleString()}
Order Date: ${orderData.orderDate}

Please log in to your admin panel to manage this order:
${window.location.origin}/secret-admin-portal-2024/dashboard
      `,
    }

    // Send email using EmailJS
    const response = await window.emailjs.send(emailJSConfig.serviceId, emailJSConfig.templateId, templateParams)

    console.log("✅ Order notification sent successfully:", response)
    return { success: true, message: "Order notification sent successfully!" }
  } catch (error) {
    console.error("❌ Failed to send order notification:", error)
    return {
      success: false,
      message: `Failed to send notification: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function testEmailConfiguration() {
  try {
    const emailJSConfig = JSON.parse(localStorage.getItem("emailJSConfig") || "{}")

    if (
      !emailJSConfig.serviceId ||
      !emailJSConfig.templateId ||
      !emailJSConfig.publicKey ||
      !emailJSConfig.adminEmail
    ) {
      throw new Error("EmailJS configuration is incomplete. Please fill in all fields.")
    }

    // Wait for EmailJS to be available
    if (typeof window === "undefined" || !window.emailjs) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    // Initialize EmailJS
    window.emailjs.init(emailJSConfig.publicKey)

    const testTemplateParams = {
      to_email: emailJSConfig.adminEmail,
      subject: "Test Email from Syed Chemical Solution",
      customer_name: "Test Customer",
      customer_email: "test@example.com",
      customer_phone: "+92 300 1234567",
      customer_address: "Test Address, Karachi, Pakistan",
      order_date: new Date().toLocaleString(),
      total_amount: "Rs 5,000",
      order_items: "Test Product 1 - Qty: 2 - Rs 2,500\nTest Product 2 - Qty: 1 - Rs 2,500",
      admin_link: `${window.location.origin}/secret-admin-portal-2024/dashboard`,
      message: `
🧪 TEST EMAIL - Syed Chemical Solution

This is a test email to verify your EmailJS configuration is working correctly.

Test Order Details:
- Customer: Test Customer
- Email: test@example.com
- Phone: +92 300 1234567
- Address: Test Address, Karachi, Pakistan

Test Items:
• Test Product 1 - Qty: 2 - Rs 2,500
• Test Product 2 - Qty: 1 - Rs 2,500

Total: Rs 5,000
Date: ${new Date().toLocaleString()}

If you received this email, your EmailJS configuration is working perfectly! 🎉

Admin Panel: ${window.location.origin}/secret-admin-portal-2024/dashboard
      `,
    }

    const response = await window.emailjs.send(emailJSConfig.serviceId, emailJSConfig.templateId, testTemplateParams)

    console.log("✅ Test email sent successfully:", response)
    return { success: true, message: "Test email sent successfully! Check your Gmail inbox." }
  } catch (error) {
    console.error("❌ Failed to send test email:", error)
    return {
      success: false,
      message: `Test email failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
