import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
// Using Outfit as the primary font
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"

// Initialize the Outfit font
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Klorophyl | Professional Landscaping for Homes & Businesses",
  description:
    "Transform your outdoor space with professional landscaping services by Klorophyl. Crafting breathtaking green spaces for every home & business.",
  keywords: "landscaping, balcony, terrace, garden design, plants, outdoor space, backyard, farmhouse, water features",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Analytics script can be added here later */}
        {/* 
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR_MEASUREMENT_ID');
            `,
          }}
        />
        */}
      </head>
      <body className="font-outfit">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}