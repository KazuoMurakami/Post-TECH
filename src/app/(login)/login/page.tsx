'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth-service/auth'
import { useFormState } from 'react-dom'
const initialState = {
  errors: {},
  message: null,
}
export default function Login() {
  const router = useRouter()

  const [state, loginAction] = useFormState(login, initialState)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={loginAction}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              {state.errors?.email && (
                <span className="text-sm text-red-500">
                  {state.errors.email[0]}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              {state.errors?.password && (
                <span className="text-sm text-red-500">
                  {state.errors.password[0]}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="w-full"
            onClick={() => router.push('/register')}
          >
            Dont have an account? Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
