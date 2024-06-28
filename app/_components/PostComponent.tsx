import React from 'react'
import { Post } from '../utils/Interface'
import Link from 'next/link'



interface props {
  post: Post;
  
}
const PostComponent = ({ post }: props) => {
  return (
    <div className="mb-8 p-4 flex flex-col gap-4 border border-gray-900 rounded-md shadow-sm shadow-purple-950 hover:shadow-md hover:bg-purple-500 dark:hover:bg-gray-950  hover:text-slate-50 group ">
      <Link href={`/posts/${post?.slug?.current}`} className='flex flex-col gap-1'>
        <h2 className=' font-bold text-2xl text-purple-700 group-hover:text-white dark:group-hover:text-purple-700'>{post?.title}</h2>
        <p className=' font-semibold text-sm'>{new Date(post?.publishedAt).toDateString()}</p>
        <p >{post?.excerpt}</p>
      </Link>

      {/* tags */}
      <div className='space-x-2' >
        {post?.tag?.map((tag) => (
          <span  key={tag._id} className='font-semibold text-sm  border dark:border-gray-900 w-fit p-1  text-purple-700 group-hover:text-white dark:group-hover:text-purple-700 ' >#{tag?.name}</span>
        ))}
      </div>
    </div>
  )
}

export default PostComponent
