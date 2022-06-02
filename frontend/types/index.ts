export interface IPost {
    id: number
    attributes: {
        title: string
        slug: string
        beginDate: string
        publishedAt: string
        updatedAt: string
        category: {
            data: {
                id: number
                attributes: {
                    title: string
                    slug: string
                }
            }
        }
        blocks: []
        seo: {}
        pageTemplateSettings: {
            zeroTopSpace: boolean
            logoColor: string
            uiThemeAmbientColor: string
        }
        cover: {

            data: IMediaBackend

        }
        places?: {
            data: IPlace[]
        }
    }

}

export interface IPlace {
    id: number
    attributes: {
        title: string
        slug: string
        description: string
        cover: { data: IMediaBackend }
        media: {}
        location: location
    }

}

export interface PlacesProps {
    data: IPlace[]
    mapLayout:{ 
        classes: string,
        wrapperStyle: { [key: string]: string }
        mapStyle:{[key: string]: string}
    }
}


type location = {
    lat: number
    lng: number
}


export interface NavProps {
    posts: NavCategoricalList
    navIndex?: number
}

export interface NavCategoricalList {
    illustrationWorks: IPost[]
    uiuxWorks: IPost[]
    blogPosts: IPost[]
}


export interface NavSection {
    items: IPost[]
    slidesPerViewSm: number
    slidesPerViewLg: number
    showCaption?: boolean
    lgDirection?: 'vertical' | 'horizontal'
    handleMenuToggle: React.MouseEventHandler
    categoryTitle: string
    className?: string
}

export interface NavPrevNextPostProps {
    posts: [IPost, IPost]
}



export interface SeoProps {

    metaTitle: string
    metaDescription: string
    cannonicalURL?: string
    metaImage: string
    keywords?: string
    preventIndexing?: boolean

}


export interface Layout {
    children: React.ReactNode
    posts: NavCategoricalList
    post: IPost
    backgroundImage: string
    navIndex?: number
    seoData: SeoProps
}


export interface StaticDetailPageParams {
    params: {
        year: string
        month: string
        day: string
        slug: string
    }
}


export interface StaticDetailPageProps {
    post: IPost
    prevNextPosts: [IPost, IPost]
}

export interface StaticDetailPageOutProps {
    props: {
        post: IPost
        posts: NavCategoricalList
        seoData: {}
        navIndex: number
        prevNextPosts: IPost[]
    }
}

export interface StaticDetailPagePaths {
    paths: StaticDetailPageParams
    fallback: boolean
}



export interface HeroProps {
    data: {
        layout: {
            classes: string,
            wrapperStyle: { [key: string]: string },
            mediaContainerStyle: { [key: string]: string },
            contentStyle: { [key: string]: string },
        }
        title: string,
        description: string,
        media: {
            items: {
                data: IMediaItem[]
            }
        }
    }

}

/* --- Media --- */

export interface IMediaItems {
    items: IMediaItem[]
    style?: object
    imgSize?: 'large' | 'medium' | 'small' | 'raw'
}



interface IMediaFrontendExtra {
    style?: {}
    imgSize: 'large' | 'medium' | 'small' | 'raw'
}

interface IMediaBackend {
    id: number
    attributes: {
        caption: string
        alternativeText: string
        url: string
        width: number
        height: number
        formats: {
            thumbnail: {
                url: string
                width: number
                height: number
            },
            small: {
                url: string,
                width: number,
                height: number
            },
            medium: {
                url: string,
                width: number,
                height: number
            },
            large: {
                url: string,
                width: number,
                height: number
            }
        }
    }
}

export type IMediaItem = IMediaFrontendExtra & IMediaBackend


/* --- Card --- */


export interface ICardData {
    __component: string
    layout: {
        classes: string,
        wrapperStyle: { [key: string]: string },
        mediaContainerStyle: { [key: string]: string },
        titleStyle: { [key: string]: string },
        contentStyle: { [key: string]: string },
    }
    title: string
    description: string
    media: {
        data: IMediaItem[]
    }
}

export interface ICardListData {
    data: {
        title: string
        cards: ICardData[]
    }
}


export interface INews {
    id: Number
    attributes: {
        title: string
        description: string
        cover: {
            data: IMediaBackend
        }
        linkTo: string
    }
}




