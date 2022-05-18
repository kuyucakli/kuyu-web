import type { NextPage } from 'next'
import { getNavData } from '../components/Nav'
import { useState, useEffect } from 'react'


const Home: NextPage = () => {

  const [weather, setWeather] = useState({ celcius: '', description: '' })

  useEffect(() => {

    const getWeather = async () => {

      try {
        const resp = await fetch('https://apix.openweathermap.org/data/2.5/weather?lat=40.6202&lon=29.2254&&units=metric&appid=d09b0cef5df5712b1c4eca1f6166811d*****')
        const data = await resp?.json()
        setWeather({
          celcius: data.main?.tem,
          description: messages[data.weather][0]
        })
      } catch (err) {
        setWeather({
          celcius: '23',
          description: messages['clear sky'][0]
        })
      }

    }

    getWeather()

  }, [])

  return (
    <section className="ui-dark limited-width" itemScope itemType="http://schema.org/Article">
      <h1 className="t-1 t-bld">{`${weather.celcius}`}°C </h1>
      <p className="t-6 t-mdm">Bugün Kadıköy {`${weather.description}`}. Ben, kullanıcı deneyimi ve arayüzü ( ui-ux ) tasarımı, kodlaması ve illustrasyon işleri ile uğraşıyorum...</p>
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

