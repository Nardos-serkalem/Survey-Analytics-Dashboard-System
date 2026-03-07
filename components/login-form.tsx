  "use client"

  import { useState } from "react"
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
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
        Accept: "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123',
      }),
    })
    
    if (res.ok) {
      alert("Login successful")
      router.push("/dashboard")
    } 
    else if (res.status === 401) {
      alert("Invalid username or password")
     }
    else {
      alert("Login failed")
    }
    setIsSubmitting(false)


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
                </Field>

              </FieldGroup>
            </form>
          </CardContent>

        </Card>
      </div>
    )
  }