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
    mainImage{
        asset->{
            _id,
            url
        }
    },
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

export async function getStaticPaths(){

}

export async function getStaticProps(){

}