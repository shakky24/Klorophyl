"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
        }
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 opacity-0 transition-opacity duration-1000"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpg"
          alt="Beautiful terrace garden"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl bg-white/80 backdrop-blur-sm p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4">
            🌿 Elevate Your <span className="text-green-600">Outdoors</span> with Klorophyl! 🌱
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Crafting Breathtaking Green Spaces for Every Home & Business
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="#contact">Get a Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="#gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

