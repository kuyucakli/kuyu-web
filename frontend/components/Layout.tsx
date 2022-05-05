import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import Link from 'next/link'

interface LayoutProps {
    children: React.ReactNode,
    path:string,
}

function Layout( { children, path }: LayoutProps ) {
    return (
        <>
            <Head>
                <title>Kuyucakli | Ana Sayfa</title>
                <meta name="description" content="Burak Kuyucaklı'nın kişisel web sitesi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Link href="/">
                   <a><Image src="/logo_burak.svg" alt="Burak Kuyucaklı logo" width={40} height={40} /></a> 
                </Link>
            </header>

            <Nav/>

            <main className={path}>
               {children}
            </main>
        </>
    )
}


export default Layout