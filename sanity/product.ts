import { defineField } from "sanity";

export const product = {
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        {
            name: "title",
            title: "Product Title",
            type: "string"
        },
        {
            name: 'type',
            title: "Type",
            type: "string"
        },
        {
            name: 'price',
            title: 'Product Price',
            type: 'number'
        },
        {
            name: "image",
            title: "Image",
            type: "image"
        },
        defineField({
            name: 'category',
            title: "Product Category",
            type: 'reference',
            to: [
                {
                    type: 'category'
                },
            ]
        })
    ]
}