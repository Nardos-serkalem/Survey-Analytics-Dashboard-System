"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuthStatus } from "@/lib/actions/user.actions"
import { api } from "@/lib/actions/api.actions"

export default function DashboardPage() {
  const router = useRouter()

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
      <div className="flex items-center justify-center">
        <div className="text-2xl font-semibold">Dashboard</div>
      </div>
    </main>
  )
}
