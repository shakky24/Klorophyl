"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { Leaf, Award, Users, ThumbsUp } from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    itemsRef.current.forEach((item) => {
      if (item) {
        observer.observe(item)
      }
    })

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      itemsRef.current.forEach((item) => {
        if (item) {
          observer.unobserve(item)
        }
      })
    }
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-32 bg-background relative opacity-0 transition-all duration-1000 overflow-hidden"
    >
      {/* Subtle decorative elements */}
      <div className="absolute left-0 bottom-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-40 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      
      {/* Subtle decorative lines */}
      <div className="absolute top-0 right-0 w-40 h-[1px] bg-accent/20"></div>
      <div className="absolute top-0 right-0 h-40 w-[1px] bg-accent/20"></div>
      
      <div className="container mx-auto relative">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="luxury-badge mb-8 inline-block animate-slide-in-left">OUR PHILOSOPHY</span>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-foreground mb-8">
            <span className="relative">
              Artistry in <span className="text-accent font-light">Living Spaces</span>
            </span>
          </h2>
          <div className="w-20 h-[1px] bg-accent mx-auto mb-10"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed">
          At Klorophyl, we bring nature to your doorstep with stunning, functional, and sustainable landscaping solutions. Whether you have a terrace, balcony, backyard, or a sprawling farmhouse, we create bespoke green spaces that blend beauty with practicality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column - Image */}
          <div 
            ref={(el) => {
              if (el) itemsRef.current[0] = el;
            }} 
            className="opacity-0 transition-all duration-1000 delay-300 relative"
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-accent/20"></div>
            <div className="luxury-image">
              <Image
                src="/about-us.png"
                alt="Klorophyl landscape design"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-accent/20"></div>
          </div>

          {/* Right column - Content */}
          <div>
            <div
              ref={(el) => {
                if (el) itemsRef.current[1] = el;
              }}
              className="mb-16 opacity-0 transition-all duration-1000 delay-500"
            >
              <h3 className="text-xl font-light text-foreground mb-8 relative">
                  Why Choose Klorophyl?
                <span className="block w-12 h-[1px] bg-accent mt-4"></span>
              </h3>
              <div className="space-y-8">
                {[
                  {
                    title: "Bespoke Design",
                    description: "Every design is customized to match your vision and space."
                  },
                  {
                    title: "End-to-End Solutions",
                    description: "From concept and 3D visualization to execution and maintenance, we handle it all"
                  },
                  {
                    title: "Innovative & Sustainable",
                    description: "Thoughtfully designed landscapes using eco-friendly materials."
                  },
                  {
                    title: "Expert Team",
                    description: "Experienced designers, architects, and landscapers ensuring quality execution"
                  },
                  {
                    title: "Seamless Communication",
                    description: "Transparent processes, timely updates, and personalized support."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex group">
                    <div className="mr-6 pt-2">
                      <div className="w-[1px] h-full bg-accent/20 relative before:absolute before:w-[3px] before:h-[3px] before:rounded-full before:bg-accent before:-left-[1px] before:top-0 group-hover:before:scale-150 before:transition-transform"></div>
                    </div>
                    <div>
                      <h1 className="font-light text-foreground mb-2 text-lg">{item.title}</h1>
                      <p className="text-foreground/60 font-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div 
              ref={(el) => {
                if (el) itemsRef.current[2] = el;
              }}
              className="grid grid-cols-2 gap-8 opacity-0 transition-all duration-1000 delay-700"
            >
              {[
                { 
                  icon: <Award className="h-5 w-5 text-accent" />, 
                  title: "Award Winning", 
                  description: "Recognized for design excellence" 
                },
                { 
                  icon: <Leaf className="h-5 w-5 text-accent" />, 
                  title: "Eco-Conscious", 
                  description: "Sustainable practices throughout" 
                },
                { 
                  icon: <Users className="h-5 w-5 text-accent" />, 
                  title: "Expert Artisans", 
                  description: "Master craftspeople and designers" 
                },
                { 
                  icon: <ThumbsUp className="h-5 w-5 text-accent" />, 
                  title: "Client Satisfaction", 
                  description: "Committed to exceeding expectations" 
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start group luxury-hover"
                >
                  <div className="p-2 mr-3 border border-accent/20 group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h5 className="font-light text-foreground mb-1">{feature.title}</h5>
                    <p className="text-sm text-foreground/60 font-light">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
