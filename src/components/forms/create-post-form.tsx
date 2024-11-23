import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileEdit, Clock, Calendar, CheckCircle2, Search } from 'lucide-react'
import DialogPost from '../dialog'
import { Button } from '../ui/button'

interface PostFormProps {
  postLength: number
}

export default function CreatePostForm({ postLength }: PostFormProps) {
  const stats = [
    { label: 'Rascunho', count: 14, icon: FileEdit, color: 'text-gray-500' },
    { label: 'Pendente', count: 6, icon: Clock, color: 'text-yellow-500' },
    { label: 'Agendado', count: 12, icon: Calendar, color: 'text-purple-500' },
    {
      label: 'Postado',
      count: 24,
      icon: CheckCircle2,
      color: 'text-green-500',
    },
  ]

  return (
    <div className="p-6 flex-1">
      <div className="flex flex-col justify-between items-center mb-8 lg:flex-row">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-gray-500">
            Crie, revise e aprove os posts do seu blog.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button variant="outline">Gerenciar categorias</Button>
          <DialogPost />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold">{postLength}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className=" mb-8 bg-purple-50 border-purple-200">
        <AlertDescription className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
            <span>
              Você tem <span className="text-purple-600 font-medium">7</span>{' '}
              artigos em elaboração
            </span>
            <span className="text-gray-500">
              Estimamos que dentro de 13 minutos eles estarão prontos
            </span>
          </div>
          <Button variant="link" className="text-purple-600">
            Visualizar progresso
          </Button>
        </AlertDescription>
      </Alert>

      <div className="flex gap-4 mb-6">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Categorias</SelectItem>
            <SelectItem value="produtividade">Produtividade</SelectItem>
            <SelectItem value="gestao">Gestão</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="draft">Rascunho</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="scheduled">Agendado</SelectItem>
            <SelectItem value="published">Postado</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input placeholder="Busque um post" className="pl-10" />
        </div>
      </div>
    </div>
  )
}
