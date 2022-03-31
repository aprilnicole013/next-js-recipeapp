//dynamic route: recipes/(insert recipe here) you can use this data for queries. dont need a route for each recipe.
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
        unit,
        wholeNumber,
        fraction,
        ingredient->{
            name
        }
    },
    instructions
}`

export default function OneRecipe(){

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

    return { props: { data: { recipe } } }
}