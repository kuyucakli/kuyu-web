import { HeroProps } from "../types"
import { SliderMediaItems } from "./SliderMediaItems"
import styles from "/styles/Hero.module.css"

export const Hero = ({ data }: HeroProps): JSX.Element => {
    
    const { layout, media, title } = data
    const { classes, wrapperStyle, mediaContainerStyle, titleStyle } = layout
    const { data: mediaItems } = media.items

    return (
        <section className={styles.hero}>
            <SliderMediaItems items={mediaItems} style={{ ...mediaContainerStyle }} mediaSize={{ layout: 'fill', objectFit: 'cover' }} />
            <h1>{title}</h1>
        </section>
    )
}

