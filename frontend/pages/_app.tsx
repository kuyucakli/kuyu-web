import '../styles/reset.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const path = { path: router.pathname.replace('/', '')}
  console.log(pageProps)
  return (
    <Layout {...pageProps} >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp


