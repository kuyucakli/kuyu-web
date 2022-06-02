import React, { useState, useEffect, useRef, useCallback } from "react"
import Map, { Marker, MapRef } from 'react-map-gl';
import { IPlace, PlacesProps } from "../types";


const DEFAULT_VIEWPORT = {
  longitude: 28.966811066173022, // Turkey
  latitude: 40.99640129190027,
  zoom: 7.5
}

const Places = ({ data }: PlacesProps): JSX.Element => {

  const mapRef = useRef<MapRef | null>(null);

  const onMapLoad = useCallback(() => {
    const bounds = getBounds(data)  
    if(mapRef.current){
      mapRef.current.fitBounds(bounds, {padding:40})
    }
   
  }, [data])

  const handleChange = () => {

  }

  useEffect(() => {

    const link = document.createElement("link");
    link.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css';
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);

  }, [])

  return (
    <div className="limited-width">
      <div style={{ gridArea: "1 / 1 / 1 / 5" }}>
        <Map
          ref={mapRef}
          onLoad={onMapLoad}   
          onClick={handleChange}
          style={{ width: "100%", height: "300px" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        >
          {
            data.map((item, i) =>
              <Marker key={i} longitude={item.attributes.location.lng} latitude={item.attributes.location.lat} anchor="center" />
            )

          }


        </Map>
      </div>
    </div>
  )
}


const getBounds = (arr: IPlace[]):mapboxgl.LngLatBoundsLike => {
  
  const firstLoc = arr[0].attributes.location
  const initialBounds =  [firstLoc.lng, firstLoc.lat, firstLoc.lng, firstLoc.lat ]
  const ret =  arr.reduce( ( acc, current ) => {
    //min lat
    const{lng, lat} = current.attributes.location

    if( lng < acc[0]){
      acc[0] = lng
    }
    //min long
    if( lat < acc[1]){
      acc[1] = lat
    }
    //max lat
     if( lng > acc[2]){
      acc[2] = lng
    }
     //max long
     if( lat > acc[3]){
      acc[3]= lat
    }

    return acc;
    
  }, initialBounds )
  
  return [ret[0], ret[1], ret[2], ret[3]]
  
}


export default Places







