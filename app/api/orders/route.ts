import { type NextRequest, NextResponse } from "next/server"
import { sendOrderNotification } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Order ko database mein save karo
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    }

    // Admin ko email notification bhejo
    const adminEmail = "syedchemicalsolution@gmail.com" // Ye settings se aayega
    await sendOrderNotification(newOrder, adminEmail)

    // Product quantity update karo
    // await updateProductQuantity(orderData.productId, orderData.quantity)

    return NextResponse.json({
      success: true,
      message: "Order placed successfully!",
      orderId: newOrder.id,
    })
  } catch (error) {
    console.error("Order processing error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process order",
      },
      { status: 500 },
    )
  }
}
