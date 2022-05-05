import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import { Stack } from '@strapi/design-system';


const DEFAULT_VIEWPORT = {
  longitude: 28.966811066173022, // Turkey
  latitude: 40.99640129190027,
  zoom: 3.5
}

const MapField = ({ intlLabel, name, onChange, value }) => {


  value = value ? JSON.parse(value) : value;

  const [marker, setMarker] = useState(value);

  const [viewport, setViewState] = useState(
    value
      ? { ...DEFAULT_VIEWPORT, longitude: value.lng, latitude: value.lat }
      : DEFAULT_VIEWPORT
  )


  const handleChange = ({ lngLat }) => {
    const { lng, lat } = { ...lngLat };
    const value = JSON.stringify({ lng, lat });

    setMarker({ lng, lat });

    onChange({ target: { name, value, type: 'json' } });
  }

  useEffect( ()=> {

    const link = document.createElement("link");
    link.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css';
    link.rel = "stylesheet";
  
    document.getElementsByTagName("head")[0].appendChild(link);

  }, [])


  



  return (
    <Stack spacing={2}>
      <Map

        initialViewState={viewport}
        onClick={handleChange}
        style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1Ijoia251bHBidXJhayIsImEiOiJja3lxMWZyZzgwZmhxMm9tZDVpZjBqcnFnIn0.Ayvczxok7be7d6tWaDCNiA"
        onMove={evt => setViewState(evt.viewState)}
      >

        {marker && <Marker longitude={marker.lng} latitude={marker.lat} anchor="center" />}



      </Map>

    </Stack>

  )


}


export default MapField;