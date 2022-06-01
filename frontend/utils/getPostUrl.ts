import { IPost } from "../types"
import { formatDateForRoute } from "./date"

export const getPostUrl= (post:IPost):string => {

    const {publishedAt, slug, category} = post.attributes
    const categorySlug = category.data.attributes.slug
    let base = ''

    

    switch(categorySlug){
        case 'blog':
            base = '/blog'
            break
        default:
            base = '/works'
    }
    
    const url = `${base}/${formatDateForRoute(publishedAt)}/${slug}`

    return url
}