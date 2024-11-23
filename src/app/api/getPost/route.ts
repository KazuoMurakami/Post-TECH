import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Buscar todos os posts no banco de dados
    const posts = await prisma.post.findMany()

    // Retornar os dados como JSON no front-end
    return NextResponse.json(posts)
  } catch (error) {
    // Lidar com erros e enviar uma resposta de erro se necessário
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 },
    )
  }
}
