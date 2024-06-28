import Header from '@/app/_components/Header';
import PostComponent from '@/app/_components/PostComponent';
import { Params, Post } from '@/app/utils/Interface';
import { client } from '@/sanity/lib/client'
import React from 'react'


async function getPostByTag(tag: string){
  const query =  `
  *[_type == 'post' && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
    title,
    slug,
    publishedAt,
    excerpt,
    tag[]-> {
      _id,
      slug,
      name
    }
  }
  `
  const posts =  await client.fetch(query);
  return posts;

}
const page = async ({params}:Params) => {
  const posts:Array<Post> = await getPostByTag(params.slug);
  // console.log("post by tag",posts)
  return (
    <div className="mx-auto max-w-5xl px-6 ">
      <Header title={`#${params.slug}`} tags/>
      <div >
        {posts?.length > 0 && posts.map((post) => (
          <PostComponent key={post?._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default page
