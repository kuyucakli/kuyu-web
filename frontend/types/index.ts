export interface IPost {

    id?: number
    title: string
    slug: string
    publishedAt: string
    updatedAt: string
    category: {}
    blocks: []
    seo: {}
    pageTemplateSettings: {
        zeroTopSpace: boolean
        logoColor: string
        uiThemeAmbientColor:string
    }
    cover: {
        formats: {
            thumbnail: {}
        }
    }
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
    linkBaseUrl: string
    slidesPerView: number
    showCustomCursor: React.MouseEventHandler
    hideCustomCursor: React.MouseEventHandler
    showCaption?: boolean
    lgDirection?: 'vertical' | 'horizontal'
    handleMenuClose: React.MouseEventHandler
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
}

export interface StaticDetailPageOutProps {
    props: {
        post: IPost
        posts: NavCategoricalList
        seoData: {}
        navIndex: number
    }
}

export interface StaticDetailPagePaths {
    paths: StaticDetailPageParams
    fallback: boolean
}

export interface CardProps{
    media:{
        formats: {
            thumbnail: {}
        }
    }
    title:string
    content:string

}

export interface HeroProps{
    data: {
        layout: {
            classes: string,
            wrapperStyle: { [key: string]: string },
            mediaContainerStyle: { [key: string]: string },
            titleStyle: { [key: string]: string },
        }
        title:string,
        media: {
            items: {
                data: IMediaItem[]
            }
        }
    }
    
}


export interface IMediaItems {
    items: IMediaItem[]
    style?: object
    mediaSize?: {layout:'fill', objectFit:'cover'} | {}
}

export interface IMediaItem {
    id: number
    style?: {}
    mediaSize?: {layout:'fill', objectFit:'cover'} | {}
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

