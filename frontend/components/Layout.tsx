import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import Link from 'next/link'


interface ILayout {
    children: React.ReactNode,
    path: string,
    works:[],
    blogPosts:[],
    places:[],
}

function Layout({ children, path, works, blogPosts, places }:ILayout) {
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
                <Nav works={works} blogPosts={blogPosts} places={places}/>
            </header>

           

            <main className={path}>
                {children}
            </main>
        </>
    )
}


export default Layout