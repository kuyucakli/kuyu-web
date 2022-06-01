import Nav from '../components/Nav'
import Logo from './Logo'
import SeoHead from '../components/SeoHead'
import { Layout } from '../types'


function Layout({
    children,
    posts,
    post,
    navIndex = 0,
    seoData
}: Layout): JSX.Element {

    /* If no post or Error pages */
    if(!post){
        return <>{children}</>
    }

    const { zeroTopSpace, uiThemeAmbientColor } = post.attributes.pageTemplateSettings
    const headerClass = `${uiThemeAmbientColor}`
    const mainClass = `p${navIndex} ${zeroTopSpace ? 'zero-top-space' : ''} ${uiThemeAmbientColor}`
    const mainStyle = {  }
    const breadCrumbs = ['', 'ui-ux', 'çizim', 'blog']

    return (
        <>

            <SeoHead {...seoData} />

            <header id="page-header" className={headerClass} >
                <Logo uiThemeAmbientColor={`${uiThemeAmbientColor}`} />
                <p id="breadcrumbs">{breadCrumbs[navIndex]}</p>
                <Nav
                    posts={{ ...posts }}
                    navIndex={navIndex}
                />

            </header>

           
                <main
                    key={`p${navIndex}`}
                    className={mainClass}
                    style={mainStyle}
                >
                    {children}
                </main>
           
            <footer id="page-footer"></footer>

        </>
    )
}



export default Layout