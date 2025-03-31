"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-border py-3 shadow-sm" 
          : "bg-transparent py-5",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-1 group">
          <div className="relative h-10 overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <Image 
              src="/fin_klo_greenbg_symbol.png" 
              alt="Klorophyl Logo" 
              width={30} 
              height={60} 
              className="object-cover"
            />
          </div>
          <span className={cn(
            "text-xl font-playfair font-light tracking-wider transition-colors duration-300",
            isScrolled ? "text-foreground" : "text-white"
          )}>
            Klorophyl
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: 'About', href: '#about' },
            { name: 'Services', href: '#services' },
            { name: 'Gallery', href: '#gallery' },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className={cn(
                "text-sm uppercase tracking-wider font-cormorant transition-colors hover:text-accent",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className={cn(
              "premium-button text-xs",
              isScrolled 
                ? "border-accent text-accent hover:bg-accent hover:text-accent-foreground" 
                : "border-white text-white hover:border-accent"
            )}
          >
            Get in Touch
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className={cn(
            "md:hidden p-2 transition-colors",
            isScrolled ? "text-foreground" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-full ml-auto h-full bg-[#ffffff] shadow-xl flex flex-col">
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <span className="font-playfair font-medium uppercase tracking-wider text-sm text-gray-900">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-accent transition-colors"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="py-8 px-8 flex flex-col space-y-6 bg-white">
              <Link
                href="#about"
                className="text-gray-800 hover:text-accent transition-colors py-2 uppercase tracking-wider text-sm font-cormorant font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  const targetElement = document.getElementById("about");
                  if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                About
              </Link>
              
              <Link
                href="#services"
                className="text-gray-800 hover:text-accent transition-colors py-2 uppercase tracking-wider text-sm font-cormorant font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  const targetElement = document.getElementById("services");
                  if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Services
              </Link>
              
              <Link
                href="#gallery"
                className="text-gray-800 hover:text-accent transition-colors py-2 uppercase tracking-wider text-sm font-cormorant font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  const targetElement = document.getElementById("gallery");
                  if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Gallery
              </Link>
              
              <div className="my-4 h-px bg-gray-200"></div>
              
              <Link
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  const targetElement = document.getElementById("contact");
                  if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="premium-button border-accent text-accent hover:bg-accent hover:text-accent-foreground text-center font-playfair"
              >
                Get in Touch
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
