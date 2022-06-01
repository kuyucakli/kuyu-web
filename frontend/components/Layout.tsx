import Nav from '../components/Nav'
import Logo from './Logo'
import SeoHead from '../components/SeoHead'
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
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
        <LazyMotion features={domAnimation}>

            <SeoHead {...seoData} />

            <header id="page-header" className={headerClass} >
                <Logo uiThemeAmbientColor={`${uiThemeAmbientColor}`} />
                <p id="breadcrumbs">{breadCrumbs[navIndex]}</p>
                <Nav
                    posts={{ ...posts }}
                    navIndex={navIndex}
                />

            </header>

            <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <m.main
                    key={`p${navIndex}`}
                    className={mainClass}
                    style={mainStyle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {children}
                </m.main>
            </AnimatePresence>

            <footer id="page-footer"></footer>

        </LazyMotion>
    )
}



export default Layout