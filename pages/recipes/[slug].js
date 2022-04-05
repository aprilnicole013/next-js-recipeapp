//dynamic route: recipes/(insert recipe here) you can use this data for queries. dont need a route for each recipe.
import { useState } from 'react';
import {
    sanityClient,
    urlFor,
    usePreviewSubscription,
    PortableText
} from "../../lib/sanity"

const recipeQuery = `*[_type== "recipe" && slug.current == $slug[0]]{
    _id,
    name,
    slug,
    mainImage,
    ingredient[]{
        _key,
        unit,
        wholeNumber,
        fraction,
        ingredient->{
            name
        }
    },
    instructions,
    likes
}`

export default function OneRecipe({data, preview}){
    const { data: recipe } = usePreviewSubscription(recipeQuery, {
        params: { slug: data.recipe?.slug.current},
        initialData: data,
        enabled: preview,
    })
    
    const [ likes, setLikes ] = useState(data?.recipe?.likes)
    
    const addLikes = async () => {
        const res = await fetch("/api/handle-like", {
            method: "POST",
            body: JSON.stringify({ _id: recipe._id })
        }).catch((error) => console.log(error))

        const data = await res.json()

        setLikes(data.likes)
    }

    return (
        <article className="recipe">
            <h1>
                {recipe.name}
            </h1>
            <button className="like-button" onClick={addLikes}>
                {likes} ❤️
            </button>
            <main className="content">
                <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name}/>
                <div className="breakdown">
                    <ul className="ingredients">
                        {recipe.ingredient?.map((ingredient) => (
                            <li key={ingredient._key} className="ingredient">
                                {ingredient?.wholeNumber}
                                {ingredient?.fraction}
                                {" "}
                                {ingredient?.unit}
                                <br/>
                                {ingredient?.ingredient.name}
                            </li>
                        ))}
                        
                    </ul>
                    <PortableText block={recipe?.instructions} className="instructions"/>
                </div>
            </main>
        </article>
    )

}

//pulls path from the content, data structure is created 
//knwing the address of every house in neighborhhood. paths to all houses
export async function getStaticPaths(){
    const paths = await sanityClient.fetch(
        `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
    )
    return {
        paths,
        //always use true fallback so all paths are requested. if set to false, will result in a 404 error
        fallback: true,
    }
}

//passed groq query into statc props. 
//knowing the people in each house of the neighborhood and what they ate for breakfast. data and content within each house
//groq params are passed as 2nd argument in function. matches slug query in recipeQuery
export async function getStaticProps({ params }){
    const { slug } = params;
    const recipe = await sanityClient.fetch(recipeQuery, {slug})

    return { props: { data: { recipe }, previewIsTrue } }
}