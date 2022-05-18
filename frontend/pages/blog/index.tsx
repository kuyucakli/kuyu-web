import type { NextPage } from 'next'
import { getNavData } from '../../components/Nav'




const Blog: NextPage = () => {

    return (

        <h1>hi Blog</h1>
    )
}

export default Blog


export async function getStaticProps() {
    
    const mainNavData = await getNavData();

    return {
        props: {
            ...mainNavData
        },
    }
}



