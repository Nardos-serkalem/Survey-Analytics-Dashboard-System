import { api } from "@/lib/actions/api.actions"

export async function checkAuthStatus() {
  try {
    
    const status = await api.checkStatus()
    return status
  } catch (error) {
    console.error("Status check failed:", error)
    return { authenticated: false }
  }
}