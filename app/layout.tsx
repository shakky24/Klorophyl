import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Cormorant } from "next/font/google"
// Using Playfair Display as primary font with Cormorant as the secondary font
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"

// Initialize the Playfair Display font
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

// Initialize Cormorant as a secondary font for body text
const cormorant = Cormorant({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
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
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KZRGM7J7');
            `
          }}
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16981061425"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16981061425');
            `
          }}
        />
      </head>
      <body className={`font-outfit ${playfair.variable} ${cormorant.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KZRGM7J7"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className="relative z-10 min-h-screen flex flex-col">
            {children}
          </main>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}