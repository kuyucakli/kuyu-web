import Head from 'next/head'

export interface ISeoProps {
    
        metaTitle: string
        metaDescription: string
        cannonicalURL?: string
        metaImage: string
        keywords?: string
        preventIndexing?: boolean
     

}

const SeoHead = ( {...seoData}: ISeoProps): JSX.Element => {

    return (
        <Head>
            <title>{seoData.metaTitle}</title>
            <meta name="description" content={seoData.metaDescription} key="description" />
            <meta name="keywords" content={seoData.keywords} />
            <meta
                name="twitter:card"
                content="summary_large_image"
                key="twitter:card"
            />
            <meta property="og:url" content={seoData.cannonicalURL} key="og:url" />
            <meta property="og:title" content={seoData.metaTitle} key="og:title" />
            <meta
                property="og:description"
                content={seoData.metaDescription}
                key="og:description"
            />
            <meta property="og:image" content={seoData.metaImage} key="og:image" />
            <link rel="canonical" href={seoData.cannonicalURL} />

            {seoData.preventIndexing && (
                <>
                    <meta name="robots" content="noindex"></meta>
                    <meta name="googlebot" content="noindex"></meta>
                </>
            )}

            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default SeoHead

