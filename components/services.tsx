"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flower2, TreePine, Droplets, PenTool, Ruler, Shovel } from "lucide-react"

const services = [
  {
    icon: <Flower2 className="h-10 w-10 text-[#d2b48c]" />,
    title: "Terrace & Balcony Gardens",
    description: "Convert underutilized spaces into lush, cozy retreats.",
  },
  {
    icon: <TreePine className="h-10 w-10 text-[#d2b48c]" />,
    title: "Backyard Landscaping",
    description: "Transform your backyard into a personal paradise.",
  },
  {
    icon: <Droplets className="h-10 w-10 text-[#d2b48c]" />,
    title: "Water Features & Ponds",
    description: "Add a calming touch with fountains, ponds, and modern water bodies.",
  },
  {
    icon: <PenTool className="h-10 w-10 text-[#d2b48c]" />,
    title: "Farmhouse Landscaping",
    description: "End-to-end outdoor planning from scratch, ensuring a scenic, functional, and relaxing environment.",
  },
  {
    icon: <Ruler className="h-10 w-10 text-[#d2b48c]" />,
    title: "Potted Plant Arrangements",
    description: "Aesthetic plant curation for homes, offices, and commercial spaces.",
  },
  {
    icon: <Shovel className="h-10 w-10 text-[#d2b48c]" />,
    title: "Green Décor & Outdoor Living",
    description: "Outdoor seating, pathways, lighting, and garden accessories for a complete transformation.",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.transitionDelay = `${index * 100}ms`
        observer.observe(card)
      }
    })

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }

      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-white opacity-0 transition-all duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-800 mb-4">What We Offer</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive landscaping solutions for balconies and terraces, tailored to your specific needs and
            space constraints.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="opacity-0 transition-all duration-700"
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-5 text-4xl text-[#d2b48c]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
