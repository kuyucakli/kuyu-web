import { HeroProps } from "../types"
import { SliderMediaItems } from "./SliderMediaItems"
import styles from "/styles/Hero.module.css"

export const Hero = ({ data }: HeroProps): JSX.Element => {
    
    const { layout, media, title, description } = data
    const { classes, wrapperStyle, mediaContainerStyle, contentStyle } = layout
    const { data: mediaItems } = media.items

    return (
        <div className={`${styles.hero} ${styles[classes]}`}>
            <SliderMediaItems items={mediaItems} style={{ ...mediaContainerStyle }} imgSize="raw"/>
            <section style={{...contentStyle}}>
                 <h1>{title}</h1>
                 <p>{description}</p>
            </section>
           
        </div>
    )
}

