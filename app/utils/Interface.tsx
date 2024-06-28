export interface Post {
    title:string;
    slug:{current:string};
    publishedAt:string;
    excerpt:string;
    body:any;
    tag:Array<Tag>;
    _id:string;
    headings?:Array<HTMLHeadElement | string >;

}

export interface Tag{
    name:string;
    slug:{current:string};
    _id:string;
    postCount?:number;
}


export interface Params{
    params:{
        slug: string;
    }
  }