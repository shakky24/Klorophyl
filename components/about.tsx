"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Leaf, Award, Users, ThumbsUp } from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

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

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }

      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item)
      })
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50 opacity-0 transition-all duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">About Klorophyl</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Klorophyl, we bring nature to your doorstep with stunning, functional, and sustainable landscaping
            solutions. Whether you have a terrace, balcony, backyard, or a sprawling farmhouse, we create bespoke green
            spaces that blend beauty with practicality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={(el) => (itemsRef.current[0] = el)} className="opacity-0 transition-all duration-1000 delay-300">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Khlorophyl team at work"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <div
              ref={(el) => (itemsRef.current[1] = el)}
              className="mb-8 opacity-0 transition-all duration-1000 delay-500"
            >
              <h3 className="text-2xl font-bold text-green-700 mb-4">Why Choose Klorophyl?</h3>
              <div className="space-y-3">
                <p className="text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">🌱</span>
                  <span>
                    <strong>Bespoke Landscaping</strong> – Every design is customized to match your vision and space.
                  </span>
                </p>
                <p className="text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">🏡</span>
                  <span>
                    <strong>End-to-End Solutions</strong> – From concept and 3D visualization to execution and
                    maintenance, we handle it all.
                  </span>
                </p>
                <p className="text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">💡</span>
                  <span>
                    <strong>Innovative & Sustainable</strong> – Thoughtfully designed landscapes using eco-friendly
                    materials.
                  </span>
                </p>
                <p className="text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">👷</span>
                  <span>
                    <strong>Expert Team</strong> – Experienced designers, architects, and landscapers ensuring quality
                    execution.
                  </span>
                </p>
                <p className="text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">💬</span>
                  <span>
                    <strong>Seamless Communication</strong> – Transparent processes, timely updates, and personalized
                    support.
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div
                ref={(el) => (itemsRef.current[2] = el)}
                className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm opacity-0 transition-all duration-1000 delay-700"
              >
                <Award className="h-10 w-10 text-green-600 mb-2" />
                <h4 className="font-bold text-gray-800">Award Winning</h4>
                <p className="text-sm text-gray-600">Recognized for excellence in landscape design</p>
              </div>

              <div
                ref={(el) => (itemsRef.current[3] = el)}
                className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm opacity-0 transition-all duration-1000 delay-800"
              >
                <Leaf className="h-10 w-10 text-green-600 mb-2" />
                <h4 className="font-bold text-gray-800">Eco-Friendly</h4>
                <p className="text-sm text-gray-600">Sustainable practices and materials</p>
              </div>

              <div
                ref={(el) => (itemsRef.current[4] = el)}
                className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm opacity-0 transition-all duration-1000 delay-900"
              >
                <Users className="h-10 w-10 text-green-600 mb-2" />
                <h4 className="font-bold text-gray-800">Expert Team</h4>
                <p className="text-sm text-gray-600">Certified professionals with years of experience</p>
              </div>

              <div
                ref={(el) => (itemsRef.current[5] = el)}
                className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm opacity-0 transition-all duration-1000 delay-1000"
              >
                <ThumbsUp className="h-10 w-10 text-green-600 mb-2" />
                <h4 className="font-bold text-gray-800">100% Satisfaction</h4>
                <p className="text-sm text-gray-600">Committed to exceeding your expectations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

