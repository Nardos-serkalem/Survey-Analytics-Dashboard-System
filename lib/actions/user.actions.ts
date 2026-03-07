export async function checkAuthStatus() {
  try {
    const res = await fetch("http://127.0.0.1:5001/api/v1/auth/status", {
      method: "GET",
      credentials: "include",
    })

    if (!res.ok) {
      return { authenticated: false }
    }

    return await res.json()

  } catch (error) {
    console.error("Status check failed:", error)
    return { authenticated: false }
  }
}
