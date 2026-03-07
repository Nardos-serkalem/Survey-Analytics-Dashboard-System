'use client'

import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function Header() {
   const router = useRouter()
    const handleSignOut = () => {
    localStorage.removeItem("surveyUser")
    router.push("/auth/login")
  }
    return (
        <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
            <h1 className="text-xl font-semibold"> Survey Dashboard</h1>
            <div className="flex items-center gap-1"></div>
              <div className="mb-10 flex w-full justify-end">
        <Button type="button" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
        </header>
    )
}