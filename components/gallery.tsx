"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      id: 1,
      title: "Elegance in Simplicity",
      description: "A minimalist approach that transformed a barren terrace into a serene retreat.",
      before: "/projects/before-1.png",
      after: "/projects/after-1.png",
    },
    {
      id: 2,
      title: "Urban Oasis",
      description: "Creating a lush paradise amidst a concrete jungle for a city apartment.",
      before: "/projects/before-2.png",
      after: "/projects/after-2.png",
    },
  ]

  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-12 bg-background relative opacity-0 overflow-hidden"
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-accent/5 rounded-full blur-3xl"></div>
      
      {/* Subtle decorative lines */}
      <div className="absolute bottom-0 left-0 w-40 h-[1px] bg-accent/20"></div>
      <div className="absolute bottom-0 left-0 h-40 w-[1px] bg-accent/20"></div>
      
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="luxury-badge mb-8 inline-block animate-slide-in-left">OUR PORTFOLIO</span>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-foreground mb-8">
            <span className="relative">
              Transformations That <span className="text-accent font-light">Inspire</span>
            </span>
          </h2>
          <div className="w-20 h-[1px] bg-accent mx-auto mb-10"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed">
            Witness the artistry of our transformations as we reimagine outdoor spaces into breathtaking sanctuaries. Each project tells a unique story of vision, craft, and beauty.
          </p>
        </div>

        <div 
          ref={galleryRef}
          className="relative max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-8 items-center">
            {/* Before Image */}
            <div className="relative overflow-hidden">
              <div className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm px-4 py-1 text-xs font-light tracking-widest">BEFORE</div>
              <div className="luxury-image h-[250px] md:h-[400px] lg:h-[700px]">
                <Image
                  src={projects[currentIndex].before}
                  alt={`Before - ${projects[currentIndex].title}`}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* After Image */}
            <div className="relative overflow-hidden">
              <div className="absolute top-2 left-2 z-10 bg-accent/80 backdrop-blur-sm px-4 py-1 text-xs font-light tracking-widest text-accent-foreground">AFTER</div>
              <div className="luxury-image h-[250px] md:h-[400px] lg:h-[700px]">
                <Image
                  src={projects[currentIndex].after}
                  alt={`After - ${projects[currentIndex].title}`}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Project details */}
          <div className="mt-12 text-center max-w-2xl mx-auto p-8 border border-accent/10 backdrop-blur-sm bg-background/50">
            <h3 className="text-xl md:text-2xl font-light text-foreground mb-3">
              {projects[currentIndex].title}
            </h3>
            <div className="w-12 h-[1px] bg-accent mx-auto mb-6"></div>
            <p className="text-foreground/70 font-light mb-6">
              {projects[currentIndex].description}
            </p>
            
            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-accent w-6" : "bg-foreground/20"
                  }`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons - visible on all screen sizes */}
          <button
            onClick={prevProject}
            className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-background/70 border border-accent/10 backdrop-blur-sm rounded-full text-foreground/80 hover:text-accent transition-all hover:bg-background z-20"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" />
          </button>
          <button
            onClick={nextProject}
            className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-background/70 border border-accent/10 backdrop-blur-sm rounded-full text-foreground/80 hover:text-accent transition-all hover:bg-background z-20"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5 md:h-7 md:w-7" />
          </button>
        </div>
      </div>
    </section>
  )
}
