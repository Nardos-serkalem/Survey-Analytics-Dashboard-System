"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { checkAuthStatus } from "@/lib/actions/user.actions"

export default function DashboardPage() {
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem("surveyUser")
    router.push("/auth/login")
  }

  useEffect(() => {
    async function verifyUser() {
      const status = await checkAuthStatus()

      if (!status.authenticated) {
        router.push("/auth/login")
      }
    }

    verifyUser()
  }, [])


  return (
    <main className="min-h-svh p-6 md:p-10">
      <div className="mb-10 flex w-full justify-end">
        <Button type="button" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-2xl font-semibold">Dashboard</div>
      </div>
    </main>
  )
}
