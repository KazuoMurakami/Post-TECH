'use client'

import { ImagePlus, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'

export default function DialogPost() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategory] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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
          categories,
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
      setCategory('')
      setSelectedImage(null)
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
    <Dialog>
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
              <label className="text-sm font-medium">Categoria</label>
              <Select onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="produtividade">Produtividade</SelectItem>
                  <SelectItem value="gestao">Gestão</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              {errors.categories && (
                <span className="text-sm text-red-500">
                  {errors.categories[0]}
                </span>
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Imagem de Capa</label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image')?.click()}
                >
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Upload Imagem
                </Button>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Preview"
                  className="mt-2 max-h-48 rounded-lg object-cover"
                  width={200}
                  height={200}
                />
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
    </Dialog>
  )
}
