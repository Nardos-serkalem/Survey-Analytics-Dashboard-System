  "use client"

  import { useState } from "react"
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  import Link from "next/link"
  import { useRouter } from "next/navigation"
  import {
    Card,
    CardContent,
    CardDescription,
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

  export function LoginForm({
    className,
    ...props
  }: React.ComponentProps<"div">) {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const res = await fetch("http://127.0.0.1:5001/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })

    if (!res.ok) {
      alert("Invalid username or password")
      setIsSubmitting(false)
      return
    }

    router.push("/dashboard")

  } catch (error) {
    console.error(error)
    alert("Something went wrong")
    setIsSubmitting(false)
  }
}

    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="w-[400px] shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Login to your account
            </CardTitle>
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>

                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>

                <Field>
                  <Button className="w-full" type="submit">
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/sign-up">Sign up</Link>
                  </FieldDescription>
                </Field>

              </FieldGroup>
            </form>
          </CardContent>

        </Card>
      </div>
    )
  }