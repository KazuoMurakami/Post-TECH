'use client'
import { Post } from '@prisma/client'
import { TrashIcon } from 'lucide-react'
import { deletePost } from '@/app/actions/posts'
import { useRouter } from 'next/navigation'

export default function PostList({ PostList }: { PostList: Post[] }) {
  const router = useRouter()
  const handleDelete = async (postId: string) => {
    try {
      const response = await deletePost(postId)
      console.log(response)
      router.refresh()

      // Aqui você pode adicionar lógica para atualizar a lista de posts, se necessário
    } catch (error) {
      console.error('Erro ao deletar post:', error)
    }
  }

  return (
    <div className="space-y-4 p-6">
      {PostList.length > 0 ? (
        PostList.map((post, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer "
          >
            <div className="flex flex-col justify-between items-start relative">
              <h3 className="font-bold">{post.title}</h3>
              <span className="break-words text-sm text-gray-500 ">
                {post.content && post.content.length > 100
                  ? `${post.content.substring(0, 100)}...`
                  : post.content}
              </span>
              <button
                onClick={() => handleDelete(post.id)}
                className="absolute top-0 right-0 m-4"
              >
                <TrashIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 border p-4">
          <p>Nenhum post encontrado.</p>
          <p>Por favor, crie um novo post.</p>
        </div>
      )}
    </div>
  )
}
