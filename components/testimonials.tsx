"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    avatar: "/placeholder.svg?height=100&width=100",
    stars: 5,
    text: "Khlorophyl transformed my tiny balcony into an amazing green space that I use every day. Their team was professional, creative, and respectful of my budget. I couldn't be happier with the results!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Real Estate Agent",
    avatar: "/placeholder.svg?height=100&width=100",
    stars: 5,
    text: "I've recommended Khlorophyl to several of my clients looking to stage their properties for sale. Their landscaping work consistently adds value and helps properties sell faster. A great investment!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Apartment Owner",
    avatar: "/placeholder.svg?height=100&width=100",
    stars: 4,
    text: "I was skeptical about what could be done with my north-facing terrace, but Khlorophyl created a beautiful space with shade-loving plants that thrive. They really know their plants and design!",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Property Manager",
    avatar: "/placeholder.svg?height=100&width=100",
    stars: 5,
    text: "We've used Khlorophyl for multiple properties in our portfolio. Their maintenance plans keep everything looking great year-round, and our tenants love the outdoor spaces they've created.",
  },
  {
    id: 5,
    name: "Jennifer Lee",
    role: "Homeowner",
    avatar: "/placeholder.svg?height=100&width=100",
    stars: 5,
    text: "From concept to completion, working with Khlorophyl was a pleasure. They listened to my needs and created a low-maintenance terrace garden that's perfect for entertaining.",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
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

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-white opacity-0 transition-all duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience with Khlorophyl.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`opacity-0 transition-all duration-700 delay-${index * 100}`}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 transition-all ${
                activeIndex === index ? "bg-green-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

