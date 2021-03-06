import {
    createClient,
    createPreviewSubscriptionHook,
    createPortableTextComponent
} from "next-sanity"

import {
    createImageUrlBuilder
} from "@sanity/image-url"

const config = {
    projectId: "sidgy3mh",
    dataset: "production",
    apiVersion: "2022-03-30",
    useCdn: false
}

export const sanityClient = createClient(config)

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const PortableText = createPortableTextComponent({
    ...config,
    serializers: {},
})