"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leads"

export interface SignInState {
  error?: string
}

export async function signIn(_prevState: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: "Invalid email or password." }
  }

  redirect("/crm")
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/crm/login")
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const isValidStatus = LEAD_STATUSES.some((entry) => entry.value === status)
  if (!isValidStatus) {
    throw new Error("Invalid status")
  }

  const supabase = await createClient()
  const { error } = await supabase.from("leads").update({ status }).eq("id", id)

  if (error) {
    throw new Error("Failed to update lead status")
  }

  revalidatePath("/crm")
}
