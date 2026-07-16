import type { Metadata } from "next"
import FeedbackForm from "@/components/feedback-form"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Get in Touch | Klorophyl",
  description: "Tell us about your space and we'll get back to you shortly.",
}

export default function FormsPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <section className="flex-1 md:basis-[45%] flex items-start md:items-center px-6 md:px-16 pt-24 pb-16 md:py-16">
        <FeedbackForm />
      </section>

      <section className="hidden md:block md:basis-[55%] relative">
        <Image
          src="/forms-garden.png"
          alt="Garden with blooming hydrangeas"
          fill
          priority
          className="object-cover"
        />
      </section>
    </main>
  )
}
