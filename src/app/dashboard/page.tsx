'use server'
import CreatePostForm from '@/components/forms/create-post-form'
import { getPosts } from '../actions/posts'

export default async function PostsPage() {
  const postsResponse = await getPosts()
  const posts = 'posts' in postsResponse ? postsResponse.posts : []
  const postLength = posts.length
  return (
    <div>
      <h1>Posts</h1>
      <CreatePostForm postLength={postLength} />
      <div className="space-y-4 p-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer "
          >
            <div className="flex flex-col justify-between items-start ">
              <h3 className="font-bold">{post.title}</h3>
              <span className="break-words text-sm text-gray-500 ">
                {post.content && post.content.length > 100
                  ? `${post.content.substring(0, 100)}...`
                  : post.content}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
