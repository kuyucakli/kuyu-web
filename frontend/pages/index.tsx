import type { NextPage } from 'next'
import { useEffect } from 'react'
import { getNavData } from '../components/Nav'
import { useWeather } from '../hooks/useWeather'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { INews } from '../types'
import styles from '/styles/Home.module.css'
import { useScroll } from '../hooks/useScroll'



const Home: NextPage = ({ featuredNews, backgroundImage }: any) => {
  const weather = useWeather()
  const { width, height, url, alternativeText } = backgroundImage

  const scroll = useScroll({ wait: 0 })

  useEffect(() => {
    document.body.style.setProperty(
      '--scroll',
      `${window.scrollY / (document.body.offsetHeight - window.innerHeight)}`
    );
  }, [scroll]);

  return (
    <>
      <Image className={styles.JumboCover} src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${url}`} alt={alternativeText} width={width}
        height={height} layout="raw" priority />
      <section className={`${styles.SectionIntro} limited-width`} itemScope itemType="http://schema.org/Article">
        <h1 className="t-1 t-bld">{`${weather.celcius}`}°C </h1>
        <p className="t-6 t-mdm">Bugün Kadıköy {`${weather.description}`}. Ben büyük olasılıkla kompüterimde ui-ux tasarlamakla, kodlamakla meşgulümdür. Değilse, bir yolculuk esnasında çizim yapıyorumdur.</p>
        <p itemProp="author" itemScope itemType="http://schema.org/Organization">
          <span itemProp="name" className="t-7">Burak Kuyucaklı</span>
        </p>
      </section>
      <section className={`${styles.SectionFeaturedNews} limited-width`} >
        {
          featuredNews &&
          featuredNews.map(
            (item: INews, i: any) =>
              <FeaturedNew key={i} {...item} />
          )
        }
      </section>
    </>
  )
}


const FeaturedNew = (props: INews): JSX.Element => {
  const { title, description, cover, linkTo } = props.attributes
  const { alternativeText } = cover.data.attributes
  const { url, width, height } = cover.data.attributes.formats.small // get raw file data
  return (
    <section >
      <figure>

        <Image src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${url}`} alt={alternativeText} width={width || 500}
          height={height || 500} layout="raw" priority/>

      </figure>
      <div>
        <h2 className="t-4 t-mdm">
          {title}
        </h2>
        <ReactMarkdown>
          {description}
        </ReactMarkdown>
      </div>
    </section>
  )
}

export default Home

export async function getStaticProps() {

  const res = await fetch(`${process.env.BASE_URL_STRAPI_API}/home?populate=*`)
  const dataHomepage = await res.json()
  const { attributes } = dataHomepage.data
  const { seo, backgroundImage } = attributes

  const seoData = seo
  const posts = await getNavData();

  const respFeatured = await fetch(`${process.env.BASE_URL_STRAPI_API}/news?featured=true&populate[0]=cover`)
  const dataFeatured = await respFeatured.json()


  return {
    props: {
      post: dataHomepage.data,
      posts: posts,
      backgroundImage: backgroundImage.data.attributes,
      seoData,
      featuredNews: dataFeatured.data
    },
  }
}




