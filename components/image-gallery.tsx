"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const galleryImages = Array.from({ length: 16 }, (_, i) => `/gallery/${i + 1}.png`)

export function ImageGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [visibleImages, setVisibleImages] = useState(8)
  
  const loadMoreImages = () => {
    setVisibleImages(prev => Math.min(prev + 8, galleryImages.length))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0")
            entry.target.classList.add("opacity-100")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section 
      id="image-gallery" 
      ref={sectionRef} 
      className="p-2 opacity-0 transition-all duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-accent-800 mb-4">Our Portfolio</h2> */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse through our collection of completed projects to see the quality and variety of our landscaping work.
          </p>
        </div>

        <div 
          ref={galleryRef}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
        >
          {galleryImages.slice(0, visibleImages).map((src, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="overflow-hidden rounded-md aspect-square cursor-pointer group relative">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all z-10 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-sm font-medium">
                      View
                    </span>
                  </div>
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
                <DialogTitle className="sr-only">Gallery Image {index + 1}</DialogTitle>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        
        {visibleImages < galleryImages.length && (
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={loadMoreImages}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              View More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
