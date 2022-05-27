import type { NextPage } from 'next'
import { getNavData } from '../components/Nav'
import { useWeather } from '../hooks/useWeather'


const Home: NextPage = () => {

  const weather = useWeather()

  return (
    <section className="ui-dark limited-width" itemScope itemType="http://schema.org/Article">
      <h1 className="t-1 t-bld">{`${weather.celcius}`}°C </h1>
      <p className="t-6 t-mdm">Bugün Kadıköy {`${weather.description}`}. Ben büyük olasılıkla kompüterimde ui-ux tasarlamakla, kodlamasını yapmakla meşgulümdür. Değilse, bir yolucluk esnasında çizim yapıyorumdur.</p>
      <p itemProp="author" itemScope itemType="http://schema.org/Organization">
        <span itemProp="name" className="t-7">Burak Kuyucaklı</span>
      </p>
    </section>
  )
}

export default Home


export async function getStaticProps() {

  const res = await fetch(`${process.env.BASE_URL_STRAPI_API}/home?populate=*`)
  const homepageData = await res.json()
  const seoData = homepageData.data.attributes.seo
  const backgroundImage = `${process.env.NEXT_PUBLIC_MEDIA_URL}${homepageData.data.attributes.backgroundImage.data.attributes.formats.large.url}`
  const posts = await getNavData();

  return {
    props: {
      post: homepageData.data.attributes,
      posts: posts,
      backgroundImage,
      seoData
    },
  }
}


interface IMessages {
  [key: string]: string[]
}

const messages: IMessages = {
  'clear sky': ['gökyüzü berrak'],
  'few clouds': ['az bulutlu'],
  'broken clouds': ['parçalı bulutlu'],
  'scattered clouds': ['bulutlu'],
  'thunderstorm': ['sağanak yağmurlu'],
  'shower rain': ['yağmurlu'],
  'snow': ['karlı'],
  'mist': ['sisli'],
}

