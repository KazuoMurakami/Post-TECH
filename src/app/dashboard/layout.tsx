import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AuthService from '@/lib/auth-service/auth-service'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await AuthService.isSessionValid()
  const userName =
    session && typeof session.name === 'string' ? session.name : 'Guest'
  return (
    <SidebarProvider>
      <AppSidebar userName={userName} />
      <main className="flex flex-col overflow-hidden w-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
