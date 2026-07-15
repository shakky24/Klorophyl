"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FieldName = "name" | "area" | "phone"

const FIELDS: { name: FieldName; label: string; placeholder: string; type: string }[] = [
  { name: "name", label: "What's your name?", placeholder: "Your Name", type: "text" },
  { name: "area", label: "Your Area?", placeholder: "Your Area", type: "text" },
  { name: "phone", label: "Phone Number", placeholder: "+91 88787 66767", type: "tel" },
]

const validators: Record<FieldName, (value: string) => true | string> = {
  name: (value) => value.trim().length > 0 || "Please enter your name",
  area: (value) => value.trim().length > 0 || "Please enter your area",
  phone: (value) => /^\+?[0-9\s]{7,15}$/.test(value.trim()) || "Please enter a valid phone number",
}

const initialValues: Record<FieldName, string> = { name: "", area: "", phone: "" }

export default function FeedbackForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const validateField = (field: FieldName, value: string) => {
    const result = validators[field](value)
    setErrors((prev) => ({ ...prev, [field]: result === true ? "" : result }))
    return result === true
  }

  const handleChange = (field: FieldName) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) validateField(field, value)
  }

  const handleBlur = (field: FieldName) => () => validateField(field, values[field])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(false)

    const allValid = (Object.keys(validators) as FieldName[])
      .map((field) => validateField(field, values[field]))
      .every(Boolean)

    if (!allValid) return

    console.log("Form submitted:", values)
    setSubmitted(true)
    setValues(initialValues)
    setErrors({})
  }

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit} noValidate>
      {FIELDS.map(({ name, label, placeholder, type }) => (
        <div className="mb-7" key={name}>
          <Label htmlFor={name} className="block text-[15px] font-semibold mb-2 text-gray-900">
            {label}
          </Label>
          <Input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={values[name]}
            onChange={handleChange(name)}
            onBlur={handleBlur(name)}
            className={cn(
              "rounded-none border-0 border-b border-gray-300 bg-transparent px-0.5 text-[15px] shadow-none",
              "focus-visible:ring-0 focus-visible:border-green-700",
              errors[name] && "border-red-600"
            )}
          />
          <span className="block min-h-[16px] text-xs text-red-600 mt-1">{errors[name]}</span>
        </div>
      ))}

      <div className="flex items-center gap-6 mt-3">
        <Button
          type="submit"
          className="bg-green-800 hover:bg-green-900 rounded-none px-8 py-6 text-[13px] font-bold tracking-wide"
        >
          SUBMIT
        </Button>
        <a href="tel:+918878766767" className="text-sm text-gray-900 underline">
          Call us
        </a>
      </div>

      {submitted && (
        <p className="mt-5 text-sm font-semibold text-green-800">
          Thanks! We&apos;ll be in touch shortly.
        </p>
      )}
    </form>
  )
}
