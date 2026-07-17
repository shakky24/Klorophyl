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

  await appendToGoogleSheet(values)

  return { status: "success" }
}

async function appendToGoogleSheet(values: Record<FieldName, string>) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET

  if (!url || !secret) return

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name: values.name.trim(),
        area: values.area.trim(),
        phone: values.phone.trim(),
      }),
      redirect: "follow",
    })

    if (!response.ok) {
      console.error("Google Sheets webhook returned", response.status, await response.text())
    }
  } catch (err) {
    // The lead is already saved in Supabase, so a sheet-write failure
    // shouldn't fail the user's submission — just log it for follow-up.
    console.error("Failed to append lead to Google Sheet:", err)
  }
}
