export default {
    name: "ingredient",
    title: "Indgredient",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Ingregient Name",
            type: "string"
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            option: {
                hotspot: true,
            }
        },
        {
            name: "notes",
            title: "Notes",
            type: "text",
        },
    ]
}