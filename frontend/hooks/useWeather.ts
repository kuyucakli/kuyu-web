import { useEffect, useState } from 'react'


export function useWeather(){

    const [weather, setWeather] = useState({ celcius: '', description: '' })

    useEffect(() => {

        const getWeather = async () => {
    
          try {
            const resp = await fetch('https://api.weatherapi.com/v1/current.json?key=e1e48c00ccb14ce08ac213143221805&q=istanbul&lang=tr&aqi=no')
            const data = await resp?.json()
            setWeather({
              celcius: data.current['temp_c'],
              description:data.current.condition.text.toLowerCase()
            })
          } catch (err) {
            setWeather({
              celcius: '23',
              description: 'bulutlu'
            })
          }
    
        }
    
        getWeather()
    
      }, [])


      return weather

}

