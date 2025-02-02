import { client } from "@/sanity/lib/client"
import Header from "../_components/Header";
import { Post } from "../utils/Interface";
import PostComponent from "../_components/PostComponent";

async function getPosts() {
  const query = `
  *[_type == 'post'] {
   title,
   slug,
   publishedAt,
   excerpt,
   _id,
   tag[]->{
     _id,
     slug,
     name
   }
}
  `
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function Home() {
  const posts: Post[] = await getPosts();


  return (
    <main className="mx-auto max-w-5xl px-6 ">
      <Header title="ARTICLES " />
      <div >
        {posts?.length > 0 && posts.map((post) => (
          <PostComponent key={post?._id} post={post} />
        ))}
      </div>
    </main>
  );
}
