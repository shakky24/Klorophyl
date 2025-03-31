"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const decorativeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }
    
    if (contentRef.current) {
      observer.observe(contentRef.current)
    }
    
    if (decorativeRef.current) {
      observer.observe(decorativeRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden opacity-0"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpg"
          alt="Elegant landscaped garden"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      </div>

      {/* Decorative elements */}
      <div ref={decorativeRef} className="absolute inset-0 z-0 opacity-0">
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[200px] h-[200px] bg-accent/10 rounded-full blur-3xl"></div>
        
        {/* Subtle decorative lines */}
        <div className="absolute top-0 left-0 w-40 h-[1px] bg-accent/20"></div>
        <div className="absolute top-0 left-0 h-40 w-[1px] bg-accent/20"></div>
        <div className="absolute bottom-0 right-0 w-40 h-[1px] bg-accent/20"></div>
        <div className="absolute bottom-0 right-0 h-40 w-[1px] bg-accent/20"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto opacity-0 delay-300"
        >
          <div className="flex flex-col items-center text-center mb-16">
            {/* <span className="luxury-badge mb-8 animate-slide-in-left">PREMIUM LANDSCAPING</span> */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-8 leading-tight">
              <span className="block mb-4 animate-reveal">Artistry in</span>
              <span className="block text-accent font-light animate-reveal delay-150">Nature</span>
            </h1>
            <div className="w-20 h-[1px] bg-accent mb-10 animate-slide-in-right"></div>
            <p className="text-lg md:text-xl text-white/90 mb-14 max-w-xl mx-auto font-light leading-relaxed animate-fade-in-up">
              We craft bespoke garden spaces that transform ordinary spaces into extraordinary sanctuaries, where natural beauty meets refined design.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="#contact"
                className="premium-button border-accent text-white bg-accent hover:text-accent-foreground"
              >
                Request Consultation
              </Link>
              <Link
                href="#gallery"
                className="secondary-button text-white hover:bg-white/10"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-2">Explore</span>
        <div className="w-[1px] h-6 bg-white/30"></div>
      </div>
    </section>
  )
}
