import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Syed Chemical Solution - Premium Chemical Solutions & Fragrances",
  description:
    "Your trusted source for premium chemical solutions and fragrances. Quality, authenticity, and customer satisfaction are our top priorities.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>

        {/* EmailJS Script */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            // Initialize EmailJS when script loads
            if (typeof window !== "undefined" && (window as any).emailjs) {
              const emailJSConfig = JSON.parse(localStorage.getItem("emailJSConfig") || "{}")
              if (emailJSConfig.publicKey) {
                ;(window as any).emailjs.init(emailJSConfig.publicKey)
              }
            }
          }}
        />
      </body>
    </html>
  )
}
