"use server"

import { createClient } from "@/lib/supabase/server"
import { validators, type FieldName } from "@/lib/validators"

export interface LeadFormState {
  status: "idle" | "success" | "error"
  message?: string
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const values: Record<FieldName, string> = {
    name: String(formData.get("name") ?? ""),
    area: String(formData.get("area") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  }

  for (const field of Object.keys(validators) as FieldName[]) {
    const result = validators[field](values[field])
    if (result !== true) {
      return { status: "error", message: result }
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("leads").insert({
    name: values.name.trim(),
    area: values.area.trim(),
    phone: values.phone.trim(),
  })

  if (error) {
    return { status: "error", message: "Something went wrong, please try again or call us." }
  }

  return { status: "success" }
}
