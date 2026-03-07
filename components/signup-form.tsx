"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }

    setIsSubmitting(true)

    const signupData = {
      name,
      email,
      password,
    }

    // Temporary single-user auth storage until backend auth is added.
    localStorage.setItem("surveyUser", JSON.stringify(signupData))

    router.push("/auth/login")
  }

  return (
    <Card {...props} className="w-[400px] shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Create an account
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>

            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Abebe Kebede"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Abebe@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FieldDescription>
                Please confirm your password.
              </FieldDescription>
            </Field>

            <Field>
              <Button type="submit" className="w-full">
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <Link href="/auth/login">Sign in</Link>
              </FieldDescription>
            </Field>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}