"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Detect if page is scrolled (for background styling)
      setIsScrolled(currentScrollY > 10)
      
      // Hide/show based on scroll direction
      if (currentScrollY < 10) {
        setIsVisible(true) // Always show header at the top of the page
      } else {
        // Show when scrolling up, hide when scrolling down
        setIsVisible(currentScrollY < lastScrollY)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={cn(
        "fixed bg-white/10 backdrop-blur-sm top-0 left-0 right-0 z-50 transition-all duration-300 py-2",
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/fin_klo_greenbg_symbol.png" 
            alt="Klorophyl Logo" 
            width={40} 
            height={40} 
            className="rounded-md"
          />
          <span className={cn(
            "font-bold text-2xl",
            isScrolled ? "text-green-800" : "text-white"
          )}>Klorophyl</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className={cn(
            "transition-colors",
            isScrolled ? "text-gray-700 hover:text-green-600" : "text-white hover:text-green-200"
          )}>
            About
          </Link>
          <Link href="#services" className={cn(
            "transition-colors",
            isScrolled ? "text-gray-700 hover:text-green-600" : "text-white hover:text-green-200"
          )}>
            Services
          </Link>
          <Link href="#gallery" className={cn(
            "transition-colors",
            isScrolled ? "text-gray-700 hover:text-green-600" : "text-white hover:text-green-200"
          )}>
            Gallery
          </Link>
          <Link href="#testimonials" className={cn(
            "transition-colors",
            isScrolled ? "text-gray-700 hover:text-green-600" : "text-white hover:text-green-200"
          )}>
            Testimonials
          </Link>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="#contact">Get a Quote</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <Link
            href="#about"
            className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="#services"
            className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#gallery"
            className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 w-full mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Link href="#contact">Get a Quote</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
