"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flower2, TreePine, Droplets, PenTool, Ruler, Shovel } from "lucide-react"

const services = [
  {
    icon: <Flower2 className="h-10 w-10 text-green-600" />,
    title: "Terrace & Balcony Gardens",
    description: "Convert underutilized spaces into lush, cozy retreats.",
  },
  {
    icon: <TreePine className="h-10 w-10 text-green-600" />,
    title: "Backyard Landscaping",
    description: "Transform your backyard into a personal paradise.",
  },
  {
    icon: <Droplets className="h-10 w-10 text-green-600" />,
    title: "Water Features & Ponds",
    description: "Add a calming touch with fountains, ponds, and modern water bodies.",
  },
  {
    icon: <PenTool className="h-10 w-10 text-green-600" />,
    title: "Farmhouse Landscaping",
    description: "End-to-end outdoor planning from scratch, ensuring a scenic, functional, and relaxing environment.",
  },
  {
    icon: <Ruler className="h-10 w-10 text-green-600" />,
    title: "Potted Plant Arrangements",
    description: "Aesthetic plant curation for homes, offices, and commercial spaces.",
  },
  {
    icon: <Shovel className="h-10 w-10 text-green-600" />,
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
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">What We Offer</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive landscaping solutions for balconies and terraces, tailored to your specific needs and
            space constraints.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="opacity-0 transition-all duration-700"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  {service.icon}
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

