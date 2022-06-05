import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Keyboard, Mousewheel } from "swiper"
import 'swiper/css/grid';
import 'swiper/css'
import { NavCategoricalList, NavSection, NavProps, IPost } from '../types'
import { useSwiper } from 'swiper/react'
import { getYearMonthDay } from '../utils/date'
import useLockedBody from '../hooks/useLockedBody'
import useOnClickOutside from '../hooks/useOnClickOutside'
import styles from "/styles/MainNav.module.css"
import { getPostUrl } from '../utils/getPostUrl'

export default function Nav({ navIndex, posts }: NavProps): JSX.Element {

    const [isActive, setIsActive] = useState(false)
    const refSwiper = useRef(null) as any
    const refBtnClose = useRef(null)
    const refMainNav = useRef(null) as any
    const [bodyScrolLocked, setLocked] = useLockedBody()


    function handleMenuToggle(e: any) {
        // refSwiper.current.slideTo(0, 0);
        setLocked(!bodyScrolLocked)
        setIsActive(!isActive)
    }

    useOnClickOutside(refSwiper, handleMenuToggle, refMainNav, refBtnClose)

    return (
        <>
            <button ref={refBtnClose} className={`btn-main-nav ${isActive ? 'on' : ''}`} onClick={handleMenuToggle}>
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
                ref={refMainNav}
                className={`${styles['main-nav']} ${isActive ? styles.on : ''}`}
            >
                <Swiper
                    preventInteractionOnTransition={true}
                    onInit={(core: SwiperCore) => {
                        refSwiper.current = core.el;
                    }}
                    loop={true}
                    spaceBetween={32}
                    loopedSlides={3}
                    slidesPerView={"auto"}
                    loopPreventsSlide={true}
                    mousewheel={{
                        forceToAxis: true,
                        releaseOnEdges: true
                    }}
                    keyboard={{
                        enabled: true,
                      }}

                    modules={[Mousewheel, Keyboard]}
                    direction="vertical"
                    className={styles['outer-swiper']}
                    edgeSwipeDetection={'prevent'}
                    breakpoints={{
                        768: {
                            direction: 'horizontal',
                            spaceBetween: 16,
                            shortSwipes:false

                        },

                    }}
                >
                    <SwiperSlide>
                        <NavSection
                            items={posts.uiuxWorks}
                            slidesPerViewSm={1.1}
                            slidesPerViewLg={1}
                            handleMenuToggle={handleMenuToggle}
                            categoryTitle="01 Ui-Ux"
                            className={styles['section-ui-ux']}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NavSection
                            items={posts.illustrationWorks}
                            slidesPerViewSm={2.2}
                            slidesPerViewLg={1}
                            lgDirection={"vertical"}
                            handleMenuToggle={handleMenuToggle}
                            categoryTitle="02 Çizim"
                            className={styles['section-drawings']}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NavSection
                            items={posts.blogPosts}
                            slidesPerViewSm={1.1}
                            slidesPerViewLg={1}
                            handleMenuToggle={handleMenuToggle}
                            categoryTitle="03 Blog"
                            className={styles['section-blog']}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}



const NavSection = (
    {
        items,
        slidesPerViewSm = 1,
        slidesPerViewLg = 1,
        handleMenuToggle,
        showCaption = true,
        lgDirection = "vertical",
        categoryTitle = "",
        className = ""
    }: NavSection

): JSX.Element => {

    return (
        <nav className={className}>
            <h2 className="t-4 lg-t-4 t-bld">{categoryTitle}</h2>
            <Swiper
                preventInteractionOnTransition={true}
                className={styles['inner-swiper']}
                spaceBetween={16}
                slidesPerView={slidesPerViewSm}
                mousewheel={false}
                touchStartPreventDefault={false}
                breakpoints={{
                    768: {
                        direction: lgDirection,
                        spaceBetween: 8,
                        slidesPerView: slidesPerViewLg,
                    },

                }}
            >
                <SlideDirectionalButtons />
                
                {items && items.map((item: IPost, id: number) => (
                    <SwiperSlide key={id}>
                        <figure>
                            <Link href={getPostUrl(item)}>
                                <a onClick={handleMenuToggle}>
                                    <Image alt="" src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.attributes.cover.data.attributes.formats.large.url}`} layout="fill" />
                                </a>
                            </Link>
                            {showCaption &&
                                <Figcaption url={getPostUrl(item)} item={item} onLinkClick={handleMenuToggle}/>
                            }
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>
        </nav>
    )

}

const Figcaption = ({ url, item, onLinkClick }: any) => {
    const { title, tags, seo, slug } = item.attributes
    const { month, year } = getYearMonthDay(item.attributes.beginDate)
   
    const tagsArr = tags.data.map((item: any) => item.attributes.name)
    const tagsStr = tagsArr.join(', ')
    const metaInfo = `${month} ${year}`

    return (
        <figcaption>
            <Link href={url}>
                <a className="t-5 t-mdm" onClick={onLinkClick}>{title}</a>
            </Link>
            <p>
                <span className="t-7 mata-info">{metaInfo}</span>
                <span> - </span>
                <span className="t-7 tags" >{tagsStr}</span>
            </p>
            <p className="t-6 meta-descr">{seo.metaDescription}</p>
        </figcaption>

    )


}

function SlideDirectionalButtons() {
    const swiper = useSwiper();
    const [isBeg, setBeg] = useState(true)

    useEffect(() => {

    }, [isBeg])

    return (
        <div className="wrapper-slide-directional-buttons">
            <button disabled={swiper.isBeginning ? true : false} onClick={(e) => {
                setBeg(!isBeg)
                swiper.slidePrev()

            }} type="button" className="btn-next-item">
                <span className="icon material-symbols-sharp">
                    arrow_upward
                </span>
            </button>
            <button disabled={swiper.isEnd ? true : false} onClick={(e) => {
                setBeg(!isBeg)
                swiper.slideNext()


            }} type="button" className="btn-next-item">
                <span className="icon material-symbols-sharp">
                    arrow_downward
                </span>
            </button>

        </div>


    )
}



export const getNavData = async (): Promise<NavCategoricalList> => {

    const resIllustrationsWorks = await fetch(`${process.env.BASE_URL_STRAPI_API}/works?filters[category][slug]=illustrasyon&fields[0]=title&fields[1]=slug&fields[2]=publishedAt,beginDate&populate[cover][fields][0]=formats&populate[seo][fields][0]=metaDescription&populate[tags][fields][0]=name&populate=category`)
    const dataIllustrationWorks = await resIllustrationsWorks.json()

    const resUiUxWorks = await fetch(`${process.env.BASE_URL_STRAPI_API}/works?filters[category][slug]=ui-ux&fields[0]=title&fields[1]=slug&fields[2]=publishedAt,beginDate&populate[cover][fields][0]=formats&populate[seo][fields][0]=metaDescription&populate[tags][fields][0]=name&populate=category`)
    const dataUiUxWorks = await resUiUxWorks.json()

    const resBlogPosts = await fetch(`${process.env.BASE_URL_STRAPI_API}/blog-posts?fields[0]=title&fields[1]=slug&fields[2]=publishedAt&fields[2]=publishedAt,beginDate&populate[cover][fields][0]=formats&populate[seo][fields][0]=metaDescription&populate[tags][fields][0]=name&populate=category`)
    const dataBlogPosts = await resBlogPosts.json()

    return {
        illustrationWorks: dataIllustrationWorks.data,
        uiuxWorks: dataUiUxWorks.data,
        blogPosts: dataBlogPosts.data
    }

}

