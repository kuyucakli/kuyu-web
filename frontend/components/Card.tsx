import { ICardData, ICardListData } from "../types"
import styles from "/styles/Card.module.css"
import ReactMarkdown from 'react-markdown'
import 'swiper/css'

import { SliderMediaItems } from "./SliderMediaItems";


export const Card = ({ layout, media, title, description }: ICardData): JSX.Element => {

    const { classes, wrapperStyle, mediaContainerStyle, contentStyle, titleStyle } = layout
    const { data: mediaItems } = media

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

export const CardGroup = ({ data }: ICardListData) => {

    const { title, cards } = data

    return (
        <section className={`${styles['card-group']} limited-width`}>
            <h1 className="t-3 t-mdm t-lh-3">{title}</h1>
            {
                cards &&
                cards.map( (item, i) => {
                    return <Card key={i} {...item}  />
                })
            }

        </section>
    )
}

