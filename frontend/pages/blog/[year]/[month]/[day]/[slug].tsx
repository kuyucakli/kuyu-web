import { useRouter } from 'next/router'
import { getNavData } from '../../../../../components/Nav'
import { getYearMonthDay } from '../../../../../utils/date'
import { Card } from '../../../../../components/Card'
import { Hero } from '../../../../../components/Hero'
import { StaticDetailPageOutProps, StaticDetailPageParams, StaticDetailPagePaths, StaticDetailPageProps } from '../../../../../types'

function Post({ post }: any) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <>
        {
            post.blocks.map((block: any, i: number) => {

                const type = block['__component']

                if (type === 'block.card') {
                    return <Card key={i} data={block} />
                } else if (type === 'block.hero') {
                    return <Hero key={i} data={block} />
                }


            })
        }
    </>
    )

}

export async function getStaticPaths(): Promise<StaticDetailPagePaths> {

    const res = await fetch(`${process.env.BASE_URL_STRAPI_API}/blog-posts`)
    const posts = await res.json()

    const paths = posts.data.map((item: any) => {

        const publishedAt = getYearMonthDay(item.attributes.publishedAt)

        return {
            params: {
                year: publishedAt.year,
                month: publishedAt.month,
                day: publishedAt.day,
                slug: `${item.attributes.slug}`,
            },
        }
    })

    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }:StaticDetailPageParams): Promise<StaticDetailPageOutProps> {

    const res = await fetch(`${process.env.BASE_URL_STRAPI_API}/blog-posts?filters[slug]=${params.slug}&populate[0]=category&populate[1]=blocks.content,blocks.media&populate[2]=seo&populate[3]=pageTemplateSettings`)
    const post = await res.json()
    const postData = post.data[0]
    const seoData = postData.attributes.seo
    const navIndex = 3;
    const posts = await getNavData()

    return {
        props: {
            post: postData.attributes,
            posts: posts,
            seoData,
            navIndex,
        }
    }
}

export default Post