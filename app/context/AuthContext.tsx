"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { checkAuthStatus } from "@/lib/actions/user.actions"

type AuthUser = {
  authenticated: boolean
  role?: string
  is_admin?: boolean
}

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      const data = await checkAuthStatus()

      if (data.authenticated) {
        setUser(data)
      }

      setLoading(false)
    }

    checkSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)