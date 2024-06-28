import Header from '@/app/_components/Header'
import { Params, Post } from '@/app/utils/Interface';
import { slugify } from '@/app/utils/healpers';
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation'
import Image from 'next/image';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";
import Link from 'next/link';
import React from 'react'





async function getPost(slug: string) {
  const {isAuthenticated} = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  const query = `
  *[_type == 'post' && slug.current == "${slug}"][0] {
   title,
   slug,
   publishedAt,
   excerpt,
   body,
   _id,
   "headings":body[style in ["h2","h3","h4","h5","h6"]] ,
   tag[]->{
     _id,
     name,
     slug
   }
}
  `

  const post = await client.fetch(query);
  return post;

}

const page = async ({ params }: Params) => {
  // console.log('params', params?.slug);

  const post: Post = await getPost(params?.slug)
  // console.log("headingd",post?.headings)
  if(!post){
    notFound();
  }

  return (
    <div className='mx-auto max-w-5xl px-6 '>
      <Header title={post?.title} />
      <div className='text-center'>
        <span>{new Date(post?.publishedAt).toDateString()}</span>
        <div className='mt-5  space-x-2'>
          {post?.tag?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag?.slug?.current}`} >
              <span className='font-semibold text-sm  border dark:border-gray-900 w-fit p-1  text-purple-700   '>
                #{tag?.name}
              </span>
            </Link>
          ))}
        </div>
        <TOC headings={post?.headings} />
        <div className='text-left py-4 max-w-2xl m-auto  leading-7'>
          <PortableText
            value={post?.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  )
}

export default page


const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => <Image src={urlForImage(value)} alt='Post' height={500} width={700} />,

  },
  block:{
    h2:({value}:any)=>(
      <h2 id={slugify(value?.children[0]?.text)} className='text-3xl font-bold mb-3'>{value?.children[0]?.text}</h2>
    ),
    h3:({value}:any)=>(
      <h3 id={slugify(value?.children[0]?.text)} className='text-2xl font-bold mb-3'>{value?.children[0]?.text}</h3>
    ),
    h4:({value}:any)=>(
      <h4 id={slugify(value?.children[0]?.text)} className='text-2xl font-bold mb-3'>{value?.children[0]?.text}</h4>
    ),
    h5:({value}:any)=>(
      <h5 id={slugify(value?.children[0]?.text)} className='text-2xl font-bold mb-3'>{value?.children[0]?.text}</h5>
    ),
    h6:({value}:any)=>(
      <h6 id={slugify(value?.children[0]?.text)} className='text-xl font-bold mb-3'>{value?.children[0]?.text}</h6>
    ),
  }

}

const TOC = ({ headings }: any) => {
 return ( 
   <div className=' max-w-2xl mx-auto mt-7 text-center border rounded-sm dark:border-purple-950'>
    <h2 className='text-xl font-bold p-2 mb-5 border-b dark:border-purple-950 bg-amber-50 dark:bg-slate-950/20'>Table of Content</h2>
    <nav>
      <ul>
        {headings?.map((heading: any) => (
           
          <li key={heading?._key} className='mb-2'>
            <a href={`#${slugify(heading?.children[0]?.text)}`}>
             {heading?.children[0]?.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
 )
}