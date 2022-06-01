import React from "react";
import Link from "next/link";
import { IPost, NavPrevNextPostProps } from "../types";
import { getPostUrl } from "../utils/getPostUrl";
import styles from "../styles/NavPrevNextPost.module.css"


const NavPrevNextPost = ({ ...props }: NavPrevNextPostProps): JSX.Element => {
    const [prevPost, nextPost] = props.posts
    const prevPostUrl = getPostUrl(prevPost)
    const nextPostUrl = getPostUrl(nextPost)

    return (
        <nav className={styles.NavPrevNextPost}>
            <Link href={prevPostUrl}>
                <a>
                    <span className="icon material-symbols-sharp">
                        arrow_left
                    </span>
                </a>
            </Link>
            <Link href={nextPostUrl}>
                <a href="">
                    <span className="icon material-symbols-sharp">
                        arrow_right
                    </span>
                </a>
            </Link>
        </nav>
    )


}


export const getPrevNextPost = ({ ...options }): IPost[] => {
    const { currentPostSlug, categorySlug, posts } = options


    let arr,
        nextIndex,
        prevIndex



    switch (categorySlug) {
        case "illustrasyon":
            arr = posts.illustrationWorks
            break
        case "ui-ux":
            arr = posts.uiuxWorks
            break
        case "blog":
            arr = posts.blogPosts
            break
        default:
            arr = []
    }



    arr.forEach((item: any, i: number) => {
        if (item.attributes.slug === currentPostSlug) {

            prevIndex = i === 0 ? arr.length - 1 : i - 1
            nextIndex = i === arr.length - 1 ? 0 : i + 1
        }
    })


    if (arr && prevIndex !== undefined && nextIndex !== undefined) {
        return [arr[prevIndex], arr[nextIndex]]
    }


    return []

}

export default NavPrevNextPost