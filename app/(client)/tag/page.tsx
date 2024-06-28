import Header from '@/app/_components/Header';
import { Tag } from '@/app/utils/Interface';
import { client } from '@/sanity/lib/client'
import Link from 'next/link';
import React from 'react'


async function getAllTags(){
    const query = `
    *[_type == 'tag'] {
     _id,
     slug,
     name,
    "postCount":count(*[_type == 'post' && references("tags",^._id) ])
}
    `
    const data =await client.fetch(query);
    return data;
}



export const revalidate = 60;




const page = async () => {
    const tags: Tag[] = await getAllTags();
    // console.log("tags", tags);
    return (
      <div className="mx-auto max-w-5xl px-6 ">
        <Header title='Tags'/>
        <div>
        {tags?.length > 0 && tags.map((tag) => (
          <Link key={tag?._id} href={`tag/${tag?.slug?.current}`}>
            <div className='  mb-2 p-2 font-bold text-sm lowercase dark:bg-gray-950  border dark:border-gray-950 hover:text-purple-500'>
                #{tag?.name} {`( ${tag?.postCount} )`}
            </div>
          </Link>
        ))}
        </div>
      </div>
    )
}
  
export default page;
