import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/app/crm/actions"
import { Button } from "@/components/ui/button"
import LeadsTable from "@/components/crm/leads-table"
import type { Lead } from "@/lib/leads"

export default async function CrmPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/crm/login")
  }

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  const leadList = (leads ?? []) as Lead[]

  return (
    <main className="min-h-screen px-6 md:px-12 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
            <p className="text-sm text-gray-500">
              {leadList.length} {leadList.length === 1 ? "lead" : "leads"} total
            </p>
          </div>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <LeadsTable leads={leadList} />
        </div>
      </div>
    </main>
  )
}
