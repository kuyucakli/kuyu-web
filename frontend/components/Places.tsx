import React, { useState, useEffect } from "react"
import Map, { Marker } from 'react-map-gl';
import { PlacesProps } from "../types";

const DEFAULT_VIEWPORT = {
  longitude: 28.966811066173022, // Turkey
  latitude: 40.99640129190027,
  zoom: 7.5
}

const Places = ({ data }: PlacesProps): JSX.Element => {


  const handleChange = () => {

  }

  useEffect(() => {

    const link = document.createElement("link");
    link.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css';
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);

  }, [])

  return (
    <Map

      initialViewState={DEFAULT_VIEWPORT}
      onClick={handleChange}
      style={{ width: "100%", height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
    >
      {
        data.map((item, i) =>
          <Marker key={i} longitude={item.attributes.location.lng} latitude={item.attributes.location.lat} anchor="center" />
        )

      }


    </Map>
  )
}


export default Places







