import { prisma } from '@/lib/prisma' // assumindo que você usa Prisma
import AuthService from '@/lib/auth-service/auth-service'
import { NextResponse } from 'next/server'

export async function getPosts() {
  try {
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
    const posts = await prisma.post.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { posts }
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw new Error('Falha ao carregar posts')
  }
}

export async function createPost(formData: FormData) {
  try {
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
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: id, // Adicione o userId necessário - ajuste para pegar o ID do usuário real
      },
    })

    return { success: true, post }
  } catch (error) {
    console.error('Erro ao criar post:', error)
    return { success: false, error: 'Erro ao criar post' }
  }
}
