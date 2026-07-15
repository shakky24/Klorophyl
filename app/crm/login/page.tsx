import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import LoginForm from "@/components/crm/login-form"

export default async function CrmLoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/crm")
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Klorophyl CRM</CardTitle>
          <CardDescription>Sign in to view leads.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  )
}
