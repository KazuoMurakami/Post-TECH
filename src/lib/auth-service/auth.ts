'use server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import * as bcrypt from 'bcrypt'

import { z } from 'zod'
import AuthService from './auth-service'
import { SignupFormSchema } from '../definitions'

export type State = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string | null
}

// const signUpSchema = z.object({
//   name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
//   email: z.string().email('Email inválido'),
//   password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
// })

export async function createAccount(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const parse = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: 'Por favor, corrija os erros no formulário',
    }
  }

  const { email, name, password } = parse.data

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        errors: {
          email: ['Este email já está cadastrado'],
        },
        message: 'Email já cadastrado',
      }
    }

    const hashPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    })

    redirect('/login')
  } catch (error) {
    console.log(error)
    return {
      message: 'Erro ao criar conta. Tente novamente.',
    }
  }
}

const loginUpSchema = z.object({
  email: z.string().email('Coloque um email valido!'),
  password: z.string(),
})

export async function login(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const parse = loginUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: 'Informações não preenchidas',
    }
  }

  const { email, password } = parse.data

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return {
      errors: {
        email: ['Email não encontrado, crie uma conta'],
      },
      message: 'Email não encontrado, crie uma conta',
    }
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return {
      errors: {
        password: ['Senha invalida, tente novamente!'],
      },
      message: 'senha invalida!',
    }
  }

  await AuthService.createSessionToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  })

  redirect('/dashboard')
}
