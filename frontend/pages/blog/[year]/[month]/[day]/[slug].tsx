import { useRouter } from 'next/router'
import { getNavData } from '../../../../../components/Nav'
import { getYearMonthDay }  from '../../../../../utils/date'

function Post({ post }: any) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div>{post[0].attributes.title}</div>
    )

}

export async function getStaticPaths() {

    const res = await fetch(`${process.env.BASE_URL_STRAPI_API}/blog-posts`)
    const posts = await res.json()

    const paths = posts.data.map((item: any) => {
        
        const publishedAt = getYearMonthDay(item.attributes.publishedAt)
        
        return {
            params: { 
                year:publishedAt.year, 
                month:publishedAt.month, 
                day:publishedAt.day, 
                slug: `${item.attributes.slug}`,
            },
        }
    })

    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
    
    const res = await fetch(`${process.env.BASE_URL_STRAPI_API}/blog-posts?filters[slug]=${params.slug}`)
    const post = await res.json()

    const mainNavData = await getNavData()

    return {
        props: {
            post: post.data,
            ...mainNavData,
        }
    }
}

export default Post