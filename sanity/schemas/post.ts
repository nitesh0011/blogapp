import { Rule } from "sanity";

export const Post ={
    name: 'post',
    title: 'Post',
    type: 'document',

    fields:[
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation:(Rule:Rule)=>Rule.required().error("Required")
        },
        {
            name: 'slug',
            title: 'slug',
            type: 'slug',
            options:{source:"title"},
            validation:(Rule:Rule)=>Rule.required().error("Required")
        },
        {
            name: 'publishedAt',
            title: 'Piblished at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        },
        {
            name: 'excerpt',
            title: 'excerpt',
            type: 'text',
            validation:(Rule:Rule)=>Rule.max(300).error("Maximum 300 charcters required")
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of:[
                {type:'block'},
                {
                    type:'image',
                    fields:[{type:'text',name:'alt',title:"alt"}]
                }
            ]
        },
        {
            name: 'tag',
            title: 'Tags',
            type: 'array',
            of:[
                {type:'reference',to:[{type:'tag'}]},
               
            ]
        }

    ]
}