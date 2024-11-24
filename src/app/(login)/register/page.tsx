'use client'
// import { useActionState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { createAccount } from '@/lib/auth-service/auth'
import Link from 'next/link'
import { useFormState } from 'react-dom'
const initialState = {
  errors: {},
  message: null,
}
export default function SignUpForm() {
  const [state, formAction] = useFormState(createAccount, initialState)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
              {state.errors?.name && (
                <span className="text-sm text-red-500">
                  {state.errors.name[0]}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
              {state.errors?.email && (
                <span className="text-sm text-red-500">
                  {state.errors.email[0]}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
              {state.errors?.password && (
                <div
                  className={`p-2 rounded ${state.errors ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                >
                  {state.errors?.password}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <Link href="/login" className={buttonVariants({ variant: 'link' })}>
              Já Tenho Conta
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
