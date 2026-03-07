'use client'
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001/api/v1"

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      mode:'cors',
      credentials: "include", 
            headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`)
    }
    return (await res.json()) as T
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const api = {
  
  login: (username: string, password: string) =>
    apiFetch<{ status: string; message: string; role: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  checkStatus: () =>
    apiFetch<{ authenticated: boolean; role: string; is_admin: boolean }>("/auth/status"),

  overview: () =>
    apiFetch<{ total_respondents: number; awareness_rate: number }>("/analytics/overview"),

  demographics: () =>
    apiFetch<{
      genders: Record<string, number>
      subcities: Record<string, number>
      education: Record<string, number>
    }>("/analytics/demographics"),

  preferences: () =>
    apiFetch<{
      topics: Record<string, number>
      timing: Record<string, number>
      frequency: Record<string, number>
    }>("/analytics/preferences"),

  participation: () => apiFetch<any>("/analytics/participation"),

  sources: () => apiFetch<any>("/analytics/sources"),

  delivery: () => apiFetch<any>("/analytics/delivery"),

  health: () =>
    apiFetch<{ status: string; database: string }>("/health"),
}