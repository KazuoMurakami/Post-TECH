'use client'

import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function DialogPost() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            variant: 'destructive',
            description: 'Você precisa estar logado para criar um post',
          })
          return
        }

        if (data.errors) {
          setErrors(data.errors)
          toast({
            variant: 'destructive',
            description: 'Por favor, corrija os erros no formulário',
          })
          return
        }

        throw new Error(data.error || 'Erro ao criar post')
      }

      toast({
        description: 'Post criado com sucesso!',
      })

      // Limpar formulário após sucesso
      setTitle('')
      setContent('')
      router.refresh() // Atualiza a página para refletir as mudanças
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error ? error.message : 'Erro ao criar post',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Criar post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Post</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo post
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                placeholder="Digite o título do post"
                onChange={(e) => setTitle(e.target.value)}
              />{' '}
              {errors.title && (
                <span className="text-sm text-red-500">{errors.title[0]}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Conteúdo</label>
              <Textarea
                placeholder="Escreva o conteúdo do post..."
                className="min-h-[200px]"
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <span className="text-sm text-red-500">
                  {errors.content[0]}
                </span>
              )}
            </div>
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publicando...
                </>
              ) : (
                'Publicar Post'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
      <DialogClose />
    </Dialog>
  )
}
