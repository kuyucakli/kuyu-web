import { IMediaItems, IMediaItem } from "../types"
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSwiper } from 'swiper/react';

export const SliderMediaItems = ({ items, style, imgSize='medium' }: IMediaItems): JSX.Element => {
    
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
                                        <MediaItem  {...item} imgSize={imgSize}/>
                                    </SwiperSlide>
                                )
                            }

                        </Swiper>
                    )
                    :
                    <MediaItem  {...items[0]} imgSize={imgSize}/>

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
    const {style, imgSize} = props
    const { formats, caption, alternativeText  } = props.attributes
    var { url, width, height } = props.attributes // get raw file data
   
    if( formats && imgSize !== 'raw' ){
        var {url, width, height} = formats[imgSize]
      
    }

    return (
        <figure style={style}>
            <Image alt={alternativeText} src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${url}`} width={width || 500}
                height={height || 500} layout="raw"
            />
            <figcaption>{caption}</figcaption>
        </figure>
    )
}