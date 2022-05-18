import { IMediaItems, IMediaItem } from "../types"
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSwiper } from 'swiper/react';

export const SliderMediaItems = ({ items, style }: IMediaItems): JSX.Element => {
    
    return (
        <div style={{ ...style }} >
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


function SlideButton() {
    const swiper = useSwiper();

    return (
        <>
            <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
            <button onClick={() => swiper.slidePrev()}>Slide to the prev slide</button>
        </>
    );
}


export const MediaItem = (props: IMediaItem): JSX.Element => {
    const {style} = props
    const { formats, caption, alternativeText } = props.attributes
    const { url, width, height } = formats.large

    return (
        <figure style={style}>
            <Image alt={alternativeText} src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${url}`} width={width}
                height={height} layout="raw"
            />
            <figcaption>{caption}</figcaption>
        </figure>
    )
}