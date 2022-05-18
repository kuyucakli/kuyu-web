import React, { FunctionComponent } from 'react'
import Nav from '../components/Nav'
import Logo from './Logo'
import { useRouter } from 'next/router'
import SeoHead from '../components/SeoHead'
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { Layout } from '../types'



function Layout({
    children,
    posts,
    post,
    backgroundImage = '',
    navIndex = 0,
    seoData
}: Layout): JSX.Element {

    const { zeroTopSpace, uiThemeAmbientColor } = post.pageTemplateSettings
   
    const router = useRouter()
    return (
        <LazyMotion features={domAnimation}>

            <SeoHead {...seoData} />

            <header id="page-header" className={`limited-width ${uiThemeAmbientColor}`} >
                <Logo uiThemeAmbientColor={`${uiThemeAmbientColor}`} />
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
                    className={`p${navIndex} ${zeroTopSpace?'zero-top-space':''}`}
                    style={
                        {
                            backgroundImage: backgroundImage !== '' ? `url(${backgroundImage})` : `none`,
                        }
                    }
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