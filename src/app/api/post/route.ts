import AuthService from '@/lib/auth-service/auth-service'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const postSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  content: z.string().min(10, 'O conteúdo deve ter no mínimo 10 caracteres'),
  categories: z
    .string()
    .min(1, 'Selecione uma categoria')
    .refine(
      (cat) => ['produtividade', 'gestao', 'marketing'].includes(cat),
      'Categoria inválida',
    ),
})

export async function POST(req: Request) {
  try {
    // Verificação de autenticação
    const session = await AuthService.isSessionValid()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const id = typeof session.sub === 'number' ? session.sub : undefined
    if (!id) {
      return NextResponse.json(
        { error: 'ID do usuário inválido' },
        { status: 400 },
      )
    }

    // Validação do body com Zod
    const body = await req.json()
    const result = postSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    // Criação do post com dados validados
    const { title, content, categories } = result.data
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id },
        },
        categories: {
          create: [{ category: categories }],
        },
      },
    })

    return NextResponse.json(
      {
        message: 'Post criado com sucesso!',
        post,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao criar post:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
