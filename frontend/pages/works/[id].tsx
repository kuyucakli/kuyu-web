import { useRouter } from 'next/router'
import { getNavData } from '../../components/Nav'

function Post({ post }: any) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div>Hi I am  work!</div>
    )

}

export async function getStaticPaths() {

    const res = await fetch(`${process.env.BASE_URL_STRAPI_API}/works`)
    const posts = await res.json()

    const paths = posts.data.map((post: any) => ({
        params: { id: `${post.attributes.id}` },
    }))

    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {

    const res = await fetch(`${process.env.BASE_URL_STRAPI_API}/works/${params.id}`)
    const post = await res.json()

    const mainNavData = await getNavData()

    return {
        props: {
            post,
           ...mainNavData,
        }
    }
}

export default Post