import { NextRequest, NextResponse } from 'next/server'
import AuthService from './lib/auth-service/auth-service'

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}

const publicRoutes = ['/', '/register', '/login']

export async function middleware(req: NextRequest) {
  const session = await AuthService.isSessionValid()
  const pathname = req.nextUrl.pathname

  // Redireciona para o dashboard se o usuário estiver logado e tentar acessar a página de login
  if (pathname === '/login' && session) {
    console.log('Sessão válida, redirecionando para o dashboard')
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Permite acesso a rotas públicas se não houver sessão
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Redireciona para login se não houver sessão em uma rota protegida
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
