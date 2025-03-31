"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2, Loader2, ArrowLeft, ArrowRight } from "lucide-react"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    services: {
      terraceGarden: false,
      balconyGarden: false,
      backyardGarden: false,
      waterbodies: false,
      farmhouseLandscaping: false,
      pottedPlantSchemes: false
    },
    areaSize: "",
    budgetRange: "",
    designPreferences: ""
  })

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

    if (formRef.current) {
      observer.observe(formRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }

      if (formRef.current) {
        observer.unobserve(formRef.current)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (service: string) => {
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [service]: !formData.services[service as keyof typeof formData.services]
      }
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Send the form data to your backend API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      console.log("Form submitted successfully:", result);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center mx-2 md:mx-4">
            <div 
              className={`rounded-full w-8 h-8 flex items-center justify-center border-2 
                ${currentStep >= step 
                  ? "bg-green-600 text-white border-green-600" 
                  : "bg-white text-gray-400 border-gray-300"}`}
            >
              {step}
            </div>
            <span className={`text-xs mt-1 ${currentStep >= step ? "text-green-600" : "text-gray-400"}`}>
              Step {step}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-green-800">Step 1: Contact Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="fullName" 
                  name="fullName"
                  placeholder="Enter your full name" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber"
                  placeholder="Enter your phone number" 
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button 
                type="button" 
                onClick={nextStep}
                className="bg-green-600 hover:bg-green-700"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-green-800">Step 2: Select Your Requirement</h3>
            <p className="text-gray-600">What type of project are you interested in? (Select one or more)</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 rounded-lg p-3 hover:bg-green-50">
                <Checkbox 
                  id="terraceGarden" 
                  checked={formData.services.terraceGarden}
                  onCheckedChange={() => handleCheckboxChange('terraceGarden')}
                />
                <div>
                  <Label 
                    htmlFor="terraceGarden" 
                    className="text-base font-medium cursor-pointer"
                  >
                    Terrace Garden
                  </Label>
                  <p className="text-sm text-gray-500">Transform your rooftop into a lush green oasis</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3 hover:bg-green-50">
                <Checkbox 
                  id="balconyGarden" 
                  checked={formData.services.balconyGarden}
                  onCheckedChange={() => handleCheckboxChange('balconyGarden')}
                />
                <div>
                  <Label 
                    htmlFor="balconyGarden" 
                    className="text-base font-medium cursor-pointer"
                  >
                    Balcony Garden
                  </Label>
                  <p className="text-sm text-gray-500">Compact yet beautiful green spaces for your balcony</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3 hover:bg-green-50">
                <Checkbox 
                  id="backyardGarden" 
                  checked={formData.services.backyardGarden}
                  onCheckedChange={() => handleCheckboxChange('backyardGarden')}
                />
                <div>
                  <Label 
                    htmlFor="backyardGarden" 
                    className="text-base font-medium cursor-pointer"
                  >
                    Backyard Garden
                  </Label>
                  <p className="text-sm text-gray-500">Custom landscaping for your backyard</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3 hover:bg-green-50">
                <Checkbox 
                  id="waterbodies" 
                  checked={formData.services.waterbodies}
                  onCheckedChange={() => handleCheckboxChange('waterbodies')}
                />
                <div>
                  <Label 
                    htmlFor="waterbodies" 
                    className="text-base font-medium cursor-pointer"
                  >
                    Waterbodies
                  </Label>
                  <p className="text-sm text-gray-500">Ponds, fountains, and other water features</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3 hover:bg-green-50">
                <Checkbox 
                  id="farmhouseLandscaping" 
                  checked={formData.services.farmhouseLandscaping}
                  onCheckedChange={() => handleCheckboxChange('farmhouseLandscaping')}
                />
                <div>
                  <Label 
                    htmlFor="farmhouseLandscaping" 
                    className="text-base font-medium cursor-pointer"
                  >
                    Farmhouse Landscaping
                  </Label>
                  <p className="text-sm text-gray-500">Complete landscaping development from scratch, including Farm house construction, outdoor design and green space planning</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3 hover:bg-green-50">
                <Checkbox 
                  id="pottedPlantSchemes" 
                  checked={formData.services.pottedPlantSchemes}
                  onCheckedChange={() => handleCheckboxChange('pottedPlantSchemes')}
                />
                <div>
                  <Label 
                    htmlFor="pottedPlantSchemes" 
                    className="text-base font-medium cursor-pointer"
                  >
                    Potted Plant Schemes
                  </Label>
                  <p className="text-sm text-gray-500">Indoor and outdoor plant arrangements</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button 
                type="button" 
                onClick={prevStep}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                className="bg-green-600 hover:bg-green-700"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-green-800">Step 3: Project Details</h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">What is the approximate size of your area?</Label>
                <RadioGroup 
                  value={formData.areaSize} 
                  onValueChange={(value) => handleRadioChange('areaSize', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under-200" id="under-200" />
                    <Label htmlFor="under-200" className="cursor-pointer">Under 200 sq. ft.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="200-500" id="200-500" />
                    <Label htmlFor="200-500" className="cursor-pointer">200 – 500 sq. ft.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500-1000" id="500-1000" />
                    <Label htmlFor="500-1000" className="cursor-pointer">500 – 1000 sq. ft.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1000-plus" id="1000-plus" />
                    <Label htmlFor="1000-plus" className="cursor-pointer">1000+ sq. ft.</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base">What is your estimated budget range?</Label>
                <RadioGroup 
                  value={formData.budgetRange} 
                  onValueChange={(value) => handleRadioChange('budgetRange', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under-50000" id="under-50000" />
                    <Label htmlFor="under-50000" className="cursor-pointer">Under ₹50,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="50000-100000" id="50000-100000" />
                    <Label htmlFor="50000-100000" className="cursor-pointer">₹50,000 – ₹1,00,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="100000-500000" id="100000-500000" />
                    <Label htmlFor="100000-500000" className="cursor-pointer">₹1,00,000 – ₹5,00,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500000-plus" id="500000-plus" />
                    <Label htmlFor="500000-plus" className="cursor-pointer">₹5,00,000+</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="designPreferences">Any specific design preferences or inspirations? (Optional)</Label>
                <Textarea
                  id="designPreferences"
                  name="designPreferences"
                  placeholder="Tell us about your design preferences or any inspirations you have..."
                  value={formData.designPreferences}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button 
                type="button" 
                onClick={prevStep}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                className="bg-green-600 hover:bg-green-700"
              >
                Review & Submit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-green-800">Step 4: Review & Submit</h3>
            <p className="text-gray-600">Please review your information before submitting</p>

            <div className="space-y-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Contact Information</h4>
                <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                <p><span className="font-medium">Phone:</span> {formData.phoneNumber}</p>
                {formData.email && <p><span className="font-medium">Email:</span> {formData.email}</p>}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Selected Services</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {Object.entries(formData.services).map(([key, value]) => {
                    if (!value) return null;
                    
                    const serviceLabels: {[key: string]: string} = {
                      terraceGarden: "Terrace Garden",
                      balconyGarden: "Balcony Garden",
                      backyardGarden: "Backyard Garden",
                      waterbodies: "Waterbodies",
                      farmhouseLandscaping: "Farmhouse Landscaping",
                      pottedPlantSchemes: "Potted Plant Schemes"
                    };
                    
                    return <li key={key}>{serviceLabels[key]}</li>;
                  })}
                </ul>
                {Object.values(formData.services).every(v => !v) && (
                  <p className="text-gray-500 italic">No services selected</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Project Details</h4>
                {formData.areaSize && (
                  <p><span className="font-medium">Area Size:</span> {
                    {
                      'under-200': 'Under 200 sq. ft.',
                      '200-500': '200 – 500 sq. ft.',
                      '500-1000': '500 – 1000 sq. ft.',
                      '1000-plus': '1000+ sq. ft.'
                    }[formData.areaSize]
                  }</p>
                )}
                
                {formData.budgetRange && (
                  <p><span className="font-medium">Budget Range:</span> {
                    {
                      'under-50000': 'Under ₹50,000',
                      '50000-100000': '₹50,000 – ₹1,00,000',
                      '100000-500000': '₹1,00,000 – ₹5,00,000',
                      '500000-plus': '₹5,00,000+'
                    }[formData.budgetRange]
                  }</p>
                )}
                
                {formData.designPreferences && (
                  <div>
                    <p className="font-medium">Design Preferences:</p>
                    <p className="text-gray-700 mt-1">{formData.designPreferences}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button 
                type="button" 
                onClick={prevStep}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700" 
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get a Free Consultation"
                )}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-green-50 opacity-0 transition-all duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Your Dream Outdoor Space is Just a Click Away!
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Let's build a space that reflects your lifestyle and love for nature! Fill out the form below and let's get
            started on your dream landscape.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {isSubmitted ? (
              <div className="p-8 text-center bg-white">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your inquiry! Our team will get in touch with you shortly to discuss your requirements and bring your green vision to life. 🌿
                </p>
                <Button onClick={() => {
                  setIsSubmitted(false)
                  setCurrentStep(1)
                  setFormData({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    services: {
                      terraceGarden: false,
                      balconyGarden: false,
                      backyardGarden: false,
                      waterbodies: false,
                      farmhouseLandscaping: false,
                      pottedPlantSchemes: false
                    },
                    areaSize: "",
                    budgetRange: "",
                    designPreferences: ""
                  })
                }} className="bg-green-600 hover:bg-green-700">
                  Make Another Request
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="p-8 bg-white">
                {renderStepIndicator()}
                {renderStepContent()}
                
                {submitError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                    <p className="text-sm">{submitError}</p>
                    <p className="text-xs mt-1">Please try again or contact us directly.</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
