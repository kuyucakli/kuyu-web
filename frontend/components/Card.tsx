import { ICardData } from "../types"
import styles from "/styles/Card.module.css"
import ReactMarkdown from 'react-markdown'
import 'swiper/css'

import { SliderMediaItems } from "./SliderMediaItems";


export const Card = ({ data }: ICardData): JSX.Element => {

    const { layout, content, media } = data
    const { title, description } = content
    const { classes, wrapperStyle, mediaContainerStyle, contentStyle, titleStyle } = layout
    const { data: mediaItems } = media.items

    return (
        <section style={{ ...wrapperStyle }} className={`${classes} ${styles.card}`}>
            {
                mediaItems && <SliderMediaItems items={mediaItems} style={mediaContainerStyle} />
            }
            
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
