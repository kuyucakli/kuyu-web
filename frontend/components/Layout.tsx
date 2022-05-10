import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import Link from 'next/link'


interface ILayout {
    children: React.ReactNode
    path: string
    illustrationWorks: []
    uiuxWorks: []
    blogPosts: []
}

function Layout({ children, path, illustrationWorks, uiuxWorks, blogPosts }:ILayout) {
    return (
        <>
            <Head>
                <title>Kuyucakli | Ana Sayfa</title>
                <meta name="description" content="Burak Kuyucaklı'nın kişisel web sitesi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header id="page-header" className="limited-width">
                <Link href="/">
                    <a><Image src="/logo_burak.svg" alt="Burak Kuyucaklı logo" width={40} height={40} /></a>
                </Link>
                <Nav illustrationWorks={illustrationWorks} uiuxWorks={uiuxWorks} blogPosts={blogPosts} />
            </header>

           

            <main className={path}>
                {children}
            </main>
        </>
    )
}


export default Layout