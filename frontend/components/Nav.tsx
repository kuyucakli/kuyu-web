import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'


interface NavProps {
    works: [];
    blogPosts: [];
    places: [];
}

function Nav({ works, blogPosts, places }: NavProps) {
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

            <div className={`overlay-full-viewport ${isActive ? 'on' : ''}`}>
                <div className="limited-width">

                    <header>00</header>
                    <nav>
                        <ul>
                            {works.map((work: any, id: number) => (
                                <li key={id}>
                                    <Image alt="" src={`http://127.0.0.1:1337${work.attributes.cover.data.attributes.formats.thumbnail.url}`} width="500" height="500" />
                                     <Link href={`/works/${work.attributes.id}`}>
                                    {work.attributes.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {blogPosts.map((blogPost: any, id: number) => (
                                <li key={id}>{blogPost.attributes.title}</li>
                            ))}
                        </ul>
                        <ul>
                            {places.map((place: any, id: number) => (
                                <li key={id}>{place.attributes.title}</li>
                            ))}
                        </ul>
                        <ul>
                            <li>
                                <Link href="/works">
                                    <a>İşler</a>
                                </Link>
                            </li>
                           
                        </ul>
                    </nav>
                </div>
            </div>
        </>

    )
}



export const getNavData = async() => {

    const resWorks = await fetch(`${process.env.BASE_URL_STRAPI_API}/works?fields[0]=title&fields[1]=slug&fields[2]=description&populate[cover][fields][0]=formats`)
    const dataWorks = await resWorks.json()

    const resBlogPosts = await fetch(`${process.env.BASE_URL_STRAPI_API}/blog-posts`)
    const dataBlogPosts = await resBlogPosts.json()

    const resPlaces = await fetch(`${process.env.BASE_URL_STRAPI_API}/places`)
    const dataPlaces = await resPlaces.json()

    return { 
        places:dataPlaces.data,
        works:dataWorks.data,
        blogPosts:dataBlogPosts.data,
    }

}

export default Nav;