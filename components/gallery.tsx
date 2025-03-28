"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample before/after projects
const projects = [
  {
    id: 1,
    title: "Urban Balcony Transformation",
    description:
      "A small city balcony transformed into a lush green retreat with container plants and vertical gardening.",
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Rooftop Terrace Garden",
    description:
      "A barren rooftop converted into an entertaining space with potted trees, built-in seating, and ambient lighting.",
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Minimalist Balcony Design",
    description: "A cluttered balcony redesigned with clean lines, strategic plantings, and functional furniture.",
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    title: "Family-Friendly Terrace",
    description:
      "A terrace transformed to accommodate both adults and children with play areas and comfortable seating.",
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
  },
]

export default function Gallery() {
  const [currentProject, setCurrentProject] = useState(0)
  const [isBeforeAfterMode, setIsBeforeAfterMode] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    if (galleryRef.current) {
      observer.observe(galleryRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }

      if (galleryRef.current) {
        observer.unobserve(galleryRef.current)
      }
    }
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-gray-50 opacity-0 transition-all duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Before & After Gallery</h2>
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4 mb-8 text-center">
            <p className="text-green-800">
              <span className="font-bold">📸</span> Showcase images of completed projects here. Replace placeholder
              images with your actual project photos.
            </p>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See the transformations we've created for our clients. Swipe through our projects to witness the dramatic
            before and after changes.
          </p>
        </div>

        <div ref={galleryRef} className="opacity-0 transition-all duration-1000 delay-300">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-green-800">{projects[currentProject].title}</h3>
                {/* <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBeforeAfterMode(true)}
                    className={isBeforeAfterMode ? "bg-green-50 border-green-600 text-green-600" : ""}
                  >
                    Before/After
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBeforeAfterMode(false)}
                    className={!isBeforeAfterMode ? "bg-green-50 border-green-600 text-green-600" : ""}
                  >
                    Side by Side
                  </Button>
                </div> */}
              </div>
              <p className="text-gray-600 mt-2">{projects[currentProject].description}</p>
            </div>

            {isBeforeAfterMode ? (
              <div className="relative group">
                <div className="relative h-[400px] md:h-[500px] w-full">
                  <Image
                    src={projects[currentProject].after || "/placeholder.svg"}
                    alt={`After: ${projects[currentProject].title}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-2xl font-bold">After</p>
                  </div>
                </div>
                <div className="relative h-[400px] md:h-[500px] w-full">
                  <Image
                    src={projects[currentProject].before || "/placeholder.svg"}
                    alt={`Before: ${projects[currentProject].title}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-2xl font-bold">Before</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2">
                <div className="relative h-[400px] md:h-[500px]">
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md z-10">Before</div>
                  <Image
                    src={projects[currentProject].before || "/placeholder.svg"}
                    alt={`Before: ${projects[currentProject].title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[400px] md:h-[500px]">
                  <div className="absolute top-4 left-4 bg-green-600/90 text-white px-3 py-1 rounded-md z-10">
                    After
                  </div>
                  <Image
                    src={projects[currentProject].after || "/placeholder.svg"}
                    alt={`After: ${projects[currentProject].title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="p-4 flex justify-between items-center">
              <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-1">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProject(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentProject === index ? "w-6 bg-green-600" : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

