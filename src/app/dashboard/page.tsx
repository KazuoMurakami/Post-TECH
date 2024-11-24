'use server'
import ResumePost from '@/components/forms/resume-post'
import { getPosts } from '@/app/actions/posts'
import PostList from '@/components/post-list'

export default async function PostsPage() {
  const postsResponse = await getPosts()
  const posts = 'posts' in postsResponse ? postsResponse.posts : []
  const postLength = posts.length
  return (
    <div>
      <h1>Posts</h1>
      <ResumePost postLength={postLength} />
      <PostList PostList={posts} />
    </div>
  )
}
