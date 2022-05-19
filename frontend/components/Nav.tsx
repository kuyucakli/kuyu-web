
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDateForRoute } from '../utils/date'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Grid } from "swiper"
import 'swiper/css/grid';
import 'swiper/css'
import Cursor from './CustomCursor'
import {NavCategoricalList, NavSection, NavProps} from '../types'


export default function Nav({  navIndex, posts }: NavProps): JSX.Element {
  
    const [isActive, setIsActive] = useState(false)
    const [mouseUpTarget, setMouseUpTarget] = useState<null | Element>(null)
    const [mouseDownTarget, setMouseDownTarget] = useState<null | Element>()
    const [customCursor, setCustomCursor] = useState(false)

    const handleMouseDown = (e: React.MouseEvent) => {
        const targetEl = e.target as Element
        setMouseUpTarget(targetEl)
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        const targetEl = e.target as Element
        setMouseDownTarget(targetEl)
    }

    const handleMouseEnter = () => {
        setCustomCursor(true)
    }

    const handleMouseLeave = () => {
        setCustomCursor(false)
    }

    function handleMenuClick() {
        setIsActive(!isActive)
    }

    const handleClickOutside = (e: React.MouseEvent) => {

        const targetEl = e.target as Element

        if (mouseUpTarget !== mouseDownTarget) {
            return false
        }
        if (!targetEl.closest('#main-nav > div')) {
            setIsActive(false)
        }

    }

    return (
        <>
            {customCursor
                ? <Cursor />
                : ''
            }
            <button className={`btn-main-nav ${isActive ? 'on' : ''}`} onClick={handleMenuClick}>

                {isActive
                    ?
                    <span className="icon material-symbols-sharp">
                        close
                    </span>
                    :
                    <span className="t-4 page-index">0{`${navIndex}`}</span>
                }
                
                <strong className="t-6">menü</strong>
            </button>


            <div
                id="main-nav"
                className={`${isActive ? 'on' : ''}`}
                onClick={handleClickOutside}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <div>
                    <nav>
                        <h2 className="t-6"><span className="t-4 t-bld">01</span> Ui tasarımı ve kodlama</h2>
                        <NavSection
                            items={posts.uiuxWorks}
                            linkBaseUrl="/works"
                            slidesPerView={1}
                            showCustomCursor={handleMouseEnter}
                            hideCustomCursor={handleMouseLeave}
                            handleMenuClose={handleMenuClick}
                        />
                    </nav>
                    <nav>
                        <h2><span className="t-4 t-bld">02</span> Çizimler</h2>
                        <NavSection
                            items={posts.illustrationWorks}
                            linkBaseUrl="/works"
                            slidesPerView={3}
                            lgDirection={"horizontal"}
                            showCustomCursor={handleMouseEnter}
                            hideCustomCursor={handleMouseLeave}
                            showCaption={false}
                            handleMenuClose={handleMenuClick}
                        />
                    </nav>
                    <nav>
                        <h2><span className="t-4 t-bld">03</span> Blog</h2>
                        <NavSection
                            items={posts.blogPosts}
                            linkBaseUrl="/blog"
                            slidesPerView={1}
                            showCustomCursor={handleMouseEnter}
                            hideCustomCursor={handleMouseLeave}
                            handleMenuClose={handleMenuClick}
                        />
                    </nav>

                </div>
            </div>


        </>

    )
}





const NavSection = (
    {
        items,
        linkBaseUrl,
        slidesPerView = 1,
        showCustomCursor,
        hideCustomCursor,
        handleMenuClose,
        showCaption = true,
        lgDirection = "vertical"
    }: NavSection

): JSX.Element => {

    return (
        <Swiper
            spaceBetween={16}
            slidesPerView={slidesPerView}
            mousewheel={false}
            touchStartPreventDefault={false}
            modules={[Grid]}
            breakpoints={{
                768: {
                    direction: lgDirection,
                    spaceBetween: 0
                },

            }}
        >
            {items && items.map((item: any, id: number) => (
                <SwiperSlide key={id}>
                    <figure onMouseEnter={showCustomCursor} onMouseLeave={hideCustomCursor}>
                        <Link href={`${linkBaseUrl}/${formatDateForRoute(item.attributes.publishedAt)}/${item.attributes.slug}`}>
                            <a onClick={handleMenuClose}>
                                <Image alt="" src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.attributes.cover.data.attributes.formats.medium.url}`} layout="fill" />
                            </a>
                        </Link>
                        {showCaption &&
                            <figcaption className="t-3 t-mdm">
                                <Link href={`${linkBaseUrl}/${formatDateForRoute(item.attributes.publishedAt)}/${item.attributes.slug}`}>
                                    {item.attributes.title}
                                </Link>
                            </figcaption>
                        }
                    </figure>
                </SwiperSlide>
            ))}
        </Swiper>

    )

}



export const getNavData = async (): Promise<NavCategoricalList> => {

    const resIllustrationsWorks = await fetch(`${process.env.BASE_URL_STRAPI_API}/works?filters[category][slug]=illustrasyon&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[cover][fields][0]=formats`)
    const dataIllustrationWorks = await resIllustrationsWorks.json()

    const resUiUxWorks = await fetch(`${process.env.BASE_URL_STRAPI_API}/works?filters[category][slug]=ui-ux-tasarimi-ve-kodlama&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[cover][fields][0]=formats`)
    const dataUiUxWorks = await resUiUxWorks.json()

    const resBlogPosts = await fetch(`${process.env.BASE_URL_STRAPI_API}/blog-posts?fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[cover][fields][0]=formats`)
    const dataBlogPosts = await resBlogPosts.json()

    return {
        illustrationWorks: dataIllustrationWorks.data,
        uiuxWorks: dataUiUxWorks.data,
        blogPosts: dataBlogPosts.data
    }

}

