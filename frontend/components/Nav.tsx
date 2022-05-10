import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { formatDateForRoute }  from '../utils/date'


interface NavProps {
    illustrationWorks: []
    uiuxWorks: []
    blogPosts: []
}

function Nav({ illustrationWorks, uiuxWorks, blogPosts }: NavProps) {
   
    const [isActive, setIsActive] = useState(false)

    function handleMenuClick() {
        setIsActive(!isActive)
    }

    return (
        <>
            <button className="btn-main-menu" onClick={handleMenuClick}>
                {!isActive
                    ?
                    <>
                        Menü
                        <span>00</span>
                    </>
                    :
                    <>
                        X
                    </>
                }
            </button>

            <div className={`overlay-full-viewport-nav ${isActive ? 'on' : ''}`}>
                <div className="limited-width">
                    <header>00</header>
                    <nav id="main-nav">
                        <h2>Ui tasarımı ve kodlama</h2>
                        <ul>
                            {uiuxWorks.map((item: any, id: number) => (
                                <li key={id}>
                                    <Link href={`/works/${formatDateForRoute(item.attributes.publishedAt)}/${item.attributes.slug}`}>
                                        <a>
                                            <Image alt="" src={`http://127.0.0.1:1337${item.attributes.cover.data.attributes.formats.thumbnail.url}`} width="200" height="200" />
                                        </a>
                                    </Link>
                                    <Link href={`/works/${formatDateForRoute(item.attributes.publishedAt)}/${item.attributes.slug}`}>
                                        {item.attributes.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav>
                        <h2>Çizimler</h2>
                        <ul>
                            {illustrationWorks.map((item: any, id: number) => (
                                <li key={id}>
                                    <Link href={`/works/${formatDateForRoute(item.attributes.publishedAt)}/${item.attributes.slug}`}>
                                        <a onClick={() => setIsActive(false)}>
                                            <Image alt="" src={`http://127.0.0.1:1337${item.attributes.cover.data.attributes.formats.thumbnail.url}`} width="200" height="200" />
                                        </a>
                                    </Link>
                                    <Link href={`/works/${formatDateForRoute(item.attributes.publishedAt)}/${item.attributes.slug}`}>
                                        {item.attributes.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav>
                        <h2>Blog</h2>
                        <ul>
                            {blogPosts.map((item: any, id: number) => (
                                <li key={id}>
                                    <Link href={`/blog/${formatDateForRoute(item.attributes.publishedAt)}/${item.attributes.slug}`}>
                                        <a>
                                            <Image alt="" src={`http://127.0.0.1:1337${item.attributes.cover.data.attributes.formats.thumbnail.url}`} width="200" height="200" />
                                        </a>
                                    </Link>
                                    <Link href={`/blog/${formatDateForRoute(item.attributes.publishedAt)}/${item.attributes.slug}`}>
                                        {item.attributes.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    Ï
                </div>
            </div>
        </>

    )
}



export const getNavData = async () => {

    const resIllustrationsWorks = await fetch(`${process.env.BASE_URL_STRAPI_API}/works?filters[category][slug]=illustrasyon&fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=publishedAt&populate[cover][fields][0]=formats`)
    const dataIllustrationWorks = await resIllustrationsWorks.json()

    const resUiUxWorks = await fetch(`${process.env.BASE_URL_STRAPI_API}/works?filters[category][slug]=ui-ux-tasarimi-ve-kodlama&fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=publishedAt&populate[cover][fields][0]=formats`)
    const dataUiUxWorks = await resUiUxWorks.json()

    const resBlogPosts = await fetch(`${process.env.BASE_URL_STRAPI_API}/blog-posts?fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=publishedAt&populate[cover][fields][0]=formats`)
    const dataBlogPosts = await resBlogPosts.json()



    return {
        illustrationWorks:dataIllustrationWorks.data,
        uiuxWorks:dataUiUxWorks.data,
        blogPosts:dataBlogPosts.data
    }

}

export default Nav;