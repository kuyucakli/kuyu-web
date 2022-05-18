import styles from "/styles/Card.module.css"

import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useSwiper } from 'swiper/react';

function SlideButton() {
    const swiper = useSwiper();

    return (
        <>
            <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
            <button onClick={() => swiper.slidePrev()}>Slide to the prev slide</button>
        </>
    );
}


export interface ICardData {
    data: {
        layout: {
            classes: string,
            wrapperStyle: { [key: string]: string },
            mediaContainerStyle: { [key: string]: string },
            titleStyle: { [key: string]: string },
            contentStyle: { [key: string]: string },
        }
        content: {
            title: string,
            description: any
        }
        media: {
            items: {
                data: IMediaItem[]
            }
        }
    }
}

interface IMediaItem {
    id: number
    style: {}
    attributes: {
        caption: string
        alternativeText: string
        formats: {
            thumbnail: {
                url: string
            },
            large: {
                url: string,
                width: number,
                height: number
            }
        }
    }
}

export const Card = ({ data }: ICardData): JSX.Element => {

    const { layout, content, media } = data
    const { title, description } = content
    const { classes, wrapperStyle, mediaContainerStyle, contentStyle, titleStyle } = layout
    const { data: mediaItems } = media.items

    return (
        <section style={{ ...wrapperStyle }} className={`${classes} ${styles.card}`}>

            <MediaItems items={mediaItems} style={mediaContainerStyle} />

            <h1 style={{ ...titleStyle }}>
                {title}
            </h1>

            <div style={{ ...contentStyle }}>
                <ReactMarkdown>
                    {description}
                </ReactMarkdown>
            </div>

        </section>
    )
}

interface IMediaItems {
    items: IMediaItem[]
    style: object
}


const MediaItems = ({ items, style }: IMediaItems): JSX.Element => {

    return (
        <div style={{ ...style }} className={styles.media}>
            {
                items.length > 1 ?
                    (
                        <Swiper
                            autoHeight={true}
                        >
                            <SlideButton />
                            {
                                items.map((item: IMediaItem, i) =>
                                    <SwiperSlide key={item.id}>
                                        <MediaItem  {...item} />
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                    )
                    :
                    <MediaItem  {...items[0]} />

            }

        </div>
    )
}


const MediaItem = (props: IMediaItem): JSX.Element => {
    const style = props.style
    const { formats, caption, alternativeText } = props.attributes
    const { url, width, height } = formats.large
    return (
        <figure style={style}>
            <Image alt={alternativeText} src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${url}`} width={width}
                height={height}
            />
            <figcaption>{caption}</figcaption>
        </figure>
    )
}