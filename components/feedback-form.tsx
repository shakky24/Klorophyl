"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { validators, type FieldName } from "@/lib/validators"
import { submitLead, type LeadFormState } from "@/app/forms/actions"

const FIELDS: { name: FieldName; label: string; placeholder: string; type: string }[] = [
  { name: "name", label: "What's your name?", placeholder: "Your Name", type: "text" },
  { name: "area", label: "Your Area?", placeholder: "Your Area", type: "text" },
  { name: "phone", label: "Phone Number", placeholder: "+91 88787 66767", type: "tel" },
]

const initialValues: Record<FieldName, string> = { name: "", area: "", phone: "" }
const initialState: LeadFormState = { status: "idle" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-green-800 hover:bg-green-900 rounded-none px-8 py-6 text-[13px] font-bold tracking-wide disabled:opacity-60"
    >
      {pending ? "SUBMITTING..." : "SUBMIT"}
    </Button>
  )
}

export default function FeedbackForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [state, formAction] = useActionState(submitLead, initialState)

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

  useEffect(() => {
    if (state.status === "success") {
      setValues(initialValues)
      setErrors({})
    }
  }, [state])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const allValid = (Object.keys(validators) as FieldName[])
      .map((field) => validateField(field, values[field]))
      .every(Boolean)

    if (!allValid) event.preventDefault()
  }

  return (
    <form className="w-full max-w-sm" action={formAction} onSubmit={handleSubmit} noValidate>
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
        <SubmitButton />
        <a href="tel:+918878766767" className="text-sm text-gray-900 underline">
          Call us
        </a>
      </div>

      {state.status === "success" && (
        <p className="mt-5 text-sm font-semibold text-green-800">
          Thanks! We&apos;ll be in touch shortly.
        </p>
      )}

      {state.status === "error" && (
        <p className="mt-5 text-sm font-semibold text-red-600">{state.message}</p>
      )}
    </form>
  )
}
