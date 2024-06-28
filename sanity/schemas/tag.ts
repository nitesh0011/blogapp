import { defineType } from "sanity";

export const tag = defineType({
    name: 'tag',
    title: 'Tag',
    type: 'document',
    
    fields:[
        {
            name: 'name',
            title: 'Tag Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'slug',
            type: 'slug',
            options:{
                source:'name'
            }
        }
    ]

})